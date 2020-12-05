import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FizickaLicaSchema } from '../../validation/fizicka_lica';
import { ReactComponent as Link } from '../../assets/icon/link.svg';

import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFizickoLice,
  getFizickoLice,
  storeFizickoLice,
  updateFizickoLice,
} from '../../store/actions/FizickaLicaActions';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { useRouteMatch } from 'react-router-dom';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import ZiroRacuniFieldArray from './ZiroRacuniFieldArray';

const FizickaLicaForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const fizickoLice = useSelector(fizickoLiceSelector());

  useEffect(() => {
    if (params.id) dispatch(getFizickoLice(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updateFizickoLice({ id: params.id, ...values }));
    else dispatch(storeFizickoLice(values));
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
        email: '',
        zanimanje: '',
        radno_mjesto: '',
        drzavljanstvo: '',
        nacionalnost: '',
        cv_link: '',
        avatar: '',
        preduzece_id: '',
        ziro_racuni: [],
        ...fizickoLice,
      }}
      onSubmit={handleSubmit}
      validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      {({ values }) => (
        <div className="screen-content">
          <a href="#" class="link df">
            <Link />
            <p>Povratak na Preduzeća</p>
          </a>

          <h1 class="heading-primary">Dodavanje novog fizičkog lica</h1>
          <div className="main-content__box">
            <div className="content">
              <Form>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 mt-25">
                      <h2 className="heading-secondary">Informacije</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8 mtb-25">
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="ime"
                            className="form__input"
                            label={$t('fizickalica.ime')}
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="prezime"
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
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="jmbg"
                            className="form__input"
                            label={$t('fizickalica.jmbg')}
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="ib"
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
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="grad"
                            className="form__input"
                            label={$t('fizickalica.grad')}
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="drzava"
                            className="form__input"
                            label={$t('fizickalica.drzava')}
                          />
                        </div>
                      </div>

                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="nacionalnost"
                            className="form__input"
                            label={$t('fizickalica.nacionalnost')}
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            className="form__input"
                            name="drzavljanstvo"
                            label={$t('fizickalica.drzavljanstvo')}
                          />
                        </div>
                      </div>

                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <DropDown
                            name="preduzece_id"
                            className="form__input"
                            label={$t('fizickalica.preduzece_id')}
                            loadOptions={preduzecaService.getPreduzecaDropdown}
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="radno_mjesto"
                            className="form__input"
                            label={$t('fizickalica.radno_mjesto')}
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <label className="form__label" for="">
                          Opis
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form__input"
                        ></textarea>
                      </div>
                      <div className="form__group form__area">
                        <InputField
                          className="form__input w-100"
                          name="avatar"
                          label={$t('fizickalica.avatar')}
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
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Tekući računi</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <FieldArray name="ziro_racuni">
                        {(arrayHelpers) => (
                          <ZiroRacuniFieldArray {...arrayHelpers} />
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Kontakt informacije</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="df jc-sb mb-20">
                        <div className="form__group w-100">
                          <InputField
                            name="telefon"
                            className="form__input w-100"
                            label={$t('fizickalica.telefon')}
                          />
                        </div>
                      </div>
                      <div class="df fd-column">
                        <div class="form__group w-100">
                          <InputField
                            className="form__input w-100"
                            name="email"
                            label={$t('fizickalica.email')}
                          />
                        </div>

                        <div class="form__group w-100">
                          <InputField
                            className="form__input w-100"
                            name="cv_link"
                            label={$t('fizickalica.cv_link')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="container">
                  <div class="row">
                    <div class="col-md-4">
                      <h2 class="heading-secondary">Status</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="form__footer">
                  <button class="btn btn__dark btn__sm" type="submit">
                    Sačuvaj
                  </button>
                  <button class="btn btn__link ml-m">Nazad</button>

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
