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

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());
  const partner = useSelector(partnerSelector());

  const [filter, setFilter] = useState(null);

  useEffect(() => {
    (async () => {
      dispatch(getPartneri({ filter: filter === 'sve' ? null : filter }));
    })();
  }, [dispatch, filter]);

  useEffect(() => {
    if (partneri.total > 0) dispatch(setPartner(partneri.data[0]));
  }, [partneri, dispatch]);

  return (
    <>
      <h1 className="heading-primary">Partneri</h1>
      <div className="main-content__box">
        <div className="content">
          <div className="main-content__search-wrapper df">
            <form className="search df ai-c">
              <button className="search__button"></button>
              <input
                type="text"
                className="search__input"
                placeholder="Naziv ili PIB preduzeca"
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
      </div>
    </>
  );
};

export default Partneri;
