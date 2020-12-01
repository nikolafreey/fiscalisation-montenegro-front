import React from 'react';

const PartneriDetails = ({ partner={} }) => {
  return (
    <div>
      <p>{partner.kontakt_ime}</p>
      <p>{partner.kontakt_prezime}</p>
      <p>{partner.kontakt_telefon}</p>
      {/* <p>{parner.ib}</p>
      <p>{parner.adresa}</p>
      <p>{parner.telefon}</p>
      <p>{parner.email}</p>
      <p>{parner.zanimanje}</p>
      <p>{parner.radno_mjesto}</p>
      <p>{parner.drzavljanstvo}</p>
      <p>{parner.nacionalnost}</p>
      <p>{parner.cv_link}</p>
      <p>{parner.avatar}</p>
      <p>{parner.preduzece_id}</p> */}
    </div>
  );
};

export default PartneriDetails;
