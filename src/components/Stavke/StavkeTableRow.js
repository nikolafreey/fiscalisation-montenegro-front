import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUsluge, deleteUsluga } from '../../store/actions/UslugeActions';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';

const StavkeTableRow = ({ usluga = {}, roba = {} }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleIzmjeni = () => {
    usluga && usluga.id
      ? history.push(`/stavke/usluge/edit/${usluga?.id}`)
      : history.push(`/stavke/robe/edit/${roba?.id}`);
  };

  const handleObrisi = (id) => {
    dispatch(deleteUsluga(id));
    dispatch(getUsluge());
  };

  return (
    <>
      <tr>
        <td>
          <p>
            {(usluga && usluga?.naziv) ||
              (roba && roba.roba && roba?.roba?.naziv)}
          </p>
          <h3 className="heading-quaternary">
            {(usluga && usluga?.opis?.split('.')[0]) ||
              (roba && roba.roba && roba?.roba?.proizvodjac_robe?.naziv) +
                ', ' +
                (roba && roba.roba && roba?.atribut_robe?.tip_atributa?.naziv) +
                ', ' +
                (roba && roba.roba && roba?.atribut_robe?.naziv)}
          </h3>
        </td>
        <td className="cl">
          {(usluga && usluga?.jedinica_mjere?.naziv) ||
            (roba && roba.roba && roba?.roba?.jedinica_mjere?.naziv)}
        </td>
        <td className="cl">
          {(usluga && usluga?.grupa?.naziv) ||
            (roba &&
              roba.roba &&
              roba?.roba?.robe_kategorije_podkategorije.length !== 0 &&
              roba?.roba?.robe_kategorije_podkategorije
                ?.map(
                  (tmp) =>
                    ' ' +
                    tmp?.kategorije_roba?.naziv +
                    ' - ' +
                    tmp?.podkategorije_roba?.naziv
                )
                .join())}
        </td>
        <td className="cd fw-500 txt-right">
          <p>
            {(usluga &&
              usluga?.ukupna_cijena &&
              Number(usluga?.ukupna_cijena)?.toFixed(2).replace('.', ',') +
                '€') ||
              (roba &&
                roba.roba &&
                Number(roba?.roba?.cijene_roba[0]?.ukupna_cijena)
                  ?.toFixed(2)
                  .replace('.', ',') + '€')}
          </p>
        </td>
        <td>
          <div className="df jc-end ai-c">
            <button className="btn btn__light btn__xs">
              <IconLg />
              <div className="drop-down">
                <a onClick={handleIzmjeni}>
                  <Izmjeni />
                  Izmjeni
                </a>
                <a onClick={() => handleObrisi(usluga?.id || roba?.roba?.id)}>
                  <Obrisi />
                  Obriši
                </a>
              </div>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StavkeTableRow;
