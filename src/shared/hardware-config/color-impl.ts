/* eslint-disable no-bitwise */
/* eslint-disable prefer-destructuring */
import { MidiArray } from '../midi-array';
import { byteToStatusString } from '../midi-util';
import { DefaultPreservedMidiArray } from '../default-preserved-midi-array';

import { Color } from '../driver-types/color';

type SerializedColorImpl = {
  color: Color;
  tuple: MidiTuple;
  default: MidiTuple;
};

export class ColorImpl extends DefaultPreservedMidiArray {
  readonly name: string;

  readonly string: string;

  readonly isDefault: boolean;

  readonly modifier?: 'blink' | 'pulse';

  static fromDrivers(
    c: Color,
    parentNumber: MidiNumber | undefined,
    parentChannel: Channel | undefined
  ) {
    const { eventType, value } = c;
    const number = c.number || parentNumber;
    const channel = c.channel || parentChannel;

    const arr = MidiArray.create(eventType, channel!, number!, value);

    return new ColorImpl(arr.array, c, arr.array);
  }

  static fromJSON(json: string | object) {
    let obj = json;
    if (typeof json === 'string') obj = JSON.parse(json);
    const dSer = obj as SerializedColorImpl;
    return new ColorImpl(dSer.tuple, dSer.color, dSer.default);
  }

  private constructor(arr: MidiTuple, color: Color, defaults: MidiTuple) {
    super(defaults);

    this.status = (arr[0] & 0xf0) as StatusByte;
    this.channel = (arr[0] & 0x0f) as Channel;
    this.number = arr[1];
    this.value = arr[2];

    this.name = color.name;
    this.string = color.string;
    this.isDefault = color.default || false;
    this.modifier = color.modifier;
  }

  get displayName() {
    return `${this.name}${this.modifier ? ` (${this.modifier})` : ''}`;
  }

  get eventType() {
    return byteToStatusString(this.status, true) as StatusString;
  }

  toJSON() {
    const col: Color = {
      name: this.name,
      string: this.string,
      eventType: this.eventType,
      value: this.value,
      modifier: this.modifier,
    };
    return {
      color: col,
      tuple: [this[0], this[1], this[2]],
      default: this.default,
    };
  }
}
