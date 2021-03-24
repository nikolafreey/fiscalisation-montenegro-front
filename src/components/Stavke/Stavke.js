import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  odabraniAtributGrupaSelector,
  stavkeRobeSelector,
  stavkeUslugeSelector,
} from '../../store/selectors/RacuniSelector';
import { getStavke } from '../../store/actions/RacuniActions';
import StavkeTable from './StavkeTable';

import { ReactComponent as ButtonPlusSvg } from '../../assets/icon/button-plus.svg';
import { Link } from 'react-router-dom';
import { USLUGE, STAVKE } from '../../constants/routes';
import { debounce } from 'lodash';
import NoviRacunFilteri from '../Racuni/NoviRacun/NoviRacunFilteri';

let filteri = {};
const searchDebounced = debounce((callback) => callback(), 500);

const Stavke = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(null);

  const robe = useSelector(stavkeRobeSelector());
  const usluge = useSelector(stavkeUslugeSelector());
  const odabraniAtributGrupa = useSelector(odabraniAtributGrupaSelector());

  // let robeAtributi = robe && robe.data.map((roba) => roba.atribut_robe.naziv);
  // const robeAtributiSet = new Set(robeAtributi);
  let robeAtributi = Array.from(
    new Set(robe && robe?.data.map((roba) => roba?.atribut_robe?.naziv))
  ).map((naziv) => {
    return robe?.data.find((a) => a?.atribut_robe?.naziv === naziv);
  });
  console.log('robeAtributi', robeAtributi);

  let uslugaGrupe = Array.from(
    new Set(usluge && usluge.data.map((usluga) => usluga.grupa.naziv))
  ).map((naziv) => {
    return usluge?.data?.find((u) => u.grupa.naziv === naziv);
  });
  console.log('uslugaGrupe', uslugaGrupe);

  // let uslugaGrupe = usluge && usluge.data.map((usluga) => usluga.grupa.naziv);
  // const uslugaGrupeSet = new Set(uslugaGrupe);
  // uslugaGrupe = Array.from(uslugaGrupeSet);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getStavke());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!odabraniAtributGrupa) {
  //     filteri.grupa_id = undefined;
  //     filteri.tip_atributa_id = undefined;
  //   }
  //   if (odabraniAtributGrupa?.tip_atributa_id) {
  //     filteri.grupa_id = undefined;
  //     filteri.tip_atributa_id = odabraniAtributGrupa.tip_atributa_id;
  //   }
  //   if (odabraniAtributGrupa?.grupa_id) {
  //     filteri.tip_atributa_id = undefined;
  //     filteri.grupa_id = odabraniAtributGrupa.grupa_id;
  //   }
  //   dispatch(getStavke(filteri));
  // }, [odabraniAtributGrupa]);

  const resetFilters = () => {
    filteri = {};
    handleSearch(filteri);
  };

  const handleAtributChange = (event) => {
    console.log('event', event);
    filteri.atribut_id = event;
    handleSearch(filteri);
  };

  const handleGrupaChange = (event) => {
    console.log('event', event);
    filteri.grupa_id = event;
    handleSearch(filteri);
  };

  const handleSearch = () => {
    dispatch(getStavke(filteri));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== '') filteri.search = event.target.value;
    else filteri.search = undefined;
    searchDebounced(() => handleSearch(event.target.value));
  };

  const getFiltered = () => {
    // dispatch(getPartneri(filters));
  };

  return (
    <>
      <div className="title jc-sb">
        <h1 className="heading-primary">Stavke</h1>
        <div className="df w-50 jc-end">
          <button className="btn btn__primary">
            <ButtonPlusSvg />
            Nova stavka
            <div className="drop-down" id="ddl">
              <Link to={STAVKE.CREATE_USLUGE}>
                {/* <PreduzeceSvg /> */}
                Nova usluga
              </Link>
              <Link to={STAVKE.CREATE_ROBE}>
                {/* <UserSvg /> */}
                Nova roba
              </Link>
            </div>
          </button>
        </div>
      </div>
      <div className="main-content__box">
        <div className="content" style={{ width: '100%' }}>
          <div className="main-content__search-wrapper df">
            <div className="df jc-sb w-100 mob-fd-column">
              <form className="search df ai-c mob-w-100">
                <button className="search__button" type="submit"></button>
                <input
                  name="search"
                  placeholder="Pretraži Usluge"
                  className="search__input"
                  value={search}
                  onChange={handleChange}
                />
              </form>
              <select
                className="btn btn__primary btn__lg ml-xl"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option value={'sve'}>Sve</option>
                <option value={'usluge'}>Usluge</option>
                <option value={'robe'}>Robe</option>
              </select>
            </div>
            {/* </div> */}

            {/* <NoviRacunFilteri /> */}
            <div className="filter">
              <div
                onClick={() => resetFilters()}
                className={
                  'filter__tab' + (!odabraniAtributGrupa ? ' active' : '')
                }
              >
                Sve
              </div>
              {robeAtributi.map((robeKat) => (
                <div
                  onClick={() => handleAtributChange(robeKat?.atribut_robe?.id)}
                  className={
                    'filter__tab' + (!odabraniAtributGrupa ? ' active' : '')
                  }
                >
                  {robeKat?.atribut_robe?.naziv}
                </div>
              ))}
              {uslugaGrupe.map((uslugaGrupa) => (
                <div
                  onClick={() => handleGrupaChange(uslugaGrupa?.grupa?.id)}
                  className={
                    'filter__tab' + (!odabraniAtributGrupa ? ' active' : '')
                  }
                >
                  {uslugaGrupa?.grupa?.naziv}
                </div>
              ))}
            </div>
          </div>
          <div>
            <StavkeTable robe={robe} usluge={usluge} filter={filter} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stavke;
