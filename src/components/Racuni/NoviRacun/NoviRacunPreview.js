import React, { useRef, useState } from 'react';
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
import { NACIN_PLACANJA_GOTOVINSKI } from '../../../constants/racuni';
import Select from 'react-select';

const NoviRacunPreview = () => {
  const componentRef = useRef();
  const noviRacun = useSelector(noviRacunSelector());
  const dispatch = useDispatch();

  const [value, setValue] = useState(1);
  const [selectedLabel, setSelectedLabel] = useState('');

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

  function vratiUkupanPdv() {
    var pdvUkupno = 0;
    for (const p in porezi) {
      pdvUkupno += Number(porezi[p].pdvIznos);
    }
    return pdvUkupno;
  }

  function vratiUkupnoPlacanje() {
    var upupnoPlacanje = 0;
    for (const p in porezi) {
      upupnoPlacanje += Number(porezi[p].ukupno);
    }
    return upupnoPlacanje;
  }
  const ukPdv = vratiUkupanPdv();
  const ukPlati = vratiUkupnoPlacanje();
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
        {porezi.pdvUk}
        {/* <NoviRacunPrintTemplate
          ref={componentRef}
          ukupnaCijena={ukupnaCijena}
          usluge={uslugeStavka} robe={robeStavka} noviRacun={noviRacun}
          ukupnaCijenaBezPdv={ukupnaCijenaBezPdv}
          ukupnoPlacanje={ukupnaCijena}
          porezi={porezi}
        /> */}
      </div>

      <div className="side-info__wrapper w-100-imp">
        {/* Ukupno */}
        <p className="txt-light txt-up">ukupno</p>
        <h1 className="heading-primary">
          {ukPlati.toFixed(2).replace('.', ',')}{' '}
          <span className="txt-light">€</span>
        </h1>
      </div>

      {uslugeStavka}
      {robeStavka}
      <hr className="mtb-20" />
      {/* Porezi */}
      <>
        <div className="side-info__wrapper">
          {Object.keys(porezi).map((porezId) => (
            <>
              <div className="side-info__info--inner-wrapper mb-0">
                <div className="col-l w-break">
                  <p>Ukupno za PDV {porezi[porezId].naziv}</p>
                </div>
                <div className="col-r w-break-unset">
                  <p className="txt-right">
                    {porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
                  </p>
                </div>
              </div>
              <div className="side-info__info--inner-wrapper mb-0">
                <div className="col-l">
                  <p>PDV {porezi[porezId].naziv}</p>
                </div>
                <div className="col-r">
                  <p className="txt-right">
                    {porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') +
                      '€'}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>

        <hr className="mtb-20" />
        <div className="side-info__wrapper">
          <div className="side-info__info--inner-wrapper mb-0">
            {/* Ukupan PDV */}
            <div className="col-l">
              <p>Ukupan PDV</p>
            </div>
            <div className="col-r">
              <p className="txt-right">
                {Number(ukPdv).toFixed(2).replace('.', ',') + '€'}
              </p>
            </div>
          </div>

          {/* Ukupno za plaćanje */}

          <div className="side-info__info--inner-wrapper mb-0">
            <div className="col-l">
              <p className="fw-600">Ukupno za plaćanje</p>
            </div>
            <div className="col-r">
              <p className="txt-right fw-600">
                {ukPlati.toFixed(2).replace('.', ',') + '€'}
              </p>
            </div>
          </div>
        </div>
        <hr className="mtb-20" />

        {/* Kusur */}
        <NoviRacunKusur ukupnaCijena={ukPlati} />
        <hr className="mtb-20" />
        {/* onClick={handlePrint} */}
        {/* <button className="btn btn__primary mb-10" onClick={handlePrint}>Fiskalizuj i štampaj</button> */}
        <div className="mtb-20">
          <label className="form__label">Način Plaćanja</label>
          <Select
            options={NACIN_PLACANJA_GOTOVINSKI}
            name="nacin_placanja"
            onChange={(option) => {
              setValue(option.value);
              setSelectedLabel(option);
            }}
            value={selectedLabel ? selectedLabel : NACIN_PLACANJA_GOTOVINSKI[0]}
            defaultValue={NACIN_PLACANJA_GOTOVINSKI[0]}
          />
        </div>
        <button className="btn btn__primary mb-10 w-100" onClick={handleSacuvaj}>
          Fiskalizuj i štampaj
        </button>
        <button className="btn btn__transparent w-100" onClick={handleSacuvaj}>
          Sačuvaj
        </button>
      </>
    </div>
  );
};

export default NoviRacunPreview;
