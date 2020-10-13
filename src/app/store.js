import { configureStore } from '@reduxjs/toolkit';
import gapiReducer from '../features/gapiReducer'

export default configureStore({
  reducer: {
    gapi: gapiReducer,
  },
});
