import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { useRouteMatch } from 'react-router-dom';
import { preduzecaService } from '../../services/PreduzecaService';
import { uslugaSelector } from '../../store/selectors/UslugeSelector';
import {
  deleteUsluga,
  getUsluga,
  storeUsluga,
  updateUsluga,
} from '../../store/actions/UslugeActions';
import { grupeService } from '../../services/GrupeService';
import { poreziService } from '../../services/PoreziService';
import { jediniceMjereService } from '../../services/JediniceMjereService';

const UslugeForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const usluga = useSelector(uslugaSelector());

  useEffect(() => {
    if (params.id) dispatch(getUsluga(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) dispatch(updateUsluga({ id: params.id, ...values }));
    else dispatch(storeUsluga(values));
  };

  return (
    <Formik
      initialValues={usluga}
      onSubmit={handleSubmit}
      //  validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      <Form>
        <InputField
          name="naziv"
          label={$t('usluge.naziv')}
          placeholder={$t('')}
        />
        <InputField
          name="opis"
          label={$t('usluge.opis')}
          placeholder={$t('')}
        />{' '}
        <InputField
          name="cijena_bez_pdv"
          label={$t('usluge.cijena_bez_pdv')}
          placeholder={$t('')}
        />
        <InputField
          name="pdv_iznos"
          label={$t('usluge.pdv_iznos')}
          placeholder={$t('')}
        />
        <InputField
          name="ukupna_cijena"
          label={$t('usluge.ukupna_cijena')}
          placeholder={$t('')}
        />
        <InputField
          name="status"
          label={$t('usluge.status')}
          placeholder={$t('')}
        />
        <DropDown
          name="porez_id"
          label={$t('usluge.porezi')}
          loadOptions={poreziService.getPoreziDropdown}
        />
        <DropDown
          name="jedinica_mjere_id"
          label={$t('usluge.jedinicaMjere')}
          loadOptions={jediniceMjereService.getJediniceMjereDropdown}
        />
        <DropDown
          name="grupa_id"
          label={$t('usluge.grupa')}
          loadOptions={grupeService.getGrupeDropdown}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch(deleteUsluga(params.id))}>
          Delete
        </button>
      </Form>
    </Formik>
  );
};

export default UslugeForm;
