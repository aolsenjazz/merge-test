import { PadDriver } from '../../driver-types/input-drivers/pad-driver';
import { InputDefault, MonoInputConfig } from './mono-input-config';
import { MonoInputDTO } from './mono-input-dto';

export class PadConfig extends MonoInputConfig {
  public defaults: InputDefault;

  constructor(
    deviceId: string,
    nickname: string,
    plugins: string[],
    driver: PadDriver
  ) {
    super(deviceId, nickname, plugins, driver);

    this.defaults = {
      number: driver.number,
      channel: driver.channel,
      statusString: driver.status,
      response: driver.response,
    };
  }

  public get state() {
    return {};
  }

  public toDTO(): MonoInputDTO {
    return {
      ...super.toDTO(),
      className: this.constructor.name,
    };
  }

  get type() {
    return 'pad' as const;
  }
}
