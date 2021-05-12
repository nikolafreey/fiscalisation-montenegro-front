import { useFormikContext, FieldArray, Form, Formik, Field } from 'formik';
import React, { useState, useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { usePorezi } from '../../../hooks/PoreziHook';

import BezgotovinskiStavkeFieldArrayNovi from './BezgotovinskiStavkeFieldArrayNovi';
import BezgotovinskiStavkeFieldArray from './BezgotovinskiStavkeFieldArray';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRacuni,
  setRacun,
  storeBezgotovinskiRacun,
} from '../../../store/actions/RacuniActions';
import BezgotovinskiPorezi from './BezgotovinskiPorezi';
import BezgotovinskiUkupno from './BezgotovinskiUkupno';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';
import BezgotovinskiHeader from './BezgotovinskiHeader';

import { RACUNI } from '../../../constants/routes';
import { useHistory } from 'react-router-dom';
import { BezgotovinskiSchema } from '../../../validation/bezgotovinski_racuni';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
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

const Bezgotovinski = () => {
  const dispatch = useDispatch();
  // const racuni = useSelector(racuniSelector());
  const history = useHistory();
  let previousUrl = localStorage.getItem('previousUrl');

  const handleSubmit = (values) => {
    values.stavke = values.niz;
    console.log('u celom racunu', values.stavke);
    // const { params } = useRouteMatch();

    console.log('values', values);
    if (values.stavke.length === 0) {
      toast.error('Račun mora imati bar jednu stavku!', toastSettings);
    }
    if (!values.stavke[0]) {
      toast.error(
        'Račun mora imati bar jednu stavku i mora biti odabrana roba/usluga za datu stavku!',
        toastSettings
      );
      return;
    }
    values &&
      values.stavke.forEach((racun, index) => {
        // if (racun.kolicina == null || racun.kolicina <= 0) {
        //   toast.error(
        //     'Kolicina stavke računa mora biti veca od 0 računu ' + index,
        //     toastSettings
        //   );
        //   return;
        // }
        if (racun.jedinica_mjere_id == null) {
          toast.error(
            'Jedinica mjere računa je neophodna na računu ' + index,
            toastSettings
          );
          return;
        }
        if (racun.ukupna_cijena == null || racun.ukupna_cijena <= 0) {
          toast.error(
            'Stavka računa mora biti veca od 0 na računu ' + index,
            toastSettings
          );
          return;
        }
      });
    if (values.partner_id == null || values.partner_id === 0) {
      toast.error('Kupac je neophodan', toastSettings);
      return;
    }

    const noviRacun = {
      ...values,
      vrsta_racuna: 'bezgotovinski',
      popust_procenat: values.tip_popusta === 'procenat' ? values.popust : null,
      popust_iznos: values.tip_popusta === 'iznos' ? values.popust : null,
      popust_na_cijenu_bez_pdv: values.popust_bez_pdv,
      datum_izdavanja: values.datum_izdavanja?.toISOString().split('T')[0],
      datum_za_placanje: values.datum_za_placanje?.toISOString().split('T')[0],
      datum_uplate: values.datum_uplate?.toISOString().split('T')[0],
      korektivni_racun: values.korektivni_racun === '0' ? 0 : 1,
      korektivni_racun_vrsta:
        values.korektivni_racun === '0' ? null : values.korektivni_racun,
    };
    dispatch(storeBezgotovinskiRacun(noviRacun));
    let racunId;
    setTimeout(() => {
      racuniService.getRacuni().then((data) => {
        console.log('data', data);
        racunId = data.data.data[0].id;
        setTimeout(() => {
          if (previousUrl === '/racuni/bezgotovinski/create' && racunId) {
            history.push('/racuni/bezgotovinski/show/' + racunId);
          }
        }, 500);
      }, 1500);
    });
    dispatch(getRacuni());
    history.push(RACUNI.INDEX);
  };

  // const {
  //   getStopaPerId,
  //   getPriceVat,
  //   getPriceNoVat,
  //   getVat,
  //   porezi,
  // } = usePorezi();

  const today = new Date();
  const seven_days = new Date();
  seven_days.setDate(seven_days.getDate() + 7);
  const initialValues = {
    stavke: [],
    korektivni_racun: '0',
    datum_izdavanja: today,
    datum_za_placanje: seven_days,
    pdv_obveznik: 1,
    status: 'nijeplacen',
    nacin_placanja: 'ACCOUNT',
    niz: [],
    popustObjekat: {},
    // a:[],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      //innerRef={formikRef}
      enableReinitialize
      // validationSchema={BezgotovinskiSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values }) => (
        <Form>
          <div className="screen-content">
            <Link to={RACUNI.INDEX} className="back-link df">
              <LinkSvg /> <p>Povratak na Račune</p>
            </Link>

            <h1 className="heading-primary">
              Kreiraj novi bezgotovinski račun
            </h1>

            <BezgotovinskiHeader />

            {/* STAVKE */}
            <h2 className="heading-secondary">Stavke</h2>
            <div className="main-content__box" style={{ display: 'block' }}>
              <div className="main-content__box--header">
                <div className="row">
                  <div className="col-xl-4 col-md-4 col-12">
                    <h4 className="heading-quaternary">Naziv usluge / robe</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">jedinična cijena</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">JM / Količina</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary">PDV stopa</h4>
                  </div>
                  <div className="col-xl-2 col-md-2 tabp-none">
                    <h4 className="heading-quaternary txt-right">
                      Tip Popusta/iznos
                    </h4>
                  </div>
                </div>
              </div>
              <FieldArray name="stavke">
                {(arrayHelpers) => (
                  <BezgotovinskiStavkeFieldArray {...arrayHelpers} />
                )}
              </FieldArray>
            </div>
            {/* STAVKE */}

            <BezgotovinskiPorezi />
            <BezgotovinskiUkupno />

            {/* STAS I PODSJETNICI */}
            <h2 className="heading-secondary">Status i podsjetnici</h2>
            <div className="main-content__box">
              <div className="form">
                <div className="content pt-12"></div>
                <BezgotovinskiStatusPodsjetnici />
                <div className="form__footer">
                  <button
                    onClick={() => {
                      dispatch(setRacun({}));
                      handleSubmit(values);
                    }}
                    className="btn btn__primary"
                  >
                    Fiskalizuj i Pošalji
                  </button>
                  {/* <button
                    onClick={() => {
                      dispatch(setRacun({}));
                      handleSubmit(values);
                    }}
                    className="btn btn__secondary ml-m"
                  >
                    Sačuvaj kao privremeni
                  </button> */}
                  <button className="btn btn__link ml-m">Obustavi</button>
                </div>
              </div>
            </div>
            {/* STAS I PODSJETNICI */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Bezgotovinski;
