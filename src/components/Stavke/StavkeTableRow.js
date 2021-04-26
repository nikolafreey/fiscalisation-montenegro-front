import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUsluge, deleteUsluga } from '../../store/actions/UslugeActions';
import { deleteRoba } from '../../store/actions/RobeActions';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';
import { getRobe } from '../../store/actions/RobeActions';
import { getStavke, ukloniRobu } from '../../store/actions/RacuniActions';

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
    dispatch(getStavke());
  };

  const handleObrisiRoba = (id) => {
    dispatch(deleteRoba(id));
    dispatch(getStavke());
  };

  return (
    <>
      <tr isHidden>
        <td>
          <p>
            {(usluga && usluga?.naziv) ||
              (roba && roba.roba && roba?.roba?.naziv)}
          </p>
          {Object.keys(usluga).length === 0 ? (
            <h3 className="heading-quaternary">
              {(roba && roba.roba && roba?.roba?.proizvodjac_robe?.naziv) +
                ', ' +
                (roba && roba.roba && roba?.atribut_robe?.tip_atributa?.naziv) +
                ', ' +
                (roba && roba.roba && roba?.atribut_robe?.naziv)}
            </h3>
          ) : (
            <h3 className="heading-quaternary">
              {usluga && usluga?.opis?.split('.')[0]}
            </h3>
          )}
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
            <button className="btn btn__light-dd btn__xs">
              <IconLg />
              <div className="drop-down">
                <a onClick={handleIzmjeni}>
                  <Izmjeni />
                  Izmjeni
                </a>
                <a
                  onClick={
                    usluga?.id
                      ? () => handleObrisi(usluga?.id)
                      : () => handleObrisiRoba(roba?.roba?.id)
                  }
                >
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
