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

  //console.log('bg values pre', values);
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
      console.log('popustStart', popustStart, stavka);
      return Number(cijena) - Number(popustStart.iznos);
    }

    if (popustStart.tip_popusta === 'procenat') {
      stavka.tip_popusta = popustStart.tip_popusta;
      stavka.popust = popustStart.iznos;
      values.niz[values.stavke.length - 1] = stavka;
      console.log('popustStart', popustStart, stavka);
      return cijena - (Number(popustStart.iznos || 0) * cijena) / 100;
    }
  }

  function getCijenaStavkeBezPdv(stavka, index) {
    let cijena_sa_popustom;
    let indStavke = values.stavke.length;
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
        cijena_bez_pdv_popust: (
          Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
        ),
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

      console.log('popu==', values);
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
    // console.log('getIznosPdv(stavka)',getIznosPdv(stavka))
    stavka = {
      ...stavka,
      iznos_pdv_popust: Number(getIznosPdv(stavka)),
      // iznos_pdv_popust: Number(getIznosPdv(stavka).toFixed(2)),
    };
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

  function handleChoosePopust(option, stavka, index) {
    console.log('popust=====', option, stavka, index, stavka.popust);
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
  }

  //values.stavke=values.niz;
  // if (values.stavke.length !==values.a.length) {
  //   values.a.push({cena:values.stavke.length})
  // }

  //values.a.push({cena:values.stavke.length})
  console.log('val=a=', values.a, values);
  console.log('val=kraj', values, values.stavke.length, values.niz.length);

  return (
    <>
      {values.stavke.map((stavka, index) => (
        <>
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
                        name={`stavke.${index}`}
                        className="form__input"
                        onChangeExtra={(option) => {
                          setFieldValue(`stavke.${index}`, option);
                        }}
                      />
                    </div>
                  </div>
                  <div className="section-box__left--bottom">
                    <div className="form-group mt-15">
                      <textarea
                        name="opis"
                        id=""
                        cols="30"
                        rows="8"
                        className="form__textarea df"
                        placeholder="Opis usluge"
                        value={stavka?.opis || ''}
                        onChange={(event) =>
                          setFieldValue(
                            `stavke.${index}.opis`,
                            event.target.value
                          )
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="section-box__right">
                  <div className="section-box__right--top-wrap">
                    <div className="el">
                      <div className="form__group mb-15">
                        <input
                          type="text"
                          value={formatirajCijenu(
                            getCijenaStavkeBezPdv(stavka)
                          )}
                          // value={
                          //       stavka?.roba?.cijene_roba[0]?.ukupna_cijena ||
                          //       stavka?.ukupna_cijena
                          //     }
                          className="form__input"
                          placeholder="Bez PDV"
                          disabled
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <DropDown
                          name={`stavke.${index}.jedinica_mjere_id`}
                          // placeholder={
                          //   Object.keys(usluga).length !== 0
                          //     ? usluga?.jedinica_mjere?.naziv
                          //     : roba?.jedinica_mjere?.naziv
                          // }
                          defaultValue={
                            Object.keys(usluga).length !== 0
                              ? {
                                  value: usluga?.jedinica_mjere?.id,
                                  label: usluga?.jedinica_mjere?.naziv,
                                }
                              : {
                                  value: roba?.jedinica_mjere?.id,
                                  label: roba?.jedinica_mjere?.naziv,
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
                    </div>
                    <div className="el">
                      <div className="form__group  mb-15">
                        <DropDown
                          name={`stavke.${index}.porez_id`}
                          loadOptions={poreziService.getPoreziDropdown}
                          // placeholder={
                          //   Object.keys(usluga).length === 0 &&
                          //   Object.keys(roba).length === 0
                          //     ? ''
                          //     : Object.keys(usluga).length !== 0
                          //     ? usluga?.porez?.naziv
                          //     : roba?.cijene_roba[0]?.porez?.naziv
                          // }
                          defaultValue={
                            Object.keys(usluga).length === 0 &&
                            Object.keys(roba).length === 0
                              ? {}
                              : Object.keys(usluga).length !== 0
                              ? {
                                  value: usluga?.porez?.id,
                                  label: usluga?.porez?.naziv,
                                }
                              : {
                                  value: roba?.cijene_roba[0]?.porez?.id,
                                  label: roba?.cijene_roba[0]?.porez?.naziv,
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
                    </div>
                    <div className="el">
                      <div className="form__group mb-15">
                        <DropDownStatic
                          name={`stavke.${index}.tip_popusta`}
                          options={TIPOVI_POPUSTA}
                          //defaultValue={{ value: Number(getPopustStavke(stavka).iznos), label: getPopustStavke(stavka).tip_popusta }}
                          defaultValue={{
                            value: getPopustStavke(stavka).tip_popusta,
                            label:
                              getPopustStavke(stavka).tip_popusta === 'procenat'
                                ? 'Procenat %'
                                : 'Iznos',
                          }}
                          onChangeExtra={(option) =>
                            handleChoosePopust(option, stavka, index)
                          }
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group mb-15">
                        <input
                          name="ukupna_cijena"
                          type="number"
                          // value={formatirajCijenu(
                          //   getUkupnaCijenaStavke(stavka)
                          // )}
                          value={
                            stavka?.roba?.cijene_roba[0]?.ukupna_cijena ||
                            stavka?.ukupna_cijena
                          }
                          className="form__input"
                          placeholder="Sa PDV"
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.ukupna_cijena`,
                              event.target.valueAsNumber
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group mb-15">
                        <input
                          name="kolicina"
                          type="number"
                          className="form__input mb-15"
                          value={
                            stavka && (stavka?.kolicina ? stavka?.kolicina : 1)
                          }
                          defaultValue={1}
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.kolicina`,
                              event.target.valueAsNumber
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <input
                          type="text"
                          className="form__input mb-15"
                          value={formatirajCijenu(
                            getUkupanIznosPdv(stavka)
                            // getPorezStopaForId(stavka?.porez_id) *
                            //   getCijenaStavkeBezPdv(stavka)
                          )}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="el">
                      <div className="form__group">
                        <input
                          name="popust"
                          type="number"
                          className="form__input mb-15"
                          value={
                            stavka?.popust
                              ? stavka?.popust
                              : getPopustStavke(stavka).iznos
                          }
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.popust`,
                              event.target.valueAsNumber
                            )
                          }
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
        </>
      ))}
      <div
        onClick={() => insert(values.stavke.length)}
        className="main-content__box--footer"
      >
        <span className="link">+ dodaj novu stavku</span>
      </div>
    </>
  );
};

export default BezgotovinskiStavkeFieldArray;
