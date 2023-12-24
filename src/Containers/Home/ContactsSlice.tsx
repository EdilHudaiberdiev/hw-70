import {IContacts} from '../../types';
import {createSlice} from '@reduxjs/toolkit';

interface ContactsState {
  contacts: IContacts[];
  isLoading: boolean,
  isError: boolean
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  isError: false
};

const ContactsSlice = createSlice({
  name: 'Contacts',
  initialState,
  reducers: {

  }
});



export const ContactsReducer = ContactsSlice.reducer;




