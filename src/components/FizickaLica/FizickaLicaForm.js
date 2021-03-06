import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FizickaLicaSchema } from '../../validation/fizicka_lica';
import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';

import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFizickaLica,
  getFizickoLice,
  setFizickoLice,
  storeFizickoLice,
  updateFizickoLice,
} from '../../store/actions/FizickaLicaActions';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch, Prompt, useHistory } from 'react-router-dom';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import ZiroRacuniFieldArray from './ZiroRacuniFieldArray';
import Checkbox from '../shared/forms/Checkbox';
import { PARTNERI, PREDUZECA } from '../../constants/routes';
import RadioButton from '../shared/forms/RadioButton';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const FizickaLicaForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { params } = useRouteMatch();

  const fizickoLice = useSelector(fizickoLiceSelector());
  console.log('fizicko_lice', fizickoLice);

  const statusOptions = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];
  useEffect(() => {
    if (params.id) dispatch(getFizickoLice(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values, initialValues) => {
    if (params.id) dispatch(updateFizickoLice({ id: params.id, ...values }));
    else {
      console.log('handleSubmit Fizicko Lice Store');
      dispatch(
        storeFizickoLice({
          ...values,
          status: values.status === 'Aktivan' ? true : false,
        })
      );
    }
    dispatch(setFizickoLice(initialValues));
    dispatch(getFizickaLica());
    history.push(PARTNERI.INDEX);
  };

  const renderForm = ({ values, dirty, isSubmitting, isValid }) => (
    <div className="screen-content">
      <Link to={PARTNERI.INDEX} className="back-link df">
        <LinkSvg />
        <p>Povratak na Partnere</p>
      </Link>

      {!params.id ? (
        <h1 className="heading-primary">Dodavanje novog fizi??kog lica</h1>
      ) : (
        <h1 className="heading-primary">Izmjena fizi??kog lica</h1>
      )}
      <div className="main-content__box">
        <div className="content">
          <Form className="form">
            <Prompt
              when={dirty && !isSubmitting}
              message="Da li ste sigurni da ??elite da se vratite nazad? Va??i podaci sa forme ne??e biti sa??uvani"
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-4 mt-25">
                  <h2 className="heading-secondary">Informacije</h2>
                  <p className="txt-light">
                    Unesite informacije o fizi??kom licu kao ??to su Ime, Prezime,
                    JMBG, Grad itd.
                  </p>
                </div>
                <div className="col-lg-8 mt-25">
                  <div className="df jc-sb mob-fd-column">
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="ime"
                        obavezno
                        className="form__input"
                        label={$t('fizickalica.ime')}
                      />
                    </div>
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="prezime"
                        obavezno
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
                      defaultValue={fizickoLice && fizickoLice.zanimanje}
                    />
                  </div>
                  <div className="df jc-sb mob-fd-column">
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="jmbg"
                        className="form__input"
                        label={$t('fizickalica.jmbg')}
                      />
                    </div>
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="ib"
                        className="form__input"
                        label={$t('fizickalica.ib')}
                        defaultValue={fizickoLice && fizickoLice.ib}
                      />
                    </div>
                  </div>
                  <div className="form__group">
                    <InputField
                      name="adresa"
                      className="form__input w-100"
                      label={$t('fizickalica.adresa')}
                      defaultValue={fizickoLice && fizickoLice.adresa}
                    />
                  </div>
                  <div className="df jc-sb mob-fd-column">
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="grad"
                        className="form__input"
                        obavezno
                        label={$t('fizickalica.grad')}
                      />
                    </div>
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="drzava"
                        className="form__input"
                        placeholder="CG"
                        label={$t('fizickalica.drzava')}
                        defaultValue={fizickoLice && fizickoLice.drzava}
                      />
                    </div>
                  </div>

                  <div className="df jc-sb mob-fd-column">
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="nacionalnost"
                        className="form__input"
                        label={$t('fizickalica.nacionalnost')}
                        defaultValue={fizickoLice && fizickoLice.nacionalnost}
                      />
                    </div>
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        className="form__input"
                        name="drzavljanstvo"
                        label={$t('fizickalica.drzavljanstvo')}
                        defaultValue={fizickoLice && fizickoLice.drzavljanstvo}
                      />
                    </div>
                  </div>

                  <div className="df jc-sb mob-fd-column">
                    <div className="form__group w-48 mob-w-100">
                      <DropDown
                        name="preduzece_id"
                        // className="form__input"
                        label={
                          $t('fizickalica.preduzece_id') + ' - Nije Obavezno'
                        }
                        loadOptions={preduzecaService.getPreduzecaDropdown}
                        defaultValue={
                          Object.keys(fizickoLice).length !== 0 &&
                          fizickoLice.constructor === Object && {
                            value: fizickoLice?.preduzeca?.id,
                            label: fizickoLice?.preduzeca?.naziv,
                          }
                        }
                      />
                    </div>
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="radno_mjesto"
                        className="form__input"
                        label={$t('fizickalica.radno_mjesto')}
                        defaultValue={fizickoLice && fizickoLice.radno_mjesto}
                      />
                    </div>
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="">
                      Opis - Nije Obavezno
                    </label>
                    <textarea
                      name="opis"
                      id="opis"
                      cols="30"
                      rows="5"
                      className="form__input h-10r"
                      defaultValue={fizickoLice && fizickoLice.opis}
                    ></textarea>
                  </div>
                  {/* TODO: DODATI UCITAVANJE AVATARA */}
                  {/* <div className="form__group form__area">
                        <label className="form__label" htmlFor="logo">
                          Fotografija
                        </label>
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          multiple="multiple"
                        />
                        <div className="file-dummy">
                          <div className="success">
                            Uspje??no ste selektovali fajl!
                          </div>
                          <div className="default">
                            Prevucite fotografiju ovdje
                            <br />
                            ili kliknite da dodate
                          </div>
                        </div>
                      </div> */}
                </div>
              </div>
            </div>
            <hr />
            {/* TODO:SREDITI ZIRO RACUNE BACKEND PROBLEM */}
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <h2 className="heading-secondary">Teku??i ra??uni</h2>
                  <p className="mob-mb-20 txt-light">
                    Podaci o ??iro ra??unima fizi??kog lica
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
                    Osnovne kontakt informacije fizi??kog lica
                  </p>
                </div>
                <div className="col-lg-8">
                  <div className="df jc-sb mb-20">
                    <div className="form__group w-48 mob-w-100">
                      <InputField
                        name="telefon"
                        className="form__input"
                        label={$t('fizickalica.telefon')}
                        defaultValue={fizickoLice && fizickoLice.telefon}
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
                        defaultValue={fizickoLice && fizickoLice.email}
                      />
                    </div>

                    <div className="form__group w-48">
                      <InputField
                        className="form__input mob-w-100"
                        name="cv_link"
                        label={$t('fizickalica.cv_link')}
                        defaultValue={fizickoLice && fizickoLice.cv_link}
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
                    {/* Consequat eget volutpat enim libero nulla neque ultrices.
                    Sed tristique nullam erat in interdum. */}
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
                        defaultChecked
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
                      <label htmlFor="inActive" className="form__radio-label">
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
                className="btn btn__primary btn__md"
                type="submit"
                onClick={() => {
                  if (!isValid) {
                    toast.error(
                      'Molimo Vas provjerite ispravnost unosa!',
                      toastSettings
                    );
                  }
                  if (!dirty && !params.id) {
                    toast.error(
                      'Molimo Vas provjerite nepopunjena polja!',
                      toastSettings
                    );
                  }
                }}
              >
                Sa??uvaj
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
  );

  return (
    <Formik
      initialValues={{
        ime: '',
        prezime: '',
        jmbg: '',
        ib: '',
        adresa: '',
        grad: '',
        drzava: 'Crna Gora',
        telefon: '',
        telefon_viber: false,
        telefon_whatsapp: false,
        telefon_facetime: false,
        status: true,
        email: '',
        zanimanje: '',
        radno_mjesto: '',
        drzavljanstvo: 'Crnogorsko',
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
      render={renderForm}
    />
  );
};

export default FizickaLicaForm;
