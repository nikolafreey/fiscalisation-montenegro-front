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

import { RACUNI } from '../../../constants/routes';
import BezgotovinskiShowTemplate from './BezgotovinskiShowTemplate';
import BezgotovinskiTableRow from './BezgotovinskiTableRow';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';

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
import { values } from 'lodash-es';
import BezgotovinskiPoreziPreview from './BezgotovinskiPoreziPreview';
import { formatirajCijenu } from './../../../helpers/racuni';
import { userSelector } from '../../../store/selectors/UserSelector';

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
  } = useSelector(racunSelector());

  const user = useSelector(userSelector());

  const history = useHistory();

  useEffect(() => {
    if (params.id) dispatch(getRacun(params.id));
  }, [params]);

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
      bojaKlasa = 'tag tag__warning';
      break;
    case 'placen':
      itemStatus = 'Plaćen';
      bojaKlasa = 'tag tag__success';
      break;
    case 'nenaplativ':
      itemStatus = 'Nenaplativ';
      bojaKlasa = 'tag tag__danger';
      break;
    case 'privremeni':
      itemStatus = 'Privremeni';
      bojaKlasa = 'tag tag__neutral';
      break;
    default:
  }

  console.log('ukupan_iznos_pdv', values, ukupan_iznos_pdv);
  console.log('testRef values=jedinice_id!!', popust_ukupno);

  return (
    <>
      <div className="screen-content">
        <Link to={RACUNI.INDEX} className="back-link df">
          <LinkSvg /> <p>Povratak na Račune</p>
        </Link>

        <div className="title">
          <h1 className="heading-primary">Račun {broj_racuna}</h1>

          {!editMode && (
            <div className="df jc-end">
              <button className="btn btn__secondary" onClick={handlePrint}>
                <svg
                  className="icon icon__dark lg mr-xs"
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
            redni_broj
            popust_ukupno
            ukupnoBezPdvIpopusta
            ukupniPdv
            ukupnoSaPdvIpopusta
            jikr={jikr}
            broj_racuna={broj_racuna}
            status={status}
            preduzece={preduzece}
            opis={opis}
            partner={partner}
            created_at={created_at}
            stavke={stavke}
            ukupnoBezPdvIpopusta={ukupnoBezPdvIpopusta}
            ukupniPdv={ukupniPdv}
            ukupnoBezPdv={ukupnoBezPdv}
            ukupniPopust={ukupniPopust}
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
              <div className="status">
                {<span className={bojaKlasa}>{itemStatus}</span>}
              </div>
              <div className="invoice__header--logo">
                {preduzece && preduzece.logotip && (
                  <img
                    src={
                      preduzece && preduzece.logotip
                        ? preduzece.logotip
                        : noLogo
                    }
                    alt="logo"
                    style={{ widt: 200, height: 100 }}
                  />
                )}
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p className="txt-light">
                    {preduzece && preduzece.kratki_naziv
                      ? preduzece.kratki_naziv
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
                </div>
                <div className="col-md-4">
                  <div className="df jc-sb" style={{ display: 'none' }}>
                    <div className="df fd-column">
                      <p className="txt-light">CKB</p>
                      <p className="txt-light">NLB</p>
                      <p className="txt-light">Prva Banka CG</p>
                    </div>
                    <div className="df fd-column">
                      <p className="txt-right">540-1214134-1312</p>
                      <p className="txt-right">520-121334-14</p>
                      <p className="txt-right">535-11234-32</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mtb-50">
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="heading-secondary">Račun: {redni_broj}</h2>
                    <p>
                      {preduzece && preduzece.grad ? preduzece.grad : ''},
                      &nbsp;
                      {created_at && (
                        <Moment locale="me" format="DD. MMM YYYY.">
                          {created_at}
                        </Moment>
                      )}{' '}
                    </p>
                  </div>
                  <div className="col-md-6">
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
                      <span className="heading-quaternary">
                        Jedinična cijena bez pdv
                      </span>
                    </th>
                    <th>
                      <span className="heading-quaternary">Kolicina</span>
                    </th>
                    {/* <th>
                      <span className="heading-quaternary">PDV</span>
                    </th> */}
                    <th>
                      {Number(popust_ukupno) > 0 && (
                        <span className="heading-quaternary">Popust</span>
                      )}
                    </th>
                    <th>
                      <span className="heading-quaternary nowrap">
                        Ukupno bez PDV-a{' '}
                      </span>
                    </th>
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
                        {ukupnoBezPdvIpopusta && 'Bez PDV-a i popusta:'}
                      </p>

                      {/* <p className="fw-500">
                        {ukupnoBezPdv && 'Ukupno bez popusta:'}
                      </p> */}
                      <p className="fw-500">
                        {Number(popust_ukupno) > 0 > 0 && 'Popust:'}
                      </p>
                      <p className="fw-500">{ukupniPdv > 0 && 'PDV:'}</p>
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
                      {ukupniPopust > 0 && (
                        <p className="txt-right cd fw-500">
                          {'-'}
                          {Number(ukupniPopust).toFixed(2)}{' '}
                          <span className="txt-up txt-light">Eur</span>
                        </p>
                      )}
                      <p className="fw-500 txt-right">
                        {ukupan_iznos_pdv > 0
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
                <div className="col-md-8">
                  {opis && (
                    <>
                      <p className="fw-500">Napomena:</p>
                      <p className="txt-light mb-25">{opis}</p>
                    </>
                  )}
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
                        </div>
                        <div className="df fd-column">
                          <p>{jikr ? jikr : ''}</p>
                          <p>{ikof ? ikof : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer__left--logo">
                    <svg
                      width="108"
                      height="27"
                      viewBox="0 0 108 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M52.7613 5.34681V0H47.8063V5.34681H44.5947C42.7531 4.68262 40.817 4.31727 38.8598 4.26461C37.0903 4.22748 35.3769 4.88614 34.0884 6.09885C33.4582 6.693 32.9607 7.41357 32.6287 8.21331C32.2966 9.01306 32.1373 9.87392 32.1614 10.7395C32.1022 11.998 32.4997 13.2356 33.2809 14.2245C34.1388 15.1231 35.1685 15.8404 36.3089 16.3339L37.8413 17.0676L39.3461 17.8013C39.8592 18.0046 40.3084 18.3415 40.6473 18.7769C40.9861 19.2123 41.2022 19.7305 41.2731 20.2775C41.2931 20.5966 41.2424 20.9162 41.1247 21.2135C41.007 21.5108 40.8251 21.7785 40.592 21.9974C40.3589 22.2164 40.0803 22.3813 39.7761 22.4803C39.472 22.5793 39.1497 22.6101 38.8323 22.5703C38.1849 22.5389 37.5549 22.35 36.9971 22.02L36.3364 21.6532C34.5893 20.6395 32.6277 20.0519 30.6107 19.9382C28.5478 19.9148 26.5175 20.4538 24.7381 21.4973C23.7624 22.1156 22.6507 22.4871 21.4991 22.5795C20.775 22.6064 20.0532 22.4834 19.379 22.2182C18.7047 21.9531 18.0926 21.5515 17.581 21.0387C16.5184 19.8847 15.9062 18.3875 15.8559 16.82H31.3448V15.6461C31.3448 12.0999 30.4272 9.32405 28.592 7.31861C27.6393 6.29796 26.4767 5.49566 25.1841 4.96688C23.8916 4.4381 22.4998 4.19539 21.1045 4.25543C18.9491 4.18858 16.8282 4.80845 15.0484 6.02548C13.5247 5.01425 11.7695 4.40529 9.94664 4.25543C9.05868 4.2325 8.178 4.42112 7.3774 4.80571C6.47546 5.3298 5.66628 5.99913 4.9825 6.78669C3.58202 8.12111 1.86885 9.0829 0 9.5839V26.3213H4.97332V15.2242C4.97332 11.1277 6.32829 9.07948 9.03823 9.07948C10.0393 9.11743 11.0027 9.47051 11.791 10.0883C11.0447 11.8444 10.6789 13.7385 10.7174 15.6461C10.5753 18.6726 11.6225 21.6347 13.6353 23.9001C14.6322 24.9335 15.8372 25.7433 17.1707 26.2761C18.5043 26.809 19.9358 27.0526 21.3706 26.9908C22.4215 26.9947 23.4691 26.8716 24.4904 26.624C25.062 26.5021 25.6166 26.3112 26.1421 26.0554C27.0596 25.6885 28.3993 24.5421 30.6749 24.5421C31.9865 24.5514 33.2652 24.954 34.3453 25.6977C34.5757 25.8629 34.8146 26.016 35.061 26.1563H35.1069C36.1931 26.7324 37.4104 27.0168 38.6396 26.9817C40.6348 27.0155 42.5677 26.2874 44.0442 24.9457C44.782 24.2959 45.3695 23.4933 45.7656 22.5937C46.1618 21.6942 46.3571 20.7191 46.3382 19.7364C46.4112 18.3237 45.9232 16.9393 44.9801 15.8845C43.4257 14.5656 41.6483 13.5345 39.7315 12.8397C37.8107 12.0326 36.8503 11.2164 36.8503 10.391C36.8299 10.1646 36.8624 9.9366 36.9452 9.72492C37.028 9.51325 37.1588 9.32369 37.3274 9.1712C37.781 8.8473 38.3306 8.68574 38.8873 8.71264C40.5841 8.84187 42.2377 9.30964 43.7506 10.0883H47.7879V26.3213H52.7704V10.0883H53.6238L56.6518 5.34681H52.7796H52.7613ZM16.9754 11.0696C17.2791 10.5937 17.6606 10.1721 18.104 9.82235C18.5388 9.47879 19.0291 9.21205 19.5538 9.03363C20.1062 8.84624 20.6863 8.75323 21.2697 8.75849C23.9246 8.75849 25.5976 10.0853 26.2889 12.7388H16.2596C16.4091 12.1483 16.6507 11.585 16.9754 11.0696ZM92.6763 5.34681V0H87.7672V5.34681H84.8585C83.6721 4.71313 82.3649 4.33803 81.0229 4.24626C80.135 4.22333 79.2543 4.41195 78.4537 4.79654C77.5696 5.34204 76.7666 6.00887 76.068 6.77751C75.3009 7.50764 74.3492 8.01496 73.3152 8.24491C72.2315 7.9769 71.2258 7.4586 70.3789 6.73166C69.616 6.08199 68.7854 5.51624 67.9014 5.04416C66.7514 4.51307 65.4979 4.24368 64.2311 4.25543C62.8597 4.22798 61.4991 4.50303 60.2462 5.06101C58.9933 5.619 57.8788 6.44619 56.9822 7.4837C55.0334 9.72417 54.0157 12.6248 54.1376 15.591C54.0302 18.6091 55.0656 21.5566 57.0372 23.8451C57.905 24.8315 58.9672 25.6282 60.1574 26.1852C61.3475 26.7421 62.64 27.0474 63.9537 27.0819C65.2674 27.1163 66.5741 26.8792 67.7918 26.3853C69.0096 25.8915 70.1121 25.1516 71.0304 24.212V26.3947H76.0771V15.2242C76.0771 11.1277 77.4291 9.07948 80.1329 9.07948C81.129 9.14142 82.0856 9.49197 82.8856 10.0883H88.0884V26.3213H92.7681V10.0883H93.5939L96.6403 5.34681H92.6763ZM69.6082 20.6627C69.0481 21.2835 68.3583 21.7737 67.5877 22.0986C66.8171 22.4235 65.9844 22.5751 65.1487 22.5428C64.3321 22.5573 63.5227 22.3875 62.7808 22.0461C62.0389 21.7047 61.3836 21.2005 60.8636 20.571C59.7214 19.1677 59.1251 17.3991 59.1844 15.591C59.1314 13.8154 59.7395 12.0834 60.8911 10.7303C61.4098 10.1051 62.0606 9.60237 62.7967 9.25829C63.5328 8.9142 64.336 8.73725 65.1487 8.74015C65.9826 8.71384 66.8119 8.87297 67.5768 9.20604C68.3416 9.53911 69.0229 10.0378 69.5715 10.6661C70.7381 12.064 71.3431 13.8455 71.269 15.6644C71.3536 17.4742 70.7653 19.2514 69.6173 20.6535L69.6082 20.6627ZM101.1 8.34579C99.735 8.34579 98.4009 8.75028 97.2662 9.5081C96.1314 10.2659 95.247 11.343 94.7247 12.6033C94.2025 13.8635 94.0658 15.2502 94.3321 16.588C94.5983 17.9259 95.2555 19.1547 96.2205 20.1193C97.1855 21.0838 98.4151 21.7406 99.7536 22.0067C101.092 22.2729 102.479 22.1363 103.74 21.6143C105.001 21.0923 106.079 20.2083 106.837 19.0742C107.595 17.94 108 16.6066 108 15.2425C108 13.4134 107.273 11.6592 105.979 10.3658C104.685 9.07241 102.93 8.34579 101.1 8.34579ZM99.9528 17.4253C99.9528 17.598 99.8841 17.7636 99.7619 17.8857C99.6398 18.0078 99.4741 18.0764 99.3013 18.0764C99.1285 18.0764 98.9628 18.0078 98.8406 17.8857C98.7184 17.7636 98.6498 17.598 98.6498 17.4253V13.0781C98.6498 12.9042 98.7189 12.7374 98.8419 12.6144C98.965 12.4915 99.1319 12.4224 99.3059 12.4224C99.4799 12.4224 99.6467 12.4915 99.7698 12.6144C99.8928 12.7374 99.9619 12.9042 99.9619 13.0781V17.4253H99.9528ZM103.458 14.6739H102.54V18.0122C102.54 18.1849 102.472 18.3505 102.35 18.4727C102.227 18.5948 102.062 18.6634 101.889 18.6634C101.716 18.6634 101.55 18.5948 101.428 18.4727C101.306 18.3505 101.237 18.1849 101.237 18.0122V12.4178C101.237 12.2451 101.306 12.0795 101.428 11.9574C101.55 11.8352 101.716 11.7666 101.889 11.7666C102.062 11.7666 102.227 11.8352 102.35 11.9574C102.472 12.0795 102.54 12.2451 102.54 12.4178V13.4266H103.458C103.552 13.4035 103.651 13.4022 103.746 13.4228C103.841 13.4434 103.93 13.4853 104.007 13.5453C104.084 13.6054 104.145 13.6821 104.188 13.7695C104.231 13.857 104.253 13.953 104.253 14.0503C104.253 14.1475 104.231 14.2435 104.188 14.331C104.145 14.4185 104.084 14.4952 104.007 14.5552C103.93 14.6153 103.841 14.6572 103.746 14.6777C103.651 14.6983 103.552 14.697 103.458 14.6739Z"
                        fill="#2563EB"
                      />
                    </svg>
                  </div>
                  <p className="txt-light">Software Development</p>
                  <p className="txt-light">
                    Software Kod:{' '}
                    {user?.preduzeca[0]?.software_kod
                      ? user?.preduzeca[0]?.software_kod
                      : ''}
                  </p>
                </div>
              </div>
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
                      className="btn btn__secondary btn__xl ml-m"
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
