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

const NoviRacunShowTemplate = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const racun = useSelector(racunSelector());

  useEffect(() => {
    if (params.id) dispatch(getRacun(params.id));
  }, [params, dispatch]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log('racun', racun);

  return (
    <>
      <div className="screen-content">
        <Link to={RACUNI.INDEX} className="link df">
          <LinkSvg /> <p>Povratak na Račune</p>
        </Link>
      </div>

      <div className="title jc-sb">
        <div className="df jc-end" style={{ width: '100%' }}>
          <button className="btn btn__transparent  mr-m" onClick={handlePrint}>
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

        <div className="fiscal-bill-wrapper">
          <div className="fiscal-bill">
            <div className="fiscal-bill__header">
              <div className="fiscal-bill__header--logo">
                {/* <img src="https://picsum.photos/seed/picsum/200/100" alt="logo" /> */}
              </div>
              <div className="fiscal-bill__header--info">
                <p>
                  {' '}
                  {racun.preduzece && racun.preduzece.puni_naziv
                    ? racun.preduzece.puni_naziv
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
                {racun && racun.kod_operatera ? racun.kod_operatera : '-'}
              </span>
            </div>

            <div className="fiscal-bill__body">
              <table cellspacing="0" cellpadding="0">
                {racun && racun?.stavke?.length > 0
                  ? racun?.stavke?.map((stavka) => {
                      return (
                        <tr>
                          <td className="left">{stavka.naziv}</td>
                          <td className="right">{stavka.cijena_sa_pdv}</td>
                        </tr>
                      );
                    })
                  : null}
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">Osnovica za PDV 21%</td>
                  <td className="right">
                    {racun && racun.ukupna_cijena_bez_pdv}
                  </td>
                </tr>
                <tr>
                  <td className="left">Iznos PDV 21%</td>
                  <td className="right">{racun && racun.ukupan_iznos_pdv}</td>
                </tr>
                <tr>
                  <td className="left">Ukupno sa PDV</td>
                  <td className="right">
                    {racun && racun.ukupna_cijena_sa_pdv}
                  </td>
                </tr>
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">
                    <h2>Ukupno</h2>
                  </td>
                  <td className="right">
                    <h2>{racun && racun.ukupna_cijena_sa_pdv}</h2>
                  </td>
                </tr>
              </table>
            </div>
            <div className="fiscal-bill__footer">
              <p>Br. računa: {racun && racun.broj_racuna}</p>
              <p>IKOF: {racun && racun.iko ? racun.iko : '-'}</p>
              <p>JIKR: {racun && racun.jikr ? racun.jikr : '-'}</p>
              <div className="fiscal-bill__footer--qr-code"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoviRacunShowTemplate;
