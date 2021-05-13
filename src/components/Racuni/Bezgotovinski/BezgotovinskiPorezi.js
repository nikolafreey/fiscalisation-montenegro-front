import { useFormikContext } from 'formik';
import React from 'react';
import {
  formatirajCijenu,
  izracunajPojedinacnePoreze,
  izracunajPojedinacnePorezeStavkeBezgotovinski,
} from '../../../helpers/racuni';

const BezgotovinskiPorezi = () => {
  const { values } = useFormikContext();
  const porezi = values.stavke
    ? izracunajPojedinacnePoreze(values.stavke)
    : {};

  return (
    <>
      <h2 className="heading-secondary">Porez pojedinačno</h2>
      <div className="main-content__box">
        <div className="content">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <span className="heading-quaternary">PDV stopa</span>
                  </th>
                  <th className="w-33">
                    <span className="heading-quaternary">Ukupno za PDV</span>
                  </th>
                  <th className="w-33">
                    <span className="heading-quaternary">iznos poreza</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(porezi).map((porezId) => {
                  const porez = porezi[porezId];

                  return (
                    <tr>
                      <td className="w-33">{porez.naziv}</td>
                      <td className="w-33">{formatirajCijenu(porez.ukupno)}</td>
                      <td className="txt-right mob-txt-left w-33">
                        {formatirajCijenu(porez.pdvIznos)}{' '}
                        <span className="txt-light"></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiPorezi;
