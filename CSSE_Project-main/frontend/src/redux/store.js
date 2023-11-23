import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice } from './alertsSlice';
import { userSlice } from './userSlice';

// Combine multiple reducers into a single reducer for the store
const rootReducer = combineReducers({
  alerts: alertsSlice.reducer, // Reducer for handling alerts state
  user: userSlice.reducer,     // Reducer for handling user state
});

// Create the Redux store with the combined reducer
const store = configureStore({
  reducer: rootReducer,
});

// Log a message indicating that the Redux store has been created
console.log('Redux store created successfully.');

export default store;
