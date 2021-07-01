import { FieldArray, Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { PreduzecaSchema } from '../../validation/preduzeca';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode';
import {
  deletePreduzece,
  getPreduzeca,
  getPreduzece,
  setPreduzece,
  storePreduzece,
  updatePreduzece,
} from '../../store/actions/PreduzecaActions';
import DropDown from '../shared/forms/DropDown';
import { ReactComponent as LinkPreduzecaSvg } from '../../assets/icon/link.svg';
import { ReactComponent as IconFillSvg } from '../../assets/icon/icon_fill.svg';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch, Prompt, useHistory } from 'react-router-dom';
import {
  preduzecaSelector,
  preduzeceSelector,
} from '../../store/selectors/PreduzecaSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import { kategorijeService } from '../../services/KategorijeService';
import ZiroRacuniFieldArray from '../FizickaLica/ZiroRacuniFieldArray';
import Checkbox from '../shared/forms/Checkbox';
import Textarea from '../shared/forms/Textarea';
import RadioButton from '../shared/forms/RadioButton';
import { djelatnostiService } from '../../services/DjelatnostiService';
import MapContainer from '../shared/forms/MapContainer';
import { PARTNERI, PREDUZECA } from '../../constants/routes';
import GridLoader from 'react-spinners/GridLoader';
import { spinnerStyleGrid } from '../../constants/spinner';

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

const PreduzecaForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();
  console.log('params', params);

  const history = useHistory();

  const [djelatnostDefault, setDjelatnostDefault] = useState({});
  useEffect(() => {
    djelatnostiService.getDjelatnostiDropdown()
      .then(data => {
        setDjelatnostDefault(data.find(temp => temp.label === "Ostalo"));
      })
      .catch(e => toast.error('Greška: ', e.message));
  }, []);

  const [kategorijaDefault, setKategorijaDefault] = useState({});
  useEffect(() => {
    kategorijeService.getKategorijeDropdown()
      .then(data => {
        setKategorijaDefault(data[0]);
      })
      .catch(e => toast.error('Greška: ', e.message));
  }, []);

  const informacijeKontakt = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];

  const informacijePrivatnost = [
    { key: 'Privatan', value: 'Privatan' },
    { key: 'Javan', value: 'Javan' },
  ];

  const preduzece = useSelector(preduzeceSelector());
  console.log('preduzece', preduzece);

  useEffect(() => {
    if (params.id) dispatch(getPreduzece(params.id));
    Geocode.setApiKey('');
  }, [dispatch, params]);

  const [pdvObveznikChecked, setPdvObveznikChecked] = useState(true);
  const [logotipFile, setLogotipFile] = useState();
  const [base64URL, setbase64URL] = useState('');

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = '';

      let reader = new FileReader();

      //Convert file to base64 string
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log('reader', reader);
        baseURL = reader.result;
        console.log('baseURL: ', baseURL);
        resolve(baseURL);
      };
      console.log('fileInfo', fileInfo);
    });
  };

  const handleLogotipInputChange = (e) => {
    console.log('e', e);
    let tempFile = e.target.files[0];
    setLogotipFile(e.target.files[0]);

    getBase64(e.target.files[0])
      .then((result) => {
        tempFile['base64'] = result;
        console.log('File is', logotipFile);
        setbase64URL(result);
        setLogotipFile(tempFile);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleSubmit = (values, initialValues) => {
    if (params.id) {
      dispatch(
        updatePreduzece({
          id: params.id,
          ...values,
          logotip: logotipFile,
          status: values.status === 1 ? true : false,
          privatnost: values.privatnost === 1 ? true : false,
          pdv_obveznik: pdvObveznikChecked,
          djelatnost_id: +values.djelatnost_id,
        })
      );
    } else
      dispatch(
        storePreduzece({
          ...values,
          logotip: logotipFile,
          status: values.status === 'Aktivan' ? true : false,
          privatnost: values.privatnost === 'Javan' ? true : false,
          pdv_obveznik: pdvObveznikChecked,
          djelatnost_id: +values.djelatnost_id,
        })
      );
    dispatch(setPreduzece(initialValues));
    dispatch(getPreduzeca());
    history.goBack();
  };

  const handleBlur = (e) => {
    const a = e.target.value;
    Geocode.fromAddress(a).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  if (
    params.id &&
    Object.keys(preduzece).length === 0 &&
    preduzece.constructor === Object
  ) {
    return <GridLoader css={spinnerStyleGrid} size={20} />;
  }

  return (
    <Formik
      initialValues={{
        kratki_naziv: '',
        oblik_preduzeca: 'D.O.O',
        adresa: '',
        grad: '',
        drzava: 'Crna Gora',
        telefon_viber: false,
        telefon_whatsapp: false,
        telefon_facetime: false,
        pib: '',
        pdv: '',
        kontakt_viber: false,
        kontakt_whatsapp: false,
        kontakt_facetime: false,
        twitter_username: null,
        instagram_username: null,
        facebook_username: null,
        skype_username: null,
        ovlasceno_lice_kontakt_viber: false,
        ovlasceno_lice_kontakt_whatsapp: false,
        ovlasceno_lice_kontakt_facetime: false,
        lokacija_lat: 'Beograd',
        lokacija_long: 'Beograd',
        status: 'Aktivan',
        privatnost: 'Javan',
        verifikovan: false,
        ziro_racuni: [],
        pdv_obveznik: 1,
        djelatnost_id: djelatnostDefault ? djelatnostDefault.value : 1,
        kategorija_id: kategorijaDefault ? kategorijaDefault.value : 1,
        ...preduzece,
      }}
      onSubmit={handleSubmit}
      validationSchema={PreduzecaSchema}
      enableReinitialize
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({ values, dirty, isSubmitting, isValid }) => (
        <div className="screen-content">
          <Link to={PARTNERI.INDEX} className="back-link df">
            <LinkPreduzecaSvg />
            <p>Povratak na Partnere</p>
          </Link>
          {!params.id ? (
            <h1 className="heading-primary">Dodavanje novog preduzeća</h1>
          ) : (
            <h1 className="heading-primary">Izmjena preduzeća</h1>
          )}
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
                        Unesite osnovne informacije o preduzeću
                      </p>
                    </div>
                    <div className="col-lg-8 mt-25">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="kratki_naziv"
                            label={$t('preduzeca.kratki_naziv')}
                            placeholder=""
                            obavezno
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="oblik_preduzeca"
                            obavezno
                            label={$t('preduzeca.oblik_preduzeca')}
                            placeholder="D.O.O"
                            defaultValue="D.O.O"
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
                          // onBlur={(e) => {
                          //   // call the built-in handleBur
                          //   handleBlur(e);
                          // }}
                          type="text"
                          className="form__input w-100"
                          obavezno
                        />
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="grad"
                            label={$t('preduzeca.grad')}
                            placeholder=""
                            type="text"
                            className="form__input"
                            obavezno
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="drzava"
                            label={$t('preduzeca.drzava')}
                            placeholder="CG"
                            type="text"
                            className="form__input"
                            obavezno
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            name="djelatnost_id"
                            label={$t('preduzeca.djelatnost')}
                            invalid={!isValid}
                            isInitialValid={djelatnostDefault ? true : false}
                            loadOptions={
                              djelatnostiService.getDjelatnostiDropdown
                            }
                            defaultValue={
                              preduzece &&
                              Object.keys(preduzece).length !== 0 &&
                              preduzece.constructor === Object ? {
                                value:
                                  preduzece.djelatnosti &&
                                  preduzece?.djelatnosti[0]?.id,
                                label:
                                  preduzece.djelatnosti &&
                                  preduzece?.djelatnosti[0]?.naziv,
                              } : djelatnostDefault
                            }
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            name="kategorija_id"
                            label={$t('preduzeca.kategorija')}
                            invalid={!isValid}
                            loadOptions={
                              kategorijeService.getKategorijeDropdown
                            }
                            isInitialValid={kategorijaDefault ? true : false}
                            defaultValue={
                              Object.keys(preduzece).length !== 0 &&
                              preduzece.constructor === Object ? {
                                value: preduzece?.kategorija?.id,
                                label: preduzece?.kategorija?.naziv,
                              } : kategorijaDefault
                            }
                          />
                        </div>
                      </div>
                      <Textarea
                        control="text"
                        name="opis"
                        label={$t('preduzeca.opis')}
                        cols="30"
                        rows="5"
                        className="form__input h-auto"
                      />
                      {/* TODO:VRATITI LOGOTIP UPLOAD */}
                      {/* <div className="form__group form__area mb-0">
                        <input
                          name="logotip"
                          label={$t('preduzeca.logotip')}
                          placeholder=""
                          type="file"
                          id="logotip"
                          multiple="multiple"
                        />
                        <div className="file-dummy">
                          <div className="default">
                            Prevucite logotip ovdje <br />
                            ili kliknite da dodate
                          </div>
                          <div className="success">
                            Uspješno ste selektovali fajl!
                          </div>
                        </div>
                      </div> */}
                      <div className="form__group w-48 mob-w-100">
                        {/* <label className="form__label" htmlFor="d-signature">
                          Logotip
                          <span className="txt-light"> - Nije Obavezno</span>
                        </label>
                        <span className="form__file">
                          <input
                            type="file"
                            name="logotip"
                            className="form__input"
                            id="logotip"
                            // onChange={(e) => {
                            //   setLogotipFile(e.target.files[0]);
                            // }}
                            onChange={(e) => {
                              handleLogotipInputChange(e);
                            }}
                          />
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Žiro računi</h2>
                      <p className="tabp-mb-20 txt-light">
                        Podaci o žiro računima preduzeća
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
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">
                        Plaćanje iz inostranstva
                      </h2>
                      <p className="tabp-mb-20 txt-light">
                        Informacije koje su bitne za plaćanje iz inostranstva
                      </p>
                    </div>
                    <div className="col-md-7 col-lg-8">
                      <div className="form__group half-wd-full-tab">
                        <InputField
                          name="iban"
                          label={$t('preduzeca.iban')}
                          placeholder=""
                          type="text"
                          className="form__input"
                        />
                      </div>
                      <div className="form__group half-wd-full-tab">
                        <InputField
                          name="bic_swift"
                          label={$t('preduzeca.bic_swift')}
                          placeholder=""
                          type="text"
                          className="form__input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Kontakt informacije</h2>
                      <p className="tabp-mb-20 txt-light">
                        Kontakt informacije preduzeća. Svi korisnici PostFiskal
                        aplikacije mogu da vide informacije ovog preduzeća koje
                        unesete
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
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
                                id="telfon_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telfon_viber"
                                id="telfon_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                name="telfon_facetime"
                                id="telfon_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="fax"
                            label={$t('preduzeca.fax')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="email"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
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
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Ovlašćeno lice</h2>
                      <p className="tabp-mb-20 txt-light">
                        Informacije o ovlašćenom licu unutar preduzeća
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="ovlasceno_lice_kontakt_ime"
                            label={$t('preduzeca.ime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="ovlasceno_lice_kontakt_prezime"
                            label={$t('preduzeca.prezime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
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
                                id="ovlasceno_lice_kontakt_whatsapp"
                                name="ovlasceno_lice_kontakt_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                id="ovlasceno_lice_kontakt_viber"
                                name="ovlasceno_lice_kontakt_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                id="ovlasceno_lice_kontakt_facetime"
                                name="ovlasceno_lice_kontakt_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="ovlasceno_lice_kontakt_email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="email"
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
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Osoba za kontakt</h2>
                      <p className="tabp-mb-20 txt-light">
                        Informacije o osobi za kontakt unutar preduzeća
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="kontakt_ime"
                            label={$t('preduzeca.ime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="kontakt_prezime"
                            label={$t('preduzeca.prezime')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            id="kontakt_telefon"
                            name="kontakt_telefon"
                            label={$t('preduzeca.telefon')}
                            placeholder=""
                            type="text"
                            className="form__input"
                          />
                          <div className="df ai-c jc-sb">
                            <div className="form__checkbox-group">
                              <Checkbox
                                id="kontakt_whatsapp"
                                name="kontakt_whatsapp"
                                label={$t('preduzeca.whatsapp')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                id="kontakt_viber"
                                name="kontakt_viber"
                                label={$t('preduzeca.viber')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                            <div className="form__checkbox-group">
                              <Checkbox
                                id="kontakt_facetime"
                                name="kontakt_facetime"
                                label={$t('preduzeca.facetime')}
                                placeholder=""
                                // className="form__checkbox"
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="kontakt_email"
                            label={$t('preduzeca.email')}
                            placeholder=""
                            type="email"
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
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Društvene mreže</h2>
                      <p className="tabp-mb-20 txt-light">
                        Informacije o nalozima na društvnim mrežama da ostali
                        korisnici mogu da prate vaše preduzeće
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="twitter_username"
                            label={$t('preduzeca.twitter')}
                            placeholder="@restartIt"
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="facebook_username"
                            label={$t('preduzeca.facebook')}
                            placeholder="@restartIt"
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="instagram_username"
                            label={$t('preduzeca.instagram')}
                            placeholder="@restartIt"
                            type="text"
                            className="form__input"
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <InputField
                            name="skype_username"
                            label={$t('preduzeca.skype')}
                            placeholder="@restartIt"
                            type="text"
                            className="form__input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {/* <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Lokacija na mapi</h2>
                      <p className="mob-mb-20 txt-light">
                        Tačna lokacija na mapi
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <span className="form__label">Lokacija</span>
                      <div className="form__map">
                        <MapContainer google={true} className="form__map" />
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <hr /> */}
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <h2 className="heading-secondary">Status</h2>
                      <p className="tabp-mb-20 txt-light">
                        Promijenite status preduzeća i podatke o tome da li je u
                        sistemu PDV-a
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                          <label className="form__label">Status</label>
                          <div
                            className="form__group"
                            onChange={(event) => {
                              console.log(
                                'event.target.value',
                                event.target.value
                              );
                              values.status = event.target.value;
                            }}
                          >
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Aktivan"
                                value="Aktivan"
                                name="status"
                                defaultChecked
                                // checked={values.status}
                              />
                              <label
                                htmlFor="Aktivan"
                                className="form__radio-label"
                              >
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Aktivan</span>
                              </label>
                            </div>
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Neaktivan"
                                value="Neaktivan"
                                name="status"
                                disabled
                                // checked={usluga && radioChecked}
                              />
                              <label
                                htmlFor="Neaktivan"
                                className="form__radio-label"
                              >
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Neaktivan</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                          <label className="form__label">
                            Javno prikazani podaci
                          </label>
                          <div
                            className="form__group"
                            onChange={(event) => {
                              console.log(
                                'event.target.value',
                                event.target.value
                              );
                              values.status = event.target.value;
                            }}
                          >
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Javno"
                                value="javno"
                                name="privatnost"
                                defaultChecked
                                // checked={values.status}
                              />
                              <label
                                htmlFor="Javno"
                                className="form__radio-label"
                              >
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Javno</span>
                              </label>
                            </div>
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Privatno"
                                value="privatno"
                                name="privatnost"
                                disabled
                                // checked={usluga && radioChecked}
                              />
                              <label
                                htmlFor="Privatno"
                                className="form__radio-label"
                              >
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Privatno</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                          <label className="form__label">
                            U Sistemu PDV-a?
                          </label>
                          <div
                            className="form__group"
                            onChange={(event) => {
                              console.log(
                                'setPdvObveznikChecked',
                                pdvObveznikChecked
                              );
                              values.pdv_obveznik = +event.target.value;
                              setPdvObveznikChecked(+event.target.value);
                            }}
                          >
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Da"
                                value={1}
                                name="pdv_obveznik"
                                defaultChecked={
                                  values?.pdv_obveznik === 1 ? true : false
                                }
                              />
                              <label htmlFor="Da" className="form__radio-label">
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Da</span>
                              </label>
                            </div>
                            <div className="form__radio-group">
                              <input
                                className="form__radio-input"
                                type="radio"
                                id="Ne"
                                value={0}
                                name="pdv_obveznik"
                                defaultChecked={
                                  values.pdv_obveznik === 0 ? true : false
                                }
                              />
                              <label htmlFor="Ne" className="form__radio-label">
                                <span className="form__radio-button"></span>
                                <span className="mob-ml-10">Ne</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="df mtb-25">
                            {preduzece?.verifikovan === 1 ? (
                              <>
                                <IconFillSvg />
                                <span>Verifikovano preduzeće</span>
                              </>
                            ) : null}
                          </div>
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
                  <button
                    className="btn btn__primary"
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
                    type="submit"
                  >
                    Sačuvaj
                  </button>
                  <button
                    type="button"
                    className="btn btn__link ml-m"
                    onClick={() => {
                      history.goBack();
                    }}
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
