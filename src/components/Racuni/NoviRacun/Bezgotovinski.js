import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';
import { usePorezi } from '../../../hooks/PoreziHook';

import BezgotovinskiStavkeFieldArray from './BezgotovinskiStavkeFieldArray';
import { useDispatch } from 'react-redux';
import { storeBezgotovinskiRacun } from '../../../store/actions/RacuniActions';

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
    porezi
  } = usePorezi();
  

  return (
    <Formik
      initialValues={{stavke: []}}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <div className="screen-content">
          <Link to="#racuni" className="link df">
            <LinkSvg /> <p>Povratak na Račune</p>
          </Link>

          <h1 className="heading-primary">Kreiraj novi bezgotovinski račun</h1>

          <div className="main-content__box">
            <div className="content">
              <Form>
                <div className="container">
                  <FieldArray name="stavke">
                    {(arrayHelpers) => (
                      <BezgotovinskiStavkeFieldArray {...arrayHelpers} />
                    )}
                  </FieldArray>
                </div> 
                <div className="form__footer">
                  <button className="btn btn__dark btn__md" type="submit">
                    Sačuvaj
                  </button>
                  <button className="btn btn__link ml-m">Nazad</button>

                  {/* <button
                  type="button"
                  onClick={() => dispatch(deleteUsluga(params.id))}
                >
                  Delete
                </button> */}
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Bezgotovinski;
