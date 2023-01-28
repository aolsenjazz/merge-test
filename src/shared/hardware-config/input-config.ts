import { inputIdFor } from '../util';
import {
  OutputPropagator,
  NStepPropagator,
  propagatorFromJSON,
} from '../propagators';
import {
  InputDefault,
  InputDriver,
  InputResponse,
  InputType,
  Color,
} from '../driver-types';
import { ColorImpl } from './color-impl';

/**
 * Contains configuration details and maintains state for individual hardware
 * inputs. Layout information is delegated to the `VirtualInput` class.
 */
export class InputConfig {
  /**
   * Object containing default values for input number, EventType, etc. Generic
   * value represents the type of input - Knob, Pad, etc.
   */
  default: InputDefault;

  /**
   * Manages event propagation to clients and maintains state related to event
   * propagation to clients.
   */
  outputPropagator: OutputPropagator;

  /**
   * Manages event propagation to device and maintains state related to event
   * propagation to device.
   */
  devicePropagator: NStepPropagator;

  #nickname?: string;

  /* Array of `Color`s the hardware input can be. */
  readonly availableColors: ColorImpl[];

  /* Can this control be overridden? `false` if events aren't transmitted from device */
  readonly overrideable: boolean;

  /**
   * Input type. 'xy' is the only non-straightforward type; xy inputs are comprised of
   * *two* inputs which aren't aware of one-another.
   */
  readonly type: InputType;

  /**
   * Convert from JSON string into an InputConfig object. Reconstructs
   * state if state was saved to JSON string.
   *
   * @param json JSON string
   * @returns new instance of InputConfig
   */
  static fromJSON(json: string) {
    const other = JSON.parse(json);
    const availableColors = other.availableColors.map(
      (c: Color) => new ColorImpl(c, c.number!, c.channel as Channel)
    );

    const instance = new InputConfig(
      other.default,
      availableColors,
      other.overrideable,
      other.type,
      other.value,
      propagatorFromJSON(other.outputPropagator) as OutputPropagator,
      propagatorFromJSON(other.devicePropagator) as NStepPropagator
    );

    return instance;
  }

  /**
   * Constructs and initialize a new instance of `InputConfig` from driver
   *
   * @param other Input driver
   * @returnsnew instance of InputConfig
   */
  static fromDriver(other: InputDriver) {
    const { number, channel } = other.default;
    const colors = other.availableColors.map(
      (c) => new ColorImpl(c, number, channel)
    );

    const instance = new InputConfig(
      other.default,
      colors,
      other.overrideable,
      other.type,
      other.value
    );

    return instance;
  }

  constructor(
    defaultVals: InputDefault,
    availableColors: ColorImpl[],
    overrideable: boolean,
    type: InputType,
    value?: number,
    outputPropagator?: OutputPropagator,
    devicePropagator?: NStepPropagator,
    nickname?: string
  ) {
    this.default = defaultVals;
    this.availableColors = availableColors;
    this.overrideable = overrideable;
    this.type = type;
    this.#nickname = nickname;

    const r = this.default.response;

    if (devicePropagator) {
      this.devicePropagator = devicePropagator;
    } else {
      const defaultMsg = this.defaultColor
        ? this.defaultColor.toMidiArray()
        : null;

      const defaultColorConfig = new Map([
        [0, defaultMsg],
        [1, defaultMsg],
      ]);
      this.devicePropagator = new NStepPropagator(r, r, defaultColorConfig);
    }

    if (outputPropagator) {
      this.outputPropagator = outputPropagator;
    } else {
      const isPitchbend = defaultVals.eventType === 'pitchbend';

      this.outputPropagator = new OutputPropagator(
        r,
        r,
        this.default.eventType,
        this.default.number,
        this.default.channel,
        isPitchbend ? 64 : value // TODO: unclear what this is doing
      );
    }
  }

  /**
   * Handles a message from a device.
   *
   * @param msg The midi value array
   * @returns [message_to_device | undefined, message_to_clients | undefined]
   */
  handleMessage(msg: number[]): (number[] | null)[] {
    const toPropagate = this.outputPropagator.handleMessage(msg);
    const toDevice = this.devicePropagator.handleMessage(msg);

    return [toDevice, toPropagate];
  }

  /**
   * Returns the Color for the given state or undefined
   *
   * @param state The state
   * @returns The associated color or undefined if not set
   */
  colorForState(state: number) {
    const colorArray = this.devicePropagator.responseForStep(state);

    let c = this.defaultColor;
    this.availableColors.forEach((color) => {
      if (JSON.stringify(colorArray) === JSON.stringify(color.toMidiArray())) {
        c = color;
      }
    });

    return c;
  }

  /**
   * Set a color for the given state.
   *
   * @param state The state value
   * @param color The color
   */
  setColorForState(state: number, color: ColorImpl) {
    if (state >= this.devicePropagator.nSteps) {
      throw new Error(
        `tried to set step[${state}] when nSteps is ${this.devicePropagator.nSteps}`
      );
    }

    this.devicePropagator.setStep(state, color.toMidiArray());
  }

  /* Restores all default, numeric values (nothing color-related) */
  restoreDefaults() {
    this.number = this.default.number;
    this.eventType = this.default.eventType;
    this.channel = this.default.channel;
    this.response = this.default.response;
  }

  /**
   * Serialize a similar representation of the object. Can't use JSON.stringify
   * because we neeed to serialize a map.
   *
   * @param includeState Should we include state?
   */
  toJSON(includeState: boolean) {
    return JSON.stringify({
      default: this.default,
      outputPropagator: this.outputPropagator.toJSON(includeState),
      devicePropagator: this.devicePropagator.toJSON(includeState),
      nickname: this.nickname,
      availableColors: this.availableColors,
      overrideable: this.overrideable,
      type: this.type,
    });
  }

  get eligibleResponses() {
    switch (this.default.response) {
      case 'gate':
        return ['gate', 'toggle', 'constant'];
      case 'toggle':
        return ['toggle', 'constant'];
      case 'constant':
        return ['noteon/noteoff', 'controlchange'].includes(this.eventType)
          ? ['toggle', 'constant']
          : ['constant'];
      default:
        return ['continuous'];
    }
  }

  get eligibleEventTypes() {
    if (this.response === 'constant') {
      return ['noteon', 'noteoff', 'controlchange', 'programchange'];
    }

    if (this.default.eventType === 'pitchbend') {
      return [
        'pitchbend',
        'noteon',
        'noteoff',
        'controlchange',
        'programchange',
      ];
    }

    if (this.response === 'continuous') {
      return ['noteon', 'noteoff', 'controlchange', 'programchange'];
    }

    return ['noteon/noteoff', 'controlchange', 'programchange'];
  }

  get defaultColor(): ColorImpl | undefined {
    let c;
    this.availableColors.forEach((color) => {
      if (color.default) c = color;
    });

    return c;
  }

  get value(): number {
    return this.outputPropagator.value;
  }

  set value(value: number) {
    this.outputPropagator.value = value;
  }

  get currentColor(): ColorImpl | undefined {
    const colorArray = this.devicePropagator.responseForCurrentStep();

    let c;
    this.availableColors.forEach((color) => {
      if (JSON.stringify(colorArray) === JSON.stringify(color.toMidiArray())) {
        c = color;
      }
    });

    return c;
  }

  get eligibleLightResponses() {
    switch (this.default.response) {
      case 'constant':
      case 'gate':
        return ['gate', 'toggle'];
      case 'toggle':
        return ['toggle'];
      default:
        return [];
    }
  }

  // TODO: yeah, only 2-state lights are supported right now. that's ok.
  get eligibleLightStates() {
    return [0, 1];
  }

  get channel() {
    return this.outputPropagator.channel;
  }

  set channel(channel: Channel) {
    this.outputPropagator.channel = channel;
  }

  get number() {
    return this.outputPropagator.number;
  }

  set number(number: number) {
    this.outputPropagator.number = number;
  }

  get id() {
    return inputIdFor(
      this.default.eventType,
      this.default.channel,
      this.default.number
    );
  }

  get eventType(): StatusString | 'noteon/noteoff' {
    return this.outputPropagator.eventType;
  }

  set eventType(eventType: StatusString | 'noteon/noteoff') {
    this.outputPropagator.eventType = eventType;
  }

  get nickname() {
    return this.#nickname || `Input ${this.number}`;
  }

  set nickname(nickname: string) {
    this.#nickname = nickname;
  }

  get response(): InputResponse {
    return this.outputPropagator.outputResponse;
  }

  set response(response: InputResponse) {
    if (response === 'constant') {
      this.eventType =
        this.eventType === 'noteon/noteoff' ? 'noteon' : this.eventType;
    } else {
      this.eventType = ['noteon', 'noteoff'].includes(this.eventType)
        ? this.default.eventType
        : this.eventType;
    }

    if (response === 'toggle' || response === 'gate') {
      this.devicePropagator.outputResponse = response;
    }

    this.outputPropagator.outputResponse = response;

    this.outputPropagator.lastPropagated = null; // reset propagator state
    this.devicePropagator.currentStep = 0; // reset propagator state
  }

  get lightResponse() {
    return this.devicePropagator.outputResponse as 'gate' | 'toggle';
  }

  set lightResponse(response: 'gate' | 'toggle') {
    this.devicePropagator.outputResponse = response;

    this.devicePropagator.lastPropagated = null; // reset propagator state
    this.devicePropagator.currentStep = 0; // reset propagator state
  }
}
