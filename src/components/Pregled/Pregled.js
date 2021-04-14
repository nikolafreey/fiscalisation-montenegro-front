import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { ReactComponent as IconPrimary } from '../../assets/icon/icon_primary.svg';
import { racuniSelector } from '../../store/selectors/RacuniSelector';
import { userSelector } from '../../store/selectors/UserSelector';
import { getRacuni } from '../../store/actions/RacuniActions';
import { racuniService } from '../../services/RacuniService';
import { ulazniRacuniService } from '../../services/UlazniRacuniService';
import { ReactComponent as CloudPlusIcon } from '../../assets/icon/cloud-plus.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { depozitWithdrawService } from '../../services/DepozitWithdrawService';

const Pregled = () => {
  const [depozit, setDepozit] = useState();
  const [racuni, setRacuni] = useState();
  const [racuniDanas, setRacuniDanas] = useState();
  const [racuniPdv, setRacuniPdv] = useState();
  const [ulazniRacuniPdv, setUlazniRacuniPdv] = useState();
  const [ulazniRacuniDanas, setUlazniRacuniDanas] = useState();
  const [najveciKupci, setNajveciKupci] = useState();
  const [najveciDuznici, setNajveciDuznici] = useState();

  useEffect(() => {
    depozitWithdrawService
      .getDepozitToday()
      .then((resp) => setDepozit(resp.data));
    racuniService.getRacuniStatus().then((resp) => setRacuni(resp.data));
    racuniService.getRacuniDanas().then((resp) => setRacuniDanas(resp.data));
    racuniService.getRacuniPdv().then((resp) => setRacuniPdv(resp.data));
    racuniService.getRacuniKupci().then((resp) => setNajveciKupci(resp.data));
    racuniService
      .getRacuniDuznici()
      .then((resp) => setNajveciDuznici(resp.data));
    ulazniRacuniService
      .getUlazniRacuniPdv()
      .then((resp) => setUlazniRacuniPdv(resp.data));
    ulazniRacuniService
      .getUlazniRacuniPdv()
      .then((resp) => setUlazniRacuniDanas(resp.data));
  }, []);

  const userPreduzece = useSelector(userSelector());

  console.log('Racuni Danas: ', racuniDanas);
  console.log('ulazni Racuni Danas: ', ulazniRacuniDanas);
  console.log('racuni PDV: ', racuniPdv);
  console.log('racuni ulazni PDV: ', ulazniRacuniPdv);
  console.log('najveciKupci: ', najveciKupci);
  console.log('najveciDuznici: ', najveciDuznici);

  let dateNow = new Date();
  dateNow.setDate(1);
  dateNow.setMonth(dateNow.getMonth() - 1);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-title">
          <h1 className="heading-primary mb-0">Dobar dan!</h1>
        </div>
      </div>
      <div className="dashboard__subtitle">
        <div className="dashboard__subtitle--left">
          <p className="left">
            <i className="icon lg mr-xs">
              <IconPrimary />
            </i>
            {userPreduzece?.preduzeca[0].kratki_naziv}
          </p>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </i>
            <Moment locale="me" format="DD. MMM YYYY.">
              {new Date()}
            </Moment>
          </p>
          {/* <div className="input-wrapper">
            <input type="text" className="form__input bg-light" />
            <span></span>
          </div> */}
        </div>
      </div>
      <hr className="mtb-30 tabp-mtb-20" />

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
                  <h2 className="heading-secondary df">
                    {isNaN(
                      depozit &&
                        (
                          racuniDanas?.ukupno_izlazni_racuni_danas +
                          Number(depozit[0]?.iznos_depozit)
                        ).toFixed(2)
                    )
                      ? '0.00'
                      : (
                          racuniDanas?.ukupno_izlazni_racuni_danas +
                          Number(depozit[0]?.iznos_depozit)
                        ).toFixed(2)}{' '}
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
                      fill="#16A34A"
                      d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zM4.88 9.645c0-.203.07-.343.255-.528l3.058-3.076a.642.642 0 01.475-.185c.378 0 .66.282.66.66 0 .193-.089.36-.203.492L8 8.125l-1.09.914 1.916-.079h4.702a.66.66 0 01.686.686c0 .395-.281.676-.686.676H8.826l-1.925-.07L8 11.166l1.125 1.116c.123.123.202.29.202.484a.65.65 0 01-.659.668.649.649 0 01-.475-.194l-3.058-3.067c-.167-.167-.255-.325-.255-.527z"
                    />
                  </svg>
                </i>
                <div className="box-dashboard__top">
                  <span className="txt-light txt-up fw-500">Depozit</span>
                </div>
                <div className="box-dashboard__btm">
                  <h2 className="heading-secondary df">
                    {isNaN(
                      depozit && Number(depozit[0]?.iznos_depozit).toFixed(2)
                    )
                      ? '0.00'
                      : Number(depozit[0]?.iznos_depozit).toFixed(2)}{' '}
                    €
                  </h2>
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
                  <span className="txt-light txt-up fw-500">Naplaćeno</span>
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
          <h2 className="heading-secondary">U odnosu na prošli mjesec</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <span className="txt-light txt-up fw-500">Izdati računi</span>
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
                    {(
                      racuniPdv?.poredjenje_pdv -
                      racuniPdv?.ukupan_iznos_poslednji_mjesec
                    ).toFixed(2)}{' '}
                    €
                  </h2>
                  <span className="right txt-light">
                    <Moment locale="me" format="MMM YYYY">
                      {dateNow}
                    </Moment>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <span className="txt-light txt-up fw-500">
                    Primljeni računi
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
                    {(
                      ulazniRacuniPdv?.poredjenje_pdv -
                      ulazniRacuniPdv?.ukupan_iznos_poslednji_mjesec
                    ).toFixed(2)}{' '}
                    €
                  </h2>
                  <span className="right txt-light">
                    <Moment locale="me" format="MMM YYYY">
                      {dateNow}
                    </Moment>
                  </span>
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
                    {racuniPdv?.ukupan_iznos_poslednji_mjesec.toFixed(2)} €
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
          <h2 className="heading-secondary">Najveći kupci</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <h3 className="heading-tertiary df">
                    <img
                      src={
                        (najveciKupci && najveciKupci[0]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciKupci && najveciKupci[0]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciKupci &&
                      najveciKupci[0] &&
                      Number(najveciKupci[0]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <h3 className="heading-tertiary df">
                    <img
                      src={
                        (najveciKupci && najveciKupci[1]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciKupci && najveciKupci[1]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciKupci &&
                      najveciKupci[1] &&
                      Number(najveciKupci[1]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <h3 className="heading-tertiary df">
                    <img
                      src={
                        (najveciKupci && najveciKupci[2]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciKupci && najveciKupci[2]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciKupci &&
                      najveciKupci[2] &&
                      Number(najveciKupci[2]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
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
                      src={
                        (najveciDuznici && najveciDuznici[0]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciDuznici && najveciDuznici[0]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciDuznici &&
                      najveciDuznici[0] &&
                      Number(najveciDuznici[0]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <h3 className="heading-tertiary df">
                    <img
                      src={
                        (najveciDuznici && najveciDuznici[1]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciDuznici && najveciDuznici[1]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciDuznici &&
                      najveciDuznici[1] &&
                      Number(najveciDuznici[1]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-dashboard">
                <div className="box-dashboard__top">
                  <h3 className="heading-tertiary df">
                    <img
                      src={
                        (najveciDuznici && najveciDuznici[3]?.logotip) ||
                        'https://picsum.photos/seed/picsum/200/300'
                      }
                      alt=""
                      className="img-round sm mr-s"
                    />
                    {(najveciDuznici && najveciDuznici[3]?.kratki_naziv) || '-'}
                  </h3>
                </div>
                <div className="box-dashboard__btm">
                  <p className="txt-light">total:</p>
                  <h2 className="heading-secondary df">
                    {(najveciDuznici &&
                      najveciDuznici[2] &&
                      Number(najveciDuznici[3]?.ukupan_promet).toFixed(2)) ||
                      0.0}{' '}
                    €
                  </h2>
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
