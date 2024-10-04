import { DeviceConfigDTO } from '@shared/hardware-config/device-config';
import { ipcRenderer } from 'electron';

import { CONFIG, DEVICE_CONFIG } from '../ipc-channels';
import { addOnChangeListener } from './common';

export const DeviceConfigService = {
  /**
   * Send an updated copy of a device config to the backend.
   */
  updateDevice(config: DeviceConfigDTO) {
    ipcRenderer.send(CONFIG.UPDATE_DEVICE, config);
  },

  removePlugin: (pluginId: string, deviceConfigId: string) => {
    ipcRenderer.send(DEVICE_CONFIG.REMOVE_PLUGIN, pluginId, deviceConfigId);
  },

  getConfiguredDevices: () => {
    return ipcRenderer.sendSync(CONFIG.GET_CONFIGURED_DEVICES) as string[];
  },

  onConfiguredDevicesChange: (func: (deviceConfigs: string[]) => void) => {
    return addOnChangeListener(CONFIG.CONFIGURED_DEVICES, func);
  },

  setChild: (configId: string, childId: string) => {
    ipcRenderer.send(DEVICE_CONFIG.SET_CHILD, configId, childId);
  },

  /**
   * Subscribe to changes to a config for the given id. A new channel named
   * `device-descriptor-{deviceId}` will be created to which the renderer can listen.
   */
  onDeviceConfigChange(
    deviceId: string,
    func: (desc: DeviceConfigDTO | undefined) => void
  ) {
    return addOnChangeListener(`device-config-stub-${deviceId}`, func);
  },

  getDeviceConfig(deviceId: string) {
    return ipcRenderer.sendSync(CONFIG.GET_DEVICE_CONFIG, deviceId) as
      | DeviceConfigDTO
      | undefined;
  },

  /**
   * Creates a `SupportedDeviceConfig`, `AdapterDeviceConfig`, or `AnonymousDeviceConfig`
   * and adds it to the current project
   */
  addDevice(
    deviceName: string,
    siblingIndex: number,
    driverName?: string,
    childName?: string
  ) {
    ipcRenderer.send(
      CONFIG.ADD_DEVICE,
      deviceName,
      siblingIndex,
      driverName,
      childName
    );
  },

  /**
   * Inform that backend that the given device was removed
   */
  removeDevice(deviceId: string) {
    ipcRenderer.send(CONFIG.REMOVE_DEVICE, deviceId);
  },
};
