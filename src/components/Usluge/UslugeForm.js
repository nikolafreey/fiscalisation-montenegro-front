import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { useRouteMatch } from 'react-router-dom';
import { preduzecaService } from '../../services/PreduzecaService';

import { ReactComponent as Link } from '../../assets/icon/link.svg';
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
      <div className="screen-content">
        <a href="#" className="link df">
          <Link /> <p>Povratak na Stavke</p>
        </a>

        <h1 className="heading-primary">Dodavanje nove usluge</h1>

        <div className="main-content__box">
          <div className="content">
            <Form>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mt-25 jc-sb">
                    <div className="df fd-column h-100">
                      <div>
                        <h2 className="heading-secondary">Informacije</h2>
                        <p className="txt-light">
                          Consequat eget volutpat enim libero nulla neque
                          ultrices. Sed tristique nullam erat in interdum.
                        </p>
                      </div>
                      <div className="df jc-sb h-70 ai-end mt-15">
                        <div className="col-l txt-light">
                          <p className="mb-10">Cijena usluge:</p>
                          <p className="mb-10">Bez PDV-a:</p>
                          <p className="mb-10">PDV 21%:</p>
                          <p className="mb-10">Ukupna cijena</p>
                        </div>
                        <div className="col-r">
                          <p className="mb-10">/</p>
                          <p className="mb-10">20,00</p>
                          <p className="mb-10">4,20</p>
                          <p className="mb-10">24,20</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 mtb-25">
                    <div className="form__group w-100">
                      <InputField
                        name="naziv"
                        className="form__input"
                        label={$t('usluge.naziv')}
                      />
                    </div>
                    <div className="form__group">
                      <InputField
                        name="opis"
                        className="form__input"
                        label={$t('usluge.opis')}
                      />
                    </div>
                    <div className="df jc-sb">
                      <div className="form__group w-48">
                        <DropDown
                          className="form__input"
                          name="jedinica_mjere_id"
                          label={$t('usluge.jedinicaMjere')}
                          loadOptions={
                            jediniceMjereService.getJediniceMjereDropdown
                          }
                        />
                      </div>
                      <div className="form__group w-48">
                        <DropDown
                          className="form__input"
                          name="grupa_id"
                          label={$t('usluge.grupa')}
                          loadOptions={grupeService.getGrupeDropdown}
                        />
                      </div>
                    </div>
                    <div className="df jc-sb">
                      <div className="form__group w-48">
                        <DropDown
                          name="porez_id"
                          label={$t('usluge.porezi')}
                          loadOptions={poreziService.getPoreziDropdown}
                        />
                      </div>
                      <div className="form__group w-48">
                        <InputField
                          class="form__input"
                          name="cijena_bez_pdv"
                          label={$t('usluge.cijena_bez_pdv')}
                        />
                      </div>
                    </div>

                    <div className="form__group w-100">
                      <InputField
                        class="form__input"
                        name="ukupna_cijena"
                        label={$t('usluge.ukupna_cijena')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="heading-secondary">Status</h2>
                    <p>
                      Consequat eget volutpat enim libero nulla neque ultrices.
                      Sed tristique nullam erat in interdum.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <div className="form__label">status</div>
                    <div className="form__group">
                      <InputField name="status" label={$t('usluge.status')} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__footer">
                <button className="btn btn__dark btn__md" type="submit">
                  Submit
                </button>
                <button className="btn btn__link ml-m">Nazad</button>

                {/* <button
                  type="button"
                  onClick={() => dispatch(deleteUsluga(params.id))}
                >
                  Delete
                </button> */}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default UslugeForm;
