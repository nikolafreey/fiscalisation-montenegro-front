import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import SearchForm from '../shared/forms/SearchForm';
import RacuniDetails from './RacuniDetails';
import RacuniTable from './RacuniTable';
import {
  racuniSelector,
  racunSelector,
} from '../../../store/selectors/RacuniSelector';
import { getRacuni, setRacun } from '../../../store/actions/RacuniActions';

const Racuni = () => {
  const dispatch = useDispatch();
  const racuni = useSelector(racuniSelector());
  const racun = useSelector(racunSelector);
  useEffect(() => {
    dispatch(getRacuni());
  }, [dispatch]);

  useEffect(() => {
    if (racuni.total > 0) dispatch(setRacun(racuni.data[0]));
  }, [racuni, dispatch]);

  const handleSearch = (values) => {
    dispatch(getRacuni(values));
  };

  return (
    <>
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__search-wrapper">
            <SearchForm handleSubmit={handleSearch} />
          </div>
          <RacuniTable racuni={racuni} />
        </div>
        <RacuniDetails racun={racun} />
      </div>
    </>
  );
};

export default Racuni;
