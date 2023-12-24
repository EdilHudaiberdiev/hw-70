import {createSlice} from '@reduxjs/toolkit';
import {IContact} from '../types';
import {addContact, deleteContact, editContact, getContactById, getContacts} from './ContactsThunk';

interface ContactsState {
    contacts: IContact[];
    currentContact: IContact | null,
    isLoading: boolean;
    isError: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    currentContact: null,
    isLoading: false,
    isError: false,
};

const ContactsSlice = createSlice({
    name: 'Contacts',
    initialState,
    reducers: {
        clearCurrentContact(state) {
            state.currentContact = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getContacts.fulfilled, (state, action ) => {
            const contactsObject: {[key: string]: IContact} = action.payload;
            const contactArray: IContact[] = [];

            if (contactsObject) {
                for (const [key, value] of Object.entries(contactsObject)) {
                    contactArray.push({
                        id: key,
                        name: value.name,
                        phone: value.phone,
                        email: value.email,
                        photo: value.photo,
                    });
                }
            }

            state.isLoading = false;
            state.contacts = contactArray;
        });
        builder.addCase(getContacts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(addContact.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(addContact.fulfilled, (state ) => {
            state.isLoading = false;
        });
        builder.addCase(addContact.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(deleteContact.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteContact.fulfilled, (state ) => {
            state.isLoading = false;
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getContactById.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getContactById.fulfilled, (state, action ) => {
            state.isLoading = false;
            state.currentContact = action.payload;
        });
        builder.addCase(getContactById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(editContact.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(editContact.fulfilled, (state ) => {
            state.isLoading = false;
            state.currentContact = null;
        });
        builder.addCase(editContact.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const ContactsReducer = ContactsSlice.reducer;
export const {
    clearCurrentContact,
} = ContactsSlice.actions;