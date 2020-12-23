import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch } from 'react-router-dom';

import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';
import {
  poreziDropdownSelector,
  porezIdSelector,
  uslugaSelector,
  poreziSelector,
} from '../../store/selectors/UslugeSelector';
import {
  deleteUsluga,
  getPorezi,
  getUsluga,
  storeUsluga,
  updateUsluga,
} from '../../store/actions/UslugeActions';
import { grupeService } from '../../services/GrupeService';
import { poreziService } from '../../services/PoreziService';
import { jediniceMjereService } from '../../services/JediniceMjereService';
import DropDownStatic from '../shared/forms/DropDownStatic';
import { l } from 'i18n-js';
import RadioButton from '../shared/forms/RadioButton';

const UslugeForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const usluga = useSelector(uslugaSelector());

  useEffect(() => {
    dispatch(getPorezi());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) dispatch(getUsluga(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) {
      dispatch(updateUsluga({ id: params.id, ...values }));
    } else {
      console.log(values);
      dispatch(
        storeUsluga({
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          ...values,
          status: values.status === 'Aktivan' ? true : false,
        })
      );
    }
  };
  const options = [
    { value: 0, label: 'Cijena bez PDV' },
    { value: 1, label: 'Cijena sa PDV' },
  ];

  const statusOptions = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];

  const poreziDropdown = useSelector(poreziDropdownSelector());
  const porezi = useSelector(poreziSelector());

  const getStopaPerId = (porez_id) => {
    const stopa = porezi.find((porez) => porez.id === porez_id)?.stopa;
    return stopa;
  };

  const getPriceNoVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return Math.round(100 * ukupna_cijena) / 100;
    } else {
      return Math.round(100 * (ukupna_cijena / (Number(stopa) + 1))) / 100;
    }
  };

  const getPriceVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return ukupna_cijena + ukupna_cijena * +stopa;
    } else {
      return ukupna_cijena;
    }
  };

  const getVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);

    if (pdv_ukljucen === 0) {
      return Math.round(100 * (ukupna_cijena * Number(stopa))) / 100;
    } else {
      return (
        Math.round(
          100 * (ukupna_cijena - ukupna_cijena / (Number(stopa) + 1))
        ) / 100
      );
    }
  };

  return (
    <Formik
      initialValues={usluga}
      onSubmit={handleSubmit}
      //  validationSchema={FizickaLicaSchema}
      enableReinitialize
    >
      {({ values }) => (
        <div className="screen-content">
          <Link to="#stavke" className="link df">
            <LinkSvg /> <p>Povratak na Stavke</p>
          </Link>

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
                            <p className="mb-10">
                              PDV
                              {getStopaPerId(values.porez_id) * 100}%:
                            </p>
                            <p className="mb-10">Ukupna cijena</p>
                          </div>
                          <div className="col-r">
                            <p className="mb-10">/</p>
                            <p className="mb-10">
                              {getPriceNoVat(
                                values.pdv_ukljucen,
                                values.porez_id,
                                values.ukupna_cijena
                              )}
                            </p>
                            <p className="mb-10">
                              {getVat(
                                values.pdv_ukljucen,
                                values.porez_id,
                                values.ukupna_cijena
                              )}
                            </p>
                            <p className="mb-10">
                              {getPriceVat(
                                values.pdv_ukljucen,
                                values.porez_id,
                                values.ukupna_cijena
                              )}
                            </p>
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
                          obavezno
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
                          <DropDownStatic
                            name="pdv_ukljucen"
                            label={$t('usluge.pdv_ukljucen')}
                            options={options}
                            defaultValue={options[1]}
                          />
                        </div>
                      </div>

                      <div className="form__group w-100">
                        <InputField
                          type="number"
                          className="form__input"
                          name="ukupna_cijena"
                          label={$t('usluge.ukupna_cijena')}
                        />
                        <InputField
                          type="hidden"
                          value={getPriceNoVat}
                          className="form__input"
                          name="cijena_bez_pdv"
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
                        Consequat eget volutpat enim libero nulla neque
                        ultrices. Sed tristique nullam erat in interdum.
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="form__group">
                        <div className="form__radio-group">
                          <RadioButton
                            name="status"
                            label="Status"
                            options={statusOptions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form__footer">
                  <button className="btn btn__dark btn__md" type="submit">
                    Sačuvaj
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
      )}
    </Formik>
  );
};

export default UslugeForm;
