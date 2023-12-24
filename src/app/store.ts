import {configureStore} from "@reduxjs/toolkit";
import {ContactsReducer} from '../Containers/ContactsSlice';

export const store = configureStore({
  reducer: {
    contacts: ContactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;