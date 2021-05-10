import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { RACUNI } from '../../../constants/routes';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
import { getRacun } from '../../../store/actions/RacuniActions';
import { useRouteMatch } from 'react-router-dom';

import NoviRacunPrintTemplate from './NoviRacunPrintTemplate';
//import NoviRacunPreviewStavkaTemplate from './NoviRacunPreviewStavkaTemplate';
import {
  formatirajCijenu,
  formatirajCijenuBezE,
} from './../../../helpers/racuni';
import { userSelector } from '../../../store/selectors/UserSelector';
import QRCode from 'react-qr-code';

const NoviRacunShowTemplate = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  const racun = useSelector(racunSelector());
  const user = useSelector(userSelector());

  console.log('user', user);

  useEffect(() => {
    if (params.id) dispatch(getRacun(params.id));
  }, [params, dispatch]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  var ukupnoSaPdvIpopusta = 0;

  var ukupniPorezi = 0;
  var porezi = [];
  var poreziUkupno = [];
  for (let index = 0; index < 5; index++) {
    porezi[index] = 0;
    poreziUkupno[index] = 0;
  }
  var indeksi = [];
  const stavke = racun.stavke;
  for (const i in stavke) {
    if (Object.hasOwnProperty.call(stavke, i)) {
      const stavka = stavke[i];
      indeksi.push(stavka.porez_id);
      ukupnoSaPdvIpopusta +=
        Number(stavka.cijena_sa_pdv_popust) * Number(stavka.kolicina);
      porezi[stavka.porez_id] +=
        Number(stavka.pdv_iznos) * Number(stavka.kolicina);
      poreziUkupno[stavka.porez_id] +=
        Number(stavka.cijena_sa_pdv_popust) * Number(stavka.kolicina);
      // ukupniPorezi += Number(stavka.pdv_iznos)*Number(stavka.kolicina);
    }
  }
  for (let index = 0; index < 5; index++) {
    ukupniPorezi += Math.round(porezi[index] * 100) / 100;
  }
  function vratiUkupnoPlacanje() {
    let ukupnoPlacanje = 0;
    for (let p in racun.stavke) {
      ukupnoPlacanje += Number(
        racun.stavke[p].cijena_sa_pdv_popust * racun.stavke[p].kolicina
      );
    }
    return ukupnoPlacanje;
  }
  const ukPlati = vratiUkupnoPlacanje();
  // const stavke=racun.stavke;
  console.log('racuntttt', stavke);
  // const pojedinacnaStavka = Object.keys(stavke).(racun.stavke).map((stavkaId) => (
  //   (racun.stavke).map((stavkaId) => {
  //     let stavka = racun.stavke[stavkaId];
  //   <NoviRacunPreviewStavkaTemplate
  //     key={'stavka_' + stavkaId}
  //     stavka={stavke[stavkaId]}
  //   />
  // ));
  console.log(
    'racun',
    racun,
    ukPlati,
    ukupnoSaPdvIpopusta,
    ukupniPorezi,
    porezi
  );

  return (
    <>
      <div className="screen-content">
        <Link to={RACUNI.INDEX} className="back-link df">
          <LinkSvg /> <p>Povratak na Račune</p>
        </Link>
        <div className="title jc-sb">
          <div className="df jc-end" style={{ width: '100%' }}>
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
          </div>
        </div>
        <div
          className="main-content__box"
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            marginBottom: '3rem',
            width: '100%',
          }}
        >
          <div style={{ display: 'none' }}>
            <NoviRacunPrintTemplate ref={componentRef} racun={racun} />
          </div>

          <div className="fiscal-bill">
            <div className="fiscal-page">
              <div className="fiscal-bill__header">
                {/* <div className="fiscal-bill__header--logo">
                  <img src="https://picsum.photos/seed/picsum/200/100" alt="logo" />
                </div> */}
                <div className="fiscal-bill__header--info">
                  <p>
                    {' '}
                    {racun.preduzece && racun.preduzece.kratki_naziv
                      ? racun.preduzece.kratki_naziv
                      : ''}
                  </p>
                  <p>
                    {' '}
                    {racun.preduzece && racun.preduzece.adresa
                      ? racun.preduzece.adresa
                      : ''}
                  </p>
                  <p>
                    {' '}
                    {racun.preduzece && racun.preduzece.grad
                      ? racun.preduzece.grad
                      : ''}
                    , &nbsp;
                    {racun.preduzece && racun.preduzece.drzava
                      ? racun.preduzece.drzava
                      : ''}
                  </p>
                  <p>
                    PIB:{' '}
                    {racun.preduzece && racun.preduzece.pib
                      ? racun.preduzece.pib
                      : ''}
                  </p>
                </div>
                <span>
                  Operater:{' '}
                  {user && user.ime ? user.ime + ' ' + user.prezime : '-'}
                  {user && user.kod_operatera
                    ? ' (' + user.kod_operatera + ')'
                    : '-'}
                </span>
              </div>

              <div className="fiscal-bill__body">
                <table cellspacing="0" cellpadding="0">
                  {racun && racun?.stavke?.length > 0
                    ? Object.keys(racun.stavke).map((stavkaId) => {
                        const stavka = racun.stavke[stavkaId];

                        return (
                          <>
                            <tr>
                              <td className="left">
                                <p className="txt-dark">{stavka.naziv}</p>
                                <p className="txt-dark">
                                  {stavka.kolicina == 1
                                    ? ''
                                    : stavka.kolicina +
                                      ' x ' +
                                      Number(stavka.cijena_sa_pdv)
                                        .toFixed(2)
                                        .replace('.', ',')}
                                </p>
                                <p className="txt-light">{stavka.opis}</p>
                              </td>

                              <td className="right">
                                {Number(stavka.popust_procenat) > 0 ||
                                Number(stavka.popust_iznos) > 0
                                  ? (
                                      Number(stavka.cijena_sa_pdv_popust) *
                                      Number(stavka.kolicina)
                                    )
                                      .toFixed(2)
                                      .replace('.', ',')
                                  : (
                                      Number(stavka.cijena_sa_pdv) *
                                      Number(stavka.kolicina)
                                    )
                                      .toFixed(2)
                                      .replace('.', ',')}
                              </td>
                            </tr>
                            {(Number(stavka.popust_procenat) > 0 ||
                              Number(stavka.popust_iznos) > 0) && (
                              <tr className="side-info__info--inner-wrapper mb-0">
                                <td className="left">
                                  <p className="ml-15 txt-dark">
                                    Kol <span>x</span> Cijena
                                  </p>
                                </td>
                                <td className="right">
                                  {Number(stavka.kolicina)
                                    .toFixed(2)
                                    .replace('.', ',')}{' '}
                                  x{' '}
                                  {Number(stavka.cijena_sa_pdv)
                                    .toFixed(2)
                                    .replace('.', ',')}
                                </td>
                              </tr>
                            )}

                            {(stavka.popust_iznos > 0 ||
                              stavka.popust_procenat > 0) && (
                              <>
                                <tr>
                                  <td className="right">
                                    <p className="txt-dark">
                                      Popust{' '}
                                      {Number(stavka.popust_procenat) > 0
                                        ? Number(stavka.popust_procenat) + '%'
                                        : 'u iznosu'}
                                    </p>
                                  </td>
                                  <td className="left">
                                    {'-'}
                                    {(
                                      (Number(stavka.cijena_sa_pdv) -
                                        Number(stavka.cijena_sa_pdv_popust)) *
                                      Number(stavka.kolicina)
                                    )
                                      .toFixed(2)
                                      .replace('.', ',')}
                                  </td>
                                </tr>

                                <tr>
                                  <td className="left">
                                    <p className="ml-15 txt-dark">
                                      Cijena sa popustom{' '}
                                    </p>
                                  </td>
                                  <td className="right">
                                    {(
                                      Number(stavka.cijena_sa_pdv_popust) *
                                      Number(stavka.kolicina)
                                    )
                                      .toFixed(2)
                                      .replace('.', ',')}
                                  </td>
                                </tr>
                              </>
                            )}
                          </>
                        );
                      })
                    : null}
                  {/* kraj */}
                </table>

                {/* <table>
                {Object.keys(stavke).map((stavkaId) => {
                  const por = stavke[stavkaId];

                  return (<p>tttt</p>);
                })}
              </table> */}
                <table>
                  {Object.keys(porezi).map((porezId) => {
                    const porez = porezi[porezId];

                    if (indeksi.includes(Number(porezId))) {
                      return (
                        <>
                          <tr>
                            <td className="left nowrap">
                              {porezId === '1'
                                ? 'Ukupno za Oslobođen PDV-a'
                                : porezId === '2'
                                ? 'Ukupno za PDV 0%'
                                : porezId === '3'
                                ? 'Ukupno za PDV 7%'
                                : 'Ukupno za PDV 21%'}
                            </td>
                            <td className="right nowrap">
                              {poreziUkupno[porezId]
                                .toFixed(2)
                                .replace('.', ',')}
                            </td>
                          </tr>
                          <tr>
                            <td className="left">
                              {porezId === '1'
                                ? 'Oslobođen PDV-a'
                                : porezId === '2'
                                ? 'PDV 0%'
                                : porezId === '3'
                                ? 'PDV 7%'
                                : 'PDV 21%'}
                            </td>
                            <td className="right nowrap">
                              {porez.toFixed(2).replace('.', ',')}
                            </td>
                          </tr>
                        </>
                      );
                    }
                  })}
                </table>

                <table cellspacing="0" cellpadding="0">
                  <div className="side-info__wrapper"></div>
                </table>
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <td className="left">Ukupan PDV</td>
                    <td className="right nowrap">
                      {racun &&
                        Number(ukupniPorezi).toFixed(2).replace('.', ',')}
                    </td>
                  </tr>
                  <tr>
                    <td className="left">
                      <h2>Ukupno za plaćanje</h2>
                    </td>
                    <td className="right">
                      <h2 className="nowrap">
                        {racun && formatirajCijenu(ukPlati)}
                      </h2>
                    </td>
                  </tr>
                </table>
              </div>

              <div className="fiscal-bill__footer">
                <p>Br. računa: {racun && racun.broj_racuna}</p>
                <p>IKOF: {racun && racun.ikof ? racun.ikof : '-'}</p>
                <p>JIKR: {racun && racun.jikr ? racun.jikr : '-'}</p>
                <p>
                  Datum:{' '}
                  {racun && racun.datum_izdavanja ? racun.datum_izdavanja : '-'}
                </p>
              </div>
              <div className="fiscal-bill__footer--qr-code">
                {/* ------------------ QR CODE ------------------ */}
                {racun && racun.jikr && racun.ikof ? (
                  <QRCode value={racun && racun.qr_url} size="128" />
                ) : null}

                {/*------------------ QR CODE ------------------*/}
              </div>
              {/* <div className="col-md-4">
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoviRacunShowTemplate;
