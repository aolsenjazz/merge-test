import {
  DeviceConfig,
  SupportedDeviceConfig,
  AdapterDeviceConfig,
} from '@shared/hardware-config';
import { DeviceDriver } from '@shared/driver-types';

import DeviceLayoutWrapper from './DeviceLayoutWrapper';
import UnsupportedView from './UnsupportedView';
import NoDevicesView from './NoDevicesView';

const { getDriver } = window.driverService;

type PropTypes = {
  config: DeviceConfig | undefined;
  configured: boolean;
  selectedInputs: string[];
  setSelectedInputs: (inputs: string[]) => void;
};

/**
 * @callback setSelectedInputs
 * @param inputs The list of selected inputs
 */

/**
 * Displays the device diagram
 *
 * @param props Component props
 * @param props.config Config for current device
 * @param props.configured Has the current device been added to the project?
 * @param props.selectedInputs List of ids of the selected inputs
 * @param props.setSelectedInputs sets the selected inputs
 * @param props.drivers The supported drivers
 */
export default function DevicePanel(props: PropTypes) {
  const { config, configured, selectedInputs, setSelectedInputs } = props;

  let Element: React.ReactElement;

  if (config === undefined) {
    Element = <NoDevicesView />;
  } else if (config.supported === false) {
    Element = <UnsupportedView deviceName={config.name} />;
  } else {
    const asAdapter = config as AdapterDeviceConfig;
    const targetConfig =
      asAdapter.isAdapter && asAdapter.isSet
        ? asAdapter.child!
        : (config as SupportedDeviceConfig);

    const driver = getDriver(targetConfig.name);

    Element = (
      <DeviceLayoutWrapper
        driver={driver as DeviceDriver}
        config={targetConfig}
        configured={configured}
        selectedInputs={selectedInputs}
        setSelectedInputs={setSelectedInputs}
      />
    );
  }

  return (
    <div id="device-panel" className="top-level">
      <div className="device-container">{Element}</div>
    </div>
  );
}
