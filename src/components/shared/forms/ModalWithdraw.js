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

const ModalWithdraw = ({
  label,
  obavezno = false,
  showModal,
  hideModal,
  ...props
}) => {
  const id = props.id || props.name;

  const [withdraw, setWithdraw] = useState(0);
  const [depozit, setDepozit] = useState(0);
  const [withdrawLoaded, setWithdrawLoaded] = useState();
  const [withdrawError, setWithdrawError] = useState();
  // let [toastCounter, setToastCounter] = useState(false);

  useEffect(() => {
    depozitWithdrawService
      .getDepozitToday()
      .then((data) => {
        if (data.data.length !== 0) {
          setDepozit(data?.data?.iznos_depozit);
        }
      })
      .catch((err) =>
        toast.error('Greška kod učitavanja depozita!', toastSettings)
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depozit) {
      toast.error('Depozit za današnji dan mora biti učitan!', toastSettings);
      hideModal(false);
      return;
    }
    if (+withdraw > +depozit) {
      toast.error(
        'Iznos koji podižete ne može biti veći od iznosa depozita za današnji dan!',
        toastSettings
      );
      hideModal(false);
      return;
    }

    depozitWithdrawService
      .storeDepozitWithdraw({
        iznos_withdraw: withdraw,
      })
      .then((data) => {
        console.log('storeDepozitWithdraw', withdraw);
        setWithdrawLoaded(data);
      })
      .catch((error) => {
        if (error.status !== 400) {
          toast.error(
            'Greška kod podizanja depozita: ' + error.message,
            toastSettings
          );
        } else {
          toast.error(
            'Greška kod podizanja depozita: ' + error.response.data,
            toastSettings
          );
        }
        hideModal(false);
        setWithdrawError(error);
      });
  };

  return ReactDOM.createPortal(
    <>
      {showModal && !withdrawLoaded ? (
        <div className="modal" id="modal">
          <div className="modal__content">
            <div className="modal__header">
              <span className="modal__close">&times;</span>
              <h2 className="heading-secondary m-0">Podigni Depozit</h2>
            </div>
            <div className="modal__body">
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  type="number"
                  name="iznos_depozita"
                  onChange={(e) => {
                    setWithdraw(e.target.value);
                  }}
                  defaultValue={depozit && depozit}
                />
                <button type="submit" className="btn btn-primary">
                  Podigni Depozit
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
      {withdrawLoaded && (
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

export default ModalWithdraw;
