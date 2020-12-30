export function formatirajCijenu(cijena) {
  return cijena ? Number(cijena).toFixed(2).replace('.', ',') + ' €' : '0 €'
}

export function roundUp(cijena) {
  let cijenaInt = Math.ceil(cijena);
  const stepenDesetke = Math.pow(10, cijenaInt.toString().length - 1);
  cijenaInt = cijenaInt / stepenDesetke;
  cijenaInt = Math.ceil(cijenaInt);
  cijenaInt = cijenaInt * stepenDesetke;

  return cijenaInt;
}

export function izracunajPojedinacnePoreze(stavke) {
  const porezi = {};

  stavke.forEach((stavka) => {
    if (stavka.roba) izracunajPojedinacnePorezeZaRobu(stavka, porezi);
    else izracunajPojedinacnePorezeZaUslugu(stavka, porezi);
  });

  return porezi;
}

function izracunajPojedinacnePorezeZaUslugu(usluga, porezi) {
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

  porezi[usluga.porez.id].ukupno += usluga.kolicina * usluga.ukupna_cijena;
}

function izracunajPojedinacnePorezeZaRobu(roba, porezi) {
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
}

export function izracunajUkupnuCijenuStavki(stavke) {
  const suma = stavke.reduce((suma, stavka) => {
    if (stavka.roba) return dodajRobuNaSumu(suma, stavka);
    else return dodajUsluguNaSumu(suma, stavka);
  }, 0);
  return suma;
}

function dodajUsluguNaSumu(suma, usluga) {
  if (usluga.grupa?.popust_iznos)
    return (
      suma +
      (usluga.ukupna_cijena - usluga.grupa.popust_iznos) * usluga.kolicina
    );
  return suma + usluga.ukupna_cijena * usluga.kolicina;
}

function dodajRobuNaSumu(suma, roba) {
  if (roba.atribut_robe?.popust_iznos)
    return (
      suma +
      (roba.roba.cijene_roba[0].ukupna_cijena -
        roba.atribut_robe.popust_iznos) *
        roba.kolicina
    );
  return suma + roba.roba.cijene_roba[0].ukupna_cijena * roba.kolicina;
}

export function izracunajUkupnuCijenuStavkiBezPdv(stavke) {
  const suma = stavke.reduce((suma, stavka) => {
    if (stavka.roba) return dodajRobuNaSumuBezPdv(suma, stavka);
    else return dodajUsluguNaSumuBezPdv(suma, stavka);
  }, 0);
  return suma;
}

function dodajUsluguNaSumuBezPdv(suma, usluga) {
  if (usluga.grupa?.popust_iznos)
    return (
      suma +
      (usluga.cijena_bez_pdv - usluga.grupa.popust_iznos) * usluga.kolicina
    );
  return suma + usluga.cijena_bez_pdv * usluga.kolicina;
}

function dodajRobuNaSumuBezPdv(suma, roba) {
  if (roba.atribut_robe?.popust_iznos)
    return (
      suma +
      (roba.roba.cijene_roba[0].cijena_bez_pdv -
        roba.atribut_robe.popust_iznos) *
        roba.kolicina
    );
  return suma + roba.roba.cijene_roba[0].cijena_bez_pdv * roba.kolicina;
}
