import React from 'react';
import { izracunajPojedinacnePoreze } from '../../../helpers/racuni';

const NoviRacunPreviewPorezi = ({ noviRacun }) => {
  
  const usluge = Object.keys(noviRacun.usluge).map(id => noviRacun.usluge[id]);
  const robe = Object.keys(noviRacun.robe).map(id => noviRacun.robe[id]);

  const porezi = izracunajPojedinacnePoreze([...usluge, ...robe]);

  return (
    <div classname="row mb-15">
      {Object.keys(porezi).map((porezId) => (
        <>
          <div classname="col-lg-8">
            <p>Ukupno za {porezi[porezId].naziv}</p>
          </div>
          <div classname="col-lg-4">
            <p classname="txt-right">
              {porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
            </p>
          </div>
          <div classname="col-lg-8">
            <p>{porezi[porezId].naziv}</p>
          </div>
          <div classname="col-lg-4">
            <p classname="txt-right">
              {porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') + '€'}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default NoviRacunPreviewPorezi;
