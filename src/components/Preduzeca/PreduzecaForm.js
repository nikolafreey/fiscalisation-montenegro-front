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

const PreduzecaForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

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
        'kratki_naziv': '',
        'puni_naziv': '',
        'oblik_preduzeca': '',
        'adresa': '',
        'grad': '',
        'drzava': '',
        'telefon': '',
        'telefon_viber': '',
        'telefon_whatsapp': '',
        'telefon_facetime': '',
        'fax': '',
        'email': '',
        'website': '',
        'pib': '',
        'pdv': '',
        'djelatnost': '',
        'iban': '',
        'bic_swift': '',
        'kontakt_ime': '',
        'kontakt_prezime': '',
        'kontakt_telefon': '',
        'kontakt_viber': '',
        'kontakt_whatsapp': '',
        'kontakt_facetime': '',
        'kontakt_email': '',
        'twitter_username': '',
        'instagram_username': '',
        'facebook_username': '',
        'skype_username': '',
        'logotip': '',
        'opis': '',
        'lokacija_lat': '',
        'lokacija_long': '',
        'status': '',
        'privatnost': '',
        'verifikovan': '',
        'kategorija_id': '',
        'ziro_racuni': [],
        ...preduzece
      }}
      onSubmit={handleSubmit}
      validationSchema={PreduzecaSchema}
      enableReinitialize
    >
      <Form>
        <InputField
          name="kratki_naziv"
          label={$t('preduzeca.kratki_naziv')}
          placeholder=''
        />
        <InputField
          name="puni_naziv"
          label={$t('preduzeca.puni_naziv')}
          placeholder=''
        />{' '}
        <InputField
          name="oblik_preduzeca"
          label={$t('preduzeca.oblik_preduzeca')}
          placeholder=''
        />
        <InputField
          name="adresa"
          label={$t('preduzeca.adresa')}
          placeholder=''
        />
        <InputField
          name="grad"
          label={$t('preduzeca.grad')}
          placeholder=''
        />
        <InputField
          name="drzava"
          label={$t('preduzeca.drzava')}
          placeholder=''
        />
        <InputField
          name="telefon"
          label={$t('preduzeca.telefon')}
          placeholder=''
        />
        <InputField
          name="telfon_viber"
          label={$t('preduzeca.viber')}
          placeholder=''
        />
        <InputField
          name="telfon_whatsapp"
          label={$t('preduzeca.whatsapp')}
          placeholder=''
        />
        <InputField
          name="telfon_facetime"
          label={$t('preduzeca.facetime')}
          placeholder=''
        />
        <InputField
          name="fax"
          label={$t('preduzeca.fax')}
          placeholder=''
        />
        <InputField
          name="email"
          label={$t('preduzeca.email')}
          placeholder=''
        />
        <InputField
          name="website"
          label={$t('preduzeca.website')}
          placeholder=''
        />
        <InputField
          name="pdv "
          label={$t('preduzeca.pdv')}
          placeholder=''
        />
        <InputField
          name="djelatnost"
          label={$t('preduzeca.djelatnost')}
          placeholder=''
        />
        <InputField
          name="iban"
          label={$t('preduzeca.iban')}
          placeholder=''
        />
        <InputField
          name="bic_swift"
          label={$t('preduzeca.bic_swift')}
          placeholder=''
        />
        <InputField
          name="kontakt_ime"
          label={$t('preduzeca.ime')}
          placeholder=''
        />
        <InputField
          name="kontakt_prezime"
          label={$t('preduzeca.prezime')}
          placeholder=''
        />
        <InputField
          name="kontakt_telefon"
          label={$t('preduzeca.telefon')}
          placeholder=''
        />
        <InputField
          name="kontakt_viber"
          label={$t('preduzeca.viber')}
          placeholder=''
        />
        <InputField
          name="kontakt_whatsapp"
          label={$t('preduzeca.whatsapp')}
          placeholder=''
        />
        <InputField
          name="kontakt_facetime"
          label={$t('preduzeca.facetime')}
          placeholder=''
        />
        <InputField
          name="kontakt_email"
          label={$t('preduzeca.email')}
          placeholder=''
        />
        <InputField
          name="instagram_username"
          label={$t('preduzeca.instagram')}
          placeholder=''
        />
        <InputField
          name="facebook_username"
          label={$t('preduzeca.facebook')}
          placeholder=''
        />
        <InputField
          name="skype_username"
          label={$t('preduzeca.skype')}
          placeholder=''
        />
        <InputField
          name="logotip"
          label={$t('preduzeca.logotip')}
          placeholder=''
        />
        <InputField
          name="opis"
          label={$t('preduzeca.opis')}
          placeholder=''
        />
        <InputField
          name="lokacija_lat"
          label={$t('preduzeca.lokacija')}
          placeholder=''
        />
        <InputField
          name="lokacija_long"
          label={$t('preduzeca.lokacija')}
          placeholder=''
        />
        <InputField
          name="status"
          label={$t('preduzeca.status')}
          placeholder=''
        />
        <InputField
          name="privatnost"
          label={$t('preduzeca.privatnost')}
          placeholder=''
        />
        <InputField
          name="verifikovan"
          label={$t('preduzeca.verifikovan')}
          placeholder=''
        />
        <DropDown
          name="kategorija_id"
          label={$t('preduzeca.kategorija')}
          loadOptions={kategorijeService.getKategorijeDropdown}
        />
        <FieldArray name='ziro_racuni'>
          {(arrayHelpers) => <ZiroRacuniFieldArray {...arrayHelpers}/>}
        </FieldArray>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => dispatch(deletePreduzece(params.id))}
        >
          Delete
        </button>
      </Form>
    </Formik>
  );
};

export default PreduzecaForm;
