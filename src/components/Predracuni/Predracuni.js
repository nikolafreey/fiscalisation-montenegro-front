import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { predracuniSelector } from '../../store/selectors/PredracuniSelector';
import {
  getPredracuni,
  setPredracun,
} from '../../store/actions/PredracuniActions';
import PredracuniTable from './PredracuniTable';
const options = [
  { value: 'kreiran', label: 'Kreiran' },
  { value: 'poslat', label: 'Poslat' },
];

const searchParams = {};

const searchDebounced = debounce((callback) => callback(), 500);
const Predracuni = () => {
  const dispatch = useDispatch();

  const predracuni = useSelector(predracuniSelector());

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getPredracuni());
  }, [dispatch]);

  useEffect(() => {
    if (predracuni.total > 0) dispatch(setPredracun(predracuni.data[0]));
  }, [predracuni, dispatch]);

  const handleSearch = (value) => {
    dispatch(getPredracuni(value));
  };

  const resetDatePicker = () => {
    searchParams.startDate = null;
    searchParams.endDate = null;
    handleSearch(searchParams);
    setStartDate(null);
    setEndDate(null);
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
                  {predracuni?.ukupna_cijena?.toFixed(2) + '€'}
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
          <PredracuniTable predracuni={predracuni} />
        </div>
      </div>
    </>
  );
};
export default Predracuni;
