import { DeviceDriver } from '../driver-types';
import { NoninteractiveInputDriver } from '../driver-types/input-drivers';

function createNoninteractivePad(
  width: number,
  height: number,
): NoninteractiveInputDriver {
  return {
    interactive: false,
    width,
    height,
    type: 'pad',
    shape: 'rect',
    style: {},
  };
}

export const Device: DeviceDriver = {
  name: 'Keystation 61 MK3 (Transport)',
  type: 'normal',
  anonymous: false,
  width: 11.625,
  height: 7,
  controlSequence: [],
  style: {
    borderTopLeftRadius: '0.1em',
    borderTopRightRadius: '0.1em',
    borderBottomLeftRadius: '0.1em',
    borderBottomRightRadius: '0.1em',
  },
  keyboard: {
    defaultOctave: 1,
    nOctaves: 1,
    channel: 0,
    width: 7.375,
    height: 5.375,
    bottom: 0,
    left: 4.25,
    enabled: false,
  },
  inputGrids: [
    {
      id: 'Wheels',
      height: 2.125,
      width: 2.125,
      left: 1,
      bottom: 1,
      nRows: 1,
      nCols: 2,
      inputs: [
        {
          interactive: false,
          width: 0.625,
          height: 2.125,
          type: 'wheel',
          shape: 'rect',
          handleWidth: 0.625,
          handleHeight: 0.625,
          style: {},
        },
        {
          interactive: false,
          width: 0.625,
          height: 2.125,
          type: 'wheel',
          shape: 'rect',
          handleWidth: 0.625,
          handleHeight: 0.625,
          style: {},
        },
      ],
    },
    {
      id: 'OctavePlusMinus',
      height: 0.3,
      width: 1.5,
      left: 2,
      bottom: 3.75,
      nRows: 1,
      nCols: 2,
      inputs: [
        createNoninteractivePad(0.5, 0.3),
        createNoninteractivePad(0.5, 0.3),
      ],
    },
    {
      id: 'Advanced',
      height: 0.3,
      width: 1.5,
      left: 2,
      bottom: 4.5,
      nRows: 1,
      nCols: 2,
      inputs: [createNoninteractivePad(0.5, 0.3)],
    },
    {
      id: 'Volume',
      height: 1.5,
      width: 0.4,
      left: 0.6,
      bottom: 3.5,
      nRows: 1,
      nCols: 1,
      inputs: [
        {
          interactive: false,
          width: 0.4,
          height: 1.5,
          type: 'slider',
          shape: 'rect',
          handleWidth: 0.4,
          handleHeight: 0.4,
          style: {},
        },
      ],
    },
    {
      id: 'Playback',
      height: 0.5,
      width: 2.25,
      left: 2,
      bottom: 5.75,
      nRows: 1,
      nCols: 3,
      inputs: [
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 93,
          type: 'pad',
          width: 0.5,
          height: 0.5,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 94,
          type: 'pad',
          width: 0.5,
          height: 0.5,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 95,
          type: 'pad',
          width: 0.5,
          height: 0.5,
          shape: 'circle',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
      ],
    },
    {
      id: 'Nav1',
      height: 0.25,
      width: 0.25,
      left: 0.725,
      bottom: 6.375,
      nRows: 1,
      nCols: 1,
      inputs: [
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 96,
          type: 'pad',
          width: 0.25,
          height: 0.25,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
      ],
    },
    {
      id: 'Nav2',
      height: 0.25,
      width: 1.5,
      left: 0.1,
      bottom: 5.875,
      nRows: 1,
      nCols: 3,
      inputs: [
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 98,
          type: 'pad',
          width: 0.25,
          height: 0.25,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 100,
          type: 'pad',
          width: 0.25,
          height: 0.25,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 99,
          type: 'pad',
          width: 0.25,
          height: 0.25,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
      ],
    },
    {
      id: 'Nav3',
      height: 0.25,
      width: 0.25,
      left: 0.725,
      bottom: 5.4,
      nRows: 1,
      nCols: 1,
      inputs: [
        {
          interactive: true,
          status: 'noteon/noteoff',
          channel: 0,
          number: 97,
          type: 'pad',
          width: 0.25,
          height: 0.25,
          shape: 'rect',
          response: 'gate',
          style: {},
          availableColors: [],
          availableFx: [],
        },
      ],
    },
  ],
};
