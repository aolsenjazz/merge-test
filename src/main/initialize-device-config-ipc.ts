import { BrowserWindow, ipcMain, IpcMainEvent, Menu } from 'electron';

import { DeviceConfigDTO } from '@shared/hardware-config/device-config';
import {
  AdapterDeviceConfig,
  configFromDriver,
  SupportedDeviceConfig,
} from '@shared/hardware-config';
import { getQualifiedInputId } from '@shared/util';
import { Anonymous, DRIVERS, getDriver } from '@shared/drivers';

import { CONFIG, DEVICE_CONFIG, MENU } from './ipc-channels';

import { WindowProvider } from './window-provider';
import { PluginRegistry } from './plugin-registry';
import { DeviceRegistry } from './device-registry';
import { HardwarePortService } from './port-service';
import { VirtualPortService } from './port-service/virtual/virtual-port-service';
import { InputRegistry } from './input-registry';
import { createDevicePluginMenu } from './menu/device-plugin-menu';

const { MainWindow } = WindowProvider;

ipcMain.on(
  CONFIG.ADD_DEVICE,
  (
    _e: IpcMainEvent,
    deviceName: string,
    siblingIdx: number,
    driverName?: string
  ) => {
    const driver = getDriver(driverName || deviceName) || Anonymous;
    const conf = configFromDriver(deviceName, siblingIdx, driver);

    DeviceRegistry.register(conf.id, conf);
    HardwarePortService.onConfigChange({ action: 'add', changed: [conf] });
    VirtualPortService.onConfigChange({ action: 'add', changed: [conf] });

    MainWindow.sendReduxEvent({
      type: 'configuredDevices/setAll',
      payload: DeviceRegistry.getAll().map((c) => c.toDTO()),
    });

    if (conf instanceof SupportedDeviceConfig) {
      const inputDTOs = conf.inputs
        .map((id) => getQualifiedInputId(conf.id, id))
        .map((qid) => InputRegistry.get(qid)!)
        .map((i) => i.toDTO());

      MainWindow.sendReduxEvent({
        type: 'inputConfigs/upsertMany',
        payload: inputDTOs,
      });
    }

    MainWindow.edited = true;
  }
);

ipcMain.on(CONFIG.REMOVE_DEVICE, (_e: IpcMainEvent, deviceId: string) => {
  const conf = DeviceRegistry.get(deviceId)!;

  DeviceRegistry.deregister(deviceId);

  HardwarePortService.onConfigChange({ action: 'remove', changed: [conf] });
  VirtualPortService.onConfigChange({ action: 'remove', changed: [conf] });

  MainWindow.edited = true;
  MainWindow.sendReduxEvent({
    type: 'configuredDevices/setAll',
    payload: DeviceRegistry.getAll().map((c) => c.toDTO()),
  });
});

ipcMain.on(
  CONFIG.UPDATE_DEVICE,
  (_e: IpcMainEvent, updates: DeviceConfigDTO) => {
    const config = DeviceRegistry.get(updates.id);

    if (config) {
      config.applyStub(updates);

      MainWindow.sendReduxEvent({
        type: 'configuredDevices/upsertOne',
        payload: config.toDTO(),
      });
    }
  }
);

ipcMain.on(
  MENU.DEVICE_PLUGIN_MENU,
  async (e: IpcMainEvent, x: number, y: number, deviceId: string) => {
    const template = await createDevicePluginMenu(deviceId);
    const menu = Menu.buildFromTemplate(template);
    const win = BrowserWindow.fromWebContents(e.sender) || undefined;
    menu.popup({ window: win, x, y });
  }
);

ipcMain.on(
  DEVICE_CONFIG.REMOVE_PLUGIN,
  (_e: IpcMainEvent, pluginId: string, deviceConfigId: string) => {
    const config = DeviceRegistry.get(deviceConfigId);

    if (config) {
      config.plugins = config.plugins.filter((p) => p !== pluginId);
      PluginRegistry.deregister(pluginId);

      MainWindow.sendReduxEvent({
        type: 'configuredDevices/setAll',
        payload: DeviceRegistry.getAll().map((c) => c.toDTO()),
      });
    }
  }
);

ipcMain.on(
  DEVICE_CONFIG.SET_CHILD,
  (_e: IpcMainEvent, deviceConfigId: string, childDriverName: string) => {
    const config = DeviceRegistry.get<AdapterDeviceConfig>(deviceConfigId);
    const driver = DRIVERS.get(childDriverName);

    if (!config) throw new Error(`No config found fr ${deviceConfigId}`);
    if (!driver) throw new Error(`No driver found for ${childDriverName}`);

    const child = configFromDriver(
      childDriverName,
      0,
      driver
    ) as SupportedDeviceConfig;
    config.setChild(child);
  }
);
