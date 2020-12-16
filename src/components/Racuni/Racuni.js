import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { debounce } from 'lodash';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';

import RacuniTable from './RacuniTable';
import { racuniSelector } from '../../store/selectors/RacuniSelector';
import { getRacuni, setRacun } from '../../store/actions/RacuniActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const Racuni = () => {
  const dispatch = useDispatch();
  const racuni = useSelector(racuniSelector());

  useEffect(() => {
    dispatch(getRacuni());
  }, [dispatch]);

  useEffect(() => {
    if (racuni.total > 0) dispatch(setRacun(racuni.data[0]));
  }, [racuni, dispatch]);

  const handleSearch = (value) => {
    console.log('value', value);
    dispatch(getRacuni(value));
  };

  const resetDatePicker = () => {
    searchParams.startDate = null;
    searchParams.endDate = null;
    setStartDate(null);
    setEndDate(null);
    handleSearch(searchParams);
  };

  const resetSearch = () => {
    searchParams.search = '';
    setSearch('');
    handleSearch(searchParams);
  };

  const resetStatus = () => {
    searchParams.status = '';
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
                    placeholder="Pretraži Račune"
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
                  {racuni?.ukupna_cijena?.toFixed(2) + '€'}
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
          <RacuniTable racuni={racuni} />
        </div>
      </div>
    </>
  );
};

export default Racuni;
