import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ReactComponent as BoxCloseSvg } from '../../assets/icon/box-close.svg';
import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';
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
import { Link } from 'react-router-dom';
import { PREDRACUNI } from '../../constants/routes';
import Moment from 'react-moment';
import 'moment/locale/me';

const options = [
  { value: 'kreiran', label: 'Kreiran' },
  { value: 'poslat', label: 'Poslat' },
];

const searchParams = {};

// let visibleStatus = false;
// let visibleSearch = false;
// let visibleDateStart = false;
// let visibleDateEnd = false;

const searchDebounced = debounce((callback) => callback(), 500);
const Predracuni = () => {
  const dispatch = useDispatch();

  const predracuni = useSelector(predracuniSelector());

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [statusVisible, setStatusVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [dateStartVisible, setDateStartVisible] = useState(false);
  const [dateEndVisible, setDateEndVisible] = useState(false);

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
    // visibleDateStart = false;
    // visibleDateEnd = false;
    setDateStartVisible(false);
    setDateEndVisible(false);
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
    setStatus(selectedStatusOption.label);
    // visibleStatus = true;
    setStatusVisible(true);
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

  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#F3F4F6',
      borderRadius: 4,
      padding: '.15rem',
    }),
  };
  return (
    <>
      {console.log(selectStyle)}
      <div className="title jc-sb">
        <h1 className="heading-primary">Predračuni</h1>
        <Link exact to={PREDRACUNI.INDEX}>
          <button className="btn btn__dark">
            <ButtonPlusSvg />
            Novi predračun
          </button>
        </Link>
      </div>
      <div className="main-content__box">
        <div className="content" style={{ width: '100%' }}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100 mob-fd-column">
              {/* <div className="search df ai-c w-53"> */}
              <form className="search df ai-c w-45 mob-w-100 mr-15-mob-0">
                <button className="search__button" type="submit"></button>
                <input
                  name="search"
                  placeholder="Pretraži Račune"
                  className="search__input"
                  value={search}
                  onChange={handleChange}
                />
              </form>

              <Select
                options={options}
                onChange={handleStatusChange}
                value={{ label: status }}
                className="mob-w-100 w-20 mob-mt-10 mr-15-mob-0"
                styles={selectStyle}
                placeholderText="Status"
              />
              <div className="df jc-sb">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleStartDateChange(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="select mob-w-100 mob-mt-10"
                  placeholderText="Datum od:"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleEndDateChange(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="select mob-w-100 mob-mt-10"
                  placeholderText="Datum do:"
                />
              </div>
            </div>
            <div className="box-wrapper">
              <div className="box">
                <p className="txt-light">Ukupan Iznos</p>
                <h3 className="heading-tertiary">
                  {predracuni?.ukupna_cijena?.toFixed(2).replace('.', ',') +
                    '€'}
                </h3>
              </div>

              {searchVisible && (
                <div className="box">
                  <p className="txt-light">Pretraga</p>
                  <h3 className="heading-tertiary">{search}</h3>
                  <span onClick={resetSearch} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </div>
              )}

              {statusVisible && (
                <div className="box">
                  <p className="txt-light">Status</p>
                  <h3 className="heading-tertiary">{status}</h3>
                  <span onClick={resetStatus} className="box__close">
                    <BoxCloseSvg />
                  </span>
                </div>
              )}

              {dateStartVisible || dateEndVisible ? (
                <div className="box">
                  <p className="txt-light">Datum</p>
                  <h3 className="heading-tertiary">
                    {/* {(startDate ? startDate?.toLocaleDateString('en-US') : '') +
                      '-' +
                      (endDate ? endDate?.toLocaleDateString('en-GB') : '')
                    } */}
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
          <PredracuniTable predracuni={predracuni} />
        </div>
      </div>
    </>
  );
};
export default Predracuni;
