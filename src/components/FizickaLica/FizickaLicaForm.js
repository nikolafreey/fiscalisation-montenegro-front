import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { FizickaLicaSchema } from '../../validation/fizicka_lica';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFizickoLice, getFizickoLice, storeFizickoLice, updateFizickoLice } from '../../store/actions/FizickaLicaActions';
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
    if (params.id) dispatch(updateFizickoLice({id: params.id, ...values}));
    else dispatch(storeFizickoLice(values));
  }

  return (
    <Formik
      initialValues={{
        'ime': '',
        'prezime': '',
        'jmbg': '',
        'ib': '',
        'adresa': '',
        'telefon': '',
        'email': '',
        'zanimanje': '',
        'radno_mjesto': '',
        'drzavljanstvo': '',
        'nacionalnost': '',
        'cv_link': '',
        'avatar': '',
        'preduzece_id': '',
        'ziro_racuni': [],
        ...fizickoLice
      }}
      onSubmit={handleSubmit}
      validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      {({values}) => (<Form>
        <InputField
          name="ime"
          label={$t('fizickalica.ime')}
        />
        <InputField
          name="prezime"
          label={$t('fizickalica.prezime')}
        />{' '}
        <InputField
          name="jmbg"
          label={$t('fizickalica.jmbg')}
        />
        <InputField
          name="ib"
          label={$t('fizickalica.ib')}
        />
        <InputField
          name="adresa"
          label={$t('fizickalica.adresa')}
        />
        <InputField
          name="telefon"
          label={$t('fizickalica.telefon')}
        />
        <InputField
          name="email"
          label={$t('fizickalica.email')}
        />
        <InputField
          name="zanimanje"
          label={$t('fizickalica.zanimanje')}
        />
        <InputField
          name="radno_mjesto"
          label={$t('fizickalica.radno_mjesto')}
        />
        <InputField
          name="drzavljanstvo"
          label={$t('fizickalica.drzavljanstvo')}
        />
        <InputField
          name="nacionalnost"
          label={$t('fizickalica.nacionalnost')}
        />
        <InputField
          name="cv_link"
          label={$t('fizickalica.cv_link')}
        />
        <InputField
          name="avatar"
          label={$t('fizickalica.avatar')}
        />
        <DropDown
          name="preduzece_id"
          label={$t('fizickalica.preduzece_id')}
          loadOptions={preduzecaService.getPreduzecaDropdown}
        />
        <FieldArray name='ziro_racuni'>
          {(arrayHelpers) => <ZiroRacuniFieldArray {...arrayHelpers}/>}
        </FieldArray>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch(deleteFizickoLice(params.id))}>Delete</button>
      </Form>)}
    </Formik>
  );
};

export default FizickaLicaForm;
