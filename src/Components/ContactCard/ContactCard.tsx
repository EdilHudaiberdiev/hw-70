import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../app/store';
import {deleteContact, getContacts} from '../../Containers/ContactsThunk';
import {IContact} from '../../types';
import NotFoundImg from '../../assets/uploads/NotFoundPhoto.jpg';
import CustomModal from '../UI/CustomModal/CustomModal';
import Spinner from '../UI/Spinner/Spinner';
interface Props {
  contact: IContact
}
const ContactCard: React.FC<Props> = ({contact}) => {
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state: RootState) => state.contacts.isLoading);
  const dispatch: AppDispatch = useDispatch();
  const Navigation = useNavigate();

  let photo = contact.photo.trim().length === 0 ? NotFoundImg : contact.photo;

  const deleteContactById = async (id: string) => {
    await dispatch(deleteContact(id));
    setOpen(false);
    await dispatch(getContacts());
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="mb-3 d-flex align-items-center w-50 p-3 border border-black">
        <img
          width="100"
          height="100"
          className="d-block"
          src={photo}
          alt={contact.name}
        />
        <div className="ms-3">
          <p>{contact.name}</p>
        </div>
      </div>

      <CustomModal open={open} handleClose={() => setOpen(false)}>
        {isLoading ? <Spinner/> :
          <>
            <div className="text-end"><button onClick={() => setOpen(false)} type="button" className="ms-3 btn btn-primary">X</button></div>
            <div onClick={() => setOpen(true)} className="mx-auto d-flex align-items-center w-50 p-3 border border-black">
              <img
                width="100"
                height="100"
                className="d-block"
                src={photo}
                alt={contact.name}
              />
              <div className="ms-3">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>

                <button
                  onClick={() => Navigation(`/edit-contact/${contact.id}`)}
                  type="button"
                  className="btn btn-warning"
                >Edit</button>
                <button
                  onClick={() => deleteContactById(contact.id)}
                  type="button"
                  className="ms-3 btn btn-danger"
                >Delete</button>
              </div>
            </div>
          </>
        }
      </CustomModal>
    </>
  );
};

export default ContactCard;