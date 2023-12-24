import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import ContactCard from '../../Components/ContactCard/ContactCard';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {clearCurrentContact} from '../ContactsSlice';
import {getContacts} from '../ContactsThunk';

const Home = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const isLoading = useSelector((state: RootState) => state.contacts.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentContact());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? <Spinner/> :
        <>
          {contacts.length === 0 ? <h4>No contacts</h4> :
            <>
              {contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact}/>
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default Home;