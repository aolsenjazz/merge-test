import { PadDriver, FxDriver, ColorDescriptor } from '../../driver-types';
import { InputState } from './base-input-config';
import { MonoInputConfig } from './mono-input-config';

export interface PadState extends InputState {
  color: ColorDescriptor | undefined;
  fx: FxDriver | undefined;
}
export class PadConfig extends MonoInputConfig {
  defaultValue?: MidiNumber;

  static fromDriver(d: PadDriver) {
    const def = {
      number: d.number,
      channel: d.channel,
      statusString: d.status,
      response: d.response,
    };

    return new PadConfig('', [], def);
  }

  get state() {
    return {}; // TODO
  }

  get type() {
    return 'pad' as const;
  }
}
