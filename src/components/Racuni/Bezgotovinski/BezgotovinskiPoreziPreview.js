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
console.log('porezi u html',props)
  return (
    <>
    
      <div className="main-content__box" style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div className="content">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-33">
                    <span className="heading-quaternary">PDV stopa </span>
                  </th>
                  <th className="w-33">
                    <span className="heading-quaternary">Osnovica za PDV</span>
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
                      <td className="w-33">{porezId === '1'?'Oslobogen PDV-a':porezId ==='2'?'0%':porezId ==='3'?'7%':'21%'}</td>
                      <td className="w-33">{formatirajCijenu(porez.pdvUkupnoUkupno)}</td>
                      <td className="txt-right w-33">
                        {formatirajCijenu(porez.pdvIznosUkupno)}{' '}
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

export default BezgotovinskiPoreziPreview;
