import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import {
  izracunajUkupnuCijenuStavki,
  izracunajUkupnuCijenuStavkiBezPdv,
  izracunajPojedinacnePoreze,
} from '../../../helpers/racuni';
import {
  storeRacun,
  setRacun,
  resetNoviRacun,
  getRacuni,
} from '../../../store/actions/RacuniActions';
import { noviRacunSelector } from '../../../store/selectors/RacuniSelector';
import NoviRacunPreviewStavka from './NoviRacunPreviewStavka';
import NoviRacunKusur from './NoviRacunKusur';
import NoviRacunPrintTemplate from './NoviRacunPrintTemplate';
import { NACIN_PLACANJA_GOTOVINSKI } from '../../../constants/racuni';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { select } from 'redux-saga/effects';
import { depozitWithdrawService } from '../../../services/DepozitWithdrawService';
import { RACUNI } from '../../../constants/routes';
import { racuniService } from '../../../services/RacuniService';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const NoviRacunPreview = () => {
  const componentRef = useRef();
  const noviRacun = useSelector(noviRacunSelector());
  const dispatch = useDispatch();

  let previousUrl = localStorage.getItem('previousUrl');

  const [value, setValue] = useState(1);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [nacinPlacanja, setNacinPlacanja] = useState('BANKNOTE');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => `
    // @page {
    //   size: 70mm 180mm;
    // }`,
  });

  const history = useHistory();

  const [depozitLoaded, setDepozitLoaded] = useState(false);

  useEffect(() => {
    depozitWithdrawService
      .getDepozitToday()
      .then((data) => {
        console.log('getDepozitToday', data);
        if (data.data.length !== 0) {
          setDepozitLoaded(true);
        }
      })
      .catch((err) =>
        toast.error('Nije moguće učitati depozit!', toastSettings)
      );
  }, [depozitLoaded]);

  const handleSacuvaj = () => {
    console.log('noviRacun.robe.length', noviRacun.robe);
    console.log('noviRacun.usluge.length', noviRacun.usluge);
    if (
      // (noviRacun.robe.length === 0 || noviRacun.robe.length == undefined) &&
      // (noviRacun.usluge.length === 0 || noviRacun.usluge.length == undefined)
      noviRacun.robe.length === 0 &&
      noviRacun.usluge.length === 0
    ) {
      toast.error('Račun mora imati bar jednu stavku!', toastSettings);
      return;
    }

    console.log('depozitLoaded', depozitLoaded);
    if (!depozitLoaded) {
      toast.error(
        'Depozit za današnji dan mora biti dodat prije nego što izdate gotovinski račun!',
        toastSettings
      );
      history.push(RACUNI.INDEX);
      return;
    }
    dispatch(storeRacun({ nacin_placanja: nacinPlacanja }));
    let racunId;
    // setTimeout(() => {
    //   racuniService.getRacuni().then((data) => {
    //     console.log('data', data);
    //     racunId = data.data.data[0].id;
    //     setTimeout(() => {
    //       if (previousUrl === '/racuni/create' && racunId) {
    //         history.push('/racuni/show/' + racunId);
    //       }
    //     }, 500);
    //   }, 1500);
    // });
    // dispatch(setRacun({}));
    // dispatch(resetNoviRacun());
    dispatch(getRacuni());
    history.push(RACUNI.INDEX);
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
      pdvUkupno += Math.round(Number(porezi[p].pdvIznos) * 100) / 100;
    }
    return pdvUkupno;
  }

  function vratiUkupnoPlacanje() {
    var ukupnoPlacanje = 0;
    for (const p in porezi) {
      ukupnoPlacanje += Number(porezi[p].ukupno);
    }
    return ukupnoPlacanje;
  }
  const ukPdv = vratiUkupanPdv();
  const ukPlati = vratiUkupnoPlacanje();

  console.log('noviRacun', noviRacun);
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
                  <p>Ukupno za PDV {porezi[porezId].naziv} </p>
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
              setNacinPlacanja(option.value);
            }}
            value={selectedLabel ? selectedLabel : NACIN_PLACANJA_GOTOVINSKI[0]}
            defaultValue={NACIN_PLACANJA_GOTOVINSKI[0]}
          />
        </div>
        <button
          className="btn btn__primary mb-10 w-100"
          onClick={handleSacuvaj}
        >
          Fiskalizuj i štampaj
        </button>
        {/* <button className="btn btn__secondary w-100" onClick={handleSacuvaj}>
          Sačuvaj
        </button> */}
      </>
    </div>
  );
};

export default NoviRacunPreview;
