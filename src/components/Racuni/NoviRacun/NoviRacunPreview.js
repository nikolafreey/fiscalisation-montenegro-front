import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import {
  izracunajUkupnuCijenuStavki,
  izracunajUkupnuCijenuStavkiBezPdv,
  izracunajPojedinacnePoreze,
} from '../../../helpers/racuni';
import { storeRacun } from '../../../store/actions/RacuniActions';
import { noviRacunSelector } from '../../../store/selectors/RacuniSelector';
import NoviRacunPreviewStavka from './NoviRacunPreviewStavka';
import NoviRacunKusur from './NoviRacunKusur';
import NoviRacunPrintTemplate from './NoviRacunPrintTemplate';

const NoviRacunPreview = () => {
  const componentRef = useRef();
  const noviRacun = useSelector(noviRacunSelector());

  // console.log('noviRacun', noviRacun);

  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => `
    // @page {
    //   size: 70mm 180mm;
    // }`,
  });

  const handleSacuvaj = () => {
    dispatch(storeRacun());
  };

  const usluge = Object.keys(noviRacun.usluge).map(
    (id) => noviRacun.usluge[id]
  );
  const robe = Object.keys(noviRacun.robe).map((id) => noviRacun.robe[id]);
  const ukupnaCijena = izracunajUkupnuCijenuStavki([...usluge, ...robe]);
  const ukupnaCijenaBezPdv = izracunajUkupnuCijenuStavkiBezPdv([
    ...usluge,
    ...robe,
  ]);
  const porezi = izracunajPojedinacnePoreze([...usluge, ...robe]);

  const uslugeStavka = Object.keys(noviRacun.usluge).map((uslugaId) => (
    <NoviRacunPreviewStavka
      key={'usluga_' + uslugaId}
      usluga={{ ...noviRacun.usluge[uslugaId], usluga_id: uslugaId }}
    />
  ));

  const robeStavka = Object.keys(noviRacun.robe).map((robaId) => (
    <NoviRacunPreviewStavka
      key={'roba_' + robaId}
      roba={{ ...noviRacun.robe[robaId], roba_id: robaId }}
    />
  ));

  return (
    <div className="side-info">
      {/* NoviRacunPrint - Template */}
      <div style={{ display: 'none' }}>
        {/* <NoviRacunPrintTemplate
          ref={componentRef}
          ukupnaCijena={ukupnaCijena}
          usluge={uslugeStavka} robe={robeStavka} noviRacun={noviRacun}
          ukupnaCijenaBezPdv={ukupnaCijenaBezPdv}
          ukupnoPlacanje={ukupnaCijena}
          porezi={porezi}
        /> */}
      </div>

      <div className="side-info__wrapper">
        {/* Ukupno */}
        <p className="txt-light txt-up">ukupno</p>
        <h1 className="heading-primary">
          {ukupnaCijena.toFixed(2).replace('.', ',')}{' '}
          <span className="txt-light">€</span>
        </h1>
      </div>

      {uslugeStavka}
      {robeStavka}

      <hr />

      {/* Porezi */}
      <div className="container p-0">
        {Object.keys(porezi).map((porezId) => (
          <>
            <div className="row mb-15">
              <div className="col-lg-8 col-8">
                <p>Ukupno za {porezi[porezId].naziv}</p>
              </div>
              <div className="col-lg-4 col-4">
                <p className="txt-right">
                  {porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <p>{porezi[porezId].naziv}</p>
              </div>
              <div className="col-lg-4">
                <p className="txt-right">
                  {porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') + '€'}
                </p>
              </div>
            </div>
          </>
        ))}

        <hr />

        <div className="row mb-20">
          {/* Ukupan PDV */}
          <div className="col-lg-8">
            <p>Ukupan PDV</p>
          </div>
          <div className="col-lg-4">
            <p className="txt-right">
              {Number(ukupnaCijena - ukupnaCijenaBezPdv)
                .toFixed(2)
                .replace('.', ',') + '€'}
            </p>
          </div>

          {/* Ukupno za plaćanje */}
          <div className="col-lg-7">
            <p>Ukupno za plaćanje</p>
          </div>
          <div className="col-lg-5">
            <p className="txt-right">
              {ukupnaCijena.toFixed(2).replace('.', ',') + '€'}
            </p>
          </div>
        </div>
        {/* Kusur */}
        <NoviRacunKusur ukupnaCijena={ukupnaCijena} />

        <hr />
        {/* onClick={handlePrint} */}
        {/* <button className="btn btn__dark mb-10" onClick={handlePrint}>Fiskalizuj i štampaj</button> */}
        <button className="btn btn__transparent" onClick={handleSacuvaj}>
          Sačuvaj
        </button>
      </div>
    </div>
  );
};

export default NoviRacunPreview;
