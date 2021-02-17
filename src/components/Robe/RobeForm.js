import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { PreduzecaSchema } from '../../validation/preduzeca';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useHistory, useRouteMatch, Prompt } from 'react-router-dom';
import Textarea from '../shared/forms/Textarea';
import RadioButton from '../shared/forms/RadioButton';
import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';
import { ReactComponent as CloudPlusIcon } from '../../assets/icon/cloud-plus.svg';

import {
  deleteRoba,
  getRoba,
  storeRoba,
  updateRoba,
} from '../../store/actions/RobeActions';
import { robaSelector } from '../../store/selectors/RobeSelector';
import { jediniceMjereService } from '../../services/JediniceMjereService';
import { proizvodjacService } from '../../services/ProizvodjacService';
import CreateKategorija from './KategorijeRobe/CreateKategorija';
import CreatePodKategorija from './KategorijeRobe/CreatePodKategorija';
import ChooseKategorija from './KategorijeRobe/ChooseKategorija';
import ChooseAtribut from './Atributi/ChooseAtribut';
import Cijena from './CijeneRobe/Cijena';

import CijeneFieldArray from './CijeneRobe/CijeneFieldArray';
import { poreziSelector } from '../../store/selectors/UslugeSelector';
import { usePorezi } from '../../hooks/PoreziHook';
import { kategorijeRobeSelector } from '../../store/selectors/KategorijeRobeSelector';
import { setKategorijeRobe } from '../../store/actions/KategorijeRobeActions';

import { STAVKE } from '../../constants/routes';
import { globalErrorSelector } from '../../store/selectors/ErrorSelector';

const RobeForm = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const history = useHistory();

  const informacijeKontakt = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];

  const globalError = useSelector(globalErrorSelector());
  const roba = useSelector(robaSelector());
  console.log('roba:', roba);

  const {
    getStopaPerId,
    getPriceVat,
    getPriceNoVat,
    getVat,
    porezi,
  } = usePorezi();

  useEffect(() => {
    if (params.id) dispatch(getRoba(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    if (params.id) {
      dispatch(
        updateRoba({
          ...values,
          id: params.id,
          status: values.status === 'Aktivan' ? true : false,
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
        })
      );
      if (globalError.message) history.push(STAVKE.INDEX);
    } else {
      console.log('ukupna_cijena', values);
      dispatch(
        storeRoba({
          ...values,
          nabavna_cijena_sa_pdv: values.nabavna_cijena_sa_pdv
            ? values.nabavna_cijena_sa_pdv
            : 0,
          nabavna_cijena_bez_pdv: values.nabavna_cijena_bez_pdv
            ? values.nabavna_cijena_bez_pdv
            : 0,
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          status: values.status === 'Aktivan' ? true : false,
        })
      );
    }
    if (globalError.message) history.push(STAVKE.INDEX);
  };

  const kategorije = useSelector(kategorijeRobeSelector());
  const [search, setSearch] = useState('');

  const [filtered, setFiltered] = useState();
  const handleChange = (event) => {
    const filterKat = kategorije.filter((kategorija) => {
      return kategorija.naziv
        .concat(
          kategorija.podkategorije_robe
            ?.flat()
            .map((podKat) => podKat.naziv)
            .join()
            .toLowerCase()
        )
        .includes(event.target.value.toLowerCase());
    });
    setSearch(event.target.value);
    setFiltered(filterKat);
  };

  return (
    <Formik
      initialValues={{
        status: true,
        kategorije: {},
        atributi: [],
        cijene: [],
        ...roba,
      }}
      onSubmit={handleSubmit}
      //  validationSchema={PreduzecaSchema}
      enableReinitialize
    >
      {({ values, dirty, isSubmitting }) => (
        <>
          <div className="screen-content">
            <Link to={STAVKE.INDEX} className="back-link df">
              <LinkSvg /> <p>Povratak na Stavke</p>
            </Link>
          </div>

          <h1 className="heading-primary">Dodavanje nove robe/artikla</h1>

          <div className="screen-content">
            <div className="main-content__box">
              <div className="content">
                <Form className="form">
                  <Prompt
                    when={dirty}
                    message="Da li ste sigurni da želite da se vratite nazad? Vaši podaci sa forme neće biti sačuvani"
                  />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 mt-25">
                        <h2 className="heading-secondary">Informacije</h2>
                        <p className="txt-light mb-20">
                          Unesite puni naziv i opis artikla/robe za brzo
                          dodavanje. Ukoliko želite da ih razvrstate po
                          kategorijama ili određenim specifičnostima unesite
                          željene atribute u sekciji ispod.
                        </p>
                        <Link href="" className="link">
                          Upravljanje Proizvođačima
                        </Link>
                        <br />
                        <Link href="" className="link">
                          <CloudPlusIcon />
                          Unosite veliki broj artikala/roba? Javite nam se da
                          ubrzamo proces
                        </Link>
                      </div>
                      <div className="col-md-8 mt-25">
                        <div className="form__group">
                          <InputField
                            name="naziv"
                            label={$t('robe.naziv')}
                            placeholder=""
                            className="form__input"
                            obavezno
                          />
                        </div>
                        <div className="form__group">
                          <InputField
                            name="ean"
                            label={$t('robe.ean')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div className="form__group">
                          <InputField
                            name="interna_sifra_proizvoda"
                            label={$t('robe.interna_sifra_proizvoda')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div className="form__group">
                          <Textarea
                            control="text"
                            name="opis"
                            label={$t('robe.opis')}
                            cols="30"
                            rows="5"
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div className="df jc-sb mob-fd-column mb-0">
                          <div className="form__group w-48 mob-w-100 mb-0">
                            <DropDown
                              name="proizvodjac_robe_id"
                              label={$t('robe.proizvodjac')}
                              loadOptions={
                                proizvodjacService.getProizvodjaciDropdown
                              }
                              //className="form__input"
                              placeholder={roba?.proizvodjac_robe?.naziv}
                            />
                          </div>
                          <div className="form__group w-48 mob-w-100 mb-0">
                            <DropDown
                              name="jedinica_mjere_id"
                              label={$t('robe.jedinica_mjere')}
                              loadOptions={
                                jediniceMjereService.getJediniceMjereDropdown
                              }
                              //className="form__input"
                              placeholder={roba?.jedinica_mjere?.naziv}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <h2 className="heading-secondary">
                          Kategorija
                          <span className="span-light"> - Opciono</span>
                        </h2>
                        <p className="txt-light mob-mb-20">
                          Izaberite kategorije i podkategorije kojima
                          artikal/roba pripada.
                        </p>
                        <Link href="" className="link">
                          Upravljanje kategorijama
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <div className="search-box">
                          <div className="search-wrapper">
                            <input
                              type="text"
                              className="search__input"
                              placeholder="Pronađite kategoriju"
                              onChange={handleChange}
                              value={search}
                            />
                          </div>
                          <ul className="item-list">
                            <ChooseKategorija
                              kategorije={filtered || kategorije}
                              editKategorije={roba}
                            />
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form__group">
                          <CreateKategorija />
                        </div>
                        <div className="form__group">
                          <CreatePodKategorija />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <ChooseAtribut />
                    </div>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <Cijena
                        getPriceNoVat={getPriceNoVat}
                        getPriceVat={getPriceVat}
                        getVat={getVat}
                        getStopaPerId={getStopaPerId}
                        roba={roba}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <h2 className="heading-secondary">Status</h2>
                        <p className="txt-light">
                          Consequat eget volutpat enim libero nulla neque
                          ultrices. Sed tristique nullam erat in interdum.
                        </p>
                      </div>
                      <div className="col-md-4">
                        <label className="form__label">Status</label>
                        <div
                          className="form__group"
                          onChange={(event) => {
                            console.log(
                              'event.target.value',
                              event.target.value
                            );
                            values.status = event.target.value;
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
                              value="Aktivan"
                              id="Aktivan"
                              name="status"
                              checked={values.status}
                            />
                            <label
                              htmlFor="Aktivan"
                              className="form__radio-label"
                            >
                              <span class="form__radio-button"></span>
                              <span class="mob-ml-20">Aktivan</span>
                            </label>
                          </div>
                          <div className="form__radio-group">
                            <input
                              className="form__radio-input"
                              type="radio"
                              value="Neaktivan"
                              id="Neaktivan"
                              name="status"
                            />
                            <label
                              htmlFor="Neaktivan"
                              className="form__radio-label"
                            >
                              <span class="form__radio-button"></span>
                              <span class="mob-ml-20">Neaktivan</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form__footer">
                    <button
                      className="btn btn__dark btn__md"
                      type="submit"
                      // disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Molimo sačekajte...' : 'Sačuvaj'}
                    </button>

                    <button className="btn btn__link ml-m">
                      <Link to={STAVKE.INDEX}>Nazad</Link>
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn__link ml-m"
                      onClick={() => dispatch(deleteRoba(params.id))}
                    >
                      Nazad
                    </button> */}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default RobeForm;
