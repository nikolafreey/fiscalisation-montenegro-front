import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { debounce } from 'lodash';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';

import RacuniTable from './UlazniRacuniTable';
import { ulazniRacuniSelector } from '../../store/selectors/UlazniRacuniSelector';
import {
  getUlazniRacuni,
  setUlazniRacun,
} from '../../store/actions/UlazniRacuniActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getRacun, setRacun } from '../../store/actions/RacuniActions';

const options = [
  { value: 'placen', label: 'Plaćen' },
  { value: 'nenaplativ', label: 'Nenaplativ' },
  { value: 'cekaSe', label: 'Čeka Se' },
  { value: 'privremeni', label: 'Privremeni' },
  { value: 'nenaplativDug', label: 'Nenaplativ Dug' },
  { value: 'status', label: 'Status' },
];

const searchParams = {};

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
    setStartDate(null);
    setEndDate(null);
    handleSearch(searchParams);
  };

  const resetSearch = () => {
    searchParams.search = null;
    setSearch('');
    handleSearch(searchParams);
  };

  const resetStatus = () => {
    searchParams.status = null;
    setStatus('');
    handleSearch(searchParams);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    const value = event.target.value;
    searchParams.search = value;
    searchDebounced(() => handleSearch(searchParams));
  };

  const handleStatusChange = (selectedStatusOption) => {
    setStatus(selectedStatusOption.label);
    searchParams.status = selectedStatusOption.value;
    handleSearch(searchParams);
  };

  const handleStartDateChange = (date) => {
    searchParams.startDate = date;
    setStartDate(date);
    handleSearch(searchParams);
  };

  const handleEndDateChange = (date) => {
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
      <div className="main-content__box">
        <div className="content">
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100">
              <div className="search df ai-c w-53">
                <form className="search">
                  <button className="search__button" type="submit"></button>
                  <input
                    name="search"
                    placeholder="Pretraži Ulazne Račune"
                    class="search__input"
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
                  {ulazniRacuni?.ukupna_cijena?.toFixed(2) + '€'}
                </h3>
              </div>
              <div className="box">
                <p className="txt-light">Pretraga</p>
                <h3 className="heading-tertiary">{search}</h3>
                <span onClick={resetSearch} className="box__close">
                  <BoxCloseSvg />
                </span>
              </div>
              <div className="box">
                <p className="txt-light">Status</p>
                <h3 className="heading-tertiary">{status}</h3>
                <span onClick={resetStatus} className="box__close">
                  <BoxCloseSvg />
                </span>
              </div>
              <div className="box">
                <p className="txt-light">Datum</p>
                <h3 className="heading-tertiary">
                  {(startDate ? startDate?.toLocaleDateString('en-US') : '') +
                    '-' +
                    (endDate ? endDate?.toLocaleDateString('en-GB') : '')}
                </h3>
                <span onClick={resetDatePicker} className="box__close">
                  <BoxCloseSvg />
                </span>
              </div>
            </div>
          </div>
          <RacuniTable ulazniRacuni={ulazniRacuni} />
        </div>
      </div>
    </>
  );
};

export default UlazniRacuni;
