import React from 'react';

const UslugaDetails = ({ usluga }) => {
  return (
    <div>
      <p>{usluga.naziv}</p>
      <p>{usluga.opis}</p>
      <p>{Number(usluga.cijena_bez_pdv).toFixed(2).replace('.', ',') + '€'}</p>
      <p>{Number(usluga.pdv_iznos).toFixed(2).replace('.', ',') + '€'}</p>
      <p>{Number(usluga.ukupna_cijena).toFixed(2).replace('.', ',') + '€'}</p>
      <p>{usluga.status}</p>
    </div>
  );
};

export default UslugaDetails;
