import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField';
import Label from './Label';
import { useField } from 'formik';
import { depozitWithdrawService } from '../../../services/DepozitWithdrawService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ENDPOINTS = {
  DEPOZIT_WITHDRAW: 'depozit-withdraws',
};

const Modal = ({
  label,
  obavezno = false,
  showModal,
  closeModal,
  handleDepositLoaded,
  ...props
}) => {
  const id = props.id || props.name;

  const [depozit, setDepozit] = useState(0);
  const [depozitLoaded, setDepozitLoaded] = useState();
  const [depozitError, setDepozitError] = useState();
  // let [toastCounter, setToastCounter] = useState(false);

  useEffect(() => {
    depozitWithdrawService
      .getDepozitToday()
      .then((data) => {
        console.log('getDepozitToday', data);
        if (data.data.length !== 0) {
          setDepozitLoaded(data?.data[0]?.iznos_depozit);
          setDepozit(data?.data[0]?.iznos_depozit);
        }
      })
      .catch((err) =>
        toast.error('Greška kod učitavanja depozita!', toastSettings)
      );
  }, []);

  const handleSubmit = (e) => {
    console.log('depozit: ', depozit);
    console.log('event: ', e);
    e.preventDefault();
    handleDepositLoaded(true);
    depozitWithdrawService
      .storeDepozitWithdraw({
        iznos_depozit: +depozit,
      })
      .then((data) => {
        setDepozitLoaded(data);
      })
      .catch((error) => {
        toast.error(
          'Greška kod dodavanja depozita: ' + error.response.data.message,
          toastSettings
        );
        setDepozitError(error);
      });
  };

  return ReactDOM.createPortal(
    <>
      {showModal && !depozitError && !depozitLoaded ? (
        <div className="modal open">
          <div className="modal__content">
            <div className="modal__header">
              <span className="modal__close" onClick={() => closeModal(false)}>&times;</span>
              <h2 className="heading-secondary m-0">Dodaj Depozit</h2>
            </div>
            <div className="modal__body">
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  type="number"
                  name="iznos_depozita"
                  className='form__input w-50 mb-25'
                  onChange={(e) => {
                    setDepozit(e.target.value);
                  }}
                />
                <button type="submit" className="btn btn__primary">
                  Sačuvaj Depozit
                </button>
              </form>
            </div>
            {/* <div className="modal__footer">
              <button onSubmit={handleSubmit} className="btn btn-primary">
                Primarno
              </button>
            </div> */}
          </div>
        </div>
      ) : null}
      {depozitLoaded && (
        <input
          type="text"
          name="iznos_depozita"
          value={'€ Depozit: ' + Number(depozit).toFixed(2)}
          disabled
        />
      )}
    </>,
    document.querySelector('#modal')
  );
};

export default Modal;
