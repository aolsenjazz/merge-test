/* eslint @typescript-eslint/no-non-null-assertion: 0 */
import { MidiArray } from '@shared/midi-array';

import { test, expect } from '@jest/globals';
import { AnonymousDeviceConfig } from '@shared/hardware-config';

test('new UnsupportedDevice() correctly assigns values', () => {
  const name = 'littlename';
  const siblingIndex = 7;
  const nickname = 'nick';
  const overrides = new Map<string, MidiArray>();
  overrides.set('someKey', MidiArray.create(144, 0, 0, 0));

  const device = new AnonymousDeviceConfig(
    name,
    siblingIndex,
    overrides,
    [],
    nickname
  );

  expect(device.id).toBe(`${name} ${siblingIndex}`);
  expect(device.name).toBe(name);
  expect(device.siblingIndex).toBe(siblingIndex);
  expect(device.nickname).toBe(nickname);
  expect(Array.from(device.overrides.entries())).toEqual(
    Array.from(overrides.entries())
  );
});

test('toJSON and fromJSON correctly serializes and deserializes', () => {
  const name = 'littlename';
  const siblingIndex = 7;
  const nickname = 'nick';
  const overrides = new Map<string, MidiArray>();
  const shareWith = ['otherDevice'];

  overrides.set('someKey', MidiArray.create(144, 0, 0, 0));
  const device = new AnonymousDeviceConfig(
    name,
    siblingIndex,
    overrides,
    shareWith,
    nickname
  );
  const json = device.toJSON();
  const obj = JSON.parse(json);
  const other = AnonymousDeviceConfig.fromParsedJSON(obj);

  expect(device.id).toBe(other.id);
  expect(device.name).toBe(other.name);
  expect(device.siblingIndex).toBe(other.siblingIndex);
  expect(device.nickname).toBe(other.nickname);
  expect(device.supported).toBe(other.supported);
  expect(device.shareSustain).toEqual(other.shareSustain);
  expect(Array.from(device.overrides.entries())).toEqual(
    Array.from(other.overrides.entries())
  );
});

test('handleMessage propagates message when not-overridden', () => {
  const name = 'littlename';
  const nickname = 'nick';

  const device = new AnonymousDeviceConfig(name, 7, new Map(), [], nickname);
  const msg = MidiArray.create(144, 0, 0, 0);

  /* eslint-disable-next-line */
  const [_toDevice, toPropagate] = device.handleMessage(msg);
  expect(toPropagate).toEqual(msg);
});

test('handleMessage returns undefined message to prop to device', () => {
  const name = 'littlename';
  const nickname = 'nick';

  const device = new AnonymousDeviceConfig(name, 7, new Map(), [], nickname);
  const msg = MidiArray.create(144, 0, 0, 0);
  /* eslint-disable-next-line */
  const [toDevice, _toPropagate] = device.handleMessage(msg);
  expect(toDevice).toBe(undefined);
});

test('handleMessage applies override', () => {
  const msg = MidiArray.create(128, 0, 127, 127);

  const override = MidiArray.create(144, 0, 100, 100);
  const { status, channel } = override;

  const name = 'littlename';
  const nickname = 'nick';
  const overrides = new Map<string, MidiArray>();
  const device = new AnonymousDeviceConfig(name, 7, overrides, [], nickname);
  device.overrideInput(msg, status, channel, override[2]);
  /* eslint-disable-next-line */
  const [_toDevice, toPropagate] = device.handleMessage(msg);
  expect(toPropagate![0]).toEqual(override[0]);
  expect(toPropagate![1]).toEqual(override[1]);
});

test('serializes + deserializes correctly', () => {
  const msg = MidiArray.create(128, 0, 127, 127);

  const override = MidiArray.create(144, 0, 100, 100);
  const { status, channel } = override;
  const name = 'littlename';
  const nickname = 'nick';
  const overrides = new Map<string, MidiArray>();
  const device = new AnonymousDeviceConfig(name, 7, overrides, [], nickname);
  device.overrideInput(msg, status, channel, override[2]);
  const json = device.toJSON();
  const from = AnonymousDeviceConfig.fromParsedJSON(JSON.parse(json));

  expect(JSON.stringify(from)).toEqual(JSON.stringify(device));
});
