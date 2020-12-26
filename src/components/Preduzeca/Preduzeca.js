import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { PREDUZECA } from '../../constants/routes';
import { ReactComponent as Plus } from '../../assets/icon/plus.svg';

import {
  getPreduzeca,
  setPreduzece,
} from '../../store/actions/PreduzecaActions';
import {
  preduzecaSelector,
  preduzeceSelector,
} from '../../store/selectors/PreduzecaSelector';
import SearchForm from '../shared/forms/SearchForm';
import PreduzecaTable from './PreduzecaTable';
import PreduzeceDetails from './PreduzeceDetails';

const Preduzeca = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const preduzeca = useSelector(preduzecaSelector());
  const preduzece = useSelector(preduzeceSelector());

  useEffect(() => {
    dispatch(getPreduzeca());
  }, [dispatch]);

  useEffect(() => {
    if (preduzeca.total > 0) dispatch(setPreduzece(preduzeca.data[0]));
  }, [preduzeca, dispatch]);

  const handleSearch = (values) => {
    dispatch(getPreduzeca(values));
  };

  return (
    <>
      {match.path === PREDUZECA.PARTNERI ? (
        <h1 class="heading-primary">Dodajte partnera iz liste preduzeća</h1>
      ) : (
        <h1 class="heading-primary">Preduzeća</h1>
      )}
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__search-wrapper">
            <SearchForm handleSubmit={handleSearch} />
          </div>
          <PreduzecaTable preduzeca={preduzeca} />
          {match.path === PREDUZECA.PARTNERI ? (
            <div class="df jc-center ai-c fd-column">
              <hr class="w-60 " />
              <p class="mb-25">
                ili kreirajte novi unos ako preduzeće nije u listi
              </p>
              <Link exact to={PREDUZECA.CREATE}>
                <button class="btn btn__dark btn__xl">
                  <Plus className="icon icon__light lg" />
                  Novo preduzeće
                </button>
              </Link>
            </div>
          ) : null}
        </div>
        <PreduzeceDetails preduzece={preduzece} />
      </div>
    </>
  );
};

export default Preduzeca;
