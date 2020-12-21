import React, { useEffect, useState } from 'react'

function roundUp(cijena){
  let cijenaInt = Math.ceil(cijena)
  const stepenDesetke = Math.pow(10, cijenaInt.toString().length-1);
  cijenaInt = (cijenaInt/stepenDesetke);
  cijenaInt = Math.ceil(cijenaInt);
  cijenaInt = cijenaInt*stepenDesetke;

  return cijenaInt;
}

const NoviRacunKusur = ({ukupnaCijena}) => {
  
  const [gotovina, setGotovina] = useState(roundUp(ukupnaCijena));

  const kusur = gotovina - ukupnaCijena;
  
  useEffect(() => {
    setGotovina(roundUp(ukupnaCijena))
  }, [ukupnaCijena])
  
  return (
    <div>
      <input placeholder='gotovina' value={gotovina} onChange={(event) => setGotovina(event.target.value)}/>
      <span>Kusur: </span>
      <span>{kusur > 0 ? kusur.toFixed(2) : ''}</span>
    </div>
  )
}

export default NoviRacunKusur
