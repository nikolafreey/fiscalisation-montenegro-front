import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { usePorezi } from '../../../hooks/PoreziHook';

import BezgotovinskiStavkeFieldArray from './BezgotovinskiStavkeFieldArray';
import { useDispatch } from 'react-redux';
import { storeBezgotovinskiRacun } from '../../../store/actions/RacuniActions';
import BezgotovinskiPorezi from './BezgotovinskiPorezi';
import BezgotovinskiUkupno from './BezgotovinskiUkupno';
import BezgotovinskiStatusPodsjetnici from './BezgotovinskiStatusPodsjetnici';
import BezgotovinskiHeader from './BezgotovinskiHeader';

const Bezgotovinski = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const handleSubmit = (values) => {
    dispatch(storeBezgotovinskiRacun(values));
  };

  const {
    getStopaPerId,
    getPriceVat,
    getPriceNoVat,
    getVat,
    porezi,
  } = usePorezi();

  return (
    <Formik
      initialValues={{ stavke: [] }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form>
          <div className="screen-content">
            <Link to="#racuni" className="link df">
              <LinkSvg /> <p>Povratak na Račune</p>
            </Link>

            <h1 className="heading-primary">
              Kreiraj novi bezgotovinski račun
            </h1>

            <BezgotovinskiHeader />

            <h2 class="heading-secondary">Stavke</h2>
            <div class="main-content__box" style={{display: 'block'}}>
              <div class="main-content__box--header">
                <div class="row">
                  <div class="col-xl-4">
                    <h4 class="heading-quaternary">Naziv usluge / robe</h4>
                  </div>
                  <div class="col-xl-2">
                    <h4 class="heading-quaternary">jedinična cijena</h4>
                  </div>
                  <div class="col-xl-2">
                    <h4 class="heading-quaternary">JM / Količina</h4>
                  </div>
                  <div class="col-xl-2">
                    <h4 class="heading-quaternary">PDV stopa</h4>
                  </div>
                  <div class="col-xl-2">
                    <h4 class="heading-quaternary txt-right">
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

            <BezgotovinskiPorezi />
            <BezgotovinskiUkupno />
            <h2 class="heading-secondary">Status i podsjetnici</h2>
            <div class="main-content__box">
              <div class="form">
                <div class="content pt-12"></div>
                <BezgotovinskiStatusPodsjetnici />
                <div class="form__footer">
                  <button
                    onClick={(values) => handleSubmit(values)}
                    class="btn btn__dark btn__lg"
                  >
                    Fiskalizuj i Pošalji
                  </button>
                  <button class="btn btn__transparent btn__xl ml-m">
                    Sačuvaj kao privremeni
                  </button>
                  <button class="btn btn__link ml-m">Obustavi</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Bezgotovinski;
