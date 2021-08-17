import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    currentPlan: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    currentPlan: (state, action) => {
      state.currentPlan = action.payload
    }
  },
});

export const { login, logout, currentPlan } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectCurrentPlan = (state) => state.user.currentPlan;
export default userSlice.reducer;
