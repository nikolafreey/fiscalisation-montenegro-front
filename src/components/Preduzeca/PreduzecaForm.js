import { Form, Formik } from 'formik';
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
      initialValues={preduzece}
      onSubmit={handleSubmit}
      validationSchema={PreduzecaSchema}
      enableReinitialize
    >
      <Form>
        <InputField
          name="kratki_naziv"
          label={$t('preduzeca.kratki_naziv')}
          placeholder={$t('')}
        />
        <InputField
          name="puni_naziv"
          label={$t('preduzeca.puni_naziv')}
          placeholder={$t('')}
        />{' '}
        <InputField
          name="oblik_preduzeca"
          label={$t('preduzeca.oblik_preduzeca')}
          placeholder={$t('')}
        />
        <InputField
          name="adresa"
          label={$t('preduzeca.adresa')}
          placeholder={$t('')}
        />
        <InputField
          name="grad"
          label={$t('preduzeca.grad')}
          placeholder={$t('')}
        />
        <InputField
          name="drzava"
          label={$t('preduzeca.drzava')}
          placeholder={$t('')}
        />
        <InputField
          name="telefon"
          label={$t('preduzeca.telefon')}
          placeholder={$t('')}
        />
        <InputField
          name="telfon_viber"
          label={$t('preduzeca.telfon_viber')}
          placeholder={$t('')}
        />
        <InputField
          name="telfon_whatsapp"
          label={$t('preduzeca.telfon_whatsapp')}
          placeholder={$t('')}
        />
        <InputField
          name="telfon_facetime"
          label={$t('preduzeca.telfon_facetime')}
          placeholder={$t('')}
        />
        <InputField
          name="fax"
          label={$t('preduzeca.fax')}
          placeholder={$t('')}
        />
        <InputField
          name="email"
          label={$t('preduzeca.email')}
          placeholder={$t('')}
        />
        <InputField
          name="website"
          label={$t('preduzeca.website')}
          placeholder={$t('')}
        />
        <InputField
          name="pdv "
          label={$t('preduzeca.pdv ')}
          placeholder={$t('')}
        />
        <InputField
          name="djelatnost"
          label={$t('preduzeca.djelatnost')}
          placeholder={$t('')}
        />
        <InputField
          name="iban"
          label={$t('preduzeca.iban')}
          placeholder={$t('')}
        />
        <InputField
          name="bic_swift"
          label={$t('preduzeca.bic_swift')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_ime"
          label={$t('preduzeca.kontakt_ime')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_prezime"
          label={$t('preduzeca.kontakt_prezime')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_telefon"
          label={$t('preduzeca.kontakt_telefon')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_viber"
          label={$t('preduzeca.kontakt_viber')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_whatsapp"
          label={$t('preduzeca.kontakt_whatsapp')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_facetime"
          label={$t('preduzeca.kontakt_facetime')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_email"
          label={$t('preduzeca.kontakt_email')}
          placeholder={$t('')}
        />
        <InputField
          name="instagram_username"
          label={$t('preduzeca.instagram_username')}
          placeholder={$t('')}
        />
        <InputField
          name="facebook_username"
          label={$t('preduzeca.facebook_username')}
          placeholder={$t('')}
        />
        <InputField
          name="skype_username"
          label={$t('preduzeca.skype_username')}
          placeholder={$t('')}
        />
        <InputField
          name="logotip"
          label={$t('preduzeca.logotip')}
          placeholder={$t('')}
        />
        <InputField
          name="opis"
          label={$t('preduzeca.opis')}
          placeholder={$t('')}
        />
        <InputField
          name="lokacija_lat"
          label={$t('preduzeca.lokacija_lat')}
          placeholder={$t('')}
        />
        <InputField
          name="lokacija_long"
          label={$t('preduzeca.lokacija_long')}
          placeholder={$t('')}
        />
        <InputField
          name="status"
          label={$t('preduzeca.status')}
          placeholder={$t('')}
        />
        <InputField
          name="privatnost"
          label={$t('preduzeca.privatnost')}
          placeholder={$t('')}
        />
        <InputField
          name="verifikovan"
          label={$t('preduzeca.verifikovan')}
          placeholder={$t('')}
        />
        <InputField
          name="created_at"
          label={$t('preduzeca.created_at')}
          placeholder={$t('')}
        />
        <InputField
          name="updated_at"
          label={$t('preduzeca.updated_at')}
          placeholder={$t('')}
        />
        <DropDown
          name="kategorija_id"
          label={$t('preduzeca.asdf')}
          loadOptions={kategorijeService.getKategorijeDropdown}
        />
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
