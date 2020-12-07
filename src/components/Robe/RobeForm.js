import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { PreduzecaSchema } from '../../validation/preduzeca';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePreduzece,
  getPreduzece,
  storePreduzece,
  updatePreduzece,
} from '../../store/actions/PreduzecaActions';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { useRouteMatch } from 'react-router-dom';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import { kategorijeService } from '../../services/KategorijeService';
import ZiroRacuniFieldArray from '../FizickaLica/ZiroRacuniFieldArray';
import Checkbox from '../shared/forms/Checkbox';
import Textarea from '../shared/forms/Textarea';
import RadioButton from '../shared/forms/RadioButton';
import { djelatnostiService } from '../../services/DjelatnostiService';
import {
  deleteRoba,
  getRoba,
  storeRoba,
  updateRoba,
} from '../../store/actions/RobeActions';
import { robaSelector } from '../../store/selectors/RobeSelector';

const RobeForm = () => {
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

  const roba = useSelector(robaSelector());

  useEffect(() => {
    if (params.id) dispatch(getRoba(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updateRoba({ id: params.id, ...values }));
    else dispatch(storeRoba(values));
  };

  return (
    <Formik
      initialValues={{
        ...roba,
      }}
      onSubmit={handleSubmit}
      validationSchema={PreduzecaSchema}
      enableReinitialize
    >
      {({ values }) => (
        <div className="screen-content">
          <div className="main-content__box">
            <div className="content">
              <Form>
                <InputField
                  name="naziv"
                  label={$t('robe.drzava')}
                  placeholder=""
                  className="form__input"
                />
                <Textarea
                  control="text"
                  name="opis"
                  label={$t('robe.opis')}
                  cols="30"
                  rows="5"
                  placeholder=""
                  className="form__input"
                />
                <InputField
                  name="naziv"
                  label={$t('robe.ean')}
                  placeholder=""
                  className="form__input"
                />
                <InputField
                  name="naziv"
                  label={$t('robe.drzava')}
                  placeholder=""
                  className="form__input"
                />
                <div className="form__footer">
                  <button className="btn btn__dark btn__sm" type="submit">
                    Sačuvaj
                  </button>
                  <button
                    type="button"
                    className="btn btn__link ml-m"
                    onClick={() => dispatch(deleteRoba(params.id))}
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

export default RobeForm;
