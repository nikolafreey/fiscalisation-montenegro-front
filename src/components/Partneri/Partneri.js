import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  partneriSelector,
  partnerSelector,
} from '../../store/selectors/PartneriSelector';
import { getPartneri, setPartner } from '../../store/actions/PartneriActions';
import PartneriTable from './PartneriTable';
import PreduzeceDetails from '../Preduzeca/PreduzeceDetails';
import FizickoLiceDetails from '../FizickaLica/FizickoLiceDetails';
import { debounce } from 'lodash';
import { ReactComponent as PlusLightSvg } from '../../assets/icon/plusLight.svg';
import { ReactComponent as PreduzeceSvg } from '../../assets/icon/hero-preduzecaDropdown.svg';
import { ReactComponent as UserSvg } from '../../assets/icon/user.svg';
import { Link } from 'react-router-dom';
import { FIZICKA_LICA, PARTNERI, PREDUZECA } from '../../constants/routes';

import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import { spinnerStyleGrid } from '../../constants/spinner';

const searchDebounced = debounce((callback) => callback(), 500);

const filters = {};

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());
  const partner = useSelector(partnerSelector());

  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (filter === 'sve') filters.filter = null;
    else filters.filter = filter;
    getFiltered();
  }, [filter]);

  useEffect(() => {
    if (search === '') filters.search = null;
    else filters.search = search;
    searchDebounced(getFiltered);
  }, [search]);

  useEffect(() => {
    if (partneri.total > 0) dispatch(setPartner(partneri.data[0]));
  }, [partneri, dispatch]);

  const getFiltered = () => {
    console.log('filters', filters);
    dispatch(getPartneri(filters));
  };

  return (
    <>
      <div className="title jc-sb">
        <h1 className="heading-primary">Partneri</h1>
        <button className="btn btn__primary btn-dd">
          <PlusLightSvg />
          <p>Novi partner</p>
          <div className="drop-down" id="ddl">
            <Link to={PREDUZECA.INDEX}>
              <PreduzeceSvg />
              <p>Preduzeće</p>
            </Link>
            <Link to={FIZICKA_LICA.CREATE}>
              <UserSvg />
              <p>Fizičko lice</p>
            </Link>
          </div>
        </button>
      </div>
      <div className="screen-content-info">
        <div className="main-content__box">
          <div className="content">
            <div className="main-content__search-wrapper df mob-fd-column flex-nowrap">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="search df ai-c mob-w-100"
              >
                <button className="search__button"></button>
                <input
                  type="text"
                  className="search__input"
                  placeholder="Naziv ili PIB Preduzeca ili Fizicko Lice"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </form>
              <select
                className="select mob-mt-10"
                id="p-filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option value={'sve'}>Sve</option>
                <option value={'fizicko_lice'}>Fizička lica</option>
                <option value={'preduzece'}>Preduzeća</option>
              </select>
            </div>
            {partneri &&
            partneri.data &&
            partneri.data.length === 0 &&
            !partneri.path ? (
              <GridLoader css={spinnerStyleGrid} size={15} />
            ) : partneri && partneri.data && partneri.data.length === 0 ? (
              <h2 className="df jc-sb tabp-w-100">{'Nemate računa u listi'}</h2>
            ) : (
              <PartneriTable partneri={partneri} />
            )}
          </div>
          {partner.preduzece_partner && !partner.fizicko_lice && (
            <PreduzeceDetails preduzece={partner.preduzece_partner} />
          )}
          {partner.fizicko_lice && partner.preduzece_partner && (
            <FizickoLiceDetails fizickoLice={partner.fizicko_lice} />
          )}
        </div>
      </div>
      {/* <h1 className="heading-primary">Partneri</h1>
      <div className="main-content__box">
        <div className="content">
          <div className="main-content__search-wrapper df">
            <form className="search df ai-c">
              <button className="search__button"></button>
              <input
                type="text"
                className="search__input"
                placeholder="Naziv ili PIB preduzeca"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
            <select className="btn btn__primary btn__lg ml-xl" value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value={'sve'}>Sve</option>
              <option value={'fizicko_lice'}>Fizička lica</option>
              <option value={'preduzece'}>Preduzeća</option>
            </select>
          </div>
          <PartneriTable partneri={partneri} />
        </div>
        {partner.preduzece && (
          <PreduzeceDetails preduzece={partner.preduzece} />
        )}
        {partner.fizicko_lice && (
          <FizickoLiceDetails fizickoLice={partner.fizicko_lice} />
        )}
      </div> */}
    </>
  );
};

export default Partneri;
