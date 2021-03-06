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

  const [depozit, setDepozit] = useState(0);
  const [withdraw, setWithdraw] = useState(depozit || 0);
  const [withdrawLoaded, setWithdrawLoaded] = useState();
  const [withdrawError, setWithdrawError] = useState();
  // let [toastCounter, setToastCounter] = useState(false);

  useEffect(() => {
    depozitWithdrawService
      .getDepozitToday()
      .then((data) => {
        if (data.data.length !== 0) {
          setDepozit(data?.data?.iznos_depozit);
          setWithdraw(data?.data?.iznos_depozit);
        }
      })
      .catch((err) =>
        toast.error('Iznos depozita ne može se učitati!', toastSettings)
      );
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depozit) {
      toast.error('Depozit za današnji dan mora biti učitan!', toastSettings);
      hideModal(false);
      return;
    }
    if (withdraw > +depozit) {
      toast.error(
        'Iznos koji podižete ne može biti veći od iznosa depozita za današnji dan!',
        toastSettings
      );
      hideModal(false);
      return;
    }

    depozitWithdrawService
      .storeDepozitWithdraw({
        iznos_withdraw: withdraw.toString(),
      })
      .then((data) => {
        console.log('storeDepozitWithdraw', withdraw);
        toast.success(
          'Uspješno podignut depozit u iznosu: ' + data.data.iznos_withdraw,
          toastSettings
        );
        setWithdrawLoaded(data);
      })
      .catch((error) => {
        if (error.status !== 400) {
          toast.error(
            'Depozit nije moguće podići: ' + error.response.data,
            toastSettings
          );
        } else {
          toast.error(
            'Depozit nije moguće podići: ' + error.response.data,
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
        <div className="modal open">
          <div className="modal__content">
            <div className="modal__header">
              <span className="modal__close" onClick={() => hideModal(false)}>
                &times;
              </span>
              <h2 className="heading-secondary m-0">Podizanje Depozita</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal__body">
                <input
                  className="form__input"
                  autoFocus
                  type="number"
                  name="iznos_depozita"
                  value={+withdraw || +depozit || 0}
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => {
                    setWithdraw(e.target.value);
                  }}
                  defaultValue={depozit && +depozit}
                />
              </div>
              <div className="modal__footer">
                <button type="submit" className="btn btn__primary">
                  Podigni Depozit
                </button>
                <button
                  type="button"
                  className="btn btn__link ml-m"
                  onClick={() => hideModal(false)}
                >
                  Obustavi
                </button>
              </div>
            </form>
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
