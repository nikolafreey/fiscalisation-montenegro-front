import React from 'react';

const UslugaDetails = ({ usluga }) => {
  return (
    <div>
      <p>{usluga.naziv}</p>
      <p>{usluga.opis}</p>
      <p>{usluga.cijena_bez_pdv}</p>
      <p>{usluga.pdv_iznos}</p>
      <p>{usluga.ukupna_cijena}</p>
      <p>{usluga.status}</p>
    </div>
  );
};

export default UslugaDetails;
