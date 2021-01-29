import { useFormikContext } from 'formik';
import React from 'react';
import {
  formatirajCijenu,
  izracunajPojedinacnePoreze,
} from '../../../helpers/racuni';

const BezgotovinskiPorezi = () => {
  const { values } = useFormikContext();
  const porezi = values.stavke ? izracunajPojedinacnePoreze(values.stavke) : {};
  //console.log(porezi);

  return (
    <>
      <h2 className="heading-secondary">Porez pojedinačno</h2>
      <div className="main-content__box">
        <div className="content">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-33">
                    <span className="heading-quaternary">PDV stopa</span>
                  </th>
                  <th className="w-33">
                    <span className="heading-quaternary">osnovica</span>
                  </th>
                  <th className="w-33">
                    <span className="heading-quaternary">iznos poreza</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(porezi).map((porezId) => {
                  const porez = porezi[porezId];
                  console.log('pprezzz', porez);
                  return (
                    <tr>
                      <td className="w-33">{porez.naziv}</td>
                      <td className="w-33">
                        {formatirajCijenu(porez.ukupno - porez.pdvIznos)}
                      </td>
                      <td className="txt-right w-33">
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
