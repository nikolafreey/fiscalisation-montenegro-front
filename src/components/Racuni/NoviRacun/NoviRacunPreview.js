import React from 'react';
import { useSelector } from 'react-redux';
import { noviRacunSelector } from '../../../store/selectors/RacuniSelector';
import NoviRacunPreviewPorezi from './NoviRacunPreviewPorezi';
import NoviRacunPreviewStavka from './NoviRacunPreviewStavka';

const NoviRacunPreview = () => {
  const noviRacun = useSelector(noviRacunSelector());

  const usluge = Object.keys(noviRacun.usluge).map((uslugaId) => (
    <NoviRacunPreviewStavka
      key={'usluga_' + uslugaId}
      usluga={{ ...noviRacun.usluge[uslugaId], usluga_id: uslugaId }}
    />
  ));

  const robe = Object.keys(noviRacun.robe).map((robaId) => (
    <NoviRacunPreviewStavka
      key={'roba_' + robaId}
      roba={{ ...noviRacun.robe[robaId], roba_id: robaId }}
    />
  ));

  const izracunajUkupnuCijenu = () => {
    const sumaUsluga = Object.keys(noviRacun.usluge).reduce(
      (suma, uslugaId) => {
        const usluga = noviRacun.usluge[uslugaId];
        return suma + usluga.ukupna_cijena * usluga.kolicina;
      }, 0
    );

    const sumaRoba = Object.keys(noviRacun.robe).reduce((suma, robaId) => {
      const roba = noviRacun.robe[robaId];
      return suma + roba.ukupna_cijena * roba.kolicina;
    }, 0);

    return sumaUsluga + sumaRoba;
  };

  const izracunajUkupnuCijenuBezPdv = () => {
    const sumaUsluga = Object.keys(noviRacun.usluge).reduce(
      (suma, uslugaId) => {
        const usluga = noviRacun.usluge[uslugaId];
        return suma + usluga.cijena_bez_pdv * usluga.kolicina;
      }, 0
    );

    const sumaRoba = Object.keys(noviRacun.robe).reduce((suma, robaId) => {
      const roba = noviRacun.robe[robaId];
      return suma + roba.cijena_bez_pdv * roba.kolicina;
    }, 0);

    return sumaUsluga + sumaRoba;
  };

  const ukupnaCijena = izracunajUkupnuCijenu();
  const ukupnaCijenaBezPdv = izracunajUkupnuCijenuBezPdv();

  return (
    <div class="side-info">
      <div class="side-info__wrapper">
        <p class="txt-light txt-up">ukupno</p>
        <h1 class="heading-primary">
          {ukupnaCijena} <span class="txt-light">€</span>
        </h1>
      </div>

      {usluge}

      {robe}

      <hr />
      <NoviRacunPreviewPorezi noviRacun={noviRacun} />
      <hr />
      <div class="row mb-20">
        <div class="col-lg-8">
          <p>Ukupan PDV</p>
        </div>
        <div class="col-lg-4">
          <p class="txt-right">{ukupnaCijena - ukupnaCijenaBezPdv}</p>
        </div>
        <div class="col-lg-7">
          <p>Ukupno za plaćanje</p>
        </div>
        <div class="col-lg-5">
          <p class="txt-right">{ukupnaCijena}</p>
        </div>
      </div>
      <hr />
      <button class="btn btn__dark mb-10">Fiskalizuj i štampaj</button>
      <button class="btn btn__transparent">Sačuvaj</button>
    </div>
  );
};

export default NoviRacunPreview;
