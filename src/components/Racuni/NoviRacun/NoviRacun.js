import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as Plus } from '../../../assets/icon/plus.svg';
import SearchForm from '../../shared/forms/SearchForm';
import { stavkeRobeSelector, stavkeUslugeSelector } from '../../../store/selectors/RacuniSelector';
import { getStavke } from '../../../store/actions/RacuniActions';
import NoviRacunTable from './NoviRacunTable';
import NoviRacunPreview from './NoviRacunPreview';

const NoviRacun = () => {
  const dispatch = useDispatch();

  const robe = useSelector(stavkeRobeSelector());
  const usluge = useSelector(stavkeUslugeSelector());

  useEffect(() => {
    dispatch(getStavke());
  }, [dispatch]);

  const handleSearch = (values) => {
    dispatch(getStavke(values));
  };

  return (
    <>
      <h1 class="heading-primary">Kreiranje novog gotovinskog računa</h1>
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__search-wrapper">
            <SearchForm handleSubmit={handleSearch} />
          </div>
          <NoviRacunTable robe={robe} usluge={usluge} />
          <div class="df jc-center ai-c fd-column">
            <hr class="w-60 " />
            <p class="mb-25">
              ili kreirajte novi unos ako preduzeće nije u listi
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
