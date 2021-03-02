export function formatirajCijenu(cijena) {
  return cijena ? Number(cijena).toFixed(2).replace('.', ',') + ' €' : '0 €';
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
  console.log('izracunajPojedinacnePoreze', stavke);

  stavke.forEach((stavka) => {
    if (!stavka) return;
    if (stavka.roba) izracunajPojedinacnePorezeZaRobu(stavka, porezi);
    else izracunajPojedinacnePorezeZaUslugu(stavka, porezi);
  });

  return porezi;
}

function izracunajPopust(cijena, popust, tip_popusta) {
  if (!tip_popusta) return cijena;
  if (tip_popusta === 'iznos') return cijena - Number(popust || 0);
  if (tip_popusta === 'procenat')
    return cijena - (Number(popust || 0) * cijena) / 100;
}
function izracunajPopustUsluge(cijena, popustProcenat, popustIznos) {
  if (popustIznos === 0 && popustProcenat === 0) return cijena;
  if (popustProcenat > 0)
    return cijena - (Number(popustProcenat || 0) * cijena) / 100;
  else return cijena - Number(popustIznos || 0);
}

function izracunajPojedinacnePorezeZaUslugu(usluga, porezi) {
  if (usluga && usluga.kolicina === 0) {
    usluga.kolicina = 1;
  }
  if (usluga && usluga.kolicina === null) {
    usluga.kolicina = 1;
  }
  const cijena = izracunajPopust(
    usluga.cijena_bez_pdv,
    usluga.popust,
    usluga.tip_popusta
  );
  if (!porezi[usluga.porez.id]) {
    porezi[usluga.porez.id] = {
      ukupno: 0,
      pdvIznos: 0,
      stopa: usluga.porez.stopa,
      naziv: usluga.porez.naziv,
    };
  }

  porezi[usluga.porez.id].pdvIznos += Number(
    usluga.kolicina *
      ((Number(cijena) / (1 + Number(usluga.porez.stopa))) * usluga.porez.stopa)
  );

  porezi[usluga.porez.id].ukupno += Number(usluga.kolicina * Number(cijena));
}

function izracunajPojedinacnePorezeZaRobu(roba, porezi) {
  let kolicina;

  if (roba && roba?.kolicina === 0) {
    roba.kolicina = 1;
    kolicina = 1;
  }

  if (roba?.kolicina === null) {
    roba.kolicina = 1;
    kolicina = 1;
  }

  if (roba) {
    kolicina = roba.kolicina;
  }
  console.log('roba=', roba.roba);
  const porezRobe = roba.porez || roba.roba.cijene_roba[0].porez;
  const cijena = izracunajPopustUsluge(
    roba.roba.cijene_roba[0].ukupna_cijena,
    roba.atribut_robe.popust_procenti,
    roba.atribut_robe.popust_iznos
  );

  if (!porezi[porezRobe.id]) {
    porezi[porezRobe.id] = {
      ukupno: 0,
      pdvIznos: 0,
      stopa: porezRobe.stopa,
      naziv: porezRobe.naziv,
    };
  }
  porezi[porezRobe.id].pdvIznos +=
    kolicina * (Number(porezRobe.stopa) * Number(cijena));

  porezi[porezRobe.id].ukupno +=
    Number(kolicina) * (Number(cijena) * (1 + Number(porezRobe.stopa)));
}

export function izracunajUkupnuCijenuStavki(stavke, bezDefaultPopusta = false) {
  console.log('stavke=', stavke);
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka.roba) return dodajRobuNaSumu(suma, stavka, bezDefaultPopusta);
    else return dodajUsluguNaSumu(suma, stavka, bezDefaultPopusta);
  }, 0);
  return suma;
}

function dodajUsluguNaSumu(suma, usluga, bezDefaultPopusta) {
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
  }
  const ukupna_cijena =
    (1 + Number(usluga.porez.stopa)) * Number(usluga.cijena_bez_pdv);

  if (usluga.grupa.popust_procenti > 0 || usluga.grupa.popust_iznos > 0) {
    return (
      suma +
      izracunajPopustUsluge(
        ukupna_cijena,
        usluga.grupa.popust_procenti,
        usluga.grupa.popust_iznos
      ) *
        usluga.kolicina
    );
  }

  return suma + ukupna_cijena * usluga.kolicina;
}

function dodajRobuNaSumu(suma, roba, bezDefaultPopusta) {
  const porezRobe = roba.porez || roba.roba.cijene_roba[0].porez;
  const ukupna_cijena =
    (1 + Number(porezRobe.stopa)) *
    Number(roba.roba.cijene_roba[0].cijena_bez_pdv);

  if (roba?.tip_popusta && roba?.popust) {
    return (
      suma +
      izracunajPopust(ukupna_cijena, roba.popust, roba.tip_popusta) *
        roba.kolicina
    );
  }
  if (
    roba.atribut_robe.popust_procenti > 0 ||
    roba.atribut_robe.popust_iznos > 0
  ) {
    return (
      suma +
      izracunajPopustUsluge(
        ukupna_cijena,
        roba.atribut_robe.popust_procenti,
        roba.atribut_robe.popust_iznos
      ) *
        roba.kolicina
    );
  }

  return suma + ukupna_cijena * roba.kolicina;
}

export function izracunajUkupnuCijenuStavkiBezPdv(stavke, bezDefaultPopusta) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka.roba)
      return dodajRobuNaSumuBezPdv(suma, stavka, bezDefaultPopusta);
    else return dodajUsluguNaSumuBezPdv(suma, stavka, bezDefaultPopusta);
  }, 0);
  return suma;
}

function dodajUsluguNaSumuBezPdv(suma, usluga, bezDefaultPopusta) {
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
  }
  if (usluga?.tip_popusta && usluga?.popust) {
    return (
      suma +
      izracunajPopust(
        usluga.cijena_bez_pdv,
        usluga.popust,
        usluga.tip_popusta
      ) *
        usluga.kolicina
    );
  }
  if (!bezDefaultPopusta && usluga?.grupa?.popust_procenti) {
    return (
      suma +
      (usluga.cijena_bez_pdv -
        (usluga.cijena_bez_pdv * usluga?.grupa?.popust_procenti) / 100) *
        usluga.kolicina
    );
  }
  return suma + usluga?.cijena_bez_pdv * usluga?.kolicina;
}

function dodajRobuNaSumuBezPdv(suma, roba, bezDefaultPopusta) {
  if (roba?.tip_popusta && roba?.popust) {
    return (
      suma +
      izracunajPopust(
        roba.roba.cijene_roba[0].cijena_bez_pdv,
        roba.popust,
        roba.tip_popusta
      ) *
        roba.kolicina
    );
  }
  if (!bezDefaultPopusta && roba?.atribut_robe?.popust_procenti) {
    return (
      suma +
      (roba.roba.cijene_roba[0].cijena_bez_pdv -
        roba.roba.cijene_roba[0].cijena_bez_pdv *
          (roba.atribut_robe.popust_procenti / 100)) *
        roba.kolicina
    );
  }
  return suma + roba?.roba?.cijene_roba[0]?.cijena_bez_pdv * roba.kolicina;
}
