import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { PREDUZECA } from '../../constants/routes';
import { ReactComponent as Plus } from '../../assets/icon/plus.svg';
import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';

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

import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import { spinnerStyleGrid } from '../../constants/spinner';

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
        <h1 className="heading-primary">Dodajte partnera iz liste preduzeća</h1>
      ) : (
        <div className="title jc-sb">
          <h1 className="heading-primary">Preduzeća</h1>
          <button className="btn btn__primary">
            <Link exact to={PREDUZECA.CREATE}>
              <button className="btn btn__primary">
                <ButtonPlusSvg />
                Novo Preduzeće
              </button>
            </Link>
          </button>
        </div>
      )}
      <div className="main-content__box">
        <div className="content">
          <div className="main-content__search-wrapper">
            <SearchForm handleSubmit={handleSearch} />
          </div>
          {preduzeca.data.length === 0 ? (
            <GridLoader css={spinnerStyleGrid} size={15} />
          ) : (
            <PreduzecaTable preduzeca={preduzeca} />
          )}
          {match.path === PREDUZECA.PARTNERI ? (
            <div className="df jc-center ai-c fd-column">
              <hr className="w-60 " />
              <p className="mb-25">
                ili kreirajte novi unos ako preduzeće nije u listi
              </p>
              <Link exact to={PREDUZECA.CREATE}>
                <button className="btn btn__primary btn__xl">
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
