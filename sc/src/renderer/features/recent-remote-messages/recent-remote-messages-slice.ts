import { createSelector, PayloadAction } from '@reduxjs/toolkit';
import { getQualifiedInputId } from '@shared/util';
import { TimestampedMidiEvent } from '@shared/timestamped-midi-event';

import type { RootState } from '../../store/store';
import { createAppSlice } from '../../store/createAppSlice';

type AddMessagePayload = {
  deviceId: string;
  inputId: string;
  message: TimestampedMidiEvent;
};

const initialState: Record<string, TimestampedMidiEvent[]> = {};

export const recentRemoteMessagesSlice = createAppSlice({
  name: 'recentRemoteMessages',

  initialState,

  reducers: (create) => ({
    addMessage: create.reducer(
      (state, action: PayloadAction<AddMessagePayload>) => {
        const { deviceId, inputId, message } = action.payload;

        // add message for the device
        if (!state[deviceId]) state[deviceId] = [];

        state[deviceId].push(message);
        if (state[deviceId].length > 100) state[deviceId].shift();

        // add message for the qualified input id
        const qid = getQualifiedInputId(deviceId, inputId);
        if (!state[qid]) state[qid] = [];

        state[qid].push(message);
        if (state[qid].length > 100) state[qid].shift();
      },
    ),
  }),
});

export const selectRecentRemoteMessagesById = (
  id: string,
  numMessages: number,
) =>
  createSelector(
    (state: RootState) => state.recentRemoteMessages[id],
    (messages = []) => {
      if (numMessages >= messages.length) {
        return messages;
      }
      return messages.slice(-numMessages);
    },
  );