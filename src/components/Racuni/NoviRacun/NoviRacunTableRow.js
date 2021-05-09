import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setKolicinaRobe,
  setKolicinaUsluge,
} from '../../../store/actions/RacuniActions';
import {
  noviRacunRobaSelector,
  noviRacunSelector,
  noviRacunUslugaSelector,
} from '../../../store/selectors/RacuniSelector';
import KolicinaStavke from './KolicinaStavke';

const NoviRacunTableRow = ({ usluga = {}, roba = {} }) => {
  // console.log('roba',roba)
  const stavka = useSelector(
    usluga?.id
      ? noviRacunUslugaSelector(usluga?.id)
      : noviRacunRobaSelector(roba.id)
  ) || { kolicina: 0 };
  const noviRacun = useSelector(noviRacunSelector());

  const dispatch = useDispatch();

  const handleClick = () => {
    if (stavka.kolicina > 0) return;
    if (usluga?.id) {
      dispatch(setKolicinaUsluge(usluga, stavka.kolicina + 1));
    }
    if (roba.id) {
      dispatch(setKolicinaRobe(roba, stavka.kolicina + 1));
    }
  };

  return (
    <tr onClick={handleClick} className={stavka.kolicina ? 'active' : ''}>
      <td>
        <p>{usluga?.naziv || roba.roba.naziv}</p>
        <h3 className="heading-quaternary">
          {usluga?.opis?.length > 50
            ? usluga?.opis.substring(1, 50)
            : usluga?.opis || roba?.roba?.opis}
        </h3>
      </td>
      <td className="cl">
        {usluga?.jedinica_mjere?.naziv || roba.roba.jedinica_mjere?.naziv}
      </td>
      <td className="cd fw-500 txt-right mob-txt-left">
        <p>
          {usluga?.ukupna_cijena ||
            Number(roba.roba.cijene_roba[0]?.ukupna_cijena)
              ?.toFixed(2)
              .replace('.', ',') + '€'}
        </p>
      </td>
      <td>
        <KolicinaStavke usluga={usluga} roba={roba} stavka={stavka} />
      </td>
    </tr>
  );
};

export default NoviRacunTableRow;
