import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import {
  deletePartner,
  getPartner,
  storePartner,
  updatePartner,
} from '../../store/actions/PartneriActions';
import { PartneriSchema } from '../../validation/partneri';
import { useRouteMatch } from 'react-router-dom';
import { partnerSelector } from '../../store/selectors/PartneriSelector';
import { preduzecaService } from '../../services/PreduzecaService';
import { fizickaLicaService } from '../../services/FizickaLicaService';

const PartneriForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const partner = useSelector(partnerSelector());

  useEffect(() => {
    if (params.id) dispatch(getPartner(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updatePartner({ id: params.id, ...values }));
    else dispatch(storePartner(values));
  };
  return (
    <Formik
      initialValues={{
        kontakt_ime: '',
        kontakt_prezime: '',
        kontakt_telefon: '',
        kontakt_viber: true,
        kontakt_whatsapp: true,
        kontakt_facetime: true,
        opis: '',
        zanimanje: '',
        radno_mjesto: '',
        drzavljanstvo: '',
        nacionalnost: '',
        cv_link: '',
        avatar: '',
      }}
      initialValues={partner}
      onSubmit={handleSubmit}
      validationSchema={PartneriSchema}
      enableReinitialize
    >
      <Form>
        <InputField
          name="kontakt_ime"
          label={$t('partneri.kontakt_ime')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_prezime"
          label={$t('partneri.kontakt_prezime')}
          placeholder={$t('')}
        />{' '}
        /*{' '}
        <InputField
          name="kontakt_telefon"
          label={$t('partneri.kontakt_telefon')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_viber"
          label={$t('partneri.kontakt_viber')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_whatsapp"
          label={$t('partneri.kontakt_whatsapp')}
          placeholder={$t('')}
        />
        <InputField
          name="kontakt_facetime"
          label={$t('partneri.kontakt_facetime')}
          placeholder={$t('')}
        />
        <InputField
          name="opis"
          label={$t('partneri.opis')}
          placeholder={$t('')}
        />
        <DropDown
          name="user_id"
          label={$t('partneri.user_id')}
          loadOptions={() => {}}
        />
        <DropDown
          name="fizicko_lice_id"
          label={$t('partneri.fizicko_lice_id')}
          loadOptions={fizickaLicaService.getFizickaLicaDropdown}
        />
        <DropDown
          name="preduzece_id"
          label={$t('partneri.preduzece_id')}
          loadOptions={preduzecaService.getPreduzecaDropdown}
        />
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => dispatch(deletePartner(params.id))}
        >
          Delete
        </button>
      </Form>
    </Formik>
  );
};

export default PartneriForm;
