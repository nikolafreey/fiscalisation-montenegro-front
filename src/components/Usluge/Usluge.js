import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getUsluge, setUsluga } from '../../store/actions/UslugeActions';
// import {
//   uslugeSelector,
//   uslugaSelector,
// } from '../../store/selectors/UslugeSelector';
import { odabraniAtributGrupaSelector, stavkeRobeSelector, stavkeUslugeSelector } from '../../store/selectors/RacuniSelector';
import { getStavke } from '../../store/actions/RacuniActions';
import UslugeTable from './UslugeTable';
// import UslugaDetails from './UslugaDetails';

import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';
import { Link } from 'react-router-dom';
import { USLUGE } from '../../constants/routes';
import { debounce } from 'lodash';
import NoviRacunFilteri from '../Racuni/NoviRacun/NoviRacunFilteri';

const filteri = {}
const searchDebounced = debounce((callback) => callback(), 500);

const Usluge = () => {
  const dispatch = useDispatch();

  const robe = useSelector(stavkeRobeSelector());
  const usluge = useSelector(stavkeUslugeSelector());
  const odabraniAtributGrupa = useSelector(odabraniAtributGrupaSelector());

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getStavke());
  }, []);

  useEffect(() => {
    if (!odabraniAtributGrupa) {
      filteri.grupa_id = undefined;
      filteri.tip_atributa_id = undefined;
    }
    if (odabraniAtributGrupa?.tip_atributa_id) {
      filteri.grupa_id = undefined;
      filteri.tip_atributa_id = odabraniAtributGrupa.tip_atributa_id;
    }
    if (odabraniAtributGrupa?.grupa_id) {
      filteri.tip_atributa_id = undefined;
      filteri.grupa_id = odabraniAtributGrupa.grupa_id;
    }
    dispatch(getStavke(filteri));
  }, [odabraniAtributGrupa]);


  const handleSearch = () => {
    dispatch(getStavke(filteri));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') filteri.search = event.target.value;
    else filteri.search = undefined;
    searchDebounced(() => handleSearch(event.target.value));
  }

  return (
    <>
      <div className="title">
        <h1 className="heading-primary">Stavke</h1>

        <div className="df w-50 jc-end">

          <Link exact={`${true}`} to={USLUGE.CREATE}>
            <button
              className="btn btn__dark btn__xl"
              style={{ width: '22rem' }}
            >
              <ButtonPlusSvg />
              Nova stavka
            </button>
          </Link>
        </div>
      </div>
      <div className="main-content__box">
        <div className="content" style={{ width: '100%' }}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100">
              <div className="search df ai-c w-53">
                <form className="search">
                  <button className="search__button" type="submit"></button>
                  <input
                    name="search"
                    placeholder="Pretraži Usluga"
                    className="search__input"
                    value={search}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>

            <NoviRacunFilteri />
          </div>
          <div>
            <UslugeTable robe={robe} usluge={usluge} />
            {/* <UslugaDetails usluga={usluga} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Usluge;
