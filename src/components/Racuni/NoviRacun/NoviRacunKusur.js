import React, { useEffect, useState } from 'react';
import { roundUp } from '../../../helpers/racuni';

const NoviRacunKusur = ({ ukupnaCijena }) => {
  const [gotovina, setGotovina] = useState(roundUp(ukupnaCijena));

  const kusur = gotovina - ukupnaCijena;

  useEffect(() => {
    setGotovina(roundUp(ukupnaCijena));
  }, [ukupnaCijena]);

  return (
    <div>
      <input
        placeholder="gotovina"
        value={gotovina}
        onChange={(event) => setGotovina(event.target.value)}
      />
      <span>Kusur: </span>
      <span>{kusur > 0 ? kusur.toFixed(2).replace('.', ',') : ''}</span>
    </div>
  );
};

export default NoviRacunKusur;
