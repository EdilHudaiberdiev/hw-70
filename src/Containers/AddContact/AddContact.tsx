import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {IContactForm} from '../../types';
import {addContact} from '../ContactsThunk';

const AddContact = () => {
  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();
  const isLoading = useSelector((state: RootState) => state.contacts.isLoading);
  const [contact, setContact] = useState<IContactForm>({
    name: '',
    phone: '',
    email: '',
    photo: '',
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addContact(contact));
      Navigation('/');
    } catch (e) {
      alert('Something gone wrong');
    }
  };

  return (
    <>
      {isLoading ? <Spinner/> :
        <ContactForm
          contact={contact}
          onFormSubmit={onFormSubmit}
          changeForm={changeForm}
          btnText='Add'
        />
      }
    </>
  );
};

export default AddContact;