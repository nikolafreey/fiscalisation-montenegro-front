import React from 'react';
import { izracunajPojedinacnePoreze } from '../../../helpers/racuni';

const NoviRacunPreviewPorezi = ({ noviRacun }) => {
  
  const usluge = Object.keys(noviRacun.usluge).map(id => noviRacun.usluge[id]);
  const robe = Object.keys(noviRacun.robe).map(id => noviRacun.robe[id]);

  const porezi = izracunajPojedinacnePoreze([...usluge, ...robe]);
  console.log('porezi',porezi)

  return (
    <div className="row mb-15">
      {Object.keys(porezi).map((porezId) => (
        <>
          <div className="col-lg-8">
            <p>Ukupno za {porezi[porezId].naziv}</p>
          </div>
          <div className="col-lg-4">
            <p className="txt-right">
              {porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
            </p>
          </div>
          <div className="col-lg-8">
            <p>{porezi[porezId].naziv}</p>
          </div>
          <div className="col-lg-4">
            <p className="txt-right">
              {porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') + '€'}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default NoviRacunPreviewPorezi;
