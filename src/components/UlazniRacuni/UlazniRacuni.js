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
import { getRacun, setRacun } from '../../store/actions/RacuniActions';
import { Link } from 'react-router-dom';
import { ULAZNI_RACUNI } from '../../constants/routes';

const options = [
  { value: 'placen', label: 'Plaćen' },
  { value: 'nijePlacen', label: 'Nije Plaćen' },
];

const searchParams = {};

let visibleStatus = true;
let visibleSearch = true;
let visibleDateStart = true;
let visibleDateEnd = true;

const searchDebounced = debounce((callback) => callback(), 500);

const UlazniRacuni = () => {
  const dispatch = useDispatch();
  const ulazniRacuni = useSelector(ulazniRacuniSelector());

  useEffect(() => {
    dispatch(getUlazniRacuni());
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(getUlazniRacuni(value));
  };

  const resetDatePicker = () => {
    searchParams.startDate = null;
    searchParams.endDate = null;
    visibleDateEnd = false;
    visibleDateStart = false;
    setStartDate(null);
    setEndDate(null);
    handleSearch(searchParams);
  };

  const resetSearch = () => {
    searchParams.search = null;
    visibleSearch = false;
    setSearch('');
    handleSearch(searchParams);
  };

  const resetStatus = () => {
    searchParams.status = null;
    visibleStatus = false;
    setStatus('');
    handleSearch(searchParams);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    visibleSearch = true;
    const value = event.target.value;
    searchParams.search = value;
    searchDebounced(() => handleSearch(searchParams));
  };

  const handleStatusChange = (selectedStatusOption) => {
    visibleStatus = true;
    setStatus(selectedStatusOption.label);
    searchParams.status = selectedStatusOption.value;
    handleSearch(searchParams);
  };

  const handleStartDateChange = (date) => {
    visibleDateStart = true;
    searchParams.startDate = date;
    setStartDate(date);
    handleSearch(searchParams);
  };

  const handleEndDateChange = (date) => {
    visibleDateEnd = true;
    searchParams.endDate = date;
    setEndDate(date);
    handleSearch(searchParams);
  };

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <div className="title">
        <h1 className="heading-primary">Ulazni računi</h1>
        <Link exact to={ULAZNI_RACUNI.CREATE}>
          <button className="btn btn__dark btn__xl">
            <ButtonPlusSvg />
            Novi ulazni račun
          </button>
        </Link>
      </div>
      <div className="main-content__box">
        <div className="content" style={{width: '100%'}}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100">
              <div className="search df ai-c w-53">
                <form className="search">
                  <button className="search__button" type="submit"></button>
                  <input
                    name="search"
                    placeholder="Pretraži Ulazne Račune"
                    className="search__input"
                    value={search}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <Select
                options={options}
                onChange={handleStatusChange}
                value={status}
                className="select w-20"
              />
              <div className="select w-25 df">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleStartDateChange(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="select"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleEndDateChange(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="select"
                />
              </div>
            </div>
            <div className="box-wrapper">
              <div className="box">
                <p className="txt-light">Ukupan Iznos</p>
                <h3 className="heading-tertiary">
                  {ulazniRacuni?.ukupna_cijena?.toFixed(2).replace('.', ',') +
                    '€'}
                </h3>
              </div>
              {visibleSearch ? (
                <>
                  <div className="box">
                    <p className="txt-light">Pretraga</p>
                    <h3 className="heading-tertiary">{search}</h3>
                    <span onClick={resetSearch} className="box__close">
                      <BoxCloseSvg />
                    </span>
                  </div>
                </>
              ) : null}
              {visibleStatus ? (
                <>
                  <div className="box">
                    <p className="txt-light">Status</p>
                    <h3 className="heading-tertiary">{status}</h3>
                    <span onClick={resetStatus} className="box__close">
                      <BoxCloseSvg />
                    </span>
                  </div>
                </>
              ) : null}
              {visibleDateStart || visibleDateEnd ? (
                <>
                  <div className="box">
                    <p className="txt-light">Datum</p>
                    <h3 className="heading-tertiary">
                      {(startDate
                        ? startDate?.toLocaleDateString('en-US')
                        : '') +
                        '-' +
                        (endDate ? endDate?.toLocaleDateString('en-GB') : '')}
                    </h3>
                    <span onClick={resetDatePicker} className="box__close">
                      <BoxCloseSvg />
                    </span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <RacuniTable ulazniRacuni={ulazniRacuni} />
        </div>
      </div>
    </>
  );
};

export default UlazniRacuni;
