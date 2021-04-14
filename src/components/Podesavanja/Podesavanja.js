import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/UserSelector';
import noLogo from '../../assets/img/no-logo.png';
import invoicePicture from '../../assets/img/invoice-1.jpg';
import DropDownStatic from '../shared/forms/DropDownStatic';
import { podesavanjaService } from '../../services/PodesavanjaService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

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

const Podesavanja = () => {
  const user = useSelector(userSelector());
  const history = useHistory();

  const [korisniciVisible, setKorisniciVisible] = useState(false);

  const [digitalniPecatFile, setDigitalniPecatFile] = useState();
  const [digitalniPotpisFile, setDigitalniPotpisFile] = useState();
  const [sifraDigitalniPecat, setSifraDigitalniPecat] = useState();
  const [sifraDigitalniPotpis, setSifraDigitalniPotpis] = useState();

  const [imePrezime, setImePrezime] = useState();
  const [email, setEmail] = useState();
  const [tipKorisnika, setTipKorisnika] = useState('default');
  const [slanjeRacunaKupcu, setSlanjeRacunaKupcu] = useState(false);

  const godina = new Date().getFullYear();
  const [redniBrojRacuna, setRedniBrojRacuna] = useState(1);
  const [softwareKod, setSoftwareKod] = useState();
  const [enu, setEnu] = useState();
  const [kodPj, setKodPj] = useState();
  const [kodOp, setKodOp] = useState();

  const [podesavanjeUcitano, setPodesavanjeUcitano] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    podesavanjaService
      .showPodesavanja()
      .then((data) =>
        setPodesavanjeUcitano(
          data.data.find(
            (podesavanje) => podesavanje.preduzece_id === user?.preduzeca[0]?.id
          )
        )
      );

    if (podesavanjeUcitano) {
      podesavanjaService
        .updatePreduzece({
          id: podesavanjeUcitano?.id,
          redni_broj: redniBrojRacuna,
          izgled_racuna: 'default',
          slanje_kupcu: slanjeRacunaKupcu,
          preduzece_id: user?.preduzeca[0]?.id,
          pecat: digitalniPecatFile,
          sertifikat: digitalniPotpisFile,
          pecat_sifra: sifraDigitalniPecat,
          sertifikat_sifra: sifraDigitalniPotpis,
          enu_kod: enu,
          software_kod: softwareKod,
          kod_operatera: kodOp,
          jezik: 'ME',
          mod: 'Svijetli',
          boja: 'default',
        })
        .then((data) => console.log('response data:', data))
        .catch((error) => {
          console.error('error', error);
          toast.error(
            'Greška prilikom unosa podešavanja: ' + error,
            toastSettings
          );
        });
    }

    podesavanjaService
      .storePreduzece({
        id: podesavanjeUcitano.id,
        redni_broj: redniBrojRacuna,
        izgled_racuna: 'default',
        slanje_kupcu: slanjeRacunaKupcu,
        preduzece_id: user?.preduzeca[0]?.id,
        pecat: digitalniPecatFile,
        sertifikat: digitalniPotpisFile,
        pecat_sifra: sifraDigitalniPecat,
        sertifikat_sifra: sifraDigitalniPotpis,
        enu_kod: enu,
        software_kod: softwareKod,
        kod_operatera: kodOp,
        jezik: 'ME',
        mod: 'Svijetli',
        boja: 'default',
      })
      .then((data) => console.log('response data:', data))
      .catch((error) => {
        console.error('error', error);
        toast.error(
          'Greška prilikom unosa podešavanja: ' + error,
          toastSettings
        );
      });
  };

  const handleUkloniKorisnika = (user) => {
    podesavanjaService
      .deleteKorisnika(user.id)
      .then((data) =>
        toast.error(
          'Obrisan korisnik pod nazivom: ' + user?.ime + ' ' + user?.prezime,
          toastSettings
        )
      );
  };

  const handleKorisnik = (e) => {
    e.preventDefault();
    podesavanjaService
      .storePreduzeceKorisnik({
        puno_ime: imePrezime,
        email,
        uloga: tipKorisnika,
        preduzece_id: user?.preduzeca[0]?.id,
      })
      .then((data) => console.log('response data:', data))
      .catch((error) => {
        console.error('error', error);
        toast.error(
          'Greška prilikom unosa podešavanja: ' + error,
          toastSettings
        );
      });
  };

  const TIPOVI_KORISNIKA = [
    { value: 'default', label: 'Default' },
    { value: 'gost', label: 'Gost' },
    { value: 'kasir', label: 'Kasir' },
    { value: 'knjigovodja', label: 'Knjigovodja' },
    { value: 'superAdmin', label: 'SuperAdmin' },
    { value: 'vlasnik', label: 'Vlasnik' },
    { value: 'zaposleni', label: 'Zaposleni' },
  ];

  const getBank = (broj_racuna) => {
    if (broj_racuna) {
      const prvaTri = broj_racuna.substring(0, 3);

      if (prvaTri.includes('550')) {
        return 'Podgorička';
      } else if (prvaTri.includes('535')) {
        return 'Prva';
      } else if (prvaTri.includes('555')) {
        return 'Addiko';
      } else if (prvaTri.includes('510')) {
        return 'CKB';
      } else if (prvaTri.includes('530')) {
        return 'Montenegro AD';
      } else if (prvaTri.includes('540')) {
        return 'ERSTE';
      } else if (prvaTri.includes('520')) {
        return 'Hipotekarna';
      }
    }
  };

  console.log('user', user);
  return (
    <>
      <div className="title">
        <h1 className="heading-primary">Podešavanja</h1>
      </div>
      <hr />
      <div className="screen-content">
        <div className="main-content__box">
          <div className="content">
            <button
              className="btn btn__dark content__btn"
              onClick={history.push(
                `/preduzeca/edit/${user?.preduzeca[0]?.id}`
              )}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon__light lg"
              >
                <g id="pencil">
                  <path
                    id="Subtract"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0128 4.59862L11.7071 4.29293C11.5196 4.1054 11.2652 4.00004 11 4.00004H6C5.20435 4.00004 4.44129 4.31611 3.87868 4.87872C3.31607 5.44133 3 6.20439 3 7.00004V18C3 18.7957 3.31607 19.5588 3.87868 20.1214C4.44129 20.684 5.20435 21 6 21H17C17.7957 21 18.5587 20.684 19.1213 20.1214C19.6839 19.5588 20 18.7957 20 18V13C20 12.7348 19.8946 12.4805 19.7071 12.2929L19.3931 11.9789L17.9789 13.3931L18 13.4143V18C18 18.2653 17.8946 18.5196 17.7071 18.7071C17.5196 18.8947 17.2652 19 17 19H6C5.73478 19 5.48043 18.8947 5.29289 18.7071C5.10536 18.5196 5 18.2653 5 18V7.00004C5 6.73482 5.10536 6.48047 5.29289 6.29293C5.48043 6.1054 5.73478 6.00004 6 6.00004H10.5858L10.5986 6.01283L12.0128 4.59862ZM21.1156 7.12664L21.1359 7.10669L21.1558 7.08682C21.4204 6.81979 21.6325 6.50527 21.781 6.15954C21.9382 5.79353 22.021 5.39987 22.0245 5.00153C22.0279 4.60319 21.952 4.20815 21.8012 3.83947C21.6503 3.47078 21.4276 3.13582 21.1459 2.85414C20.8642 2.57247 20.5293 2.34971 20.1606 2.19886C19.7919 2.04802 19.3968 1.97212 18.9985 1.97558C18.6002 1.97904 18.2065 2.0618 17.8405 2.21902C17.4774 2.37499 17.1488 2.60114 16.8734 2.88445L13.586 6.17183L13.5775 6.16337L12.1633 7.57758L12.1718 7.58604L8.29289 11.4649C8.10536 11.6525 8 11.9068 8 12.172V15C8 15.5523 8.44772 16 9 16H11.828C12.0932 16 12.3476 15.8947 12.5351 15.7071L16.414 11.8283L16.4142 11.8284L17.8284 10.4142L17.8282 10.414L21.1156 7.12664ZM19.0159 3.9755C19.1487 3.97435 19.2803 3.99965 19.4032 4.04993C19.5261 4.10021 19.6378 4.17446 19.7317 4.26836C19.8256 4.36225 19.8998 4.4739 19.9501 4.5968C20.0004 4.7197 20.0257 4.85138 20.0245 4.98415C20.0234 5.11693 19.9958 5.24815 19.9434 5.37016C19.891 5.49216 19.8148 5.6025 19.7193 5.69475L19.7069 5.70693L16.414 8.99983L16.4058 8.99164L14.9916 10.4059L14.9998 10.414L11.4138 14H10V12.5863L10.6089 11.9774L10.6086 11.9772L17.682 4.9038L17.6822 4.90402L18.2931 4.29315L18.3053 4.28075C18.3975 4.18524 18.5079 4.10906 18.6299 4.05665C18.7519 4.00424 18.8831 3.97666 19.0159 3.9755Z"
                    fill="black"
                  />
                </g>
              </svg>
              Izmijeni
            </button>
            <form className="form" action="">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mt-25">
                    <h2 className="heading-secondary">Preduzeće</h2>
                    <p className="txt-light">Informacije o preduzeću</p>
                  </div>
                  <div className="col-md-8 mt-25">
                    <div className="content__logo">
                      <img
                        src={
                          user?.preduzeca[0].length !== 0
                            ? user?.preduzeca[0]?.logotip
                            : noLogo
                        }
                        alt="logo"
                      />
                    </div>
                    <p className="w-50">
                      {user?.preduzeca[0]?.kratki_naziv +
                        ' - ' +
                        user?.preduzeca[0]?.opis}
                    </p>
                    <div className="mb-20">
                      <p className="txt-light">{user?.preduzeca[0]?.djelatnost}</p>
                      <p className="txt-light">{user?.preduzeca[0]?.adadresa}</p>
                      <p className="txt-light">
                        {user?.preduzeca[0]?.grad +
                          ', ' +
                          user?.preduzeca[0]?.drzava}
                      </p>
                    </div>
                    <div className="df">
                      <div className="side-info__wrapper w-50 mr-15">
                        <div className="side-info__info--inner-wrapper">
                          <div className="col-l">
                            <p className="txt-light txt-up">pib</p>
                          </div>
                          <div className="col-r">
                            <p className="fw-500">{user?.preduzeca[0]?.pib}</p>
                          </div>
                        </div>
                        <div className="side-info__info--inner-wrapper">
                          <div className="col-l">
                            <p className="txt-light txt-up">pdv</p>
                          </div>
                          <div className="col-r">
                            <p className="fw-500">{user?.preduzeca[0]?.pdv}</p>
                          </div>
                        </div>
                        <div className="side-info__info--inner-wrapper">
                          <div className="col-l">
                            <p className="txt-light txt-up">IBAN</p>
                          </div>
                          <div className="col-r">
                            <p className="fw-500">{user?.preduzeca[0]?.iban}</p>
                          </div>
                        </div>
                        <div className="side-info__info--inner-wrapper">
                          <div className="col-l">
                            <p className="txt-light txt-up">BIC/SWIFT</p>
                          </div>
                          <div className="col-r">
                            <p className="fw-500">
                              {user?.preduzeca[0]?.bic_swift}
                            </p>
                          </div>
                        </div>
                      </div>
                      {user?.preduzeca[0]?.ziro_racuni?.length === 0 && (
                        <div className="side-info__wrapper w-50">
                          <div className="side-info__info--inner-wrapper">
                            <div className="col-l">
                              <p className="txt-light txt-up">
                                Preduzeće nema dodat nijedan račun!
                              </p>
                            </div>
                            <div className="col-r">
                              <p className="fw-500"></p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="side-info__wrapper w-50">
                        {user?.preduzeca[0]?.ziro_racuni?.map((racun) => (
                          <div className="side-info__info--inner-wrapper">
                            <div className="col-l">
                              <p className="txt-light txt-up">{() => getBank()}</p>
                            </div>
                            <div className="col-r">
                              <p className="fw-500">{racun.broj_racuna}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-xl-4">
                    <h2 className="heading-secondary">Računi</h2>
                    <p className="mob-mb-20 txt-light">Podešavanja računa</p>
                  </div>
                  <div className="col-md-8 col-xl-8">
                    <div className="form__group w-48 mob-w-100">
                      <label className="form__label" for="no">
                        Redni broj računa počinje od
                      </label>
                      <input
                        type="text"
                        className="form__input"
                        id="redni_broj_racuna"
                        name="redni_broj_racuna"
                        onChange={(e) => setRedniBrojRacuna(e.target.value)}
                        value={redniBrojRacuna}
                      />
                    </div>
                    <div className="form__group mob-w-100 mb-30">
                      <label className="form__label" for="">
                        Slanje računa kupcu
                      </label>
                      <div className="form__checkbox-group">
                        <input
                          className="form__checkbox"
                          type="checkbox"
                          name="whatsApp"
                          id="whatsAppCI"
                          onChange={(e) => {
                            setSlanjeRacunaKupcu(e.target.checked);
                          }}
                        />
                        <label className="form__checkbox-label" for="whatsAppCI">
                          Pošalji račun kupcu odmah pri kreiranju
                        </label>
                      </div>
                    </div>
                    <div className="mb-10">
                      <p className="mb-20">
                        Izgled računa
                        <span className="tag tag__neutral ml-m">Start</span>
                      </p>
                      <div className="content__box-wrapper">
                        <div className="content__box active-invoice-layout">
                          <img src={invoicePicture} alt="racun_tip_1" />
                        </div>
                      </div>
                    </div>
                    <p>
                      Jedinistveni izgled računa prilagođen vizuelnom identitetu
                      vašeg preduzeća dostupan je u dodatnom
                      <a
                        href="http://"
                        target="_blank"
                        className="btn btn__link"
                        rel="noopener noreferrer"
                      >
                        modulu
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-xl-4">
                    <h2 className="heading-secondary">SEP portal kodovi</h2>
                    <p className="mb-10 txt-light">
                      Kodovi potrebni za funkcionisanje aplikacije koji se
                      dobijaju sa SEP portala Uprave prihoda
                    </p>
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn__link mob-mb-20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="icon icon__stroke-link sm mr-xs"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="btn btn__link success">SEP portal</span>
                    </a>
                  </div>
                  <div className="col-md-8 col-xl-8">
                    <div className="df jc-sb mob-fd-column">
                      <div className="form__group w-48 mob-w-100">
                        <div className="df jc-sb">
                          <label className="form__label" for="enu">
                            ENU kod
                          </label>
                          <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn__link mb-7"
                          >
                            <span className="btn btn__link success">Portal</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="icon icon__stroke-link sm ml-s"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form__input"
                          id="enu"
                          name="enu"
                          onChange={(e) => setEnu(e.target.value)}
                          value={enu}
                        />
                      </div>
                      <div className="form__group w-48 mob-w-100">
                        <div className="df jc-sb">
                          <label className="form__label" for="software">
                            Sofware kod
                          </label>
                          <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn__link mb-7"
                          >
                            <span className="btn btn__link success">Portal</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="icon icon__stroke-link sm ml-s"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form__input"
                          name="software_kod"
                          id="software_kod"
                          onChange={(e) => setSoftwareKod(e.target.value)}
                          value={softwareKod}
                        />
                      </div>
                    </div>
                    <div className="df jc-sb mob-fd-column">
                      <div className="form__group w-48 mob-w-100">
                        <div className="df jc-sb">
                          <label className="form__label" for="kodpj">
                            Kod PJ
                          </label>
                          <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn__link mb-7"
                          >
                            <span className="btn btn__link success">Portal</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="icon icon__stroke-link sm ml-s"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form__input"
                          name="kodpj"
                          id="kodpj"
                          onChange={(e) => setKodPj(e.target.value)}
                          value={kodPj}
                        />
                      </div>
                      <div className="form__group w-48 mob-w-100">
                        <div className="df jc-sb">
                          <label className="form__label" for="kodop">
                            Kod operatera
                          </label>
                          <a
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn__link mb-7"
                          >
                            <span className="btn btn__link success">Portal</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="icon icon__stroke-link sm ml-s"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form__input"
                          name="kodop"
                          id="kodop"
                          onChange={(e) => setKodOp(e.target.value)}
                          value={kodOp}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 col-xl-4">
                      <h2 className="heading-secondary">Certifikati</h2>
                      <p className="mb-10 txt-light">
                        Elektronski certifikati za digitalni potpis (za
                        bezgotovinsko izdavanje računa) i digitalni pečat (za
                        gotovinsko izdavanje računa)
                      </p>
                      <a
                        href="https://postacg.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn__link mob-mb-20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="icon icon__stroke-link sm mr-xs"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="btn btn__link success">
                          Pošta Crne Gore
                        </span>
                      </a>
                    </div>
                    <div className="col-md-8 col-xl-8">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <label className="form__label" for="d-signature">
                            Digitalni potpis
                          </label>
                          <span className="form__file">
                            <input
                              type="file"
                              className="form__input"
                              id="d-signature"
                              onChange={(e) =>
                                setDigitalniPotpisFile(e.target.files[0])
                              }
                            />
                          </span>
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <label className="form__label" for="sifraDigitalniPotpis">
                            Šifra za digitalni potpis
                          </label>
                          <input
                            type="text"
                            className="form__input"
                            name="sifraDigitalniPotpis"
                            id="sifraDigitalniPotpis"
                            onChange={(e) =>
                              setSifraDigitalniPotpis(e.target.value)
                            }
                            value={sifraDigitalniPotpis}
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <label className="form__label" for="d-stamp">
                            Digitalni pečat
                          </label>
                          <span className="form__file">
                            <input
                              type="file"
                              className="form__input"
                              id="d-stamp"
                              onChange={(e) =>
                                setDigitalniPecatFile(e.target.files[0])
                              }
                            />
                          </span>
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <label className="form__label" for="sifraDigitalniPecat">
                            Šifra za digitalni pečat
                          </label>
                          <input
                            type="text"
                            className="form__input"
                            name="sifraDigitalniPecat"
                            id="sifraDigitalniPecat"
                            onChange={(e) =>
                              setSifraDigitalniPecat(e.target.value)
                            }
                            value={sifraDigitalniPecat}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 col-xl-4">
                      <h2 className="heading-secondary">Korisnici</h2>
                      <p className="mb-10 txt-light">
                        Možete dodati nove korisnike aplikacije u okviru vašeg
                        preduzeća i tako im omogućiti upravljanje
                      </p>
                    </div>
                    <div className="col-md-4 col-xl-4">
                      <p className="mb-10">Korisnici aplikacije:</p>
                      {user?.preduzeca[0]?.users.map((korisnik, index) => (
                        <div className="df jc-sb mb-10">
                          <div>
                            <p className="fw-500">
                              {korisnik.ime + ' ' + korisnik.prezime}
                            </p>
                            <p className="txt-light">
                              {index !== 0 ? 'Suvlasnik' : 'Vlasnik'}
                            </p>
                          </div>
                          {/* <button
                            type="button"
                            className="btn btn__link danger mob-ml-10"
                            onClick={() => handleUkloniKorisnika(user)}
                          >
                            Ukloni
                          </button> */}
                        </div>
                      ))}
                      <div className="df ai-c">
                        {/* <button
                          type="button"
                          className="btn btn__link df"
                          onClick={() => setKorisniciVisible(true)}
                        >
                          <svg
                            className="icon icon__stroke-link sm"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                          <span className="btn btn__link success">
                            Kreiraj novog korisnika
                          </span>
                        </button> */}
                      </div>
                    </div>
                    {korisniciVisible && (
                      <div className="col-md-4 col-xl-4">
                        <div className="form__group mob-w-100">
                          <label className="form__label" for="user-name">
                            Ime i prezime
                          </label>
                          <input
                            type="text"
                            className="form__input"
                            id="user_name"
                            name="user_name"
                            onChange={(e) => setImePrezime(e.target.value)}
                            value={imePrezime}
                          />
                        </div>
                        <div className="form__group mob-w-100">
                          <label className="form__label" for="user-email">
                            Email korisnika
                          </label>
                          <input
                            type="text"
                            className="form__input"
                            id="user_email"
                            name="user_email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="form__group mob-w-100">
                          <label className="form__label" for="user-type">
                            Tip korisnika
                          </label>
                          <select
                            name="user_type"
                            id="user_type"
                            className="form__input"
                            onChange={(option) => {
                              console.log('option', option.target.value);
                              setTipKorisnika(option.target.value);
                            }}
                            value={tipKorisnika}
                          >
                            <option value="">Knjigovođa</option>
                            <option value="default" defaultChecked>
                              Default
                            </option>
                            <option value="gost">Gost</option>
                            <option value="kasir">Kasir</option>
                            <option value="knjigovodja">Knjigovodja</option>
                            <option value="superAdmin">SuperAdmin</option>
                            <option value="vlasnik">Vlasnik</option>
                            <option value="zaposleni">Zaposleni</option>
                          </select>
                        </div>
                        <div className="df ai-c jc-sb">
                          <button
                            className="btn btn__dark"
                            onClick={handleKorisnik}
                          >
                            Sačuvaj
                          </button>
                          <button
                            className="btn btn__link danger mb-0"
                            type="button"
                            onClick={() => setKorisniciVisible(false)}
                          >
                            Obustavi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Jezik</h2>
                      <p className="mob-mb-20 txt-light">
                        Izaberite jezik aplikacije
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="form__label">Jezik aplikacije</div>
                      <div className="form__group">
                        <div className="form__radio-group">
                          <input
                            type="radio"
                            className="form__radio-input"
                            id="mne"
                            name="language"
                            checked
                          />
                          <label
                            for="mne"
                            className="form__radio-label radio-default"
                          >
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">Crnogorski</span>
                          </label>
                        </div>
                        <div className="form__radio-group">
                          <input
                            type="radio"
                            className="form__radio-input"
                            id="eng"
                            name="language"
                            disabled
                          />
                          <label for="eng" className="form__radio-label">
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">English (soon)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                {/* <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Boje</h2>
                      <p className="mob-mb-20 txt-light">
                        Podesite boje aplikacije u skladu sa bojama Vašeg
                        preduzeća
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="content__grid">
                        <div className="content__color">
                          <div className="content__color content__color--light-blue"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--blue active-color"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--indigo"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--violet"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--purple"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--fuchsia"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--pink"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--rose"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--cyan"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--teal"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--emerald"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--green"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--lime"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--yellow"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--amber"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--orange"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--cool-gray"></div>
                        </div>
                        <div className="content__color">
                          <div className="content__color content__color--red"></div>
                        </div>

                        <div className="img-round img-round__color img-round__color--pink"></div>
                        <div className="img-round img-round__color img-round__color--cyan"></div>
                        <div className="img-round img-round__color img-round__color--teal"></div>
                        <div className="img-round img-round__color img-round__color--emerald"></div>
                        <div className="img-round img-round__color img-round__color--green"></div>
                        <div className="img-round img-round__color img-round__color--lime"></div>
                        <div className="img-round img-round__color img-round__color--yellow"></div>
                        <div className="img-round img-round__color img-round__color--amber"></div>
                        <div className="img-round img-round__color img-round__color--orange"></div>
                        <div className="img-round img-round__color img-round__color--cool-gray"></div>
                        <div className="img-round img-round__color img-round__color--red"></div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="form__footer">
                <button className="btn btn__dark btn__md" onClick={handleSubmit}>
                  Sačuvaj
                </button>
                <button
                  className="btn btn__link ml-m"
                  onClick={() => history.goBack()}
                >
                  Nazad
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podesavanja;
