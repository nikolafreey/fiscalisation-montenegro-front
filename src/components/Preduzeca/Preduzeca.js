import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPreduzeca,
  setPreduzece,
} from '../../store/actions/PreduzecaActions';
import {
  preduzecaSelector,
  preduzeceSelector,
} from '../../store/selectors/PreduzecaSelector';
import PreduzecaTable from './PreduzecaTable';
import PreduzeceDetails from './PreduzeceDetails';

const Preduzeca = () => {
  const dispatch = useDispatch();

  const preduzeca = useSelector(preduzecaSelector());
  const preduzece = useSelector(preduzeceSelector());

  useEffect(() => {
    dispatch(getPreduzeca());
  }, [dispatch]);

  useEffect(() => {
    if (preduzeca.total > 0) dispatch(setPreduzece(preduzeca.data[0]));
  }, [preduzeca, dispatch]);

  return (
    <>
      <h1 class="heading-primary">Preduzeća</h1>
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__search-wrapper">
            <form class="search">
              <button class="search__button"></button>
              <input
                type="text"
                class="search__input"
                placeholder="Naziv ili PIB preduzeca"
              />
            </form>
          </div>
          <PreduzecaTable preduzeca={preduzeca} />
        </div>
        <PreduzeceDetails preduzece={preduzece} />
      </div>
    </>
  );
};

export default Preduzeca;
