import { DeviceDriver } from '../driver-types';
import { PadDriver } from '../driver-types/input-drivers';

function createPad(n: MidiNumber): PadDriver {
  return {
    interactive: true,
    status: 'noteon/noteoff',
    channel: 0,
    number: n,
    type: 'pad',
    width: 1.125,
    height: 0.125,
    shape: 'rect',
    response: 'gate',
    availableColors: [],
    availableFx: [],
  };
}

function createOpenString(n: MidiNumber): PadDriver {
  return {
    interactive: true,
    status: 'noteon/noteoff',
    channel: 0,
    number: n,
    type: 'pad',
    width: 4.5,
    height: 0.125,
    shape: 'rect',
    response: 'gate',
    availableColors: [],
    availableFx: [],
  };
}

export const Device: DeviceDriver = {
  name: 'JS10D0AA Bluetooth',
  type: 'normal',
  anonymous: false,
  width: 16.375,
  height: 2.25,
  controlSequence: [],
  style: {
    borderTopLeftRadius: '0.5em',
    borderTopRightRadius: '0.5em',
    borderBottomLeftRadius: '0.5em',
    borderBottomRightRadius: '0.5em',
  },
  inputGrids: [
    {
      id: 'Mute',
      height: 2,
      width: 0.75,
      nRows: 1,
      nCols: 1,
      left: 15,
      bottom: 0.125,
      inputs: [
        {
          interactive: true,
          status: 'controlchange',
          channel: 0,
          number: 18,
          type: 'pad',
          width: 0.75,
          height: 2,
          shape: 'rect',
          response: 'gate',
          availableColors: [],
          availableFx: [],
        },
      ],
    },
    {
      id: 'LowE',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 1.95,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(29),
        createPad(30),
        createPad(31),
        createPad(32),
        createPad(33),
      ],
    },
    {
      id: 'A',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 1.57,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(34),
        createPad(35),
        createPad(36),
        createPad(37),
        createPad(38),
      ],
    },
    {
      id: 'D',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 1.2,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(39),
        createPad(40),
        createPad(41),
        createPad(42),
        createPad(43),
      ],
    },
    {
      id: 'G',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 0.85,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(44),
        createPad(45),
        createPad(46),
        createPad(47),
        createPad(48),
      ],
    },
    {
      id: 'B',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 0.5,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(48),
        createPad(49),
        createPad(50),
        createPad(51),
        createPad(52),
      ],
    },
    {
      id: 'E',
      height: 0.125,
      width: 6.5,
      left: 1.75,
      bottom: 0.125,
      nRows: 1,
      nCols: 5,
      inputs: [
        createPad(53),
        createPad(54),
        createPad(55),
        createPad(56),
        createPad(57),
      ],
    },
    {
      id: 'Bridge',
      height: 2.25,
      width: 1,
      left: 8.7,
      bottom: 0,
      nRows: 1,
      nCols: 4,
      inputs: [
        {
          interactive: false,
          width: 1,
          height: 2.25,
          type: 'pad',
          shape: 'rect',
        },
      ],
    },
    {
      id: 'Open String',
      height: 2.25,
      width: 4.5,
      bottom: 0,
      left: 9.6,
      nRows: 6,
      nCols: 1,
      inputs: [
        createOpenString(28),
        createOpenString(33),
        createOpenString(38),
        createOpenString(43),
        createOpenString(47),
        createOpenString(52),
      ],
    },
  ],
};
