import {ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {IContactForm} from '../../types';

interface Props {
  contact: IContactForm;
  onFormSubmit: (e: React.FormEvent) => void,
  changeForm:  (e: ChangeEvent<HTMLInputElement>) => void,
  btnText?: string,
}
const ContactForm: React.FC<Props> = ({contact, onFormSubmit, changeForm, btnText}) => {
  const Navigation = useNavigate();

  return (
    <>
      <form onSubmit={e => onFormSubmit(e)}>
        <h2 className="text-center mb-4">Add new post</h2>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={contact.name}
            onChange={e => changeForm(e)}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control"
            value={contact.phone}
            onChange={e => changeForm(e)}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={contact.email}
            onChange={e => changeForm(e)}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo" className="form-label">Photo</label>
          <input
            type="text"
            name="photo"
            id="photo"
            className="form-control"
            value={contact.photo}
            onChange={e => changeForm(e)}
          />
        </div>


        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="photo-preview" className="form-label">Photo preview:</label>
          <img
            className="ms-3 border border-black"
            width='100'
            height='100'
            src={contact.photo}
            alt={contact.name}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">{btnText}</button>
          <button
            type="submit"
            className="ms-3 btn btn-warning"
            onClick={() => Navigation('/')}
          >Back to contact</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;