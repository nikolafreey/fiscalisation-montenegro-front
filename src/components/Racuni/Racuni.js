import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { debounce } from 'lodash';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';
import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';

import RacuniTable from './RacuniTable';
import Modal from '../../components/shared/forms/Modal';
import { racuniSelector } from '../../store/selectors/RacuniSelector';
import {
  getRacuni,
  resetNoviRacun,
  setRacun,
} from '../../store/actions/RacuniActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useRouteMatch } from 'react-router-dom';
import { RACUNI } from '../../constants/routes';

import Moment from 'react-moment';
import 'moment/locale/me';

import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import { spinnerStyleGrid } from '../../constants/spinner';
import { depozitWithdrawService } from '../../services/DepozitWithdrawService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalWithdraw from '../shared/forms/ModalWithdraw';

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

const options = [
  { value: null, label: 'Prikaži Sve' },
  { value: 'placen', label: 'Plaćen' },
  { value: 'nenaplativ', label: 'Nenaplativ' },
  { value: 'nijeplacen', label: 'Nije Plaćen' },
  { value: 'korektivni', label: 'Korektivni' },
  { value: 'storniran', label: 'Storniran' },
  // { value: 'privremeni', label: 'Privremeni' },
];

const searchParams = {};

const searchDebounced = debounce((callback) => callback(), 200);

const Racuni = () => {
  const dispatch = useDispatch();
  const racuni = useSelector(racuniSelector());
  console.log('racuni', racuni);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const [statusVisible, setStatusVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [dateEndVisible, setDateEndVisible] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let match = useRouteMatch();

  useEffect(() => {
    dispatch(getRacuni());
  }, [dispatch]);

  const handleSearch = (value) => {
    let filtered = value?.search?.replace(/[^0-9a-zA-Zžćšđč -]/gi, '');
    searchParams.search = filtered;
    dispatch(getRacuni(searchParams));
  };

  const resetDatePicker = () => {
    searchParams.startDate = null;
    searchParams.endDate = null;
    setStartDate(null);
    setEndDate(null);
    handleSearch(searchParams);
    setDateStartVisible(false);
    setDateEndVisible(false);
  };

  const resetSearch = () => {
    searchParams.search = null;
    setSearch('');
    handleSearch(searchParams);
    setSearchVisible(false);
  };

  const resetStatus = () => {
    searchParams.status = null;
    setStatus('');
    handleSearch(searchParams);
    setStatusVisible(false);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSearchVisible(true);
    const value = event.target.value;
    searchParams.search = value;
    searchDebounced(() => handleSearch(searchParams));
  };

  const handleStatusChange = (selectedStatusOption) => {
    setStatus(selectedStatusOption.label);
    setStatusVisible(true);
    searchParams.status = selectedStatusOption.value;
    handleSearch(searchParams);
  };

  const handleStartDateChange = (date) => {
    setDateStartVisible(true);
    searchParams.startDate = date;
    setStartDate(date);
    handleSearch(searchParams);
  };

  const handleEndDateChange = (date) => {
    setDateEndVisible(true);
    searchParams.endDate = date;
    setEndDate(date);
    handleSearch(searchParams);
  };

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#F3F4F6',
      borderRadius: 4,
      height: '45px',
      minHeight: 'unset',
    }),
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalWithdraw, setShowModalWithdraw] = useState(false);
  const [depozitLoaded, setDepozitLoaded] = useState(false);
  // const [withdrawLoaded, setWithdrawLoaded] = useState(false);
  const [withdrawError, setWithdrawError] = useState(false);
  const [withdraw, setWithdraw] = useState(0);

  const handleDepositLoaded = (props) => {
    setDepozitLoaded(props);
  };

  const closeModal = (props) => {
    setShowModal(props);
  };

  const hideModal = (props) => {
    setShowModalWithdraw(props);
  };

  const handlePodizanjeDepozita = () => {
    depozitWithdrawService
      .storeDepozitWithdraw({
        iznos_withdraw: withdraw,
      })
      .then((data) => {
        // setWithdrawLoaded(data);
      })
      .catch((error) => {
        toast.error(
          'Nije moguće prijaviti podizanje depozita: ' +
            error.response.data.message,
          toastSettings
        );
        setWithdrawError(error);
      });
  };

  useEffect(() => {
    //Race Condition and Preventing Memory Leaks
    let isActive = true;

    depozitWithdrawService
      .getDepozitToday()
      .then((data) => {
        console.log('getDepozitToday', data);
        if (isActive && data.data.length !== 0) {
          setDepozitLoaded(true);
        }
      })
      .catch((err) =>
        toast.error('Nije moguće učitati vrijednost depozita!', toastSettings)
      );
    return () => {
      isActive = false;
    };
  }, [showModalWithdraw, showModal]);

  return (
    <>
      <div className="title jc-sb mob-fd-column mob-ai-start">
        <h1 className="heading-primary">Izlazni računi</h1>

        <div className="df w-50 jc-end mob-w-100 mob-fd-column">
          {/* <Link exact={`${true}`} to={RACUNI.CREATE} className="mr-m mob-mr-0">
            <button className="btn btn__primary mob-mb-20 mob-w-100">
              <ButtonPlusSvg />
              Novi gotovinski račun
            </button>
          </Link>
          <Link exact={`${true}`} to={RACUNI.BEZGOTOVINSKI.CREATE}>
            <button className="btn btn__primary  mob-mb-20 mob-w-100">
              <ButtonPlusSvg />
              Novi bezgotovinski račun
            </button>
          </Link> */}
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            handleDepositLoaded={handleDepositLoaded}
          />
          <ModalWithdraw hideModal={hideModal} showModal={showModalWithdraw} />
          {!depozitLoaded ? (
            <button
              className="btn btn__secondary mob-mb-20"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Registracija Depozita
            </button>
          ) : (
            <button
              onClick={() => {
                setShowModalWithdraw(true);
              }}
              className="btn btn__secondary mob-mb-20"
            >
              Podizanje Depozita
            </button>
          )}
          <button className="btn btn__primary btn-dd mob-mb-20 ml-m mob-ml-0">
            <ButtonPlusSvg />
            Novi račun
            <div className="drop-down" id="ddl">
              <Link
                onClick={() => dispatch(resetNoviRacun())}
                to={RACUNI.CREATE}
              >
                {/* <PreduzeceSvg /> */}
                Novi gotovinski
              </Link>
              <Link to={RACUNI.BEZGOTOVINSKI.CREATE}>
                {/* <UserSvg /> */}
                Novi bezgotovinski
              </Link>
            </div>
          </button>
        </div>
      </div>
      <div className="main-content__box">
        <div className="content" style={{ width: '100%' }}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100 tabp-flex-wrap mob-fd-column">
              {/* <div className="search df ai-c w-53"> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="search df ai-c w-45 mob-w-100 mr-15-tabp-0 tabp-w-49"
              >
                <button className="search__button" type="button"></button>
                <input
                  name="search"
                  placeholder="Pretraži Račune"
                  className="search__input"
                  value={search}
                  onChange={handleChange}
                />
              </form>
              {/* </div> */}
              <Select
                options={options}
                onChange={handleStatusChange}
                styles={selectStyle}
                value={status ? { label: status } : options[0]}
                defaultValue={options[0]}
                className="mob-w-100 w-20 mob-mt-10 mr-15-tabp-0 tabp-w-49"
              />
              {/* <div className="select w-25 df"> */}
              <div className="df jc-sb tabp-w-100">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleStartDateChange(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="date-select mob-w-100 mob-mt-10"
                  placeholderText="Datum od:"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    var result = new Date(date);
                    result.setDate(result.getDate() + 1);
                    handleEndDateChange(result);
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="date-select mob-w-100 mob-mt-10"
                  placeholderText="Datum do:"
                />
              </div>
              {/* </div> */}
            </div>
            <ul className="box-wrapper">
              <li className="box visible ml-0">
                <p className="txt-light">Ukupan Iznos na prikazanim računima</p>
                <h3 className="heading-tertiary">
                  {racuni?.ukupna_cijena !== undefined
                    ? racuni?.ukupna_cijena?.toFixed(2).replace('.', ',') + '€'
                    : '0,00€'}
                </h3>
              </li>

              {searchVisible && (
                <li className={searchVisible ? 'box visible' : 'box'}>
                  <p className="txt-light">Pretraga</p>
                  <h3 className="heading-tertiary">{search}</h3>
                  <span onClick={resetSearch} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </li>
              )}

              {statusVisible && (
                <li className={statusVisible ? 'box visible' : 'box'}>
                  <p className="txt-light">Status</p>
                  <h3 className="heading-tertiary">{status}</h3>
                  <span onClick={resetStatus} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </li>
              )}

              {dateStartVisible || dateEndVisible ? (
                <li
                  className={
                    dateStartVisible || dateEndVisible ? 'box visible' : 'box'
                  }
                >
                  <p className="txt-light">Datum</p>
                  <h3 className="heading-tertiary">
                    {startDate && (
                      <Moment locale="me" format="DD. MMM YYYY.">
                        {startDate}
                      </Moment>
                    )}
                    -
                    {endDate && (
                      <Moment locale="me" format="DD. MMM YYYY.">
                        {endDate}
                      </Moment>
                    )}
                  </h3>
                  <span onClick={resetDatePicker} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            {racuni &&
            racuni.data &&
            racuni.data.length === 0 &&
            !racuni.path ? (
              <GridLoader css={spinnerStyleGrid} size={15} />
            ) : racuni && racuni.data && racuni.data.length === 0 ? (
              <div className="msg-center">
                <p> {'Nema sadržaja u listi'}</p>
              </div>
            ) : (
              <RacuniTable racuni={racuni} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Racuni;
