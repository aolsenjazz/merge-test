import { BrowserWindow } from 'electron';
import os from 'os';

import { DeviceConfigStub } from '@shared/hardware-config/device-config';
import { DeviceStub } from '@shared/device-stub';
import {
  BaseInputConfig,
  InputConfigStub,
  InputState,
} from '@shared/hardware-config/input-config/base-input-config';
import { ImmutableMidiArrayMap } from '@shared/hardware-config/anonymous-device-config';

import { HOST, CONFIG } from '../ipc-channels';
import { getAssetPath, getPreloadPath, resolveHtmlPath } from '../util-main';
import { StatefulWindowActions } from './stateful-window-actions';

/**
 * Provides a number of frequently-used functions targetting the main window.
 * Saves state in between closing and recreating the window.
 */
export class MainWindowActions extends StatefulWindowActions {
  constructor() {
    super(resolveHtmlPath('index.html'), 'Untitled project');
  }

  public create() {
    // don't create more than 1 main window
    if (BrowserWindow.fromId(this.id || -1) !== null) {
      return;
    }

    super.create({
      show: false,
      width: 1024,
      height: 600,
      transparent: true,
      frame: false,
      minHeight: 312,
      minWidth: 850,
      titleBarStyle: os.platform() === 'darwin' ? 'hiddenInset' : 'default',
      icon: getAssetPath('icon.png'),
      webPreferences: { preload: getPreloadPath() },
    });
  }

  public sendConnectedDevices(stubs: DeviceStub[]) {
    this.send(HOST.CONNECTED_DEVICES, stubs);
  }

  public sendConfiguredDevices(stubs: DeviceConfigStub[]) {
    this.send(CONFIG.CONFIGURED_DEVICES, stubs);
  }

  public sendDeviceStub(id: string, desc: DeviceStub | undefined) {
    this.send(`device-stub-${id}`, desc);
  }

  public sendConfigStub(id: string, desc: DeviceConfigStub | undefined) {
    this.send(`device-config-stub-${id}`, desc);
  }

  public sendOverrides(id: string, overrides: ImmutableMidiArrayMap) {
    this.send(`${id}-overrides`, overrides);
  }

  public sendInputConfigs(configs: InputConfigStub[]) {
    this.send(CONFIG.INPUT_CONFIG_CHANGE, configs);
  }

  public sendInputState<T extends InputState>(
    deviceId: string,
    inputId: string,
    state: T
  ) {
    this.send(`device-${deviceId}-input-${inputId}-state`, state);
  }

  public sendInputConfig<T extends InputConfigStub>(
    deviceId: string,
    inputId: string,
    config: T
  ) {
    this.send(`device-${deviceId}-input-${inputId}-config`, config);
  }
}
