/**
 * IPC channel names used to transmit data pertaining to the host OS or devices connected to the host
 */
export const HOST = {
  OS: 'os',
  TITLE: 'title',
  REQUEST: 'request',

  REQUEST_DEVICE_STUB: 'request-device-stub',
  REQUEST_CONNECTED_DEVICES: 'request-connected-devices',
  CONNECTED_DEVICES: 'connected-devices',

  REQUEST_INPUT_STATE: 'request-input-state',
};

/**
 * IPC channel names used to transmit data pertaining to configurations
 */
export const CONFIG = {
  ADD_DEVICE: 'add-device',
  REMOVE_DEVICE: 'remove-device',
  UPDATE_DEVICE: 'update-device',
  UPDATE_INPUT: 'update-input',

  REQUEST_DEVICE_CONFIG_STUB: 'request-device-config-stub',
  CONFIGURED_DEVICES: 'configured-devices',
  REQUEST_CONFIGURED_DEVICES: 'request-configured-devices',

  INPUT_CONFIG_CHANGE: 'input-config-change',
  REQUEST_INPUT_CONFIG_STUB: 'request-input-config-stub',
};

/**
 * IPC channel names used to transmit data pertaining to translators
 */
export const TRANSLATOR = {
  REMOVE_TRANSLATOR_OVERRIDE: 'remove-translator-override',
  ADD_TRANSLATOR_OVERRIDE: 'add-translator-override',
  GET_TRANSLATOR_OVERRIDE: 'get-translator-override',
  REQUEST_OVERRIDES: 'request-overrides',
};
