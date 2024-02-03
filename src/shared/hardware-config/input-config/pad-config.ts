/* eslint-disable no-bitwise */
import * as Revivable from '../../revivable';
import { InputDefault } from './mono-input-config';
import {
  OverrideablePropagator,
  ColorConfigPropagator,
  createPropagator,
} from '../../propagators';
import { LightCapableInputConfig } from './light-capable-input-config';
import {
  InputResponse,
  PadDriver,
  FxDriver,
  Color,
  ColorDescriptor,
} from '../../driver-types';
import { InputState } from './base-input-config';

export interface PadState extends InputState {
  color: ColorDescriptor | undefined;
  fx: FxDriver | undefined;
}

@Revivable.register
export class PadConfig extends LightCapableInputConfig {
  defaultValue?: MidiNumber;

  static fromDriver(d: PadDriver) {
    const def = {
      number: d.number,
      channel: d.channel,
      statusString: d.status,
      response: d.response,
    };

    const prop = createPropagator(
      d.response,
      d.response,
      d.status,
      d.number,
      d.channel,
      d.value
    );

    return new PadConfig(
      def,
      d.availableColors,
      d.availableFx,
      prop,
      undefined,
      d.value
    );
  }

  constructor(
    defaultVals: InputDefault,
    availableColors: Color[],
    availableFx: FxDriver[],
    outputPropagator: OverrideablePropagator<InputResponse, InputResponse>,
    devicePropagator?: ColorConfigPropagator,
    defaultValue?: MidiNumber,
    nickname?: string
  ) {
    super(
      defaultVals,
      availableColors,
      availableFx,
      outputPropagator,
      devicePropagator,
      nickname
    );
    this.defaultValue = defaultValue;
  }

  toJSON() {
    return {
      name: this.constructor.name,
      args: [
        this.defaults,
        this.availableColors,
        this.availableFx,
        this.outputPropagator,
        this.devicePropagator,
        this.defaultValue,
        this.nickname,
      ],
    };
  }

  get state() {
    return {
      color: this.currentColor,
      fx: this.currentFx,
    };
  }

  get type() {
    return 'pad' as const;
  }

  get value(): MidiNumber {
    return this.outputPropagator.value;
  }

  set value(value: MidiNumber) {
    this.outputPropagator.value = value;
  }

  get response(): InputResponse {
    return this.outputPropagator.outputResponse;
  }

  set response(response: InputResponse) {
    if (response === 'constant') {
      this.statusString =
        this.statusString === 'noteon/noteoff' ? 'noteon' : this.statusString;
    } else {
      this.statusString = ['noteon', 'noteoff'].includes(this.statusString)
        ? this.defaults.statusString
        : this.statusString;
    }

    if (response === 'toggle' || response === 'gate') {
      this.devicePropagator.outputResponse = response;
    }

    this.outputPropagator.outputResponse = response;
  }
}
