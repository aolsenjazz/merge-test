import { byteToStatusString } from '@shared/midi-util';

import { InputDefault, MonoInputConfig } from './mono-input-config';
import type { MonoInputDTO } from './mono-input-dto';
import { MonoInteractiveDriver } from '../../driver-types/input-drivers/mono-interactive-driver';

/**
 * It should be noted that while `PitchbendConfig` extends `MonoInputConfig`, pitchbend
 * messages do not have a notion of `number` and therefore `config.number` and
 * `config.defaults.number` are a misnomer. Normally, the value at the number-index of a
 * pitchbend MIDI message array would be the MSB of the pitchbend value, but because of how
 * create configs from drivers, `config.number` is instead just assigned a meaningless number.
 */
export class PitchbendConfig extends MonoInputConfig {
  public defaults: InputDefault;

  public type = 'wheel' as const;

  constructor(
    deviceId: string,
    nickname: string,
    plugins: string[],
    driver: MonoInteractiveDriver
  ) {
    super(deviceId, nickname, plugins, driver);

    this.defaults = {
      number: driver.number,
      channel: driver.channel,
      statusString: driver.status,
      response: driver.response,
    };
  }

  public toDTO(): MonoInputDTO {
    return {
      ...super.toDTO(),
      className: this.constructor.name,
    };
  }

  isOriginator(msg: NumberArrayWithStatus) {
    if (msg.length === 3) {
      const statusString = byteToStatusString(msg[0]);
      const channel = msg[0] & 0x0f;
      return (
        statusString === this.defaults.statusString &&
        channel === this.defaults.channel
      );
    }

    return false;
  }
}
