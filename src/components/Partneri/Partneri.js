import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partneriSelector, partnerSelector } from '../../store/selectors/PartneriSelector';
import { getPartneri, setPartner } from '../../store/actions/PartneriActions';
import PartneriTable from './PartneriTable';
import PreduzeceDetails from '../Preduzeca/PreduzeceDetails';
import FizickoLiceDetails from '../FizickaLica/FizickoLiceDetails';

const Partneri = () => {
  const dispatch = useDispatch();

  const partneri = useSelector(partneriSelector());
  const partner = useSelector(partnerSelector());

  useEffect(() => {
    (async () => {
      dispatch(getPartneri());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (partneri.total > 0) dispatch(setPartner(partneri.data[0]));
  }, [partneri, dispatch]);

  return (
  <>
    <h1 class="heading-primary">Partneri</h1>
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
        <PartneriTable partneri={partneri} />
      </div>
      { partner.preduzece && <PreduzeceDetails preduzece={partner.preduzece}/>}
      { partner.fizicko_lice && <FizickoLiceDetails fizickoLice={partner.fizicko_lice}/>}
    </div>
  </>
  );
};

export default Partneri;
