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

const BezgotovinskiPreview = () => {
  const { params } = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const {
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
  } = useSelector(racunSelector());
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

  return (
    <>
      <div className="screen-content">
        <Link to={RACUNI.INDEX} className="link df">
          <LinkSvg /> <p>Povratak na Račune</p>
        </Link>
      </div>

      <div className="title">
        <h1 className="heading-primary">Račun {broj_racuna}</h1>

        {!editMode && (
          <div className="df w-50 jc-end">
            <button
              className="btn btn__transparent  mr-m"
              onClick={handlePrint}
            >
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
            <button className="btn btn__dark">
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
            </button>
          </div>
        )}
      </div>
      <div className="main-content__box">
        <div style={{ display: 'none' }}>
          <BezgotovinskiShowTemplate
            ref={componentRef}
            ikof={ikof}
            jikr={jikr}
            broj_racuna={broj_racuna}
            status={status}
            preduzece={preduzece}
            opis={opis}
            partner={partner}
            created_at={created_at}
            stavke={stavke}
            ukupna_cijena_bez_pdv={ukupna_cijena_bez_pdv}
            ukupna_cijena_sa_pdv={ukupna_cijena_sa_pdv}
            ukupan_iznos_pdv={ukupan_iznos_pdv}
          />
        </div>

        <>
          <div className="invoice" style={{ width: '100%' }}>
            <div className="invoice__header">
              <div className="status">
                {status && <div className="tag tag__warning">{status}</div>}
              </div>
              <div className="invoice__header--logo">
                <img
                  src={
                    preduzece && preduzece.logotip ? preduzece.logotip : noLogo
                  }
                  alt="logo"
                  style={{ widt: 200, height: 100 }}
                />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p className="txt-light">
                    {preduzece && preduzece.puni_naziv
                      ? preduzece.puni_naziv
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
                    <h2 className="heading-secondary">Račun {broj_racuna}</h2>
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
                        {partner && partner.kontakt_ime
                          ? partner.kontakt_ime
                          : ''}{' '}
                        &nbsp;
                        {partner && partner.kontakt_prezime
                          ? partner.kontakt_prezime
                          : ''}
                      </h2>
                      <div className="df jc-sb">
                        <div className="df fd-column">
                          <p className="txt-light">
                            {partner && partner.pib ? 'PIB' : ''}
                          </p>
                          <p className="txt-light">
                            {partner && partner.pib ? 'PDV' : ''}
                          </p>
                          <p className="txt-light">
                            {partner && partner.pib ? 'IBAN' : ''}
                          </p>
                          <p className="txt-light">
                            {partner && partner.pib ? 'BIC/SWIFT' : ''}
                          </p>
                        </div>
                        <div className="df fd-column">
                          <p className="txt-right">
                            {partner && partner.pib ? partner.pib : ''}
                          </p>
                          <p className="txt-right">
                            {partner && partner.pib ? partner.pib : ''}
                          </p>
                          <p className="txt-right">
                            {partner && partner.pib ? partner.pib : ''}
                          </p>
                          <p className="txt-right">
                            {partner && partner.pib ? partner.pib : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <span className="heading-quaternary">Opis</span>
                    </th>
                    <th>
                      <span className="heading-quaternary">
                        Jedinična cijena
                      </span>
                    </th>
                    <th>
                      <span className="heading-quaternary">Kolicina</span>
                    </th>
                    <th>
                      <span className="heading-quaternary">Popust</span>
                    </th>
                    <th>
                      <span className="heading-quaternary">PDV</span>
                    </th>
                    <th>
                      <span className="heading-quaternary">Iznos</span>
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
              <div className="row">
                <div className="offset-md-8"></div>
                <div className="col-md-4">
                  <div className="df jc-sb">
                    <div className="df fd-column">
                      <p className="fw-500">
                        {ukupna_cijena_bez_pdv && 'Bez PDV-a:'}
                      </p>
                      <p className="fw-500">
                        {ukupan_iznos_pdv && 'Ukupno PDV:'}
                      </p>
                      <p className="fw-500">
                        {ukupna_cijena_sa_pdv && 'Ukupno:'}
                      </p>
                    </div>
                    <div className="df fd-column">
                      <p className="fw-500 txt-right">
                        {ukupna_cijena_bez_pdv ? ukupna_cijena_bez_pdv : ''}{' '}
                        {ukupna_cijena_bez_pdv ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : null}
                      </p>
                      <p className="fw-500 txt-right">
                        {ukupan_iznos_pdv ? ukupan_iznos_pdv : ''}{' '}
                        {ukupan_iznos_pdv ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : (
                          ''
                        )}
                      </p>
                      <p className="fw-500 txt-right">
                        {ukupna_cijena_sa_pdv ? ukupna_cijena_sa_pdv : ''}{' '}
                        {ukupna_cijena_sa_pdv ? (
                          <span className="txt-up txt-light">Eur</span>
                        ) : (
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {opis && (
                    <>
                      <p className="fw-500">Napomena:</p>
                      <p className="txt-light mb-25">{opis}</p>
                    </>
                  )}
                  <div className="row">
                    <div className="col-md-4">
                      {/* ------------------ QR CODE ------------------ */}
                      {jikr && ikof ? (
                        <QRCode value="Set url here" size="64" />
                      ) : null}

                      {/*------------------ QR CODE ------------------*/}
                    </div>
                    <div className="col-md-8">
                      <div className="df jc-sb">
                        <div className="df fd-column">
                          <p className="txt-light">{jikr ? 'JIKR' : ''}</p>
                          <p className="txt-light">{ikof ? 'IKOF' : ''}</p>
                        </div>
                        <div className="df fd-column">
                          <p className="txt-right">{jikr ? jikr : ''}</p>
                          <p className="txt-right">{ikof ? ikof : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      className="btn btn__transparent btn__xl ml-m"
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
