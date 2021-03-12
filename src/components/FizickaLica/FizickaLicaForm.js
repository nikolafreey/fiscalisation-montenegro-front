import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FizickaLicaSchema } from '../../validation/fizicka_lica';
import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';

import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFizickoLice,
  storeFizickoLice,
  updateFizickoLice,
} from '../../store/actions/FizickaLicaActions';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch, Prompt } from 'react-router-dom';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import ZiroRacuniFieldArray from './ZiroRacuniFieldArray';
import Checkbox from '../shared/forms/Checkbox';
import { PREDUZECA } from '../../constants/routes';
import RadioButton from '../shared/forms/RadioButton';

const FizickaLicaForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const fizickoLice = useSelector(fizickoLiceSelector());
  const statusOptions = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];
  useEffect(() => {
    if (params.id) dispatch(getFizickoLice(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values, isSubmitting) => {
    if (params.id) dispatch(updateFizickoLice({ id: params.id, ...values }));
    else
      dispatch(
        storeFizickoLice({
          ...values,
          status: values.status === 'Aktivan' ? true : false,
        })
      );
    isSubmitting.setSubmitting(false);
    console.log('isSubmitting handleSubmit', isSubmitting.isSubmitting);
  };

  return (
    <Formik
      initialValues={{
        ime: '',
        prezime: '',
        jmbg: '',
        ib: '',
        adresa: '',
        grad: '',
        drzava: '',
        telefon: '',
        telefon_viber: false,
        telefon_whatsapp: false,
        telefon_facetime: false,
        status: true,
        email: '',
        zanimanje: '',
        radno_mjesto: '',
        drzavljanstvo: '',
        nacionalnost: '',
        cv_link: '',
        avatar: '',
        preduzece_id: '',
        ziro_racuni: [{ broj_racuna: '' }],
        ...fizickoLice,
      }}
      onSubmit={handleSubmit}
      // validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      {({ values, dirty, isSubmitting }) => (
        <div className="screen-content">
          <Link to={PREDUZECA.INDEX} className="back-link df">
            <LinkSvg />
            <p>Povratak na Preduzeća</p>
          </Link>

          <h1 className="heading-primary">Dodavanje novog fizičkog lica</h1>
          <div className="main-content__box">
            <div className="content">
              <Form className="form">
                <Prompt
                  when={dirty && !isSubmitting}
                  message="Da li ste sigurni da želite da se vratite nazad? Vaši podaci sa forme neće biti sačuvani"
                />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 mt-25">
                      <h2 className="heading-secondary">Informacije</h2>
                      <p className="txt-light">
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-lg-8 mt-25">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="ime"
                            obavezno={true}
                            className="form__input"
                            label={$t('fizickalica.ime')}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="prezime"
                            obavezno={true}
                            className="form__input"
                            label={$t('fizickalica.prezime')}
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <InputField
                          name="zanimanje"
                          label={$t('fizickalica.zanimanje')}
                          className="form__input w-100"
                        />
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="jmbg"
                            obavezno={true}
                            className="form__input"
                            label={$t('fizickalica.jmbg')}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="ib"
                            obavezno={true}
                            className="form__input"
                            label={$t('fizickalica.ib')}
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <InputField
                          name="adresa"
                          className="form__input w-100"
                          label={$t('fizickalica.adresa')}
                        />
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="grad"
                            className="form__input"
                            label={$t('fizickalica.grad')}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="drzava"
                            className="form__input"
                            label={$t('fizickalica.drzava')}
                          />
                        </div>
                      </div>

                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="nacionalnost"
                            className="form__input"
                            label={$t('fizickalica.nacionalnost')}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            className="form__input"
                            name="drzavljanstvo"
                            label={$t('fizickalica.drzavljanstvo')}
                          />
                        </div>
                      </div>

                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            name="preduzece_id"
                            // className="form__input"
                            label={$t('fizickalica.preduzece_id')}
                            loadOptions={preduzecaService.getPreduzecaDropdown}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="radno_mjesto"
                            className="form__input"
                            label={$t('fizickalica.radno_mjesto')}
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <label className="form__label" htmlFor="">
                          Opis
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form__input h-10r"
                        ></textarea>
                      </div>
                      <div className="form__group form__area">
                        <label className="form__label" htmlFor="logo">
                          Fotografija
                        </label>
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          required="required"
                          multiple="multiple"
                        />
                        <div className="file-dummy">
                          <div className="success">
                            Uspješno ste selektovali fajl!
                          </div>
                          <div className="default">
                            Prevucite fotografiju ovdje
                            <br />
                            ili kliknite da dodate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Tekući računi</h2>
                      <p className="mob-mb-20 txt-light">
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-lg-8 col-md-7">
                      <div className="form__group">
                        <FieldArray name="ziro_racuni">
                          {(arrayHelpers) => (
                            <ZiroRacuniFieldArray {...arrayHelpers} />
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Kontakt informacije</h2>
                      <p className="mob-mb-20 txt-light">
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="df jc-sb mb-20">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="telefon"
                            obavezno={true}
                            className="form__input"
                            label={$t('fizickalica.telefon')}
                          />
                          <div className="form__checkbox-groups-wrapper">
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telefon_whatsapp"
                                label={$t('fizickalica.whatsapp')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                                id="telefon_whatsap"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telefon_viber"
                                label={$t('fizickalica.viber')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                                id="telefon_viber"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telefon_facetime"
                                label={$t('fizickalica.facetime')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                                id="telefon_facetime"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="df fd-column">
                        <div className="form__group w-48">
                          <InputField
                            className="form__input mob-w-100"
                            name="email"
                            label={$t('fizickalica.email')}
                          />
                        </div>

                        <div className="form__group w-48">
                          <InputField
                            className="form__input mob-w-100"
                            name="cv_link"
                            label={$t('fizickalica.cv_link')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Status</h2>
                      <p className="mob-mb-20 txt-light">
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label className="form__label">Status</label>
                      <div
                        className="form__group"
                        onChange={(event) => {
                          console.log('event.target.value', event.target.value);
                          values.status = event.target.value;
                        }}
                      >
                        {/* <RadioButton
                            name="status"
                            label="Status"
                            options={statusOptions}
                          /> */}
                        <div className="form__radio-group">
                          {/* <input type="radio" value="Aktivan" name="status" /> */}
                          <input
                            type="radio"
                            className="form__radio-input"
                            id="active"
                            value="Aktivan"
                            name="status"
                          />
                          <label htmlFor="active" className="form__radio-label">
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">Aktivan</span>
                          </label>
                        </div>
                        <div className="form__radio-group">
                          {/* <input type="radio" value="Neaktivan" name="status" /> */}
                          <input
                            type="radio"
                            className="form__radio-input"
                            id="inActive"
                            value="Neaktivan"
                            name="status"
                          />
                          <label
                            htmlFor="inActive"
                            className="form__radio-label"
                          >
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">Neaktivan</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form__footer">
                  <button
                    onClick={() => console.log('isSubmitting', isSubmitting)}
                    disabled={isSubmitting}
                    className="btn btn__dark btn__md"
                    type="submit"
                  >
                    {isSubmitting ? 'Molimo sačekajte...' : 'Sačuvaj'}
                  </button>
                  <button className="btn btn__link ml-m">Nazad</button>

                  {/* <button
                    type="button"
                    onClick={() => dispatch(deleteFizickoLice(params.id))}
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

export default FizickaLicaForm;
