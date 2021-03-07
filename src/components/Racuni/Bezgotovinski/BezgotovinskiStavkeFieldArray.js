import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import StavkeDropdown from '../NoviRacun/StavkeDropdown';
import { ReactComponent as RemoveIcon } from '../../../assets/icon/remove.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getStavke } from '../../../store/actions/RacuniActions';
import {
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

const BezgotovinskiStavkeFieldArray = ({ insert, remove }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRobe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsluge());
  }, [dispatch]);

  const { values, setFieldValue } = useFormikContext();

  const usluga = useSelector(uslugaSelector());
  const roba = useSelector(robaSelector());

  const [porezi, setPorezi] = useState([]);

  useEffect(() => {
    dispatch(getStavke());
    (async () => setPorezi((await poreziService.getPorezi()).data))();
  }, [dispatch]);

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
      //stavka.tip_popusta='iznos';
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
    let popustStart = getPopustStavke(stavka);
    if (!popustStart?.tip_popusta) return cijena;
    if (popustStart.tip_popusta === 'iznos')
      return Number(cijena) - Number(popustStart.iznos);
    if (popustStart?.tip_popusta === 'procenat')
      return cijena - (Number(popustStart.iznos || 0) * cijena) / 100;
  }

  function getCijenaStavkeBezPdv(stavka) {
    let cijena_sa_popustom;
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
    if (stavka?.porez?.stopa > 0) {
      return (
        Number(cijena_sa_popustom) / Number(1 + Number(stavka?.porez?.stopa))
      );
    } else {
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
    if (option.value === 'procenat') {
      setFieldValue(
        `values.${index}.popust`,
        stavka.roba
          ? stavka.roba?.cijene_roba[0]?.popust_procenti
          : stavka.grupa.popust_procenti
      );
    } else if (option.value === 'iznos') {
      setFieldValue(
        `values.${index}.popust`,
        stavka.roba
          ? stavka.roba?.cijene_roba[0]?.popust_iznos
          : stavka.grupa.popust_iznos
      );
    } else {
      setFieldValue(`values.${index}.popust`, getPopustStavke(stavka).iznos);
    }
  }

  return (
    <>
      {values.stavke.map((stavka, index) => (
        <>
          <div className="main-content__box--body mb-20">
            <div className="container">
              <div className="df jc-sb ai-c w-100">
                <h2 className="heading-secondary">{index + 1}</h2>
                <p
                  onClick={() => remove(index)}
                  className="btn btn__link danger"
                >
                  Ukloni stavku
                  <span>
                    <RemoveIcon />
                  </span>
                </p>
              </div>
              <div className="row" style={{ marginBottom: 11 }}>
                <div className="col-xl-4 pr-0">
                  <div className="form-group">
                    <StavkeDropdown
                      name={`stavke.${index}`}
                      className="form__input"
                      onChangeExtra={(option) => {
                        setFieldValue(`stavke.${index}`, option);
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-2 pr-0">
                  <div className="form-group">
                    <input
                      type="text"
                      value={formatirajCijenu(getCijenaStavkeBezPdv(stavka))}
                      className="form__input"
                      placeholder="Bez PDV"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-xl-2 pr-0">
                  <div className="form-group">
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
                <div className="col-xl-2 pr-0">
                  <div className="form-group">
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
                <div className="col-xl-2">
                  <div className="form-group">
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
              </div>
              <div className="row">
                <div className="col-xl-4 pr-0">
                  <div className="form-group h-100">
                    <textarea
                      name="opis"
                      id=""
                      cols="30"
                      rows="6"
                      className="text-area h-100"
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
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
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
                          className="form__input mb-12"
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
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
                        <input
                          name="kolicina"
                          type="number"
                          className="form__input mb-12"
                          value={
                            stavka && (stavka.kolicina ? stavka.kolicina : 1)
                          }
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.kolicina`,
                              event.target.valueAsNumber
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form__input mb-12"
                          value={formatirajCijenu(
                            getUkupanIznosPdv(stavka)
                            // getPorezStopaForId(stavka?.porez_id) *
                            //   getCijenaStavkeBezPdv(stavka)
                          )}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="form-group">
                        <input
                          name="popust"
                          type="number"
                          className="form__input mb-12"
                          value={
                            stavka?.popust
                              ? stavka?.popust
                              : getPopustStavke(stavka).iznos
                          }
                          onChange={(event) =>
                            setFieldValue(
                              `stavke.${index}.popust`,
                              formatirajCijenu(event.target.valueAsNumber)
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 pr-0">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupan iznos PDV-a</p>
                          <h2 className="heading-secondary">
                            {formatirajCijenu(getUkupanIznosPdv(stavka))}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 pr-0">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupna cijena bez PDV-a</p>
                          <h2 className="heading-secondary">
                            {formatirajCijenu(getUkupnaCijenaBezPdv(stavka))}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupna cijena sa PDV-om</p>
                          <h2 className="heading-secondary">
                            {formatirajCijenu(getUkupnaCijenaSaPdv(stavka))}
                          </h2>
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
