import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { ReactComponent as IconPrimary } from '../../assets/icon/icon_primary.svg';
import { racuniSelector } from '../../store/selectors/RacuniSelector';
import { getRacuni } from '../../store/actions/RacuniActions';
import { racuniService } from '../../services/RacuniService';
import { ulazniRacuniService } from '../../services/UlazniRacuniService';

const Pregled = () => {
  const [racuni, setRacuni] = useState();
  const [racuniPdv, setRacuniPdv] = useState();
  const [ulazniRacuniPdv, setUlazniRacuniPdv] = useState();

  useEffect(() => {
    racuniService.getRacuniStatus().then((resp) => setRacuni(resp.data));
    racuniService.getRacuniPdv().then((resp) => setRacuniPdv(resp.data));
    ulazniRacuniService
      .getUlazniRacuniPdv()
      .then((resp) => setUlazniRacuniPdv(resp.data));
  }, []);
  console.log('racuni PDV: ', racuniPdv);
  console.log('racuni ulazni PDV: ', ulazniRacuniPdv);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-md-1 offset-xl-3"></div>
          <div className="col-md-11 col-xl-9">
            <div className="dashboard">
              <div className="dashboard-title">
                <h1 className="heading-primary">Dobar dan!</h1>
              </div>
            </div>
            <div className="dashboard__subtitle">
              <div className="dashboard__subtitle--left">
                <i className="icon lg mr-xs">
                  <IconPrimary />
                </i>
                <p className="left">Restart IT doo</p>
                <p className="right">
                  <i className="icon lg mr-xs">
                    <svg fill="none" viewBox="0 0 17 20">
                      <path
                        fill="#16A34A"
                        d="M8.68 19.813c.156 0 .4-.06.644-.186 5.557-2.91 7.344-4.365 7.344-7.871V4.393c0-1.006-.43-1.329-1.25-1.67C14.275 2.253 10.623.926 9.49.535a2.567 2.567 0 00-.81-.137c-.274 0-.547.059-.801.137C6.736.906 3.084 2.264 1.94 2.723c-.81.332-1.25.664-1.25 1.67v7.363c0 3.506 1.885 4.795 7.344 7.871.254.137.488.186.645.186zm-3.633-6.221V9.588c0-.713.293-1.065.879-1.104V7.303c0-1.856 1.113-3.106 2.754-3.106 1.64 0 2.754 1.25 2.754 3.106v1.181c.586.04.879.391.879 1.104v4.004c0 .752-.333 1.103-1.026 1.103H6.072c-.693 0-1.025-.351-1.025-1.103zM6.98 8.475h3.399v-1.29c0-1.181-.684-1.972-1.7-1.972-1.015 0-1.699.79-1.699 1.973v1.289z"
                      />
                    </svg>
                  </i>
                  Digitalni Sertifikat Validan
                </p>
              </div>
              <div className="dashboard__subtitle--right">
                <p className="left">
                  <i className="icon lg mr-xs">
                    <svg
                      className="icon__primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </i>
                  Danas /{' '}
                  <Moment locale="me" format="DD. MMM YYYY.">
                    {new Date()}
                  </Moment>
                </p>
                <div className="input-wrapper">
                  <input type="text" className="form__input bg-light" />
                  <span></span>
                </div>
              </div>
            </div>
            <hr className="mtb-30 tabp-mtb-20" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-11 col-xl-9 col-xs-12" id="main-content">
            <div className="screen-content">
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">Blagajna</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#6B7280"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm1.248-4.589c-1.916 0-3.586-1.037-4.07-3.094H5.689c-.246 0-.43-.202-.43-.457 0-.263.184-.448.43-.448h.897c0-.079-.009-.228-.009-.378s0-.263.009-.386h-.897a.435.435 0 01-.43-.449c0-.272.184-.457.43-.457h1.038c.483-2.048 2.153-3.076 4.06-3.076.448 0 .765.044.985.132.307.123.395.308.395.536 0 .308-.22.501-.545.501-.184 0-.466-.053-.844-.053-1.31 0-2.4.66-2.795 1.96h2.795c.255 0 .44.185.44.457a.437.437 0 01-.44.449H7.79c-.009.123-.009.263-.009.395 0 .123 0 .255.01.37h2.987c.255 0 .44.184.44.447 0 .255-.185.457-.44.457H7.965c.395 1.328 1.494 1.987 2.812 1.987.378 0 .65-.053.844-.053.325 0 .545.194.545.501 0 .237-.123.404-.378.51-.228.097-.562.15-1.002.15z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Stanje u blagajni
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">130,00 €</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#16A34A"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zM4.88 9.645c0-.203.07-.343.255-.528l3.058-3.076a.642.642 0 01.475-.185c.378 0 .66.282.66.66 0 .193-.089.36-.203.492L8 8.125l-1.09.914 1.916-.079h4.702a.66.66 0 01.686.686c0 .395-.281.676-.686.676H8.826l-1.925-.07L8 11.166l1.125 1.116c.123.123.202.29.202.484a.65.65 0 01-.659.668.649.649 0 01-.475-.194l-3.058-3.067c-.167-.167-.255-.325-.255-.527z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">Depozit</span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">28,00 €</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">Izdati računi</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#16A34A"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm-.993-4.668c-.299 0-.545-.123-.774-.43l-2.206-2.707a.955.955 0 01-.21-.572.71.71 0 01.703-.72c.255 0 .448.079.668.369l1.784 2.302 3.753-6.029c.167-.264.395-.404.624-.404.386 0 .747.263.747.676 0 .194-.114.396-.22.58l-4.13 6.504c-.185.29-.44.431-.74.431z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Naplaćeno
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {racuni?.ukupna_cijena_placeni.toFixed(2)}€
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#FB923C"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm-.009-7.33c-.457 0-.712-.256-.72-.722l-.115-4.79c-.008-.465.334-.8.827-.8.483 0 .843.343.834.81l-.123 4.78c-.008.475-.263.721-.703.721zm0 2.943c-.527 0-.984-.421-.984-.94 0-.519.448-.95.984-.95s.985.423.985.95c0 .527-.457.94-.985.94z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Čeka se uplata
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {racuni?.ukupna_cijena_ceka_se.toFixed(2)}€
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#DC2626"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm-3.102-5.134a.734.734 0 01-.51-1.248L8.5 9.663 5.926 7.088a.741.741 0 01-.211-.51c0-.404.325-.72.72-.72.211 0 .378.07.51.21L9.53 8.644l2.61-2.584c.15-.15.308-.22.502-.22.395 0 .72.325.72.72 0 .203-.061.36-.21.52l-2.585 2.583 2.576 2.566c.14.15.21.317.21.519a.735.735 0 01-.729.738.754.754 0 01-.518-.22l-2.576-2.575-2.557 2.576a.743.743 0 01-.536.22z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Nije moguće naplatiti
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {racuni?.ukupna_cijena_nenaplativ.toFixed(2)}€
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">PDV</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#6B7280"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm1.248-4.589c-1.916 0-3.586-1.037-4.07-3.094H5.689c-.246 0-.43-.202-.43-.457 0-.263.184-.448.43-.448h.897c0-.079-.009-.228-.009-.378s0-.263.009-.386h-.897a.435.435 0 01-.43-.449c0-.272.184-.457.43-.457h1.038c.483-2.048 2.153-3.076 4.06-3.076.448 0 .765.044.985.132.307.123.395.308.395.536 0 .308-.22.501-.545.501-.184 0-.466-.053-.844-.053-1.31 0-2.4.66-2.795 1.96h2.795c.255 0 .44.185.44.457a.437.437 0 01-.44.449H7.79c-.009.123-.009.263-.009.395 0 .123 0 .255.01.37h2.987c.255 0 .44.184.44.447 0 .255-.185.457-.44.457H7.965c.395 1.328 1.494 1.987 2.812 1.987.378 0 .65-.053.844-.053.325 0 .545.194.545.501 0 .237-.123.404-.378.51-.228.097-.562.15-1.002.15z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          PDV za{' '}
                          <Moment locale="me" format="MMMM">
                            {new Date()}
                          </Moment>
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {racuniPdv?.ukupan_iznos_poslednji_mjesec.toFixed(2)}{' '}
                          €
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#DC2626"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm4.65-8.974c0 .202-.08.36-.255.527l-3.059 3.067a.649.649 0 01-.475.194.65.65 0 01-.659-.668c0-.194.08-.36.202-.484l1.125-1.116 1.099-.914-1.916.07H5.54c-.396 0-.686-.281-.686-.676a.66.66 0 01.685-.686h4.711l1.916.08-1.099-.915-1.125-1.116a.755.755 0 01-.202-.492c0-.378.281-.66.66-.66.193 0 .351.062.474.185l3.059 3.076c.184.185.255.325.255.528z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          PDV na izlaznim računima
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {' '}
                          {racuniPdv?.ukupan_iznos_pdv.toFixed(2)} €
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <i className="box-dashboard__icon">
                        <svg fill="none" viewBox="0 0 19 19">
                          <path
                            fill="#16A34A"
                            d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zM4.88 9.645c0-.203.07-.343.255-.528l3.058-3.076a.642.642 0 01.475-.185c.378 0 .66.282.66.66 0 .193-.089.36-.203.492L8 8.125l-1.09.914 1.916-.079h4.702a.66.66 0 01.686.686c0 .395-.281.676-.686.676H8.826l-1.925-.07L8 11.166l1.125 1.116c.123.123.202.29.202.484a.65.65 0 01-.659.668.649.649 0 01-.475-.194l-3.058-3.067c-.167-.167-.255-.325-.255-.527z"
                          />
                        </svg>
                      </i>
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          PDV na ulaznim računima
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df">
                          {ulazniRacuniPdv?.ukupan_iznos_pdv.toFixed(2)} €
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">U odnosu na prošli mjesec</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Izdati računi
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df success">
                          <i>
                            <svg fill="none" viewBox="0 0 14 17">
                              <path
                                fill="#16A34A"
                                d="M6.903 16.96c.457 0 .783-.316.783-.774V4.611L7.624 2.74l2.628 2.883 2.004 1.969c.14.14.343.21.554.21.439 0 .755-.333.755-.764 0-.21-.07-.395-.237-.571L7.492.62a.796.796 0 00-.589-.264.796.796 0 00-.589.264L.487 6.466a.801.801 0 00-.246.571c0 .43.317.765.756.765.211 0 .422-.07.554-.211l2.004-1.969L6.19 2.73l-.07 1.881v11.575c0 .458.325.774.782.774z"
                              />
                            </svg>
                          </i>
                          168,00 €
                        </h2>
                        <span className="right txt-light">maj 2020</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <span className="txt-light txt-up fw-500">
                          Izdati računi
                        </span>
                      </div>
                      <div className="box-dashboard__btm">
                        <h2 className="heading-secondary df danger">
                          <i>
                            <svg fill="none" viewBox="0 0 14 17">
                              <path
                                fill="#DC2626"
                                d="M7.097.04c-.457 0-.783.316-.783.773V12.39l.062 1.872-2.628-2.883-2.004-1.969a.777.777 0 00-.554-.21.742.742 0 00-.755.764c0 .21.07.395.237.571l5.836 5.845c.167.176.369.264.589.264.22 0 .422-.088.589-.264l5.827-5.845a.801.801 0 00.246-.571.742.742 0 00-.756-.765c-.211 0-.422.07-.554.211l-2.004 1.969L7.81 14.27l.07-1.881V.813c0-.457-.325-.773-.782-.773z"
                              />
                            </svg>
                          </i>
                          168,00 €
                        </h2>
                        <span className="right txt-light">maj 2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">Najveći kupci</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <h3 className="heading-tertiary df">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="img-round sm mr-s"
                          />
                          Efel Motors
                        </h3>
                      </div>
                      <div className="box-dashboard__btm">
                        <p className="txt-light">total:</p>
                        <h2 className="heading-secondary df">1168,00 €</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <h3 className="heading-tertiary df">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="img-round sm mr-s"
                          />
                          Bonella
                        </h3>
                      </div>
                      <div className="box-dashboard__btm">
                        <p className="txt-light">total:</p>
                        <h2 className="heading-secondary df">987,00 €</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <h3 className="heading-tertiary df">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="img-round sm mr-s"
                          />
                          Tre lecce
                        </h3>
                      </div>
                      <div className="box-dashboard__btm">
                        <p className="txt-light">total:</p>
                        <h2 className="heading-secondary df">564,00 €</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-dashboard-wrapper">
                <h2 className="heading-secondary">Najveći dužnici</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <h3 className="heading-tertiary df">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="img-round sm mr-s"
                          />
                          Mašinopromet
                        </h3>
                      </div>
                      <div className="box-dashboard__btm">
                        <p className="txt-light">total:</p>
                        <h2 className="heading-secondary df">1168,00 €</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="box-dashboard">
                      <div className="box-dashboard__top">
                        <h3 className="heading-tertiary df">
                          <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            alt=""
                            className="img-round sm mr-s"
                          />
                          Telekom
                        </h3>
                      </div>
                      <div className="box-dashboard__btm">
                        <p className="txt-light">total:</p>
                        <h2 className="heading-secondary df">987,00 €</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="container">
          <div className="row">
            <div className="offset-md-1 offset-xl-3"></div>
            <div className="col-md-11 col-xl-9">
              <div className="footer">
                <div className="footer__left">
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
                  <p>Software development</p>
                </div>
                <div className="footer__right">
                  <a href="">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.42871 14.6934C4.81836 14.6934 5.10547 14.502 5.57715 14.085L7.92188 12.0205H12.0371C14.0947 12.0205 15.25 10.8311 15.25 8.80078V3.48926C15.25 1.45898 14.0947 0.269531 12.0371 0.269531H3.32129C1.27051 0.269531 0.108398 1.45898 0.108398 3.48926V8.80078C0.108398 10.8379 1.30469 12.0205 3.27344 12.0205H3.55371V13.6953C3.55371 14.3037 3.875 14.6934 4.42871 14.6934ZM4.77051 13.1621V11.2139C4.77051 10.8105 4.59277 10.6533 4.20996 10.6533H3.36914C2.08398 10.6533 1.46875 10.0039 1.46875 8.75977V3.53027C1.46875 2.28613 2.08398 1.63672 3.36914 1.63672H11.9961C13.2744 1.63672 13.8896 2.28613 13.8896 3.53027V8.75977C13.8896 10.0039 13.2744 10.6533 11.9961 10.6533H7.84668C7.42969 10.6533 7.22461 10.7217 6.9375 11.0225L4.77051 13.1621ZM7.67578 9.2041C8.07227 9.2041 8.3252 8.93066 8.3252 8.50684V6.79785H10.1572C10.5674 6.79785 10.8545 6.55176 10.8545 6.15527C10.8545 5.75195 10.5742 5.50586 10.1572 5.50586H8.3252V3.6875C8.3252 3.26367 8.07227 2.99023 7.67578 2.99023C7.2793 2.99023 7.04004 3.27734 7.04004 3.6875V5.50586H5.21484C4.79102 5.50586 4.51074 5.75195 4.51074 6.15527C4.51074 6.55176 4.80469 6.79785 5.21484 6.79785H7.04004V8.50684C7.04004 8.91699 7.2793 9.2041 7.67578 9.2041Z"
                        fill="#2563EB"
                      />
                    </svg>
                    <span>Nedostaje neka osobina? Javite nam</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pregled;
