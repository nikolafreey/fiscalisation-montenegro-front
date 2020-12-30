import { useFormikContext } from 'formik';
import React from 'react';
import { formatirajCijenu, izracunajPojedinacnePoreze } from '../../../helpers/racuni';

const BezgotovinskiPorezi = () => {
  const { values } = useFormikContext();

  const porezi = values.stavke ? izracunajPojedinacnePoreze(values.stavke) : {};
  //console.log(porezi);

  return (
    <>
      <h2 class="heading-secondary">Porez pojedinačno</h2>
      <div class="main-content__box">
        <div class="content">
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th class="w-33">
                    <span class="heading-quaternary">PDV stopa</span>
                  </th>
                  <th class="w-33">
                    <span class="heading-quaternary">osnovica</span>
                  </th>
                  <th class="w-33">
                    <span class="heading-quaternary">iznos poreza</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(porezi).map(porezId => {
                  const porez = porezi[porezId];

                  return (
                    <tr>
                      <td class="w-33">{porez.naziv}</td>
                      <td class="w-33">{ formatirajCijenu(porez.ukupno - porez.pdvIznos) }</td>
                      <td class="txt-right w-33">
                        {formatirajCijenu(porez.pdvIznos)} <span class="txt-light"></span>
                      </td>
                    </tr>
                  )
                })
                }
        
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiPorezi;
