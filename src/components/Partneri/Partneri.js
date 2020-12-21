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
import { FIZICKA_LICA, PREDUZECA } from '../../constants/routes';

const searchDebounced = debounce((callback) => callback(), 500);

const filters = {};

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());
  const partner = useSelector(partnerSelector());

  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (filter === 'sve') filters.filter = null;
    else filters.filter = filter;
    getFiltered();
  }, [dispatch, filter]);

  useEffect(() => {
    if (search === '') filters.search = null;
    else filters.search = search;
    searchDebounced(getFiltered);
  }, [dispatch, search]);

  useEffect(() => {
    if (partneri.total > 0) dispatch(setPartner(partneri.data[0]));
  }, [partneri, dispatch]);

  const getFiltered = () => {
    dispatch(getPartneri(filters));
  };

  return (
    <>
      <div class="screen-content-info">
        <div class="title">
          <h1 class="heading-primary">Partneri</h1>
          <button class="btn btn__dark btn__xl">
            <PlusLightSvg />
            Novi partner
            <div class="drop-down" id="ddl">
              <Link to={PREDUZECA.CREATE}>
                <PreduzeceSvg />
                Preduzeće
              </Link>
              <Link to={FIZICKA_LICA.CREATE}>
                <UserSvg />
                Fizičko lice
              </Link>
            </div>
          </button>
        </div>
        <div className="main-content__box">
          <div className="content">
            <div className="main-content__search-wrapper df">
              <form className="search df ai-c w-60">
                <button className="search__button"></button>
                <input
                  type="text"
                  className="search__input"
                  placeholder="Naziv ili PIB preduzeca"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </form>
              <select
                className="btn btn__dark btn__lg ml-xl"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
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
            <select className="btn btn__dark btn__lg ml-xl" value={filter} onChange={(event) => setFilter(event.target.value)}>
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
