import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      // Set the loading state to true when showing loading.
      state.loading = true;
    },
    hideLoading: (state) => {
      // Set the loading state to false when hiding loading.
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
