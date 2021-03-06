import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { debounce } from 'lodash';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';
import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';

import RacuniTable from './UlazniRacuniTable';
import { ulazniRacuniSelector } from '../../store/selectors/UlazniRacuniSelector';
import {
  getUlazniRacuni,
  setUlazniRacun,
} from '../../store/actions/UlazniRacuniActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { getRacun, setRacun } from '../../store/actions/RacuniActions';
import { Link } from 'react-router-dom';
import { ULAZNI_RACUNI } from '../../constants/routes';

import Moment from 'react-moment';
import 'moment/locale/me';

import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import { spinnerStyleGrid } from '../../constants/spinner';

const options = [
  { value: 'placen', label: 'Plaćen' },
  { value: 'nijePlacen', label: 'Nije Plaćen' },
];

const searchParams = {};

// let visibleStatus = true;
// let visibleSearch = true;
// let visibleDateStart = true;
// let visibleDateEnd = true;

const searchDebounced = debounce((callback) => callback(), 200);

const UlazniRacuni = () => {
  const dispatch = useDispatch();
  const ulazniRacuni = useSelector(ulazniRacuniSelector());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [statusVisible, setStatusVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [dateEndVisible, setDateEndVisible] = useState(false);

  useEffect(() => {
    dispatch(getUlazniRacuni());
  }, [dispatch]);

  const handleSearch = (value) => {
    let filtered = value.search.replace(/[^0-9a-zA-Zžćšđč -]/gi, '');
    dispatch(getUlazniRacuni(filtered));
  };

  const resetDatePicker = () => {
    searchParams.startDate = null;
    searchParams.endDate = null;
    // visibleDateEnd = false;
    // visibleDateStart = false;
    setDateStartVisible(false);
    setDateEndVisible(false);
    setStartDate(null);
    setEndDate(null);
    handleSearch(searchParams);
  };

  const resetSearch = () => {
    searchParams.search = null;
    // visibleSearch = false;
    setSearchVisible(false);
    setSearch('');
    handleSearch(searchParams);
  };

  const resetStatus = () => {
    searchParams.status = null;
    // visibleStatus = false;
    setStatusVisible(false);
    setStatus('');
    handleSearch(searchParams);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    // visibleSearch = true;
    setSearchVisible(true);
    const value = event.target.value;
    searchParams.search = value;
    searchDebounced(() => handleSearch(searchParams));
  };

  const handleStatusChange = (selectedStatusOption) => {
    // visibleStatus = true;
    setStatusVisible(true);
    setStatus(selectedStatusOption.label);
    searchParams.status = selectedStatusOption.value;
    handleSearch(searchParams);
  };

  const handleStartDateChange = (date) => {
    // visibleDateStart = true;
    setDateStartVisible(true);
    searchParams.startDate = date;
    setStartDate(date);
    handleSearch(searchParams);
  };

  const handleEndDateChange = (date) => {
    // visibleDateEnd = true;
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
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  return (
    <>
      <div className="title jc-sb">
        <h1 className="heading-primary">Ulazni računi</h1>
        <Link exact to={ULAZNI_RACUNI.CREATE}>
          <button className="btn btn__primary">
            <ButtonPlusSvg />
            Novi ulazni račun
          </button>
        </Link>
      </div>
      <div className="main-content__box">
        <div className="content" style={{ width: '100%' }}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100 tabp-flex-wrap mob-fd-column">
              {/* <div className="search df ai-c w-53"> */}
              <form className="search df ai-c w-45 mob-w-100 mr-15-tabp-0 tabp-w-49">
                <button className="search__button" type="submit"></button>
                <input
                  name="search"
                  placeholder="Pretraži Ulazne Račune"
                  className="search__input"
                  value={search}
                  onChange={handleChange}
                />
              </form>

              <Select
                options={options}
                onChange={handleStatusChange}
                value={{ label: status }}
                className="mob-w-100 w-20 mob-mt-10 mr-15-tabp-0 tabp-w-49"
                styles={selectStyle}
              />
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
            </div>
            <div className="box-wrapper">
              <div className="box visible">
                <p className="txt-light">Ukupan Iznos</p>
                <h3 className="heading-tertiary">
                  {ulazniRacuni?.ukupna_cijena
                    ? ulazniRacuni?.ukupna_cijena
                        ?.toFixed(2)
                        .replace('.', ',') + '€'
                    : '0,00€'}
                </h3>
              </div>

              {searchVisible && (
                <div className={searchVisible ? 'box visible' : 'box'}>
                  <p className="txt-light">Pretraga</p>
                  <h3 className="heading-tertiary">{search}</h3>
                  <span onClick={resetSearch} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </div>
              )}

              {statusVisible && (
                <div className={statusVisible ? 'box visible' : 'box'}>
                  <p className="txt-light">Status</p>
                  <h3 className="heading-tertiary">{status}</h3>
                  <span onClick={resetStatus} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </div>
              )}

              {dateStartVisible || dateEndVisible ? (
                <div
                  className={
                    dateStartVisible || dateEndVisible ? 'box visible' : 'box'
                  }
                >
                  <p className="txt-light">Datum</p>
                  <h3 className="heading-tertiary">
                    {/* {(startDate
                      ? startDate?.toLocaleDateString('en-US')
                      : '') +
                      '-' +
                      (endDate ? endDate?.toLocaleDateString('en-GB') : '')} */}
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
                </div>
              ) : null}
            </div>
          </div>
          {ulazniRacuni.data.length === 0 ? (
            <GridLoader css={spinnerStyleGrid} size={15} />
          ) : (
            <RacuniTable ulazniRacuni={ulazniRacuni} />
          )}
        </div>
      </div>
    </>
  );
};

export default UlazniRacuni;
