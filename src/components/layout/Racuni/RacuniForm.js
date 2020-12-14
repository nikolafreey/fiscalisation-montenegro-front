import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { RacuniSchema } from '../../../validation/racuni';
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

const RacuniForm = () => {
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

  const preduzece = useSelector(preduzeceSelector());

  useEffect(() => {
    if (params.id) dispatch(getPreduzece(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updatePreduzece({ id: params.id, ...values }));
    else
      dispatch(
        storePreduzece({
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
        korektivni_racun: false,
        korektivni_racun_vrsta: '',
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
      validationSchema={RacuniSchema}
      enableReinitialize
    >
      {({ values }) => (
        <div className="screen-content">
          <div className="main-content__box">
            <div className="content">
              <Form>
                <InputField />
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="heading-secondary">Status</h2>
                    <p>
                      Consequat eget volutpat enim libero nulla neque ultrices.
                      Sed tristique nullam erat in interdum.
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
                  <button className="btn btn__dark btn__md" type="submit">
                    Sačuvaj
                  </button>
                  <button
                    type="button"
                    className="btn btn__link ml-m"
                    onClick={() => dispatch(deletePreduzece(params.id))}
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

export default RacuniForm;
