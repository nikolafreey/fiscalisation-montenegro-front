import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { RacuniSchema } from '../../validation/racuni';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../shared/forms/InputField';
import { useRouteMatch, Prompt } from 'react-router-dom';
import RadioButton from '../shared/forms/RadioButton';
import {
  deletePredracun,
  getPredracun,
  storePredracun,
  updatePredracun,
} from '../../store/actions/PredracuniActions';
import { predracunSelector } from '../../store/selectors/PredracuniSelector';

const PredracuniForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const informacijeKontakt = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];

  const informacijePrivatnost = [
    { key: 'Privatan', value: 'Privatan' },
    { key: 'Javan', value: 'Javan' },
  ];

  const predracun = useSelector(predracunSelector());

  useEffect(() => {
    if (params.id) dispatch(getPredracun(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updatePredracun({ id: params.id, ...values }));
    else
      dispatch(
        storePredracun({
          ...values,
          status: values.status === 'true' ? true : false,
        })
      );
  };

  return (
    <Formik
      initialValues={{
        kod_operatera: '',
        IKOF: '',
        JIKR: '',
        tip_racuna: '',
        vrsta_racuna: '',
        broj_racuna: '',
        ukupna_cijena_bez_pdv: 0,
        ukupna_cijena_sa_pdv: 0,
        ukupno_pdv: 0,
        popust_iznos: 0,
        popust_procenat: 0,
        popust_na_cijenu_bez_pdv: false,
        popust_ukupno: 0,
        opis: '',
        status: '',
      }}
      onSubmit={handleSubmit}
      //   validationSchema={RacuniSchema}
      enableReinitialize
    >
      {({ values, dirty, isSubmitting }) => (
        <div className="screen-content">
          <div className="main-content__box">
            <div className="content">
              <Form>
                <Prompt
                  when={dirty && !isSubmitting}
                  message="Da li ste sigurni da ??elite da se vratite nazad? Va??i podaci sa forme ne??e biti sa??uvani"
                />
                <InputField />
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="heading-secondary">Status</h2>
                    <p>
                      {/* Consequat eget volutpat enim libero nulla neque ultrices.
                      Sed tristique nullam erat in interdum. */}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <div className="form__group">
                      <div className="form__radio-group">
                        <RadioButton
                          name="status"
                          label="Status"
                          options={informacijeKontakt}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form__footer">
                  <button className="btn btn__primary btn__md" type="submit">
                    Sa??uvaj
                  </button>
                  <button
                    type="button"
                    className="btn btn__link ml-m"
                    onClick={() => dispatch(deletePredracun(params.id))}
                  >
                    Nazad
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default PredracuniForm;
