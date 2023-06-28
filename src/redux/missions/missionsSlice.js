import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MISSIONS_URL } from '../apiconfig';

const initialState = {
  missions: [],
  loading: false,
};

export const returnAllMissions = createAsyncThunk('Get All Books', async () => {
  const response = await axios.get(MISSIONS_URL);
  return response.data;
});

export const counterSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    GetMissions: (state, { payload }) => {
      const newMissions = [];
      payload.missions.map((mission) => {
        if (mission.mission_id === payload.id) {
          newMissions.push({ ...mission, reserved: !mission.reserved });
        } else {
          newMissions.push(mission);
        }
        return { ...state, missions: newMissions };
      });
      return { ...state, missions: newMissions };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(returnAllMissions.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(returnAllMissions.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      missions: payload,
    }));
  },
});

export const { GetMissions } = counterSlice.actions;

export default counterSlice.reducer;
