import { useFormikContext, Field } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import StavkeDropdown from '../NoviRacun/StavkeDropdown';
import { ReactComponent as RemoveIcon } from '../../../assets/icon/remove.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getStavke } from '../../../store/actions/RacuniActions';
import {
  deFormatirajCijenu,
  formatirajCijenu,
  getCijenaStavkeSaPdvPopustom,
  izracunajPojedinacnePorezeZaUslugu,
  izracunajPopust,
} from '../../../helpers/racuni';
import DropDown from '../../shared/forms/DropDown';
import { jediniceMjereService } from '../../../services/JediniceMjereService';
import { poreziService } from '../../../services/PoreziService';
import { TIPOVI_POPUSTA } from '../../../constants/racuni';
import DropDownStatic from '../../shared/forms/DropDownStatic';
import { uslugaSelector } from '../../../store/selectors/UslugeSelector';
import { robaSelector } from '../../../store/selectors/RobeSelector';
import { getRobe } from '../../../store/actions/RobeActions';
import { getUsluge } from '../../../store/actions/UslugeActions';
import { push } from 'connected-react-router';
import { debounce } from 'lodash';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const BezgotovinskiStavkeFieldArray = ({ insert, remove }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRobe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsluge());
  }, [dispatch]);

  const { values, setFieldValue } = useFormikContext();
  React.useEffect(
    (index, stavka) => {
      // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
      if (values.stavke.length > 0) {
        setFieldValue(
          `stavke.${index}.cijena_sa_pdv_popust`,
          getUkupnaCijenaSaPdv(stavka)
        );
      }
    },
    [values, setFieldValue]
  );

  const usluga2 = useSelector(uslugaSelector());
  const roba2 = useSelector(robaSelector());

  const [porezi, setPorezi] = useState([]);
  useEffect(() => {
    dispatch(getStavke());
    (async () => setPorezi((await poreziService.getPorezi()).data))();
  }, [dispatch]);

  var usluga = Object.assign({}, usluga2);
  var roba = Object.assign({}, roba2);
  usluga.kolicina = 1;
  const removeNiz = (ind) => {
    if (ind >= 0) {
      values.niz.splice(ind);
    }
  };
  const ucbpdv = useRef();

  console.log('usluga', usluga);

  function getPopustStavke(stavka) {
    if (
      Number(stavka?.grupa?.popust_procenti) > 0 ||
      Number(stavka?.atribut_robe?.popust_procenti) > 0
    ) {
      return {
        iznos:
          Number(stavka?.grupa?.popust_procenti) ||
          Number(stavka?.atribut_robe?.popust_procenti) ||
          0,
        tip_popusta: 'procenat',
      };
    } else {
      return {
        iznos:
          Number(stavka?.grupa?.popust_iznos) ||
          Number(stavka?.atribut_robe?.popust_iznos) ||
          Number(stavka?.popust) ||
          0,
        tip_popusta: 'iznos',
      };
    }
  }

  const popust = values.popust
    ? {
        popust: values.popust,
        tip_popusta: values.tip_popusta,
        popust_bez_pdv: true,
      }
    : null;

  function izracunajCijenuSaPopustom(stavka, cijena) {
    if (!stavka?.tip_popusta) return cijena;
    if (stavka.tip_popusta === 'iznos')
      return cijena - Number(stavka.popust || 0);
    if (stavka.tip_popusta === 'procenat')
      return cijena - (Number(stavka.popust || 0) * cijena) / 100;
  }

  function izracunajPocetnuCijenuSaPopustom(stavka, cijena) {
    stavka = { ...stavka, kolicina: 1 };

    let popustStart = getPopustStavke(stavka);

    if (!popustStart?.tip_popusta) return cijena;
    if (popustStart.tip_popusta === 'iznos') {
      stavka = { ...stavka, popust_iznos: popustStart.iznos };
      // stavka.tip_popusta=popustStart.tip_popusta;
      // stavka.popust=popustStart.iznos;
      values.niz[values.stavke.length - 1] = stavka;
      return Number(cijena) - Number(popustStart.iznos);
    }

    if (popustStart.tip_popusta === 'procenat') {
      stavka.tip_popusta = popustStart.tip_popusta;
      stavka.popust = popustStart.iznos;
      values.niz[values.stavke.length - 1] = stavka;
      return cijena - (Number(popustStart.iznos || 0) * cijena) / 100;
    }
  }

  function getCijenaStavkeBezPdv(stavka, index) {
    let cijena_sa_popustom;
    let indStavke = values.stavke.length;
    const pocetnaStavka = stavka;

    if (stavka?.tip_popusta) {
      cijena_sa_popustom = izracunajCijenuSaPopustom(
        stavka,
        stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
          stavka?.ukupna_cijena ||
          0
      );
    } else {
      cijena_sa_popustom = izracunajPocetnuCijenuSaPopustom(
        stavka,
        stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena ||
          stavka?.ukupna_cijena ||
          0
      );
    }
    stavka = {
      ...stavka,
      cijena_sa_pdv_popust: Number(cijena_sa_popustom),
      // cijena_sa_pdv_popust: Number(cijena_sa_popustom).toFixed(4),
    };

    if (Number(values?.stavke[indStavke]?.cijena_bez_pdv_popust) === 0) {
    }

    if (stavka?.porez?.stopa > 0) {
      stavka = {
        ...stavka,
        cijena_bez_pdv_popust:
          Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa)),
        cijena_bez_pdv: Number(pocetnaStavka.cijena_bez_pdv),
        // cijena_bez_pdv_popust: (
        //   Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
        // ).toFixed(4),
      };

      if (!stavka?.kolicina) {
        stavka = { ...stavka, kolicina: 1 };
      }

      //  stavka={...stavka,tip_popusta:getPopustStavke(stavka).tip_popusta,popust:getPopustStavke(stavka).iznos}

      //  values.niz[values.stavke.length-1].popust=values.stavke[values.stavke.length-1].popust;
      //  values.niz[values.stavke.length-1].tip_popusta=values.stavke[values.stavke.length-1].tip_popusta;
      values.niz[values.stavke.length - 1] = stavka;

      let tempVal =
        Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa));

      return (
        Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
      );
    } else {
      stavka = { ...stavka, cijena_bez_pdv_popust: Number(cijena_sa_popustom) };
      values.niz[values.stavke.length - 1] = stavka;
      return Number(cijena_sa_popustom);
    }
  }

  function getPorezForId(porezId) {
    return porezi?.find((porez) => porez.id === porezId) || {};
  }

  function getPorezStopaForId(porezId, stavka) {
    return (
      stavka &&
      (getPorezForId(porezId)?.stopa ||
        getPorezForId(stavka?.roba?.cijene_roba[0]?.porez_id)?.stopa ||
        0)
    );
  }

  function getIznosPdv(stavka) {
    return (
      getPorezStopaForId(stavka?.porez_id, stavka) *
      getCijenaStavkeBezPdv(stavka)
    );
  }
  // odavde

  function izracunajPopustNaCijenu(cijena) {
    if (popust.tip_popusta === 'procenat') {
      return (cijena * popust.popust) / 100;
    }
    if (popust.tip_popusta === 'iznos') {
      return popust.popust;
    }
  }
  function getUkupnaCijenaStavke(stavka) {
    stavka = {
      ...stavka,
      iznos_pdv_popust: Number(getIznosPdv(stavka)),
      // iznos_pdv_popust: Number(getIznosPdv(stavka).toFixed(2)),
    };
    let CijenaStavkeBezPdv = getCijenaStavkeBezPdv(stavka);
    let IznosPdv = getIznosPdv(stavka);
    return Number(getCijenaStavkeBezPdv(stavka)) + getIznosPdv(stavka);
    //stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena || stavka?.ukupna_cijena || 0;
  }

  function getUkupnaCijenaBezPdv(stavka) {
    return (
      getCijenaStavkeBezPdv(stavka) *
      (stavka && stavka.kolicina ? stavka.kolicina : 1)
    );
  }

  function getUkupnaCijenaSaPdv(stavka) {
    return (
      getUkupnaCijenaStavke(stavka) *
      (stavka && stavka.kolicina ? stavka.kolicina : 1)
    );
  }

  function getUkupanIznosPdv(stavka) {
    return getUkupnaCijenaSaPdv(stavka) - getUkupnaCijenaBezPdv(stavka);
  }

  const onChangeExtra = (option, index, stavka) => {
    // setFieldValue(`stavke.${index}.jedinica_mjere_id`, option.jedinica_mjere);
    // setFieldValue(`stavke.${index}.porez`, getPorezForId(option.porez));
    setFieldValue(`stavke.${index}`, option);
    if (!stavka || stavka?.kolicina === null || stavka?.kolicina === 0) {
      setFieldValue(`stavke.${index}.kolicina`, 1);
    }
    console.log('values', values);
  };

  function handleChoosePopust(option, stavka, index) {
    if (stavka) {
      if (option.value === 'procenat') {
        setFieldValue(
          `values.${index}.popust`,
          stavka.popust
            ? stavka.popust
            : stavka.roba
            ? stavka.roba?.cijene_roba[0]?.popust_procenti
            : stavka.grupa.popust_procenti
        );
      } else if (option.value === 'iznos') {
        setFieldValue(
          `values.${index}.popust`,
          stavka.popust
            ? stavka.popust
            : stavka.roba
            ? stavka.roba?.cijene_roba[0]?.popust_iznos
            : stavka.grupa.popust_iznos
        );
      } else {
        setFieldValue(`values.${index}.popust`, getPopustStavke(stavka).iznos);
      }
    } else {
      toast.error(
        'Morate prvo odabrati stavku prije odabira popusta!',
        toastSettings
      );
      return;
    }
  }

  let valuesBezPopusta;
  if (values?.niz[0]?.popust === 0) {
    valuesBezPopusta = values.niz;
  }
  console.log('valuesBezPopusta', valuesBezPopusta);

  //values.stavke=values.niz;
  // if (values.stavke.length !==values.a.length) {
  //   values.a.push({cena:values.stavke.length})
  // }

  //values.a.push({cena:values.stavke.length})
  // console.log('val=a=', values.a, values);
  // console.log('val=kraj', values, values.stavke.length, values.niz.length);

  return (
    <>
      {values.stavke.map((stavka, index) => (
        <React.Fragment key={index}>
          <div className="main-content__box--body mb-20">
            <div className="container">
              <div className="df jc-sb ai-c w-100">
                <h2 className="heading-secondary">{index + 1}</h2>
                <p
                  onClick={() => {
                    remove(index);
                    removeNiz(index);
                  }}
                  className="btn btn__link danger"
                >
                  Ukloni stavku
                  <span>
                    <RemoveIcon />
                  </span>
                </p>
              </div>
              <div className="section-box">
                <div className="section-box__left">
                  <div className="section-box__left--top">
                    <div className="form-group mb-0">
                      <StavkeDropdown
                        key={index}
                        id={index}
                        name={`stavke.${index}`}
                        className="form__input"
                        onChangeExtra={(option) =>
                          onChangeExtra(option, index, stavka)
                        }
                      />
                    </div>
                  </div>
                  <div className="section-box__left--bottom">
                    <div className="form-group mt-15">
                      <textarea
                        name={`stavke.${index}.opis`}
                        id={`stavke.${index}.opis`}
                        cols="30"
                        rows="8"
                        className="form__textarea df"
                        placeholder="Opis usluge"
                        defaultValue={stavka?.opis || ''}
                        onBlur={(event) => {
                          // debounce((callback) => callback(), 200);
                          setFieldValue(
                            `stavke.${index}.opis`,
                            event.target.value
                          );
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="section-box__right">
                  <div className="section-box__right--top-wrap">
                    <div className="el">
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Bez PDV
                        </label>
                        <input
                          type="text"
                          name={`stavke.${index}.cijena_bez_pdv`}
                          readOnly
                          value={
                            formatirajCijenu(
                              getUkupnaCijenaStavke(values?.stavke[index])
                            )
                            // getIznosPdv(values?.stavke[index])
                            // getCijenaStavkeBezPdv(values?.stavke[index])
                          }
                          // value={
                          //       stavka?.roba?.cijene_roba[0]?.ukupna_cijena ||
                          //       stavka?.ukupna_cijena
                          //     }
                          className="form__input"
                          placeholder="Bez PDV"
                          onChange={(event) => {
                            setFieldValue(
                              `stavke.${index}.cijena_bez_pdv`,
                              event.target.valueAsNumber
                            );
                            console.log('values', values);
                            console.log('stavka', stavka);
                          }}
                        />
                      </div>
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Sa PDV
                        </label>
                        {/* TODO: izgaseno edit Cijena dok se ne rijesi slanje izmijenjene cijene */}
                        <input
                          name={`stavke.${index}.ukupna_cijena`}
                          type="number"
                          readOnly
                          // value={formatirajCijenu(
                          //   getUkupnaCijenaStavke(stavka)
                          // )}
                          value={
                            getUkupnaCijenaStavke(values?.stavke[index])
                            // values?.stavke[index]?.ukupna_cijena ||
                            // formatirajCijenu(getUkupnaCijenaStavke(stavka))
                            // stavka?.roba?.cijene_roba[0]?.ukupna_cijena ||
                            // stavka?.ukupna_cijena
                          }
                          className="form__input"
                          placeholder="Sa PDV"
                          onChange={(event) => {
                            setFieldValue(
                              `stavke.${index}.ukupna_cijena`,
                              event.target.valueAsNumber
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Jedinica mjere
                        </label>
                        <DropDown
                          key={index}
                          name={`stavke.${index}.jedinica_mjere_id`}
                          id={index}
                          isDisabled
                          // defaultValue={
                          //   Object.keys(usluga).length !== 0
                          //     ? {
                          //         value: usluga?.jedinica_mjere?.id,
                          //         label: usluga?.jedinica_mjere?.naziv,
                          //       }
                          //     : {
                          //         value: roba?.jedinica_mjere?.id,
                          //         label: roba?.jedinica_mjere?.naziv,
                          //       }
                          // }
                          defaultValue={
                            stavka && {
                              value: stavka?.jedinica_mjere?.id,
                              label: stavka?.jedinica_mjere?.naziv,
                            }
                          }
                          onChangeExtra={(option) => {
                            setFieldValue(
                              `stavke.${index}.jedinica_mjere_id`,
                              option
                            );
                          }}
                          loadOptions={
                            jediniceMjereService.getJediniceMjereDropdown
                          }
                        />
                      </div>
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Količina
                        </label>
                        <input
                          name={`stavke.${index}.kolicina`}
                          type="number"
                          className="form__input"
                          step=".001"
                          value={
                            stavka && (stavka?.kolicina ? stavka?.kolicina : 1)
                          }
                          defaultValue={1}
                          onWheel={() => document.activeElement.blur()}
                          onChange={(event) => {
                            setFieldValue(
                              `stavke.${index}.kolicina`,
                              event.target.valueAsNumber
                            );
                            console.log('kolicina onChange', values);
                            console.log('event Kolicina onChange', event);
                          }}
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Stopa PDV-a
                        </label>
                        <DropDown
                          isDisabled
                          key={index}
                          id={index}
                          name={`stavke.${index}.porez_id`}
                          loadOptions={poreziService.getPoreziDropdown}
                          // defaultValue={
                          //   Object.keys(usluga).length === 0 &&
                          //   Object.keys(roba).length === 0
                          //     ? {}
                          //     : Object.keys(usluga).length !== 0
                          //     ? {
                          //         value: usluga?.porez?.id,
                          //         label: usluga?.porez?.naziv,
                          //       }
                          //     : {
                          //         value: roba?.cijene_roba[0]?.porez?.id,
                          //         label: roba?.cijene_roba[0]?.porez?.naziv,
                          //       }
                          // }
                          defaultValue={
                            stavka && {
                              value: stavka?.porez?.id,
                              label: stavka?.porez?.naziv,
                            }
                          }
                          onChangeExtra={(option) => {
                            setFieldValue(
                              `stavke.${index}.porez`,
                              getPorezForId(option.value)
                            );
                          }}
                        />
                      </div>
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          PDV
                        </label>
                        <input
                          type="text"
                          className="form__input"
                          value={formatirajCijenu(
                            getUkupanIznosPdv(stavka)
                            // getPorezStopaForId(stavka?.porez_id) *
                            //   getCijenaStavkeBezPdv(stavka)
                          )}
                          // readOnly
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Tip popusta
                        </label>
                        <DropDownStatic
                          name={`stavke.${index}.tip_popusta`}
                          options={TIPOVI_POPUSTA}
                          defaultValue={{
                            value:
                              getPopustStavke(stavka).tip_popusta || 'iznos',
                            label:
                              getPopustStavke(stavka).tip_popusta === 'procenat'
                                ? 'Procenat %'
                                : 'Iznos na jed. cijenu sa PDV',
                          }}
                          onChangeExtra={(option) =>
                            handleChoosePopust(option, stavka, index)
                          }
                        />
                      </div>
                      <div className="form__group">
                        <label htmlFor="" className="form__label bm-show">
                          Popust
                        </label>
                        <input
                          name={`stavke.${index}.popust`}
                          type="number"
                          className="form__input"
                          step=".01"
                          value={
                            stavka?.popust
                              ? stavka?.popust
                              : getPopustStavke(stavka).iznos
                          }
                          onWheel={() => document.activeElement.blur()}
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.popust`,
                              event.target.valueAsNumber
                            )
                          }
                          onKeyPress={(e) => {
                            e.key === 'Enter' && e.preventDefault();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="section-box__right--bottom-wrap">
                    <div className="price">
                      <div className="form__box">
                        <div>
                          <p className="txt-light">Ukupan iznos PDV-a</p>
                        </div>
                        <div className="heading-secondary mb-0">
                          {stavka && stavka?.popust ? (
                            <del style={{ marginRight: '10px' }}>
                              {/* //(temp2.niz[0].cijena_sa_pdv_popust-temp2.niz[0].cijena_bez_pdv_popust)/(1-temp2.niz[0].popust/100) */}
                              {formatirajCijenu(
                                stavka?.kolicina
                                  ? stavka?.kolicina * values?.popust !== 0
                                    ? values?.niz[index]?.tip_popusta ===
                                      'procenat'
                                      ? (values?.niz[index].kolicina *
                                          (values?.niz[index]
                                            .cijena_sa_pdv_popust -
                                            values?.niz[index]
                                              .cijena_bez_pdv_popust)) /
                                        (1 - values?.niz[index].popust / 100)
                                      : values?.niz[index].kolicina *
                                          values?.niz[index].ukupna_cijena -
                                        values?.niz[index].kolicina *
                                          (values?.niz[index].ukupna_cijena /
                                            (+values?.niz[index]?.porez?.stopa +
                                              1))
                                    : values?.niz[index].cijena_sa_pdv_popust -
                                      values?.niz[index].cijena_bez_pdv_popust
                                  : 1 *
                                      (values?.niz[index].cijena_sa_pdv_popust -
                                        values?.niz[index]
                                          .cijena_bez_pdv_popust)
                              )}
                            </del>
                          ) : (
                            ''
                          )}
                          {formatirajCijenu(getUkupanIznosPdv(stavka))}
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <div className="form__box">
                        <div>
                          <p className="txt-light">Ukupna cijena bez PDV-a</p>
                        </div>
                        <div
                          className="heading-secondary mb-0"
                          ref={ucbpdv}
                          name="tekst"
                        >
                          {stavka && stavka?.popust ? (
                            <del style={{ marginRight: '10px' }}>
                              {formatirajCijenu(
                                stavka?.kolicina
                                  ? values?.niz[index].kolicina *
                                      (values?.niz[index].ukupna_cijena /
                                        (+values?.niz[index]?.porez?.stopa + 1))
                                  : 1 *
                                      (values?.niz[index].ukupna_cijena /
                                        (+values?.niz[index]?.porez?.stopa + 1))
                              )}
                            </del>
                          ) : (
                            ''
                          )}
                          {formatirajCijenu(getUkupnaCijenaBezPdv(stavka))}
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <div className="form__box">
                        <div>
                          <p className="txt-light">Ukupna cijena sa PDV-om</p>
                        </div>
                        <div className="heading-secondary mb-0">
                          {stavka && stavka?.popust ? (
                            <del style={{ marginRight: '10px' }}>
                              {formatirajCijenu(
                                stavka?.kolicina
                                  ? stavka?.kolicina *
                                      (stavka?.roba?.cijene_roba[0]
                                        ?.ukupna_cijena ||
                                        stavka?.ukupna_cijena)
                                  : 1 *
                                      (stavka?.roba?.cijene_roba[0]
                                        ?.ukupna_cijena ||
                                        stavka?.ukupna_cijena)
                              )}
                            </del>
                          ) : (
                            ''
                          )}
                          {formatirajCijenu(getUkupnaCijenaSaPdv(stavka))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-main" />
        </React.Fragment>
      ))}
      <div
        onClick={() => {
          console.log('Insert Values: ', values);
          if (values.stavke.length !== 0 && !values?.stavke[0]) {
            toast.error(
              'Molimo popunite trenutno otvorenu stavku prije dodavanja nove stavke!',
              toastSettings
            );
            return;
          }
          if (
            values.stavke.length > 1 &&
            !values?.stavke[values.stavke.length - 1]
          ) {
            toast.error(
              'Molimo popunite trenutno otvorenu stavku prije dodavanja nove stavke!',
              toastSettings
            );
            return;
          }
          insert(values.stavke.length);
        }}
        className="main-content__box--footer nova-stavka__hover"
      >
        <span className="link">+ Dodaj novu stavku</span>
      </div>
    </>
  );
};

export default BezgotovinskiStavkeFieldArray;
