import { useState, useEffect } from 'react';
import { DeviceConfigStub } from '@shared/hardware-config/device-config';
import { useConfiguredDevices } from './use-configured-devices';

const { ConfigService } = window;

export const useConfigStub = (configId: string) => {
  const [configStub, setConfigStub] = useState<DeviceConfigStub | undefined>();

  const { configStubs } = useConfiguredDevices();

  // TODO: memory leak
  useEffect(() => {
    const cb = (stub: DeviceConfigStub | undefined) => {
      setConfigStub(stub);
    };

    ConfigService.onConfigChange(configId, cb);
  }, [configId, configStubs]);

  return { configStub };
};
