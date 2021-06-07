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
        toast.error('Iznos depozita nije moguće učitati!', toastSettings)
      );
  }, []);

  const handleSubmit = (e) => {
    console.log('depozit: ', depozit);
    console.log('event: ', e);
    e.preventDefault();
    handleDepositLoaded(true);
    depozitWithdrawService
      .storeDepozitWithdraw({
        iznos_depozit: depozit,
      })
      .then((data) => {
        toast.success(
          'Uspješno dodat depozit u iznosu: ' + data.data.iznos_depozit,
          toastSettings
        );
        setDepozitLoaded(data);
      })
      .catch((error) => {
        toast.error(
          'Nije moguće registrovati depozit: ' + error.response.data.message,
          toastSettings
        );
        closeModal(false);
        setDepozitError(error);
      });
  };

  return ReactDOM.createPortal(
    <>
      {showModal && !depozitError && !depozitLoaded ? (
        <div className="modal open">
          <div className="modal__content">
            <div className="modal__header">
              <span className="modal__close" onClick={() => closeModal(false)}>
                &times;
              </span>
              <h2 className="heading-secondary m-0">Registracija Depozita</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal__body">
                <input
                  autoFocus
                  type="number"
                  name="iznos_depozita"
                  className="form__input"
                  onChange={(e) => {
                    setDepozit(e.target.value);
                  }}
                  defaultValue="0.00"
                />
              </div>
              <div className="modal__footer">
                <button type="submit" className="btn btn__primary">
                  Registruj Depozit
                </button>
                <button
                    type="button"
                    className="btn btn__link ml-m"
                    onClick={()=>closeModal(false)}
                  >
                    Obustavi
                </button>
              </div>
            </form>
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
