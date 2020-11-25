import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { FizickaLicaSchema } from '../../validation/fizicka_lica';
import $t from '../../lang';
import { useDispatch } from 'react-redux';
import { storeFizickoLice } from '../../store/actions/FizickaLicaActions';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';

const FizickaLicaForm = () => {
  const dispatch = useDispatch()
  
  return (
    <Formik
      initialValues={{
        ime: '',
        prezime: '',
        jmbg: '',
        ib: '',
        adresa: '',
        telefon: '',
        email: '',
        zanimanje: '',
        radno_mjesto: '',
        drzavljanstvo: '',
        nacionalnost: '',
        cv_link: '',
        avatar: '',

      }}
      onSubmit={(values) => dispatch(storeFizickoLice(values))}
      validationSchema={FizickaLicaSchema}
    >
      
      <Form>
        <InputField name='ime' label={$t('preduzeca.asdf')} placeholder={$t('')} />

        <DropDown name='preduzeca' label={$t('preduzeca.asdf')} loadOptions={() => {}}/>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FizickaLicaForm;
