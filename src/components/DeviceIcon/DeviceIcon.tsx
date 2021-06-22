/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react';
import AspectRatio from 'react-aspect-ratio';

import KeyboardIcon from './KeyboardIcon';
import InputGridIcon from './InputGridIcon';

import { DeviceDriver } from '../../driver-types';

type PropTypes = {
  device: DeviceDriver;
  active: boolean;
};

export default function DeviceLayout(props: PropTypes) {
  const { device, active } = props;

  return (
    <AspectRatio
      ratio={device.width / device.height}
      className={`device-icon ${active ? 'active' : ''}`}
    >
      <div id={device.name}>
        {device.keyboard ? (
          <KeyboardIcon
            active={active}
            width={device.keyboard.width}
            height={device.keyboard.height}
            left={device.keyboard.left}
            bottom={device.keyboard.bottom}
            deviceWidth={device.width}
            deviceHeight={device.height}
          />
        ) : null}

        {device.inputGrids.map((inputGrid) => (
          <InputGridIcon
            key={inputGrid.id}
            inputGrid={inputGrid}
            active={active}
            deviceWidth={device.width}
            deviceHeight={device.height}
          />
        ))}
      </div>
    </AspectRatio>
  );
}
