import { Form, Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch, useHistory, Prompt } from 'react-router-dom';
import { UslugeSchema } from '../../validation/usluga';

import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';
import {
  poreziDropdownSelector,
  uslugaSelector,
  poreziSelector,
} from '../../store/selectors/UslugeSelector';
import {
  getPorezi,
  getUsluga,
  storeUsluga,
  updateUsluga,
} from '../../store/actions/UslugeActions';
import { grupeService } from '../../services/GrupeService';
import { poreziService } from '../../services/PoreziService';
import { jediniceMjereService } from '../../services/JediniceMjereService';
import DropDownStatic from '../shared/forms/DropDownStatic';
// import { l } from 'i18n-js';
import RadioButton from '../shared/forms/RadioButton';
// import AysncCreatableDropDown from '../shared/forms/CreateableDropDown';
import { storeGrupa } from '../../store/actions/GrupeActions';
import { isNumber } from 'lodash';
import { STAVKE, USLUGE } from '../../constants/routes';

const UslugeForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { params } = useRouteMatch();

  const usluga = useSelector(uslugaSelector());
  const [radioChecked, setRadioChecked] = useState(
    usluga?.status === 0 ? true : false
  );
  console.log('usluga', usluga);

  useEffect(() => {
    dispatch(getPorezi());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(getUsluga(params.id));
    }
  }, [dispatch, params, usluga?.jedinica_mjere?.naziv]);

  let tempLen = [];
  let tempLength = grupeService
    .getGrupeDropdown()
    .then((data) => (tempLen = data.length));

  const handleSubmit = (values) => {
    if (params.id) {
      // dispatch(updateUsluga({ id: params.id, ...values }));
      // history.push(STAVKE.INDEX);
      dispatch(
        updateUsluga({
          id: params.id,
          ...values,
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          grupa_id: isNumber(values?.grupa_id)
            ? values?.grupa_id
            : tempLen?.slice(-1)[0].value + 1,
          status: values.status == 'Aktivan' ? true : false,
        })
      );
      history.push(STAVKE.INDEX);
    } else {
      dispatch(
        storeUsluga({
          ...values,
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          grupa_id: isNumber(values?.grupa_id)
            ? values?.grupa_id
            : tempLen?.slice(-1)[0].value + 1,
          ukupna_cijena: getPriceVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          status: values.status == 'Aktivan' ? true : false,
        })
      );
      history.push(STAVKE.INDEX);
    }
    console.log('values', values);
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
    if (porez_id === null || porez_id === undefined) porez_id = 4;
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return Math.round(10000 * ukupna_cijena) / 10000;
    } else {
      return Math.round(10000 * (ukupna_cijena / (Number(stopa) + 1))) / 10000;
    }
  };

  const getPriceVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    if (porez_id === null || porez_id === undefined) porez_id = 4;
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return +ukupna_cijena + +ukupna_cijena * +stopa;
    } else {
      return ukupna_cijena;
    }
  };

  const getVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    if (porez_id === null || porez_id === undefined) porez_id = 4;
    const stopa = getStopaPerId(porez_id);
    if (pdv_ukljucen === 0) {
      return Math.round(10000 * (ukupna_cijena * Number(stopa))) / 10000;
    } else {
      return (
        Math.round(
          10000 * (ukupna_cijena - ukupna_cijena / (Number(stopa) + 1))
        ) / 10000
      );
    }
  };

  const handleCreate = async (inputValue) => {
    dispatch(
      storeGrupa({ naziv: inputValue, popust_procenti: 0, popust_iznos: 0 })
    );
  };

  return (
    <Formik
      initialValues={{
        status: 'Aktivan',
        porez_id: 4,
        ...usluga,
      }}
      onSubmit={handleSubmit}
      validationSchema={UslugeSchema}
      enableReinitialize
    >
      {({ values, dirty, isSubmitting }) => (
        <div className="screen-content">
          <Link to={STAVKE.INDEX} className="back-link df">
            <LinkSvg /> <p>Povratak na Stavke</p>
          </Link>

          <h1 className="heading-primary">Dodavanje nove usluge</h1>

          <div className="main-content__box">
            <div className="content">
              <Form>
                <Prompt
                  when={dirty && !isSubmitting}
                  message="Da li ste sigurni da želite da se vratite nazad? Vaši podaci sa forme neće biti sačuvani"
                />
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
                              PDV{' '}
                              {isNaN(getStopaPerId(values.porez_id))
                                ? ''
                                : (
                                    getStopaPerId(values.porez_id) * 100
                                  ).toFixed(2)}
                              %:
                            </p>
                            <p className="mb-10">Ukupna cijena </p>
                          </div>
                          <div className="col-r">
                            <p className="mb-10">
                              {isNaN(
                                getPriceNoVat(
                                  values.pdv_ukljucen,
                                  values.porez_id,
                                  values.ukupna_cijena
                                )
                              )
                                ? '0,00€'
                                : getPriceNoVat(
                                    values.pdv_ukljucen,
                                    values.porez_id,
                                    values.ukupna_cijena
                                  ).toFixed(2) + '€'}
                            </p>
                            <p className="mb-10">
                              {isNaN(
                                getVat(
                                  values.pdv_ukljucen,
                                  values.porez_id,
                                  values.ukupna_cijena
                                )
                              )
                                ? '0,00€'
                                : getVat(
                                    values.pdv_ukljucen,
                                    values.porez_id,
                                    values.ukupna_cijena
                                  ).toFixed(2) + '€'}
                            </p>
                            <p className="mb-10">
                              {isNaN(
                                getPriceVat(
                                  values.pdv_ukljucen,
                                  values.porez_id,
                                  values.ukupna_cijena
                                )
                              )
                                ? '0,00€'
                                : Number(
                                    getPriceVat(
                                      values.pdv_ukljucen,
                                      values.porez_id,
                                      values.ukupna_cijena
                                    )
                                  ).toFixed(2) + '€'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8 mtb-25">
                      <div className="form__group w-100">
                        <InputField
                          name="naziv"
                          type="text"
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
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            //className="form__input"
                            name="jedinica_mjere_id"
                            label={$t('usluge.jedinicaMjere')}
                            loadOptions={
                              jediniceMjereService.getJediniceMjereDropdown
                            }
                            placeholder={
                              usluga && usluga?.jedinica_mjere?.naziv
                            }
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            //className="form__input"
                            // autoload={false}
                            key={JSON.stringify(
                              grupeService.getGrupeDropdown.value
                            )}
                            // defaultOptions={() => temp}
                            // ref={uslugeDropdown}
                            name="grupa_id"
                            label={$t('usluge.grupa')}
                            loadOptions={grupeService.getGrupeDropdown}
                            placeholder={usluga?.grupa?.naziv}
                            // onCreateOption={handleCreate}
                          />
                          {/* <CreatableSelect
                            isClearable
                            onChange={handleChange}
                            onCreateOption={handleCreate}
                            options={optionsGrupaDefault}
                            value={valueGrupa.value}
                            className="form__input"
                            cacheOptions
                            defaultOptions
                            // loadOptions={grupeService.getGrupeDropdown}
                          /> */}
                        </div>
                      </div>
                      <div className="df jc-sb mob-fd-column">
                        <div className="form__group w-48 mob-w-100">
                          <DropDown
                            name="porez_id"
                            label={$t('usluge.porezi')}
                            loadOptions={poreziService.getPoreziDropdown}
                            defaultValue={
                              params.id
                                ? {
                                    value: usluga?.porez?.id,
                                    label: usluga?.porez?.naziv,
                                  }
                                : { label: '21%', value: 4 }
                            }
                            placeholder={usluga?.porez?.naziv}
                          />
                        </div>
                        <div className="form__group w-48 mob-w-100">
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
                          obavezno
                        />
                        <InputField
                          type="hidden"
                          value={getPriceNoVat}
                          className="form__input"
                          name="cijena_bez_pdv"
                          obavezno
                          label=""
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
                      <label className="form__label">Status</label>
                      <div
                        className="form__group"
                        onChange={(event) => {
                          console.log('event.target.value', event.target.value);
                          values.status = event.target.value;

                          // if (usluga) {
                          //   if (values.status === 'Aktivan') {
                          //     setRadioChecked(true);
                          //   } else {
                          //     setRadioChecked(false);
                          //   }
                          // }
                        }}
                      >
                        {/* <RadioButton
                            name="status"
                            label="Status"
                            options={statusOptions}
                          /> */}
                        <div className="form__radio-group">
                          <input
                            className="form__radio-input"
                            type="radio"
                            id="Aktivan"
                            value="Aktivan"
                            name="status"
                            defaultChecked
                            // checked={values.status}
                          />
                          <label
                            htmlFor="Aktivan"
                            className="form__radio-label"
                          >
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">Aktivan</span>
                          </label>
                        </div>
                        <div className="form__radio-group">
                          <input
                            className="form__radio-input"
                            type="radio"
                            id="Neaktivan"
                            value="Neaktivan"
                            name="status"
                            // checked={usluga && radioChecked}
                          />
                          <label
                            htmlFor="Neaktivan"
                            className="form__radio-label"
                          >
                            <span className="form__radio-button"></span>
                            <span className="mob-ml-10">Neaktivan</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form__footer">
                  <button className="btn btn__primary btn__md" type="submit">
                    Sačuvaj
                  </button>
                  <button className="btn btn__link ml-m">
                    <Link to={STAVKE.INDEX}>Nazad</Link>
                  </button>

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
