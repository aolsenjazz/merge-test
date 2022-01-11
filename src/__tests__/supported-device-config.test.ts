/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import { test, expect, jest } from '@jest/globals';
import {
  MidiMessage,
  EventType,
  Channel,
  MidiValue,
} from 'midi-message-parser';

import { SupportedDeviceConfig, InputConfig } from '@shared/hardware-config';
import { Color } from '@shared/driver-types';

function BasicInputConfig() {
  const inputDefault = {
    channel: 0 as Channel,
    eventType: 'controlchange' as EventType,
    number: 0 as MidiValue,
    response: 'linear' as 'linear' | 'toggle',
  };
  const override = {
    lightConfig: new Map<string, Color>(),
  };

  const overrideable = true;
  const type = 'pad';

  return new InputConfig(inputDefault, override, [], overrideable, type);
}

function BasicSupportedDevice() {
  const name = 'SomeName';
  const shareSustain: string[] = [];
  const inputConfigs: InputConfig[] = [];
  const nickname = 'SomeNickname';

  inputConfigs.push(BasicInputConfig());

  return new SupportedDeviceConfig(
    name,
    0,
    shareSustain,
    inputConfigs,
    nickname
  );
}

test('getInput throws for bad id', () => {
  const inputDefault = {
    channel: 0 as Channel,
    eventType: 'controlchange' as EventType,
    number: 0 as MidiValue,
    response: 'linear' as 'linear' | 'toggle',
  };
  const override = {
    lightConfig: new Map<string, Color>(),
  };

  const name = 'SomeName';
  const shareSustain: string[] = [];
  const nickname = 'SomeNickname';
  const overrideable = true;
  const type = 'pad';

  const input = new InputConfig(inputDefault, override, [], overrideable, type);

  const config = new SupportedDeviceConfig(
    name,
    0,
    shareSustain,
    [input],
    nickname
  );

  expect(config.getInput('badid!')).toBe(undefined);
});

test('getInput returns correct input for id', () => {
  const inputDefault = {
    channel: 0 as Channel,
    eventType: 'controlchange' as EventType,
    number: 0 as MidiValue,
    response: 'linear' as 'linear' | 'toggle',
  };
  const override = {
    lightConfig: new Map<string, Color>(),
  };

  const name = 'SomeName';
  const shareSustain: string[] = [];
  const inputConfigs: InputConfig[] = [];
  const nickname = 'SomeNickname';
  const overrideable = true;
  const type = 'pad';

  const input = new InputConfig(inputDefault, override, [], overrideable, type);

  inputConfigs.push(input);

  const config = new SupportedDeviceConfig(
    name,
    0,
    shareSustain,
    inputConfigs,
    nickname
  );

  const result = config.getInput(input.id);
  expect(result!.id).toBe(input.id);
});

test('handleMessage() passes to correct input for processing', () => {
  const inputDefault = {
    channel: 0 as Channel,
    eventType: 'controlchange' as EventType,
    number: 0 as MidiValue,
    response: 'linear' as 'linear' | 'toggle',
  };
  const override = {
    lightConfig: new Map<string, Color>(),
  };

  const name = 'SomeName';
  const shareSustain: string[] = [];
  const inputConfigs: InputConfig[] = [];
  const nickname = 'SomeNickname';
  const overrideable = true;
  const type = 'pad';

  const input = new InputConfig(inputDefault, override, [], overrideable, type);
  const spy = jest.spyOn(input, 'handleMessage');
  inputConfigs.push(input);

  const config = new SupportedDeviceConfig(
    name,
    0,
    shareSustain,
    inputConfigs,
    nickname
  );

  const mm = new MidiMessage(
    input.eventType,
    input.number,
    127,
    input.channel,
    0
  );
  config.handleMessage(mm.toMidiArray());
  expect(spy).toHaveBeenCalledTimes(1);
});

test('bindingAvailable returns false if binding is taken', () => {
  const device = BasicSupportedDevice();
  const input = device.inputs[0];
  const result = device.bindingAvailable(
    input.eventType,
    input.number,
    input.channel
  );
  expect(result).toBe(false);
});

test('bindingAvailable return true if binding is not taken', () => {
  const device = BasicSupportedDevice();
  const result = device.bindingAvailable('noteon', 42, 0);
  expect(result).toBe(true);
});

test('handleMessage just propagates msgs when no matching inputConfig found', () => {
  const device = BasicSupportedDevice();
  const msg = new MidiMessage('noteon', 42, 127, 0, 0).toMidiArray();
  const result = device.handleMessage(msg);
  expect(result[1]).toStrictEqual(msg);
});

test('toJSON and fromParsedJSON correctly serializes + deserializes', () => {
  const conf = BasicSupportedDevice();
  const json = conf.toJSON(true);
  const obj = JSON.parse(json);
  const other = SupportedDeviceConfig.fromParsedJSON(obj);

  expect(conf.id).toBe(other.id);
  expect(conf.name).toBe(other.name);
  expect(conf.siblingIndex).toBe(other.siblingIndex);
  expect(conf.nickname).toBe(other.nickname);
  expect(conf.supported).toBe(other.supported);
  expect(conf.shareSustain).toEqual(other.shareSustain);
  expect(conf.keyboardDriver).toEqual(other.keyboardDriver);
  expect(JSON.stringify(conf.inputs)).toBe(JSON.stringify(other.inputs));
});
