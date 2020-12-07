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

const PreduzecaForm = () => {
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
    else dispatch(storePreduzece(values));
  };

  return (
    <Formik
      initialValues={{
        kratki_naziv: '',
        puni_naziv: '',
        oblik_preduzeca: '',
        adresa: '',
        grad: '',
        drzava: '',
        telefon: '',
        telefon_viber: false,
        telefon_whatsapp: false,
        telefon_facetime: false,
        fax: '',
        email: '',
        website: '',
        pib: '',
        pdv: '',
        djelatnost: '',
        iban: '',
        bic_swift: '',
        kontakt_ime: '',
        kontakt_prezime: '',
        kontakt_telefon: '',
        kontakt_viber: false,
        kontakt_whatsapp: false,
        kontakt_facetime: false,
        kontakt_email: '',
        ovlasceno_lice_kontakt_ime: '',
        ovlasceno_lice_kontakt_prezime: '',
        ovlasceno_lice_kontakt_telefon: '',
        ovlasceno_lice_kontakt_viber: false,
        ovlasceno_lice_kontakt_whatsapp: false,
        ovlasceno_lice_kontakt_facetime: false,
        ovlasceno_lice_kontakt_email: '',
        twitter_username: '',
        instagram_username: '',
        facebook_username: '',
        skype_username: '',
        logotip: '',
        opis: '',
        lokacija_lat: '',
        lokacija_long: '',
        status: '',
        privatnost: '',
        verifikovan: false,
        kategorija_id: '',
        ziro_racuni: [],
        ...preduzece,
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
                            name="kratki_naziv"
                            label={$t('preduzeca.kratki_naziv')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="oblik_preduzeca"
                            label={$t('preduzeca.oblik_preduzeca')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="form__group">
                        <InputField
                          name="puni_naziv"
                          label={$t('preduzeca.puni_naziv')}
                          placeholder=""
                          type="text"
                          className="form__input w-100"
                        />
                      </div>
                      <div className="form__group">
                        <InputField
                          name="pdv"
                          label={$t('preduzeca.pdv')}
                          placeholder=""
                          type="text"
                          className="form__input w-100"
                        />
                      </div>
                      <div className="form__group">
                        <InputField
                          name="pib"
                          label={$t('preduzeca.pib')}
                          placeholder=""
                          type="text"
                          className="form__input w-100"
                        />
                      </div>
                      <div className="form__group">
                        <InputField
                          name="adresa"
                          label={$t('preduzeca.adresa')}
                          placeholder=""
                          type="text"
                          className="form__input w-100"
                        />
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="grad"
                            label={$t('preduzeca.grad')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="drzava"
                            label={$t('preduzeca.drzava')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <DropDown
                            name="djelatnost"
                            label={$t('preduzeca.djelatnost')}
                            loadOptions={
                              djelatnostiService.getDjelatnostiDropdown
                            }
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <DropDown
                            name="kategorija_id"
                            label={$t('preduzeca.kategorija')}
                            loadOptions={
                              kategorijeService.getKategorijeDropdown
                            }
                            className="form__input"
                          />
                        </div>
                      </div>
                      <Textarea
                        control="text"
                        name="opis"
                        label={$t('preduzeca.opis')}
                        cols="30"
                        rows="5"
                        className="form__input"
                      />
                      <div className="form__group form__area">
                        <InputField
                          name="logotip"
                          label={$t('preduzeca.logotip')}
                          placeholder=""
                          type="file"
                          id="logotip"
                          multiple="multiple"
                        />
                        <div className="file-dummy">
                          <div className="success">
                            Uspješno ste selektovali fajl!
                          </div>
                          <div className="default">
                            Prevucite logotip ovdje <br />
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
                      <h2 className="heading-secondary">Žiro računi</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="form__group">
                        <div className="pr df ai-c">
                          <FieldArray name="ziro_racuni">
                            {(arrayHelpers) => (
                              <ZiroRacuniFieldArray {...arrayHelpers} />
                            )}
                          </FieldArray>
                        </div>
                        <div className="df ai-c"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">
                        Plaćanje iz inostranstva
                      </h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="form__group">
                        <InputField
                          name="iban"
                          label={$t('preduzeca.iban')}
                          placeholder=""
                          type="text"
                          className="form__input w-50"
                        />
                      </div>
                      <div className="form__group">
                        <InputField
                          name="bic_swift"
                          label={$t('preduzeca.bic_swift')}
                          placeholder=""
                          type="text"
                          className="form__input w-50"
                        />
                      </div>
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
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="telefon"
                            label={$t('preduzeca.telefon')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                          <div className="df ai-c jc-sb">
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telfon_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telfon_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telfon_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="fax"
                            label={$t('preduzeca.fax')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="website"
                            label={$t('preduzeca.website')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Ovlašćeno lice</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="ovlasceno_lice_kontakt_ime"
                            label={$t('preduzeca.ime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="ovlasceno_lice_kontakt_prezime"
                            label={$t('preduzeca.prezime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="ovlasceno_lice_kontakt_telefon"
                            label={$t('preduzeca.telefon')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                          <div className="df ai-c jc-sb">
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="ovlasceno_lice_kontakt_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="ovlasceno_lice_kontakt_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="ovlasceno_lice_kontakt_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="ovlasceno_lice_kontakt_email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Osoba za kontakt</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="kontakt_ime"
                            label={$t('preduzeca.ime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="kontakt_prezime"
                            label={$t('preduzeca.prezime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="kontakt_telefon"
                            label={$t('preduzeca.telefon')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                          <div className="df ai-c jc-sb">
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="kontakt_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="kontakt_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="kontakt_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="kontakt_email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Društvene mreže</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="twitter_username"
                            label={$t('preduzeca.twitter')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="facebook_username"
                            label={$t('preduzeca.facebook')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb">
                        <div className="form__group w-48">
                          <InputField
                            name="instagram_username"
                            label={$t('preduzeca.instagram')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48">
                          <InputField
                            name="skype_username"
                            label={$t('preduzeca.skype')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Lokacija na mapi</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <span className="form__label">Lokacija</span>
                      <div className="form__map"></div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <h2 className="heading-secondary">Status</h2>
                      <p>
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="form__group">
                        <div className="form__radio-group">
                          <div className="form__radio-group">
                            <RadioButton
                              name="privatnost"
                              label="Privatnost"
                              options={informacijePrivatnost}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="df mtb-25">
                        <InputField
                          name="verifikovan"
                          label={$t('preduzeca.verifikovan')}
                          placeholder=""
                          type="radio"
                          className="form__radio-input"
                        />
                      </div>
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
                </div>
                {/* <InputField
                  name="lokacija_lat"
                  label={$t('preduzeca.lokacija')}
                  placeholder=""
                />
                <InputField
                  name="lokacija_long"
                  label={$t('preduzeca.lokacija')}
                  placeholder=""
                /> */}
                <div className="form__footer">
                  <button className="btn btn__dark btn__sm" type="submit">
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

export default PreduzecaForm;
