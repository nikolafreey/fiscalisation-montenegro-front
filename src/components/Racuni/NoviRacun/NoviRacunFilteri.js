import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAtributiGrupe,
  setOdabraniAtributGrupa,
} from '../../../store/actions/RacuniActions';
import {
  atributiGrupeSelector,
  odabraniAtributGrupaSelector,
} from '../../../store/selectors/RacuniSelector';

const NoviRacunFilteri = () => {
  const dispatch = useDispatch();

  const atributiGrupe = useSelector(atributiGrupeSelector());
  const odabraniAtributGrupa = useSelector(odabraniAtributGrupaSelector());
  console.log('atributiGrupe', atributiGrupe);
  console.log('odabraniAtributGrupa', odabraniAtributGrupa);

  useEffect(() => {
    dispatch(getAtributiGrupe());
  }, []);

  function isSelected(atributGrupa) {
    if (!odabraniAtributGrupa) return false;
    if (atributGrupa.tip_atributa_id)
      return (
        atributGrupa.tip_atributa_id === odabraniAtributGrupa.tip_atributa_id
      );
    if (atributGrupa.grupa_id)
      return atributGrupa.grupa_id === odabraniAtributGrupa.grupa_id;
  }

  function handleFilterClick(atributGrupa) {
    dispatch(setOdabraniAtributGrupa(atributGrupa));
  }

  return (
    <div className="filter">
      <div
        className={'filter__tab' + (!odabraniAtributGrupa ? ' active' : '')}
        onClick={() => handleFilterClick(null)}
      >
        Sve
      </div>
      {atributiGrupe.map((atributGrupa) => (
        <div
          key={
            atributGrupa.tip_atributa_id
              ? 'atribut' + atributGrupa.tip_atributa_id
              : 'grupa' + atributGrupa.grupa_id
          }
          className={
            'filter__tab' + (isSelected(atributGrupa) ? ' active' : '')
          }
          onClick={() => handleFilterClick(atributGrupa)}
        >
          {atributGrupa.naziv}
        </div>
      ))}
    </div>
  );
};

export default NoviRacunFilteri;
