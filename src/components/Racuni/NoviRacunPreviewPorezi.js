import React from 'react';

const NoviRacunPreviewPorezi = ({ noviRacun }) => {
  const getPorezi = () => {
    const porezi = {};

    Object.keys(noviRacun.usluge).forEach((usluga) => {
      if (!porezi[usluga.porez.id]) {
        porezi[usluga.porez.id] = {
          ukupno: 0,
          stopa: usluga.porez.stopa,
          naziv: usluga.porez.naziv,
        };
      }
      porezi[usluga.porez.id].pdvIznos +=
        usluga.ukupna_cijena - usluga.cijena_bez_pdv;

      porezi[usluga.porez.id].ukupno += usluga.ukupna_cijena;
    });

    Object.keys(noviRacun.robe).forEach((roba) => {
      const porezRobe = roba.cijena.porez;

      if (!porezi[porezRobe.id]) {
        porezi[porezRobe.id] = {
          ukupno: 0,
          stopa: porezRobe.stopa,
          naziv: porezRobe.naziv,
        };
      }
      porezi[porezRobe.id].pdvIznos += roba.ukupna_cijena - roba.cijena_bez_pdv;

      porezi[porezRobe.id].ukupno += roba.ukupna_cijena;
    });

    return porezi;
  };

  const porezi = getPorezi();

  return (
    <div classname="row mb-15">
      {Object.keys(porezi).map((porezId) => (
        <>
          <div classname="col-lg-8">
            <p>Ukupno za {porezi[porezId]}</p>
          </div>
          <div classname="col-lg-4">
            <p classname="txt-right">{porezi[porezId].ukupno}</p>
          </div>
          <div classname="col-lg-8">
            <p>{porezi[porezId].naziv}</p>
          </div>
          <div classname="col-lg-4">
            <p classname="txt-right">{porezi[porezId].pdvIznos}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default NoviRacunPreviewPorezi;
