import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {IContact, IContactForm} from '../../types';
import {editContact, getContactById} from '../ContactsThunk';

const EditContact = () => {
    const params = useParams();
    const isLoading = useSelector((state: RootState) => state.contacts.isLoading);
    const currentContact = useSelector((state: RootState) => state.contacts.currentContact);
    const dispatch: AppDispatch = useDispatch();
    const Navigation = useNavigate();

    const [contact, setContact] = useState<IContactForm>({
        name: '',
        phone: '',
        email: '',
        photo: '',
    });

    useEffect( () => {
        if (currentContact === null) {
            if (params.id) {
                dispatch(getContactById(params.id));
            }
        } else {
            setContact({...currentContact});
        }
    }, [params.id, dispatch, currentContact]);


    const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContact((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (params.id) {
            const contactCopy: IContact = {
                ...contact,
                id: params.id,
            };

            try {
                await dispatch(editContact(contactCopy));
                Navigation('/');
            } catch (e) {
                alert('Something gone wrong');
            }
        }
    };

    return (
        <>
            {isLoading ? <Spinner/> :
                <ContactForm
                    contact={contact}
                    onFormSubmit={onFormSubmit}
                    changeForm={changeForm}
                    btnText='Edit'
                />
            }
        </>
    );
};

export default EditContact;