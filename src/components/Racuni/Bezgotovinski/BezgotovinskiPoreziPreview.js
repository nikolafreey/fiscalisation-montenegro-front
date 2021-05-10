import { useFormikContext } from 'formik';
import React from 'react';
import {
  formatirajCijenu,
  izracunajPojedinacnePoreze,
  izracunajPojedinacnePorezeStavkeBezgotovinski,
} from '../../../helpers/racuni';

const BezgotovinskiPoreziPreview = (props) => {
  //const stavke=Object.assign({},props.stavke);
  const porezi = props.stavke
    ? izracunajPojedinacnePorezeStavkeBezgotovinski(props.stavke)
    : {};
  console.log('porezi u html', props);
  return (
    <>
      <thead>
        <tr>
          <th className="w-33">
            <p className="heading-quaternary mb-0 nowrap">PDV stopa </p>
          </th>
          <th className="w-33">
            <p className="heading-quaternary mb-0 nowrap">Osnovica za PDV</p>
          </th>
          <th className="w-33">
            <p className="heading-quaternary mb-0 nowrap">iznos poreza</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(porezi).map((porezId) => {
          const porez = porezi[porezId];

          return (
            <tr>
              <td className="w-33">
                {porezId === '1'
                  ? 'Oslobođen PDV-a'
                  : porezId === '2'
                  ? '0%'
                  : porezId === '3'
                  ? '7%'
                  : '21%'}
              </td>
              <td className="w-33">
                {formatirajCijenu(porez.pdvUkupnoUkupno)}
              </td>
              <td className="txt-right w-33">
                {formatirajCijenu(porez.pdvIznosUkupno)}{' '}
                <span className="txt-light"></span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default BezgotovinskiPoreziPreview;
