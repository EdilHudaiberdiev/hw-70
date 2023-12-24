import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../axiosApi';
import {IContact, IContactForm} from '../types';

export const getContacts = createAsyncThunk(
    'contacts/get',
    async () => {
        const response = await axiosApi.get(`contacts.json` );
        return response.data ?? [];
    });

export const getContactById = createAsyncThunk(
    'contacts/getById',
    async (id: string) => {
        const response = await axiosApi.get(`contacts/${id}.json` );
        return response.data ?? null;
    });

export const addContact = createAsyncThunk(
    'contacts/add',
    async (contact: IContactForm) => {
        await axiosApi.post(`contacts.json`, contact);
    });

export const deleteContact = createAsyncThunk(
    'contacts/delete',
    async (id: string) => {
        await axiosApi.delete(`contacts/${id}.json`);
    });

export const editContact = createAsyncThunk(
    'contacts/edit',
    async (contact: IContact) => {
        const copyContact: IContactForm = {...contact};

        if ('id' in copyContact) {
            delete copyContact.id;
        }

        await axiosApi.put<IContactForm>(`contacts/${contact.id}.json`, copyContact);
    });
