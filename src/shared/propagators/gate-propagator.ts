import { MidiArray } from '../midi-array';
import { CorrelatedResponse } from './propagator';
import { StatefulPropagator } from './stateful-propagator';

/**
 * Propagates messages to clients. Responds differently depending on `outputResponse`,
 * and can be set to change response behaviour
 */
export class GatePropagator extends StatefulPropagator<
  'gate',
  CorrelatedResponse<'gate'>
> {
  constructor(
    or: CorrelatedResponse<'gate'>,
    et: StatusString | 'noteon/noteoff',
    n: MidiNumber,
    c: Channel,
    v?: MidiNumber,
    s?: StatefulPropagator<'gate', 'gate'>['state']
  ) {
    super('gate', or, et, n, c, v, s);
  }

  /**
   * Returns the next message to propagate given the received message
   *
   * @param msg The message to respond to
   * @returns The message to propagate
   */
  protected getResponse(msg: MidiArray) {
    let response: MidiArray;
    switch (this.outputResponse) {
      case 'gate':
        response = this.#handleAsGate(msg);
        break;
      case 'toggle':
        response = this.#handleAsToggle();
        break;
      case 'constant':
        response = this.handleAsConstant(msg);
        break;
      default:
        throw new Error(`unknown outputResponse ${this.outputResponse}`);
    }

    if (['toggle', 'gate'].includes(this.outputResponse)) {
      this.state = this.state === 'on' ? 'off' : 'on';
    }

    return response;
  }

  /**
   * Returns the next message to propagate if in 'gate' mode
   *
   * @returns The message to propagate
   */
  #handleAsGate = (msg: MidiArray) => {
    const eventType = this.nextEventType();
    return MidiArray.create(eventType, this.channel, this.number, msg[2]);
  };

  /**
   * Returns the next message to propagate if in 'toggle' mode
   *
   * @returns The message to propagate
   */
  #handleAsToggle = () => {
    const eventType = this.nextEventType();
    const value = this.state === 'on' ? 0 : 127;

    return MidiArray.create(eventType, this.channel, this.number, value);
  };
}
