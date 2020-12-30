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
    if (!stavka) return;
    if (stavka.roba) izracunajPojedinacnePorezeZaRobu(stavka, porezi);
    else izracunajPojedinacnePorezeZaUslugu(stavka, porezi);
  });

  return porezi;
}

function izracunajPopust(cijena, popust, tip_popusta) {
  if(!tip_popusta) return cijena;
  if(tip_popusta === 'iznos') return cijena - Number(popust || 0);
  if(tip_popusta === 'procenat') return cijena - Number(popust || 0) * cijena / 100; 
  }

function izracunajPojedinacnePorezeZaUslugu(usluga, porezi) {
  const cijena = izracunajPopust(usluga.cijena_bez_pdv, usluga.popust, usluga.tip_popusta);
  
  if (!porezi[usluga.porez.id]) {
    porezi[usluga.porez.id] = {
      ukupno: 0,
      pdvIznos: 0,
      stopa: usluga.porez.stopa,
      naziv: usluga.porez.naziv,
    };
  }

  porezi[usluga.porez.id].pdvIznos +=
    Number(usluga.kolicina * (usluga.porez.stopa * cijena));

  porezi[usluga.porez.id].ukupno += Number(usluga.kolicina * (Number(cijena) * (1 + Number(usluga.porez.stopa))));
}

function izracunajPojedinacnePorezeZaRobu(roba, porezi) {
  const porezRobe = roba.porez || roba.roba.cijene_roba[0].porez;
  const cijena = izracunajPopust(roba.roba.cijene_roba[0].cijena_bez_pdv, roba.popust, roba.tip_popusta);

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
    (Number(porezRobe.stopa) * Number(cijena));

  porezi[porezRobe.id].ukupno +=
    Number(roba.kolicina) * (Number(cijena) * (1 + Number(porezRobe.stopa)));
}

export function izracunajUkupnuCijenuStavki(stavke) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka.roba) return dodajRobuNaSumu(suma, stavka);
    else return dodajUsluguNaSumu(suma, stavka);
  }, 0);
  return suma;
}

function dodajUsluguNaSumu(suma, usluga) {
  const ukupna_cijena = (1 + Number(usluga.porez.stopa)) * Number(usluga.cijena_bez_pdv);
  
  if (usluga.tip_popusta && usluga.popust) {
    return suma + izracunajPopust(ukupna_cijena, usluga.popust, usluga.tip_popusta) * usluga.kolicina;
  }
  if (usluga.grupa?.popust_iznos)
    return (
      suma +
      (ukupna_cijena - usluga.grupa.popust_iznos) * usluga.kolicina
    );
  return suma + ukupna_cijena * usluga.kolicina;
}

function dodajRobuNaSumu(suma, roba) {
  const porezRobe = roba.porez || roba.roba.cijene_roba[0].porez;
  const ukupna_cijena = (1 + Number(porezRobe.stopa)) * Number(roba.roba.cijene_roba[0].cijena_bez_pdv);
  
  if (roba.tip_popusta && roba.popust) {
    return suma + izracunajPopust(ukupna_cijena, roba.popust, roba.tip_popusta) * roba.kolicina;
  }
  if (roba.atribut_robe?.popust_iznos)
    return (
      suma +
      (ukupna_cijena -
        roba.atribut_robe.popust_iznos) *
        roba.kolicina
    );
  return suma + ukupna_cijena * roba.kolicina;
}

export function izracunajUkupnuCijenuStavkiBezPdv(stavke) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka.roba) return dodajRobuNaSumuBezPdv(suma, stavka);
    else return dodajUsluguNaSumuBezPdv(suma, stavka);
  }, 0);
  return suma;
}

function dodajUsluguNaSumuBezPdv(suma, usluga) {
  if (usluga.tip_popusta && usluga.popust) {
    return suma + izracunajPopust(usluga.cijena_bez_pdv, usluga.popust, usluga.tip_popusta) * usluga.kolicina;
  }
  if (usluga.grupa?.popust_iznos)
    return (
      suma +
      (usluga.cijena_bez_pdv - usluga.grupa.popust_iznos) * usluga.kolicina
    );
  return suma + usluga.cijena_bez_pdv * usluga.kolicina;
}

function dodajRobuNaSumuBezPdv(suma, roba) {
  if (roba.tip_popusta && roba.popust) {
    return suma + izracunajPopust(roba.roba.cijene_roba[0].cijena_bez_pdv, roba.popust, roba.tip_popusta) * roba.kolicina;
  }
  if (roba.atribut_robe?.popust_iznos)
    return (
      suma +
      (roba.roba.cijene_roba[0].cijena_bez_pdv -
        roba.atribut_robe.popust_iznos) *
        roba.kolicina
    );
  return suma + roba.roba.cijene_roba[0].cijena_bez_pdv * roba.kolicina;
}
