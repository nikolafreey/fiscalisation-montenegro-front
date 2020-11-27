import { Form, Formik } from 'formik';
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
      initialValues={fizickoLice}
      onSubmit={handleSubmit}
      validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      <Form>
        <InputField
          name="ime"
          label={$t('fizickalica.ime')}
          placeholder={$t('')}
        />
        <InputField
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
          name="preduzece_id"
          label={$t('fizickalica.asdf')}
          loadOptions={preduzecaService.getPreduzecaDropdown}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch(deleteFizickoLice(params.id))}>Delete</button>
      </Form>
    </Formik>
  );
};

export default FizickaLicaForm;
