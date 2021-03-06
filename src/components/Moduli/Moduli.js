import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/UserSelector';

const Moduli = () => {
  let user = useSelector(userSelector());

  return (
    <>
      <div className="title">
        <h1 className="heading-primary">Paketi i moduli u ponudi</h1>
      </div>
      <hr />
      <div className="screen-content">
        <div className="box-modules-wrapper">
          <div className="title">
            <h2 className="heading-secondary fw-500">Paketi</h2>
            {/* <button className="btn btn__primary">Promijeni paket</button> */}
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className={`box-modules ${user?.paket === 1 ? 'active' : ''}`}
              >
                <h3 className="heading-tertiary fw-500">Osnovni Modul</h3>
                <p className="txt-light fw-400">Mjesečno 10,00 EUR + PDV</p>
                <span className="mark"></span>
                <hr />
                <ul className="box-modules__items">
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Elektronska Fiskalizacija računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Gotovinsko izdavanje računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Unos depozita
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Blagajna
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Bezgotovinsko izdavanje računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Slanje računa putem platforme na email adresu kupca
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Kreiranje predračuna
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Kreiranje radne verzije računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Praćenje statusa plaćanja bezgotovinskih računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Automatski prijem ulaznih računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Partneri – kupci, dobavljači – adresar svih preduzeća
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Artikli – usluge i robe
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Popusti na kategorije, grupe i pojedinačne atribute roba i
                    usluga
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Izvještaji
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Android POS aplikacija
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Android Offline režim rada
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Razgovori / komentari između korisnika i tehničke podrške -
                    uskoro
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Licenca za jedan uređaj i rad sa više operatera na jednom
                    uređaju i rad po smjenama
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className={`box-modules ${user?.paket === 2 ? 'active' : ''}`}
              >
                <h3 className="heading-tertiary fw-500 df">
                  Start
                  <span className="tag tag__success">Preporučujemo</span>
                </h3>
                <p className="txt-light fw-400">Mjesečno 20,00 EUR + PDV</p>
                <span className="mark"></span>
                <hr />
                <ul className="box-modules__items">
                  <p>Sve iz osnovnog modula plus:</p>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Dodavanje Ulaznih računa + upload računa (pdf, doc itd)
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Smještajni kapacitet za čuvanje dokumenatacijea
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Ugovori i automatsko kreiranje i slanje računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Automatsko slanje podsjetnika za plaćanje
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Pregled za knjigovođu
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Stanje zaliha
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    PDV proračun
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Odabir više izgleda računa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Prilagođavanje izgleda platforme bojama preduzeća
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Obavještavanje (notifikacije) putem emaila i unutar
                    aplikacije za sve promjene
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Mogućnost dodavanja više korisnika sa različitim nivoima
                    pristupa
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    iOS i Android korisnička aplikacija
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Licenca za 2 uređaja i rad više operatera po smjenama
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className={`box-modules ${user?.paket === 3 ? 'active' : ''}`}
              >
                <h3 className="heading-tertiary fw-500">Pro</h3>
                <p className="txt-light fw-400">Mjesečno 50,00 EUR + PDV</p>
                <span className="mark"></span>
                <hr />
                <ul className="box-modules__items">
                  <p>Sve iz Start paketa, plus:</p>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Dokumenta – kreiranje i smještanje
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Generisanje PDV prijave
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Neograničeni smještajni kapacitet za čuvanje dokumenatacije
                    (ulaznih računa, ugovora itd)
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Mogućnost uvezivanja više preduzeća u okviru istog
                    korisničkog naloga
                  </li>
                  <li className="box-modules__item">
                    <span>
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 5.66669L3.99992 8.33335L10.6666 1.66669"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Licenca za 5 uređaja i rad više operatera po smjenama
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="box-modules-wrapper">
          <div className="title">
            <h2 className="heading-secondary fw-500">
              Moduli
              <p className="txt-light">
                U narednom periodu biće dostupni razni moduli za unapređenje
                poslovanja
              </p>
            </h2>
            {/* <button className="btn btn__primary">Naruči module</button> */}
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Skladište / Magacin</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Modul za kompletno upravljanje magacinom i zalihama
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Servis</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Modul za poslovanje servisa, kreiranje naloga, praćenje
                  statusa i sl.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Proizvodnja</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Modul za kompletno upravljanje procesom proizvodnje
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Veleprodaja</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Modul za poslovanje veleprodaje, izdavanje otpremnica, rabati
                  i sl.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">
                  Business to Business B2B
                </h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Poslovanje i razmjena podataka između kupaca i dobavljača
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Arhiva</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Čuvanje i kategorisanje dokumentacije sa pretragom
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Nalozi</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Kreiranje i evidencija raznih vrsta naloga, putnih, radnih i
                  sl.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">HR + Obračun zarada</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Evidencija zaposlenih i obračun zarada sa kreiranjem poreskih
                  prijava
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Osnovna sredstva</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Evidencija o osnovnim sredstvima preduzeća
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box-modules">
                {' '}
                {/* active */}
                <h3 className="heading-tertiary fw-500">
                  Veći prostor za dokumenta
                </h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Zakup većeg smještajnog kapaciteta za smještanje dokumentacije
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                {' '}
                {/* active */}
                <h3 className="heading-tertiary fw-500">
                  Veći broj poslatih računa
                </h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Veći broj poslatih automatizovanih računa na mjesečnom nivou
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">
                  Napredno izvještavanje
                </h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Izvještaji za napredni pregled procesa i stanja u preduzeću
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">Zatvaranje godine</h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Završni račun, bilans stanja i uspjeha i sl.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-modules">
                <h3 className="heading-tertiary fw-500">
                  Custom izgled računa
                </h3>
                <p className="txt-light">Cijena će biti objavljena</p>
                <span className="mark"></span>
                <hr />
                <p className="fw-400">
                  Podešavanje izgleda računa u skladu sa vizuelnim identitetom
                  preduzeća
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moduli;
