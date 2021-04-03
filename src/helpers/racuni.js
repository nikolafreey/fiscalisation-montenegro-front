export function formatirajCijenu(cijena) {
  return cijena ? Number(cijena).toFixed(2).replace('.', ',') + ' €' : '0 €';
}
export function formatirajCijenuBezE(cijena) {
  return cijena ? Number(cijena).toFixed(2).replace('.', ',') : '0';
}
export function deFormatirajCijenu(cijena) {
  return cijena ? cijena.replace(',', '.').replace(' €','') :'0';
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
export function izracunajPojedinacnePorezeStavkeBezgotovinski(stavke) {
 var  porezi = {
  };

   var pdvIznosUkupno={};
   var pdvUkupnoUkupno={};
   stavke.forEach((stavka) => {
    pdvIznosUkupno[stavka.porez_id]=0;
    pdvUkupnoUkupno[stavka.porez_id]=0;
    })
   
  
  stavke.forEach((stavka) => {
 
    if (!stavka) return;
    if (stavka){ 
      izracunajPojedinacnePorezeZaStavkuPreview(stavka, porezi);
      pdvIznosUkupno[stavka.porez_id] +=  Number(stavka.kolicina) *
      Number(stavka.pdv_iznos);
      pdvUkupnoUkupno[stavka.porez_id] +=  Number(stavka.kolicina) *
      Number(stavka.cijena_bez_pdv_popust);
       porezi[stavka.porez_id].pdvIznosUkupno = pdvIznosUkupno[stavka.porez_id];
       porezi[stavka.porez_id].pdvUkupnoUkupno =pdvUkupnoUkupno[stavka.porez_id];
     
    
    };
  });
 console.log('poreziii=',porezi,pdvIznosUkupno,pdvUkupnoUkupno)
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

export function izracunajPojedinacnePorezeZaUslugu(usluga, porezi) {
  let kolicina, popust_procenti, popust_iznos;
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
    kolicina = usluga.kolicina;
  }
  if (!usluga.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  const cijena = izracunajPopustUsluge(
    usluga.ukupna_cijena,
    usluga.grupa.popust_procenti,
    usluga.grupa.popust_iznos
  );
  if (!porezi[usluga.porez.id]) {
    porezi[usluga.porez.id] = {
      ukupno: 0,
      pdvIznos: 0,
      stopa: usluga.porez.stopa,
      naziv: usluga.porez.naziv,
    };
  }
  if (usluga.kolicina) {
    porezi[usluga.porez.id].pdvIznos += Number(
      usluga.kolicina *
        ((Number(cijena) / (1 + Number(usluga.porez.stopa))) *
          usluga.porez.stopa)
    );
    porezi[usluga.porez.id].ukupno += Number(usluga.kolicina * Number(cijena));
  } else {
    porezi[usluga.porez.id].pdvIznos += Number(
      kolicina *
        ((Number(cijena) / (1 + Number(usluga.porez.stopa))) *
          usluga.porez.stopa)
    );
    porezi[usluga.porez.id].ukupno += Number(kolicina * Number(cijena));
  }
}

export function izracunajPojedinacnePorezeZaRobu(roba, porezi) {
  let kolicina;
  if (roba && roba?.kolicina === 0) {
    roba.kolicina = 1;
    kolicina = roba.kolicina;
  }
  if (!roba.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }

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
  //
  if (roba.kolicina) {
    porezi[porezRobe.id].pdvIznos +=
      roba.kolicina *
      ((Number(cijena) / (1 + Number(porezRobe.stopa))) *
        Number(porezRobe.stopa));
    porezi[porezRobe.id].ukupno += Number(roba.kolicina) * Number(cijena);
  } else {
    porezi[porezRobe.id].pdvIznos +=
      Number(kolicina) *
      ((Number(cijena) / (1 + Number(porezRobe.stopa))) *
        Number(porezRobe.stopa));
    porezi[porezRobe.id].ukupno += Number(kolicina) * Number(cijena);
  }
}
export function izracunajPojedinacnePorezeZaStavku(stavka, porezi) {
  let kolicina;
  if (stavka && stavka?.kolicina === 0) {
    stavka.kolicina = 1;
    kolicina = stavka.kolicina;
  }
  if (!stavka.hasOwnProperty('kolicina')) {
  kolicina = 1;
  }

  const porezStavke = stavka.porez || stavka.roba.cijene_roba[0].porez||0;
  const cijena = getCijenaStavkeSaPdvPopustom(stavka);

  if (!porezi[porezStavke.id]) {
    porezi[porezStavke.id] = {
      ukupno: 0,
      pdvIznos: 0,
      stopa: porezStavke.stopa,
      naziv: porezStavke.naziv,
    };
  }
  //
  if (stavka.kolicina) {
    porezi[porezStavke.id].pdvIznos +=
      stavka.kolicina *
      ((Number(cijena) / (1 + Number(porezStavke.stopa))) *
        Number(porezStavke.stopa));
    porezi[porezStavke.id].ukupno += Number(stavka.kolicina) * Number(cijena);
  } else {
    porezi[porezStavke.id].pdvIznos +=
      Number(kolicina) *
      ((Number(cijena) / (1 + Number(porezStavke.stopa))) *
        Number(porezStavke.stopa));
    porezi[porezStavke.id].ukupno += Number(kolicina) * Number(cijena);
  }
}
export function izracunajPojedinacnePorezeZaStavkuPreview(stavka, porezi,broj) {
  
 
console.log('u pozivu',stavka.kolicina,porezi)
  //const porezStavke=0 ;
  //const cijena = getCijenaStavkeSaPdvPopustom(stavka);

  
  porezi[stavka.porez_id] = {
    ukupno: 0,
    pdvIznos: 0,
    pdvIznosUkupno:0,
    pdvUkupnoUkupno:0,
  
  };
  if (broj === 0) {
    // for (let i = 0; i < 5; i++) {
    //   porezi[i].pdvIznosUkupno=0;
    // porezi[i].pdvUkupnoUkupno=0;
      
    //}
   
  }
  //porezi[stavka.porez_id].pdvIznosUkupno=0;
    console.log('u pozivu porezi')
  
    porezi[stavka.porez_id].pdvIznos +=
     Number(stavka.kolicina) *
     Number(stavka.pdv_iznos);
    porezi[stavka.porez_id].ukupno +=
     Number(stavka.kolicina) *
     Number(stavka.cijena_bez_pdv_popust);

    
    //  porezi[stavka.porez_id].pdvIznosUkupno += Number(porezi[stavka.porez_id].pdvIznos);
    //  porezi[stavka.porez_id].pdvUkupnoUkupno += Number(porezi[stavka.porez_id].ukupno);
     console.log('u pozivu porezi', porezi[stavka.porez_id].pdvUkupnoUkupno)
   // porezi[stavka.porez_id].ukupno +=Number(porezi[stavka.porez_id]);
  
}

export function izracunajUkupnuCijenuStavki(stavke, bezDefaultPopusta = false) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka.roba) return dodajRobuNaSumu(suma, stavka, bezDefaultPopusta);
    else return dodajUsluguNaSumu(suma, stavka, bezDefaultPopusta);
  }, 0);
  return suma;
}
export function izracunajUkupnuCijenuStavkiBezgotovinski(
  stavke,
  bezDefaultPopusta = false
) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;
    if (stavka)
      return dodajStavkuNaSumuSaPdvBezgotovinski(
        suma,
        stavka,
        bezDefaultPopusta
      );
  }, 0);
  return suma;
}

function dodajUsluguNaSumu(suma, usluga, bezDefaultPopusta) {
  let kolicina;
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
    kolicina = usluga.kolicina;
  }
  if (!usluga.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  const ukupna_cijena =
    (1 + Number(usluga.porez.stopa)) * Number(usluga.cijena_bez_pdv);

  if (usluga.grupa.popust_procenti > 0 || usluga.grupa.popust_iznos > 0) {
    return usluga.kolicina
      ? suma +
          izracunajPopustUsluge(
            ukupna_cijena,
            usluga.grupa.popust_procenti,
            usluga.grupa.popust_iznos
          ) *
            usluga.kolicina
      : suma +
          izracunajPopustUsluge(
            ukupna_cijena,
            usluga.grupa.popust_procenti,
            usluga.grupa.popust_iznos
          ) *
            kolicina;
  }
  return usluga.kolicina
    ? suma + ukupna_cijena * usluga.kolicina
    : suma + ukupna_cijena * kolicina;
}

function dodajRobuNaSumu(suma, roba, bezDefaultPopusta) {
  const porezRobe = roba.porez || roba.roba.cijene_roba[0].porez;
  let kolicina;
  if (roba && roba?.kolicina === 0) {
    roba.kolicina = 1;
    kolicina = roba.kolicina;
  }
  if (!roba.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  const ukupna_cijena =
    (1 + 0) * Number(roba.roba.cijene_roba[0].ukupna_cijena);

  if (roba?.tip_popusta && roba?.popust) {
    return roba.kolicina
      ? suma +
          izracunajPopust(ukupna_cijena, roba.popust, roba.tip_popusta) *
            roba.kolicina
      : suma +
          izracunajPopust(ukupna_cijena, roba.popust, roba.tip_popusta) *
            kolicina;
  }
  if (
    roba.atribut_robe.popust_procenti > 0 ||
    roba.atribut_robe.popust_iznos > 0
  ) {
    return roba.kolicina
      ? suma +
          izracunajPopustUsluge(
            ukupna_cijena,
            roba.atribut_robe.popust_procenti,
            roba.atribut_robe.popust_iznos
          ) *
            roba.kolicina
      : suma +
          izracunajPopustUsluge(
            ukupna_cijena,
            roba.atribut_robe.popust_procenti,
            roba.atribut_robe.popust_iznos
          ) *
            kolicina;
  }

  return roba.kolicina
    ? suma + ukupna_cijena * roba.kolicina
    : suma + ukupna_cijena * kolicina;
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
export function izracunajUkupnuCijenuStavkiBezPdvBezgotovinski(
  stavke,
  bezDefaultPopusta
) {
  const suma = stavke.reduce((suma, stavka) => {
    if (!stavka) return;

    if (stavka)
      return dodajStavkuNaSumuBezPdvBezgotovinski(
        suma,
        stavka,
        bezDefaultPopusta
      );
  }, 0);
  return suma;
}
//dodao
function getPopustStavke(stavka) {
  if (
    Number(stavka?.grupa?.popust_procenti) > 0 ||
    Number(stavka?.atributi_roba?.popust_procenti) > 0
  ) {
    return {
      iznos:
        Number(stavka?.grupa?.popust_procenti) ||
        Number(stavka?.atributi_roba?.popust_procenti) ||
        0,
      tip_popusta: 'procenat',
    };
  } else {
    //stavka.tip_popusta='iznos';
    return {
      iznos:
        Number(stavka?.grupa?.popust_iznos) ||
        Number(stavka?.atributi_roba?.popust_iznos) ||
        0,
      tip_popusta: 'iznos',
    };
  }
}

// const popust = values.popust
//   ? {
//       popust: values.popust,
//       tip_popusta: values.tip_popusta,
//       popust_bez_pdv: true,
//     }
//   : null;

function izracunajCijenuSaPopustom(stavka, cijena) {
  if (!stavka?.tip_popusta) return cijena;
  if (stavka.tip_popusta === 'iznos')
    return cijena - Number(stavka.popust || 0);
  if (stavka.tip_popusta === 'procenat')
    return cijena - (Number(stavka.popust || 0) * cijena) / 100;
}
function izracunajPocetnuCijenuSaPopustom(stavka, cijena) {
  let popustStart = getPopustStavke(stavka);

  if (!popustStart?.tip_popusta) return cijena;
  if (popustStart.tip_popusta === 'iznos')
    return Number(cijena) - Number(popustStart.iznos);
  if (popustStart?.tip_popusta === 'procenat')
    return cijena - (Number(popustStart.iznos || 0) * cijena) / 100;
}

function getCijenaStavkeBezPdv(stavka) {
  let cijena_sa_popustom;
  if (stavka?.tip_popusta) {
    cijena_sa_popustom = izracunajCijenuSaPopustom(
      stavka,
      stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
        stavka?.ukupna_cijena ||
        0
    );
  } else {
    cijena_sa_popustom = izracunajPocetnuCijenuSaPopustom(
      stavka,
      stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
        stavka?.ukupna_cijena ||
        0
    );
  }
  if (stavka?.porez?.stopa > 0) {
    return (
      Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
    );
  } else {
    return Number(cijena_sa_popustom);
  }
}
export function getCijenaStavkeSaPdvPopustom(stavka) {
  let cijena_sa_popustom;
  if (stavka?.tip_popusta) {
    cijena_sa_popustom = izracunajCijenuSaPopustom(
      stavka,
      stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
        stavka?.ukupna_cijena ||
        0
    );
  } else {
    cijena_sa_popustom = izracunajPocetnuCijenuSaPopustom(
      stavka,
      stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
        stavka?.ukupna_cijena ||
        0
    );
  }
  return Number(cijena_sa_popustom);
}

//kraj

function dodajUsluguNaSumuBezPdv(suma, usluga, bezDefaultPopusta) {
  let kolicina;
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
    kolicina = usluga.kolicina;
  }
  if (!usluga.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  if (usluga && usluga?.kolicina === 0) {
    usluga.kolicina = 1;
  }

  if (usluga?.tip_popusta && usluga?.popust) {
    return usluga.kolicina
      ? suma +
          izracunajPopust(
            usluga.ukupna_cijena,
            usluga.popust,
            usluga.tip_popusta
          ) *
            usluga.kolicina
      : suma +
          izracunajPopust(
            usluga.ukupna_cijena,
            usluga.popust,
            usluga.tip_popusta
          ) *
            kolicina;
  }
  if (!bezDefaultPopusta && usluga?.grupa?.popust_procenti) {
    return usluga.kolicina
      ? suma +
          (usluga.cijena_bez_pdv -
            (usluga.cijena_bez_pdv * usluga?.grupa?.popust_procenti) / 100) *
            usluga.kolicina
      : suma +
          (usluga.cijena_bez_pdv -
            (usluga.cijena_bez_pdv * usluga?.grupa?.popust_procenti) / 100) *
            kolicina;
  }
  return usluga.kolicina
    ? suma + usluga?.cijena_bez_pdv * usluga?.kolicina
    : suma + usluga?.cijena_bez_pdv * kolicina;
}
function dodajStavkuNaSumuBezPdvBezgotovinski(suma, stavka, bezDefaultPopusta) {
  let kolicina;
  if (stavka && stavka?.kolicina === 0) {
    stavka.kolicina = 1;
    kolicina = stavka.kolicina;
  }
  if (!stavka.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  if (stavka && stavka?.kolicina === 0) {
    stavka.kolicina = 1;
  }
  return stavka.kolicina
    ? suma + getCijenaStavkeBezPdv(stavka) * stavka?.kolicina
    : suma + getCijenaStavkeBezPdv(stavka) * kolicina;
}
function dodajStavkuNaSumuSaPdvBezgotovinski(suma, stavka, bezDefaultPopusta) {
  let kolicina;
  if (stavka && stavka?.kolicina === 0) {
    stavka.kolicina = 1;
    kolicina = stavka.kolicina;
  }
  if (!stavka.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }
  if (stavka && stavka?.kolicina === 0) {
    stavka.kolicina = 1;
  }
  return stavka.kolicina
    ? suma + getCijenaStavkeSaPdvPopustom(stavka) * stavka?.kolicina
    : suma + getCijenaStavkeSaPdvPopustom(stavka) * kolicina;
}

function dodajRobuNaSumuBezPdv(suma, roba, bezDefaultPopusta) {
  let kolicina;
  if (roba && roba?.kolicina === 0) {
    roba.kolicina = 1;
    kolicina = roba.kolicina;
  }
  if (!roba.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }

  if (roba?.tip_popusta && roba?.popust) {
    return roba.kolicina
      ? suma +
          izracunajPopust(
            roba.roba.cijene_roba[0].ukupna_cijena,
            roba.popust,
            roba.tip_popusta
          ) *
            roba.kolicina
      : suma +
          izracunajPopust(
            roba.roba.cijene_roba[0].ukupna_cijena,
            roba.popust,
            roba.tip_popusta
          ) *
            kolicina;
  }
  if (!bezDefaultPopusta && roba?.atribut_robe?.popust_procenti) {
    return roba.kolicina
      ? suma +
          (roba.roba.cijene_roba[0].cijena_bez_pdv -
            roba.roba.cijene_roba[0].cijena_bez_pdv *
              (roba.atribut_robe.popust_procenti / 100)) *
            roba.kolicina
      : suma +
          (roba.roba.cijene_roba[0].cijena_bez_pdv -
            roba.roba.cijene_roba[0].cijena_bez_pdv *
              (roba.atribut_robe.popust_procenti / 100)) *
            kolicina;
  }
  return roba.kolicina
    ? suma + roba?.roba?.cijene_roba[0]?.cijena_bez_pdv * roba.kolicina
    : suma + roba?.roba?.cijene_roba[0]?.cijena_bez_pdv * kolicina;
}
function dodajRobuNaSumuBezPdvBezgotovinski(suma, roba, bezDefaultPopusta) {
  let kolicina;
  if (roba && roba?.kolicina === 0) {
    roba.kolicina = 1;
    kolicina = roba.kolicina;
  }
  if (!roba.hasOwnProperty('kolicina')) {
    kolicina = 1;
  }

  if (!bezDefaultPopusta && roba?.atribut_robe?.popust_procenti) {
    return roba.kolicina
      ? suma +
          (roba.roba.cijene_roba[0].cijena_bez_pdv -
            roba.roba.cijene_roba[0].cijena_bez_pdv *
              (roba.atribut_robe.popust_procenti / 100)) *
            roba.kolicina
      : suma +
          (roba.roba.cijene_roba[0].cijena_bez_pdv -
            roba.roba.cijene_roba[0].cijena_bez_pdv *
              (roba.atribut_robe.popust_procenti / 100)) *
            kolicina;
  }
  return roba.kolicina
    ? suma + roba?.roba?.cijene_roba[0]?.cijena_bez_pdv * roba.kolicina
    : suma + roba?.roba?.cijene_roba[0]?.cijena_bez_pdv * kolicina;
}
