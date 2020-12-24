import React from 'react';

const NoviRacunPreviewPorezi = ({ noviRacun }) => {
  const getPorezi = () => {
    const porezi = {};

    console.log('noviRacun', noviRacun);

    Object.keys(noviRacun.usluge).forEach((uslugaId) => {
      const usluga = noviRacun.usluge[uslugaId];
      
      if (!porezi[usluga.porez.id]) {
        porezi[usluga.porez.id] = {
          ukupno: 0,
          pdvIznos: 0,
          stopa: usluga.porez.stopa,
          naziv: usluga.porez.naziv,
        };
      }

      porezi[usluga.porez.id].pdvIznos +=
        usluga.kolicina * (usluga.ukupna_cijena - usluga.cijena_bez_pdv);

      console.log('uslugaa', porezi[usluga.porez.id]);

      porezi[usluga.porez.id].ukupno += usluga.kolicina * usluga.ukupna_cijena;
    });

    Object.keys(noviRacun.robe).forEach((robaId) => {
      const roba = noviRacun.robe[robaId];

      const porezRobe = roba.roba.cijene_roba[0].porez;

      if (!porezi[porezRobe.id]) {
        porezi[porezRobe.id] = {
          ukupno: 0,
          pdvIznos: 0,
          stopa: porezRobe.stopa,
          naziv: porezRobe.naziv,
        };
      }
      porezi[porezRobe.id].pdvIznos +=
        roba.kolicina *
        (Number(roba.roba.cijene_roba[0].ukupna_cijena) -
          Number(roba.roba.cijene_roba[0].cijena_bez_pdv));

      porezi[porezRobe.id].ukupno +=
        roba.kolicina * Number(roba.roba.cijene_roba[0].ukupna_cijena);
    });

    return porezi;
  };

  const porezi = getPorezi();

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
