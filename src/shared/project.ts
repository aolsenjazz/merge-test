import {
  SupportedDeviceConfig,
  AnonymousDeviceConfig,
  DeviceConfig,
} from './hardware-config';

export class Project {
  static CURRENT_VERSION = 1;

  version?: number;

  /* Configured devices. See `SupportedDeviceConfig` for more. */
  devices: DeviceConfig[];

  constructor(devices?: DeviceConfig[]) {
    this.devices = devices || [];
  }

  /**
   * Loads a project from JSON string, used either in IPC or when loading
   * saved file. Should be used in combination with `project.toJSON()`
   *
   * @param json Serialized representation of the project
   * @returns The deserialized project
   */
  static fromJSON(json: string) {
    const obj = JSON.parse(json);
    const newProj = new Project();
    newProj.version = obj.version;

    Object.assign(newProj, obj);
    newProj.devices = obj.devices.map((j: string) => {
      const o = JSON.parse(j);
      return o.supported
        ? SupportedDeviceConfig.fromParsedJSON(o)
        : AnonymousDeviceConfig.fromParsedJSON(o);
    });

    return newProj;
  }

  /**
   * Adds a device configuration to this project.
   *
   * @param config The config to add
   */
  addDevice(config: DeviceConfig) {
    this.devices.push(config);
  }

  /**
   * Removes a device configuration to this project.
   *
   * @param config The config to remove
   */
  removeDevice(config: DeviceConfig) {
    let idx = -1;
    this.devices.forEach((d, index) => {
      if (d.id === config.id) {
        idx = index;
      }
    });

    if (idx !== -1) {
      this.devices.splice(idx, 1);
    }
  }

  /**
   * Returns the device config for given id.
   *
   * @param id The requested device id
   * @returns device config
   */
  getDevice(id: string | undefined) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].id === id) return this.devices[i];
    }
    return undefined;
  }

  /**
   * Serialize the project and all child configs
   *
   * @param includeState Should `InputConfig` state be added?
   * @returns Serialized JSON string
   */
  toJSON(includeState: boolean) {
    const project = {
      devices: this.devices.map((dev) => dev.toJSON(includeState)),
      version: Project.CURRENT_VERSION,
    };

    return JSON.stringify(project);
  }
}
