import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { izracunajUkupnuCijenuStavki, izracunajUkupnuCijenuStavkiBezPdv } from '../../../helpers/racuni';
import { storeRacun } from '../../../store/actions/RacuniActions';
import { noviRacunSelector } from '../../../store/selectors/RacuniSelector';
import NoviRacunKusur from './NoviRacunKusur';
import NoviRacunPreviewPorezi from './NoviRacunPreviewPorezi';
import NoviRacunPreviewStavka from './NoviRacunPreviewStavka';

const NoviRacunPreview = () => {
  const noviRacun = useSelector(noviRacunSelector());
  const dispatch = useDispatch();

  const handleSacuvaj = () => {
    dispatch(storeRacun());
  }

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


  const uslugeArray = Object.keys(noviRacun.usluge).map(id => noviRacun.usluge[id]);
  const robeArray = Object.keys(noviRacun.robe).map(id => noviRacun.robe[id]);

  const ukupnaCijena = izracunajUkupnuCijenuStavki([...uslugeArray, ...robeArray]);
  const ukupnaCijenaBezPdv = izracunajUkupnuCijenuStavkiBezPdv([...uslugeArray, ...robeArray]);

  return (
    <div class="side-info">
      <div class="side-info__wrapper">
        <p class="txt-light txt-up">ukupno</p>
        <h1 class="heading-primary">
          {ukupnaCijena.toFixed(2).replace('.', ',')}{' '}
          <span class="txt-light">€</span>
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
          <p class="txt-right">
            {Number(ukupnaCijena - ukupnaCijenaBezPdv)
              .toFixed(2)
              .replace('.', ',') + '€'}
          </p>
        </div>
        <div class="col-lg-7">
          <p>Ukupno za plaćanje</p>
        </div>
        <div class="col-lg-5">
          <p class="txt-right">
            {ukupnaCijena.toFixed(2).replace('.', ',') + '€'}
          </p>
        </div>
      </div>
      <NoviRacunKusur ukupnaCijena={ukupnaCijena} />
      <hr />
      <button class="btn btn__dark mb-10">Fiskalizuj i štampaj</button>
      <button class="btn btn__transparent" onClick={handleSacuvaj}>Sačuvaj</button>
    </div>
  );
};

export default NoviRacunPreview;
