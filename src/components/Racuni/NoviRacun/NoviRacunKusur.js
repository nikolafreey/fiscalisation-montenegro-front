import React, { useEffect, useState } from 'react';
import { roundUp } from '../../../helpers/racuni';

const NoviRacunKusur = ({ ukupnaCijena }) => {
  const [gotovina, setGotovina] = useState(roundUp(ukupnaCijena));

  const kusur = gotovina - ukupnaCijena;

  useEffect(() => {
    setGotovina(roundUp(ukupnaCijena));
  }, [ukupnaCijena]);

  return (
    <div className="side-info__info--inner-wrapper mb-0">
      <div className="col-l">
        <input
          className="form__input"
          placeholder="gotovina"
          value={gotovina}
          onChange={(event) => setGotovina(event.target.value)}
        />
      </div>
      <div className="col-r">
        <span className="ml-10">Kusur: </span>
        <span className="ml-10">{kusur > 0 ? kusur.toFixed(2).replace('.', ',') : ''}</span>
      </div>
    </div>
  );
};

export default NoviRacunKusur;
