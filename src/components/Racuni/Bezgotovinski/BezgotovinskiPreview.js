import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'react-qr-code';
import Moment from 'react-moment';
import 'moment/locale/me';
import noLogo from '../../../assets/img/no-logo.png';
import List from '../../shared/lists/List';
import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { BASE_URL } from '../../../config';

import { RACUNI } from '../../../constants/routes';
import BezgotovinskiShowTemplate from './BezgotovinskiShowTemplate';
import BezgotovinskiTableRow from './BezgotovinskiTableRow';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';
import Select from 'react-select';

import { FieldArray, Form, Formik } from 'formik';

import {
  deleteRacun,
  getRacun,
  storeRacun,
  updateRacun,
} from '../../../store/actions/RacuniActions';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { create, values } from 'lodash-es';
import BezgotovinskiPoreziPreview from './BezgotovinskiPoreziPreview';
import { formatirajCijenu } from './../../../helpers/racuni';
import { userSelector } from '../../../store/selectors/UserSelector';
import { racuniService } from '../../../services/RacuniService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const BezgotovinskiPreview = () => {
  const { params } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const testRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const {
    ikof,
    jikr,
    broj_racuna,
    redni_broj,
    vrsta_racuna,
    nacin_placanja,
    id,
    qr_url,
    status,
    preduzece,
    opis,
    partner,
    created_at,
    stavke,
    popust_ukupno,
    ukupna_cijena_bez_pdv,
    ukupna_cijena_sa_pdv,
    ukupna_cijena_bez_pdv_popust,
    ukupna_cijena_sa_pdv_popust,
    ukupan_iznos_pdv,
    status_placanja,
    iznos_uplate,
    datum_izdavanja,
    datum_za_placanje,
  } = useSelector(racunSelector());

  const user = useSelector(userSelector());

  const history = useHistory();

  let a = '';
  const ziroRacuni = () => {
    return preduzece?.ziro_racuni?.map((racun) => {
      a = racun.broj_racuna;
      if (a) {
        const prvaTri = a.substring(0, 3);

        if (prvaTri.includes('550')) {
          return <p>{'Podgorička: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('535')) {
          return <p>{'Prva Banka CG: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('555')) {
          return <p>{'Addiko: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('510')) {
          return <p>{'CKB: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('530')) {
          return <p>{'NLB: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('540')) {
          return <p>{'ERSTE: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('520')) {
          return <p>{'Hipotekarna: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('525')) {
          return <p>{'Komercijalna: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('560')) {
          return <p>{'Universal Capital: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('570')) {
          return <p>{'Zapad Banka: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('575')) {
          return <p>{'Ziraat Bank: ' + a}</p>;
          // return <p>{a}</p>;
        } else if (prvaTri.includes('565')) {
          return <p>{'Lovćen Banka: ' + a}</p>;
          // return <p>{a}</p>;
        }
        return <p>{a}</p>;
      }
    });
  };

  let b = '';
  const ziroRacuniPartner = () => {
    let partnerTip = partner?.fizicko_lice_id
      ? partner?.fizicko_lice
      : partner?.preduzece_partner;
    return partnerTip?.ziro_racuni?.map((racun) => {
      b = racun.broj_racuna;
      if (b) {
        const prvaTri = b.substring(0, 3);

        if (prvaTri.includes('550')) {
          return <p>{'Podgorička: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('535')) {
          return <p>{'Prva Banka CG: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('555')) {
          return <p>{'Addiko: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('510')) {
          return <p>{'CKB: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('530')) {
          return <p>{'NLB: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('540')) {
          return <p>{'ERSTE: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('520')) {
          return <p>{'Hipotekarna: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('525')) {
          return <p>{'Komercijalna: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('560')) {
          return <p>{'Universal Capital: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('570')) {
          return <p>{'Zapad Banka: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('575')) {
          return <p>{'Ziraat Bank: ' + b}</p>;
          // return <p>{b}</p>;
        } else if (prvaTri.includes('565')) {
          return <p>{'Lovćen Banka: ' + b}</p>;
          // return <p>{b}</p>;
        }
        return <p>{b}</p>;
      }
    });
  };

  useEffect(() => {
    if (params.id) dispatch(getRacun(params.id));
  }, [params.id, dispatch]);

  const findWord = (word, str) => {
    return word.includes(str);
  };

  useEffect(() => {
    if (findWord(location.pathname, 'edit')) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [location]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSubmit = (values) => {
    if (editMode && params.id)
      dispatch(updateRacun({ id: params.id, ...values }));

    history.push(`/racuni`);
  };
  var ukupnoBezPdvIpopusta = 0;
  var ukupnoBezPdv = 0;
  var ukupnoSaPdvIpopusta = 0;
  var ukupniPopust = 0;
  var ukupniPdv = 0;
  for (const i in stavke) {
    if (Object.hasOwnProperty.call(stavke, i)) {
      const stavka = stavke[i];
      ukupnoBezPdvIpopusta +=
        Math.round(
          Number(stavka.jedinicna_cijena_bez_pdv) *
            Number(stavka.kolicina) *
            100
        ) / 100;
      ukupnoBezPdv +=
        Math.round(
          Number(stavka.cijena_sa_pdv) * Number(stavka.kolicina) * 100
        ) / 100;
      ukupnoSaPdvIpopusta +=
        Math.round(
          Number(stavka.cijena_sa_pdv_popust) * Number(stavka.kolicina) * 100
        ) / 100;
      ukupniPdv += Math.round(Number(stavka.pdv_iznos) * 100) / 100;
      ukupniPopust += Math.round(Number(stavka.popust_iznos) * 100) / 100;
    }
  }

  let bojaKlasa = '';
  let itemStatus = '';
  switch (status) {
    case 'nijeplacen':
      itemStatus = 'Nije Plaćen';
      bojaKlasa = 'tag tag__warning ml-m vm';
      break;
    case 'storniran':
      itemStatus = 'Storniran';
      bojaKlasa = 'tag tag__danger ml-m vm';
      break;
    case 'placen':
      itemStatus = 'Plaćen';
      bojaKlasa = 'tag tag__success ml-m vm';
      break;
    case 'nenaplativ':
      itemStatus = 'Nenaplativ';
      bojaKlasa = 'tag tag__danger ml-m vm';
      break;
    case 'privremeni':
      itemStatus = 'Privremeni';
      bojaKlasa = 'tag tag__neutral ml-m vm';
      break;
    case 'korektivni':
      itemStatus = 'Korektivni';
      bojaKlasa = 'tag tag__neutral ml-m vm';
      break;
    default:
  }

  console.log('ukupan_iznos_pdv', values, ukupan_iznos_pdv);
  console.log('testRef values=jedinice_id!!', popust_ukupno);

  const [valueStatus, setValueStatus] = useState();

  const options = [
    // { value: null, label: 'Prikaži Sve' },
    { value: 'placen', label: 'Plaćen' },
    { value: 'nenaplativ', label: 'Nenaplativ' },
    { value: 'nijeplacen', label: 'Nije Plaćen' },
    // { value: 'privremeni', label: 'Privremeni' },
  ];

  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#F3F4F6',
      borderRadius: 4,
      height: '45px',
      width: '150px',
      minHeight: 'unset',
    }),
  };

  return (
    <>
      <div className="screen-content">
        <Link to={RACUNI.INDEX} className="back-link df">
          <LinkSvg /> <p>Povratak na Račune</p>
        </Link>

        <div className="title">
          <h1 className="heading-primary">
            Račun: {redni_broj}/
            <Moment locale="me" format="YYYY">
              {datum_izdavanja}
            </Moment>
          </h1>

          {!editMode && (
            <div className="df jc-end">
              <Select
                // className='form__select'
                options={options}
                name="status"
                onChange={(option) => {
                  toast.success(
                    'Uspješno je izmjenjen status za račun sa ID-jem: ' + id,
                    toastSettings
                  );
                  setValueStatus(option);
                  racuniService
                    .updateStatus({ status: option.value, id, ikof, jikr })
                    .then((data) => console.log('data', data))
                    .catch((err) => console.log('err', err));
                }}
                value={valueStatus ? valueStatus : options[2]}
                styles={selectStyle}
              />
              <button
                className="btn btn__primary mob-mb-20 ml-m mob-ml-0"
                onClick={handlePrint}
              >
                <svg
                  className="icon icon__light lg mr-xs"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Štampaj
              </button>
              {/* <button className="btn btn__primary">
              <svg
                className="icon icon__light lg mr-xs"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5234 21.0469C4.98633 21.0469 0.425781 16.4766 0.425781 10.9492C0.425781 5.42188 5.00586 0.851562 10.5332 0.851562C15.6699 0.851562 19.9668 4.78711 20.543 9.77734C19.9375 9.64062 19.1367 9.60156 18.4922 9.70898C17.916 5.82227 14.5957 2.87305 10.5332 2.87305C6.05078 2.87305 2.4375 6.4668 2.4375 10.9492C2.4375 13.0879 3.25781 15.0215 4.61523 16.457C5.62109 15.3438 7.75 14.3281 10.5332 14.3281C11.4023 14.3281 12.2129 14.4258 12.9453 14.6016C12.8281 15.0703 12.7695 15.5586 12.7695 16.0566C12.7695 17.6484 13.3848 19.123 14.3809 20.2656C13.1895 20.7637 11.8809 21.0469 10.5234 21.0469ZM10.5332 12.7266C8.63867 12.7363 7.16406 11.125 7.16406 9.03516C7.16406 7.0625 8.64844 5.41211 10.5332 5.41211C12.4082 5.41211 13.9121 7.0625 13.8926 9.03516C13.8828 11.125 12.4277 12.707 10.5332 12.7266ZM19.1953 21.0957C16.4609 21.0957 14.166 18.8105 14.166 16.0566C14.166 13.3027 16.4316 11.0273 19.1953 11.0273C21.9492 11.0273 24.2246 13.3027 24.2246 16.0566C24.2246 18.8203 21.9492 21.0957 19.1953 21.0957ZM22.3887 16.0566C22.3887 15.6562 22.1152 15.3926 21.7148 15.3926H19.8691V13.5469C19.8691 13.1465 19.6055 12.873 19.1953 12.873C18.7852 12.873 18.5215 13.1465 18.5215 13.5469V15.3926H16.6758C16.2754 15.3926 16.002 15.6562 16.002 16.0566C16.002 16.4668 16.2754 16.7305 16.6758 16.7305H18.5215V18.5859C18.5215 18.9863 18.7852 19.2598 19.1953 19.2598C19.6055 19.2598 19.8691 18.9863 19.8691 18.5859V16.7305H21.7148C22.1152 16.7305 22.3789 16.4668 22.3887 16.0566Z"
                  fill="#F9FAFB"
                />
              </svg>
              <p>Dodaj preglednika</p>
            </button> */}
            </div>
          )}
        </div>
      </div>
      <div className="main-content__box">
        <div style={{ display: 'none' }}>
          <BezgotovinskiShowTemplate
            ref={componentRef}
            ikof={ikof}
            qr_url={qr_url}
            bojaKlasa={bojaKlasa}
            itemStatus
            redni_broj={redni_broj}
            popust_ukupno
            ukupnoBezPdvIpopusta
            ukupniPdv
            ukupnoSaPdvIpopusta
            jikr={jikr}
            broj_racuna={broj_racuna}
            vrsta_racuna={vrsta_racuna}
            nacin_placanja={nacin_placanja}
            status={status}
            preduzece={preduzece}
            datum_izdavanja={datum_izdavanja}
            datum_za_placanje={datum_za_placanje}
            opis={opis}
            partner={partner}
            created_at={created_at}
            stavke={stavke}
            ukupnoBezPdvIpopusta={ukupnoBezPdvIpopusta}
            ukupniPdv={ukupniPdv}
            ukupnoBezPdv={ukupnoBezPdv}
            ukupniPopust={ukupna_cijena_sa_pdv - ukupna_cijena_sa_pdv_popust}
            ukupnoSaPdvIpopusta={ukupnoSaPdvIpopusta}
            popust_ukupno={popust_ukupno}
            ukupna_cijena_bez_pdv={ukupna_cijena_bez_pdv}
            ukupna_cijena_sa_pdv={ukupna_cijena_sa_pdv}
            ukupna_cijena_bez_pdv_popust={ukupna_cijena_bez_pdv_popust}
            ukupna_cijena_sa_pdv_popust={ukupna_cijena_sa_pdv_popust}
            ukupan_iznos_pdv={ukupan_iznos_pdv}
            user={user}
          />
        </div>

        <>
          <div className="invoice" style={{ width: '100%' }}>
            <div className="invoice__header">
              {/* <div className="invoice__header--logo">
                {preduzece && preduzece.logotip ? (
                  <img
                    src={
                      preduzece && preduzece.logotip
                        ? "https://testapi.postfiskal.me/logotipi/" + preduzece.logotip
                        : noLogo
                    }
                    alt="logo"
                    style={{ width: 200, height: 100 }}
                  />
                ) : (
                  ''
                )}
              </div> */}
              <div className="row">
                {preduzece && preduzece.logotip ? (
                  <div className="col-md-4">
                    <p className="">
                      <img
                        src={
                          preduzece && preduzece.logotip
                            ? BASE_URL.slice(0, -3) +
                              'logotipi/' +
                              preduzece.logotip
                            : noLogo
                        }
                        alt="logo"
                        style={{ maxWidth: 250, maxHeight: 200 }}
                      />
                    </p>
                  </div>
                ) : (
                  ''
                )}
                <div className="col-md-4">
                  <p className="txt-light">
                    {preduzece && preduzece.kratki_naziv
                      ? preduzece.kratki_naziv + ' ' + preduzece.oblik_preduzeca
                      : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.djelatnost
                      ? preduzece.djelatnost
                      : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.opis ? preduzece.opis : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.adresa ? preduzece.adresa : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.grad ? preduzece.grad : ''}, &nbsp;
                    {preduzece && preduzece.drzava ? preduzece.drzava : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.telefon ? preduzece.telefon : ''},
                    &nbsp;
                    {preduzece && preduzece.fax ? preduzece.fax : ''}
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.email ? preduzece.email : ''} &nbsp;
                  </p>
                  <p className="txt-light">
                    {preduzece && preduzece.website ? preduzece.website : ''}{' '}
                    &nbsp;
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="df jc-sb">
                    <div className="df fd-column">
                      <p className="txt-light">
                        {preduzece && preduzece.pib ? 'PIB' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.pdv ? 'PDV' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.iban ? 'IBAN' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.bic_swift ? 'BIC/SWIFT' : ''}
                      </p>
                    </div>
                    <div className="df fd-column">
                      <p className="txt-right">
                        {preduzece && preduzece.pib ? preduzece.pib : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.pdv ? preduzece.pdv : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.iban ? preduzece.iban : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.bic_swift
                          ? preduzece.bic_swift
                          : ''}
                      </p>
                    </div>
                  </div>
                  {/* {preduzece && preduzece.logotip ? ( */}
                  <p className="txt-right">{ziroRacuni()}</p>
                  {/* ) : ''} */}
                </div>
                {/* {preduzece && !preduzece.logotip ? ( */}
                {/* <div className="col-md-4">
                  <p className="txt-right">{ziroRacuni()}</p>
                </div> */}
                {/* ) : ''} */}
              </div>

              <div className="mt-50">
                <div className="row">
                  <div className="col-md-7">
                    <h2 className="heading-secondary">
                      Račun: {redni_broj}/
                      <Moment locale="me" format="YYYY">
                        {datum_izdavanja}
                      </Moment>
                      <span className={bojaKlasa}>{itemStatus}</span>
                    </h2>
                    <p className="mb-20">
                      {preduzece && preduzece.grad ? preduzece.grad : ''},
                      &nbsp;
                      {datum_izdavanja && (
                        <Moment locale="me" format="DD. MMM YYYY.">
                          {datum_izdavanja}
                        </Moment>
                      )}
                      {' / Rok za plaćanje: '}
                      {datum_za_placanje && (
                        <Moment locale="me" format="DD. MMM YYYY.">
                          {datum_za_placanje}
                        </Moment>
                      )}{' '}
                    </p>

                    <div className="row">
                      {/* ------------------ QR CODE ------------------ */}
                      {jikr && ikof ? (
                        <div className="col-md-3">
                          <QRCode value={qr_url} size="128" />{' '}
                        </div>
                      ) : null}

                      {/*------------------ QR CODE ------------------*/}

                      <div className="col-md-9">
                        <div className="df">
                          <div className="df fd-column mr-m">
                            <p className="txt-light">{jikr ? 'JIKR' : ''}</p>
                            <p className="txt-light">{ikof ? 'IKOF' : ''}</p>
                            <p className="txt-light">
                              {broj_racuna ? 'Broj' : ''}
                            </p>
                            <p className="txt-light">
                              {created_at ? 'Datum' : ''}
                            </p>
                            <p className="txt-light">
                              {nacin_placanja ? 'Vrsta' : ''}
                            </p>
                          </div>
                          <div className="df fd-column">
                            <p>{jikr ? jikr : ''}</p>
                            <p>{ikof ? ikof : ''}</p>
                            <p>{broj_racuna ? broj_racuna : ''}</p>
                            <p>
                              {created_at ? (
                                <Moment locale="me" format="Do MMMM YYYY, HH:mm:ss">
                                  {created_at}
                                </Moment>
                              ) : (
                                ''
                              )}
                            </p>
                            <p>
                              {nacin_placanja
                                ? vrsta_racuna + ' / ' + nacin_placanja
                                : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="invoice__header--box">
                      <h2 className="heading-secondary">
                        {partner && partner.preduzece_partner
                          ? partner?.preduzece_partner?.kratki_naziv
                          : partner?.fizicko_lice?.ime +
                            ' ' +
                            partner?.fizicko_lice?.prezime}
                      </h2>
                      <div className="df jc-sb">
                        <div className="df fd-column">
                          <p className="txt-light">
                            {partner && partner.preduzece_partner
                              ? ''
                              : 'JMBG: '}
                          </p>
                          <p className="txt-light">
                            {partner && partner?.preduzece_partner?.pib
                              ? 'PIB: '
                              : ''}
                          </p>
                          <p className="txt-light">
                            {partner && partner?.preduzece_partner?.pdv
                              ? 'PDV: '
                              : ''}
                          </p>
                          <p className="txt-light">
                            {partner &&
                            partner?.preduzece_partner?.adresa &&
                            partner?.preduzece_partner?.grad
                              ? 'Adresa: '
                              : ''}
                          </p>
                          <p className="txt-light">
                            {partner && partner?.preduzece_partner?.drzava
                              ? 'Država: '
                              : ''}
                          </p>
                        </div>
                        <div className="df fd-column">
                          <p className="txt-right">
                            {partner && partner.preduzece_partner
                              ? ''
                              : partner?.fizicko_lice?.jmbg}
                          </p>
                          <p className="txt-right">
                            {partner && partner?.preduzece_partner?.pib
                              ? partner?.preduzece_partner?.pib
                              : ''}
                          </p>
                          <p className="txt-right">
                            {partner && partner?.preduzece_partner?.pdv
                              ? partner?.preduzece_partner?.pdv
                              : ''}
                          </p>
                          <p className="txt-right">
                            {partner &&
                            partner?.preduzece_partner?.adresa &&
                            partner?.preduzece_partner?.grad
                              ? partner?.preduzece_partner?.adresa +
                                ', ' +
                                partner?.preduzece_partner?.grad
                              : ''}
                          </p>
                          <p className="txt-right">
                            {partner && partner?.preduzece_partner?.drzava
                              ? partner?.preduzece_partner?.drzava
                              : ''}
                          </p>
                        </div>
                        {/* TODO: ubaciti prikaz ziro racuna partnera ili ne prikazivati ako  ih nema */}
                        {/* <div className="df fd-column">
                          <p className="txt-right">{ziroRacuniPartner()}</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={testRef} className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <span className="heading-quaternary">Opis</span>
                    </th>
                    <th>
                      <span className="heading-quaternary nowrap">Bez PDV</span>
                    </th>
                    <th>
                      <span className="heading-quaternary nowrap">
                        sa PDV
                      </span>
                    </th>
                    <th>
                      <span className="heading-quaternary">
                        Pop. sa PDV
                      </span>
                    </th>
                    <th>
                      <span className="heading-quaternary">Kol.</span>
                    </th>
                    <th>
                      <span className="heading-quaternary nowrap">Uk. bez PDV</span>
                    </th>
                    <th>
                      <span className="heading-quaternary nowrap">Uk. sa PDV</span>
                    </th>
                    {/* <th>
                      <span className="heading-quaternary nowrap">
                        Ukupno sa PDV-om{' '}
                      </span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  <List
                    data={stavke ? stavke : []}
                    renderItem={BezgotovinskiTableRow}
                  />
                </tbody>
              </table>
            </div>
            <div className="invoice__footer">
              <div className="row mb-30">
                <div className="col-md-8 col-sm-7">
                  <div className="table-wrapper">
                    <table className="table">
                      <BezgotovinskiPoreziPreview stavke={stavke} />
                    </table>
                  </div>
                </div>
                <div className="col-md-4 col-sm-5">
                  <div className="df jc-sb">
                    <div className="df fd-column">
                      <p className="fw-500">
                        {/* TODO: ovo je cijena bez PDV-a i sa popustom */}
                        {ukupnoBezPdvIpopusta && 'Bez PDV-a:'}
                      </p>

                      {/* <p className="fw-500">
                        {ukupnoBezPdv && 'Ukupno bez popusta:'}
                      </p> */}
                      {Number(popust_ukupno) > 0 && (
                        <p className="fw-500">
                          {Number(popust_ukupno) > 0 > 0 && 'Popust sa PDV-om:'}
                        </p>
                      )}
                      <p className="fw-500">
                        {/* {ukupan_iznos_pdv > 0 &&  */}
                        {ukupan_iznos_pdv &&
                        'PDV:'}</p>
                      <p className="fw-500">
                        {ukupnoSaPdvIpopusta && 'Total:'}
                      </p>
                    </div>
                    <div className="df fd-column">
                      <p className="fw-500 txt-right nowrap">
                        {ukupna_cijena_bez_pdv_popust
                          ? formatirajCijenu(ukupna_cijena_bez_pdv_popust)
                          : ''}
                        {/* {' '}
                        {ukupnoBezPdvIpopusta ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : null} */}
                      </p>

                      {/* <p className="fw-500 txt-right">
                        {ukupna_cijena_bez_pdv_popust
                          ? formatirajCijenu(ukupna_cijena_sa_pdv)
                          : ''}

                      </p> */}
                      {/* <p className="fw-500 txt-right">
                        {Number(popust_ukupno) > 0 ? (
                          <span className="txt-up txt-light">-</span>
                        ) : (
                          ''
                        )}
                        {Number(popust_ukupno) > 0
                          ? formatirajCijenu(popust_ukupno)
                          : ''}
                      </p> */}
                      {ukupna_cijena_sa_pdv !== ukupna_cijena_sa_pdv_popust && (
                        <p className="txt-right cd fw-500">
                          {'-'}
                          {Number(
                            ukupna_cijena_sa_pdv - ukupna_cijena_sa_pdv_popust
                          ).toFixed(2)}{' '}
                          <span className="txt-up">&euro;</span>
                        </p>
                      )}
                      <p className="fw-500 txt-right">
                        {/* {ukupan_iznos_pdv > 0 */}
                        {ukupan_iznos_pdv
                          ? formatirajCijenu(ukupan_iznos_pdv)
                          : ''}
                        {/* {' '}
                        {ukupniPdv ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : (
                          ''
                        )} */}
                      </p>
                      <p className="fw-500 txt-right">
                        {ukupna_cijena_sa_pdv_popust
                          ? formatirajCijenu(ukupna_cijena_sa_pdv_popust)
                          : ''}
                        {/* {' '}
                        {ukupnoSaPdvIpopusta ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : (
                          ''
                        )} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="row"> */}

                <div className="col-md-5">
                  {opis && (
                    <>
                      <p className="fw-500">Napomena:</p>
                      <p className="txt-light mb-25 white-space-pre-line">
                        {opis}
                      </p>
                    </>
                  )}
                </div>

                {/* </div> */}
              </div>

              <div className="row">
                <div className="col-md-5">
                  <p>
                    {/* TODO: prikazati korisnika koji je kreirao račun a ne trenutnog */}
                    {user?.ime && user?.prezime && (
                      <p>
                        Račun izdao: {user?.ime + ' ' + user?.prezime} /{' '}
                        {user?.kod_operatera}
                      </p>
                    )}
                  </p>
                  <hr className="mt-50 bd__bottom" />
                </div>
                <div className="col-md-5 offset-md-2">
                  <p>Račun Preuzeo:</p>
                  <hr className="mt-50 bd__bottom" />
                </div>
              </div>

              <p className="txt-light">
                PostFiskal by Restart IT d.o.o. /{' '}
                {user?.preduzeca[0]?.software_kod
                  ? user?.preduzeca[0]?.software_kod
                  : ''}
              </p>
            </div>
          </div>
        </>
      </div>

      {editMode && (
        <Formik
          initialValues={{
            ikof,
            jikr,
            broj_racuna,
            status,
            preduzece,
            opis,
            partner,
            created_at,
            stavke,
            ukupna_cijena_bez_pdv,
            ukupna_cijena_sa_pdv,
            ukupan_iznos_pdv,
            status_placanja,
            iznos_uplate,
            datum_izdavanja,
          }}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values }) => (
            <Form>
              <div className="main-content__box">
                <div className="form">
                  <div className="content pt-12"></div>
                  <BezgotovinskiStatusPodsjetnici />
                  <div className="form__footer">
                    <button
                      onClick={() => handleSubmit(values)}
                      className="btn btn__primary"
                    >
                      Sačuvaj izmjene
                    </button>
                    <button className="btn btn__link ml-m">
                      <Link to={RACUNI.INDEX}>Obustavi</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default BezgotovinskiPreview;
