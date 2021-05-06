import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  odabraniAtributGrupaSelector,
  stavkeRobeSelector,
  stavkeUslugeSelector,
} from '../../../store/selectors/RacuniSelector';
import { getStavke } from '../../../store/actions/RacuniActions';
import NoviRacunTable from './NoviRacunTable';
import NoviRacunPreview from './NoviRacunPreview';
import { LIST } from '../../../constants/layout';
import ChooseView from '../../shared/lists/ChooseView';
import NoviRacunFilteri from './NoviRacunFilteri';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { RACUNI, USLUGE } from '../../../constants/routes';
import { ReactComponent as Plus } from '../../../assets/icon/plus.svg';
import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';

import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';
import {
  spinnerStyleGrid,
  spinnerStyleFilter,
} from '../../../constants/spinner';
import { setUsluga } from '../../../store/actions/UslugeActions';

const filteri = {};

const searchDebounced = debounce((callback) => callback(), 500);

const NoviRacun = () => {
  const dispatch = useDispatch();

  const [view, setView] = useState(LIST);
  const [search, setSearch] = useState('');

  const robe = useSelector(stavkeRobeSelector());
  const usluge = useSelector(stavkeUslugeSelector());
  const odabraniAtributGrupa = useSelector(odabraniAtributGrupaSelector());

  useEffect(() => {
    dispatch(getStavke());
  }, [dispatch]);

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
  };

  return (
    <>
      <Link to={RACUNI.INDEX} className="back-link df">
        <LinkSvg /> <p>Povratak na Račune</p>
      </Link>
      <h1 className="heading-primary">Kreiranje novog gotovinskog računa</h1>
      <div className="screen-content-info">
        <div className="main-content__box">
          <div className="content">
            <div className="main-content__search-wrapper">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="search df ai-c mob-w-100"
              >
                <button className="search__button" type="button"></button>
                <input
                  name="search"
                  placeholder="Naziv Usluge/Robe"
                  className="search__input"
                  value={search}
                  onChange={handleChange}
                />
              </form>
              <NoviRacunFilteri />
              <ChooseView view={view} setView={setView} />
            </div>
            {robe.data.length === 0 && usluge.data.length === 0 ? (
              <GridLoader css={spinnerStyleGrid} size={15} />
            ) : (
              <NoviRacunTable view={view} robe={robe} usluge={usluge} />
            )}
            <div className="df jc-center ai-c fd-column">
              <hr className="w-60 " />
              <p className="mb-25 p-margin">
                ili kreirajte novi unos ako usluga/roba nije u listi
              </p>
              {/*<Link exact to={PREDUZECA.CREATE}>
              <button className="btn btn__primary btn__xl">
                <Plus className="icon icon__light lg" />
                Novo preduzeće
              </button>
  </Link>*/}

              <Link exact to={USLUGE.CREATE}>
                <button
                  onClick={() => dispatch(setUsluga({}))}
                  className="btn btn__primary mb-25"
                >
                  <Plus className="icon icon__light lg" />
                  Nova Stavka
                </button>
              </Link>
            </div>
          </div>
          <NoviRacunPreview />
        </div>
      </div>
    </>
  );
};

export default NoviRacun;
