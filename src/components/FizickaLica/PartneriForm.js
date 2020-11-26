import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import $t from '../../lang';
import { useDispatch } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { storePartner } from '../../store/actions/PartneriActions';
import { PartneriSchema } from '../../validation/partneri';

const PartneriForm = () => {
  const dispatch = useDispatch();

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
      onSubmit={(values) => dispatch(storePartner(values))}
      validationSchema={PartneriSchema}
    >
      <Form>
        <InputField
          name="kontakt_ime"
          label={$t('fizickalica.kontakt_ime')}
          placeholder={$t('')}
        />
        {/* <InputField
          name="prezime"
          label={$t('fizickalica.prezime')}
          placeholder={$t('')}
        />{' '}
        <InputField
          name="jmbg"
          label={$t('fizickalica.jmbg')}
          placeholder={$t('')}
        />
        <InputField
          name="ib"
          label={$t('fizickalica.ib')}
          placeholder={$t('')}
        />
        <InputField
          name="adresa"
          label={$t('fizickalica.adresa')}
          placeholder={$t('')}
        />
        <InputField
          name="telefon"
          label={$t('fizickalica.telefon')}
          placeholder={$t('')}
        />
        <InputField
          name="email"
          label={$t('fizickalica.email')}
          placeholder={$t('')}
        />
        <InputField
          name="zanimanje"
          label={$t('fizickalica.zanimanje')}
          placeholder={$t('')}
        />
        <InputField
          name="radno_mjesto"
          label={$t('fizickalica.radno_mjesto')}
          placeholder={$t('')}
        />
        <InputField
          name="drzavljanstvo"
          label={$t('fizickalica.drzavljanstvo')}
          placeholder={$t('')}
        />
        <InputField
          name="nacionalnost"
          label={$t('fizickalica.nacionalnost')}
          placeholder={$t('')}
        />
        <InputField
          name="cv_link"
          label={$t('fizickalica.cv_link')}
          placeholder={$t('')}
        />
        <InputField
          name="avatar"
          label={$t('fizickalica.avatar')}
          placeholder={$t('')}
        />
        <DropDown
          name="preduzece"
          label={$t('fizickalica.asdf')}
          loadOptions={() => {}}
        /> */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default PartneriForm;
