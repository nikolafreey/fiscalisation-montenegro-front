import React from 'react';

const PreduzeceDetails = ({ preduzece }) => {
  return (
    <div>
      <p>{preduzece.kratki_naziv}</p>
      <p>{preduzece.puni_naziv}</p>
      <p>{preduzece.oblik_preduzeca}</p>
      <p>{preduzece.adresa}</p>
      <p>{preduzece.grad}</p>
      <p>{preduzece.drzava}</p>
      <p>{preduzece.telefon}</p>
      <p>{preduzece.telfon_viber}</p>
      <p>{preduzece.telfon_whatsapp}</p>
      <p>{preduzece.telfon_facetime}</p>
      <p>{preduzece.fax}</p>
      <p>{preduzece.email}</p>
      <p>{preduzece.website}</p>
      <p>{preduzece.pib}</p>
      <p>{preduzece.pdv}</p>
      <p>{preduzece.djelatnost}</p>
      <p>{preduzece.iban}</p>
      <p>{preduzece.bic_swift}</p>
      <p>{preduzece.kontakt_ime}</p>
      <p>{preduzece.kontakt_prezime}</p>
      <p>{preduzece.kontakt_telefon}</p>
      <p>{preduzece.kontakt_viber}</p>
      <p>{preduzece.kontakt_whatsapp}</p>
      <p>{preduzece.kontakt_facetime}</p>
      <p>{preduzece.kontakt_email}</p>
      <p>{preduzece.twitter_username}</p>
      <p>{preduzece.instagram_username}</p>
      <p>{preduzece.facebook_username}</p>
      <p>{preduzece.skype_username}</p>
      <p>{preduzece.logotip}</p>
      <p>{preduzece.opis}</p>
      <p>{preduzece.lokacija_lat}</p>
      <p>{preduzece.lokacija_long}</p>
      <p>{preduzece.status}</p>
      <p>{preduzece.privatnost}</p>
      <p>{preduzece.verifikovan}</p>
      <p>{preduzece.kategorija_id}</p>
    </div>
  );
};

export default PreduzeceDetails;
