import { FieldArray, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { PreduzecaSchema } from '../../validation/preduzeca';
import $t from '../../lang';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../shared/forms/DropDown';
import InputField from '../shared/forms/InputField';
import { Link, useRouteMatch } from 'react-router-dom';
import Textarea from '../shared/forms/Textarea';
import RadioButton from '../shared/forms/RadioButton';
import { ReactComponent as LinkSvg } from '../../assets/icon/link.svg';

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

const RobeForm = () => {
  const dispatch = useDispatch();

  const { params } = useRouteMatch();

  const informacijeKontakt = [
    { key: 'Aktivan', value: 'Aktivan' },
    { key: 'Neaktivan', value: 'Neaktivan' },
  ];

  const roba = useSelector(robaSelector());

  const porezi = useSelector(poreziSelector());

  const getStopaPerId = (porez_id) => {
    const stopa = porezi.find((porez) => porez.id === porez_id)?.stopa;
    return stopa;
  };

  const getPriceNoVat = (pdv_ukljucen, porez_id, ukupna_cijena) => {
    const stopa = getStopaPerId(porez_id);
    let cijenaBezPdv = 0;
    if (pdv_ukljucen === 0) {
      cijenaBezPdv = Math.round(100 * ukupna_cijena) / 100;

      return cijenaBezPdv;
    } else {
      cijenaBezPdv =
        Math.round(100 * (ukupna_cijena / (Number(stopa) + 1))) / 100;

      return cijenaBezPdv;
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

  useEffect(() => {
    if (params.id) dispatch(getRoba(params.id));
  }, [dispatch, params]);

  const handleSubmit = (values) => {
    console.log(values);
    if (params.id)
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
    else
      dispatch(
        storeRoba({
          ...values,
          cijena_bez_pdv: getPriceNoVat(
            values.pdv_ukljucen,
            values.porez_id,
            values.ukupna_cijena
          ),
          status: values.status === 'Aktivan' ? true : false,
        })
      );
  };

  return (
    <Formik
      initialValues={{
        status: '',
        kategorije: {},
        atributi: [],
        cijene: [],
        ...roba,
      }}
      onSubmit={handleSubmit}
      validationSchema={PreduzecaSchema}
      enableReinitialize
    >
      {({ values }) => (
        <>
          <div className="screen-content">
            <Link to="#stavke" className="link df">
              <LinkSvg /> <p>Povratak na Stavke</p>
            </Link>
          </div>

          <h1 className="heading-primary">Dodavanje nove robe/artikla</h1>

          <div className="screen-content">
            <div className="main-content__box">
              <div className="content">
                <Form>
                  <div class="container">
                    <div class="row">
                      <div class="col-md-4 mt-25">
                        <h2 class="heading-secondary">Informacije</h2>
                        <p>
                          Unesite puni naziv i opis artikla/robe za brzo
                          dodavanje. Ukoliko želite da ih razvrstate po
                          kategorijama ili određenim specifičnostima unesite
                          željene atribute u sekciji ispod.
                        </p>
                        <a href="" class="link">
                          Upravljanje Proizvođačima
                        </a>
                        <br />
                        <a href="" class="link">
                          Unosite veliki broj artikala/roba? Javite nam se da
                          ubrzamo proces
                        </a>
                      </div>
                      <div class="col-md-8 mtb-25">
                        <div class="form__group">
                          <InputField
                            name="naziv"
                            label={$t('robe.naziv')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div class="form__group">
                          <InputField
                            name="ean"
                            label={$t('robe.ean')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div class="form__group">
                          <InputField
                            name="interna_sifra_proizvoda"
                            label={$t('robe.interna_sifra_proizvoda')}
                            placeholder=""
                            className="form__input"
                          />
                        </div>
                        <div class="form__group">
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
                        <div class="df jc-sb">
                          <div class="form__group w-48">
                            <DropDown
                              name="proizvodjac_robe_id"
                              label={$t('robe.proizvodjac')}
                              loadOptions={
                                proizvodjacService.getProizvodjaciDropdown
                              }
                              className="form__input"
                            />
                          </div>
                          <div class="form__group w-48">
                            <DropDown
                              name="jedinica_mjere_id"
                              label={$t('robe.jedinica_mjere')}
                              loadOptions={
                                jediniceMjereService.getJediniceMjereDropdown
                              }
                              className="form__input"
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
                        <h2 className="heading-secondary">Kategorija</h2>
                        <p>
                          Izaberite kategorije i podkategorije kojima
                          artikal/roba pripada.
                        </p>
                        <a href="" class="link">
                          Upravljanje kategorijama
                        </a>
                      </div>
                      <div className="col-md-4">
                        <div class="search-box">
                          <div class="search-wrapper">
                            <input
                              type="text"
                              class="search__input"
                              placeholder="Pronađite kategoriju"
                            />
                          </div>
                        </div>
                        <ul class="item-list">
                          <ChooseKategorija />
                        </ul>
                      </div>
                      <div class="col-md-4">
                        <div class="form__group">
                          <CreateKategorija />
                        </div>
                        <div class="form__group">
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
                  <div class="container">
                    <div class="row">
                      <Cijena
                        getPriceNoVat={getPriceNoVat}
                        getPriceVat={getPriceVat}
                        getVat={getVat}
                        getStopaPerId={getStopaPerId}
                      />
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
                              options={informacijeKontakt}
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
                    <button
                      type="button"
                      className="btn btn__link ml-m"
                      onClick={() => dispatch(deleteRoba(params.id))}
                    >
                      Nazad
                    </button>
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
