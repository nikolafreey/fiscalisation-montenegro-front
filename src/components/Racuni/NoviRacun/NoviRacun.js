import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { odabraniAtributGrupaSelector, stavkeRobeSelector, stavkeUslugeSelector } from '../../../store/selectors/RacuniSelector';
import { getStavke } from '../../../store/actions/RacuniActions';
import NoviRacunTable from './NoviRacunTable';
import NoviRacunPreview from './NoviRacunPreview';
import { LIST } from '../../../constants/layout';
import ChooseView from '../../shared/lists/ChooseView';
import NoviRacunFilteri from './NoviRacunFilteri';
import { debounce } from 'lodash';

const filteri = {}

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
    if(!odabraniAtributGrupa) {
      filteri.grupa_id = undefined;
      filteri.tip_atributa_id = undefined;
    }
    if(odabraniAtributGrupa?.tip_atributa_id) {
      filteri.grupa_id = undefined;
      filteri.tip_atributa_id = odabraniAtributGrupa.tip_atributa_id;
    }
    if(odabraniAtributGrupa?.grupa_id) {
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
      <h1 class="heading-primary">Kreiranje novog gotovinskog računa</h1>
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__search-wrapper">
            <form className="search">
              <button className="search__button" type="submit"></button>
              <input
                name="search"
                placeholder="Naziv ili PIB preduzeca"
                class="search__input"
                value={search}
                onChange={handleChange}
              />
            </form>
            <NoviRacunFilteri />
            <ChooseView view={view} setView={setView}/>
          </div>
          <NoviRacunTable view={view} robe={robe} usluge={usluge} />
          <div class="df jc-center ai-c fd-column">
            <hr class="w-60 " />
            <p class="mb-25">
              ili kreirajte novi unos ako usluga/roba nije u listi
            </p>
            {/*<Link exact to={PREDUZECA.CREATE}>
              <button class="btn btn__dark btn__xl">
                <Plus className="icon icon__light lg" />
                Novo preduzeće
              </button>
  </Link>*/}
          </div>
        </div>
        <NoviRacunPreview/>
      </div>
    </>
  );
};

export default NoviRacun;
