import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import StavkeDropdown from '../NoviRacun/StavkeDropdown';
import { ReactComponent as RemoveIcon } from '../../../assets/icon/remove.svg';
import { useDispatch } from 'react-redux';
import { getStavke } from '../../../store/actions/RacuniActions';
import { formatirajCijenu } from '../../../helpers/racuni';
import DropDown from '../../shared/forms/DropDown';
import { jediniceMjereService } from '../../../services/JediniceMjereService';
import { poreziService } from '../../../services/PoreziService';
import { TIPOVI_POPUSTA } from '../../../constants/racuni';
import DropDownStatic from '../../shared/forms/DropDownStatic';
import { uslugaSelector } from '../../../store/selectors/UslugeSelector';


const BezgotovinskiStavkeFieldArray = ({ insert, remove }) => {
  const dispatch = useDispatch();
  
  const { values, setFieldValue } = useFormikContext();

  const [porezi, setPorezi] = useState([]);

  useEffect(() => {
    dispatch(getStavke());
    (async () => setPorezi((await poreziService.getPorezi()).data))();
  }, []);

  function izracunajCijenuSaPopustom(stavka, cijena) {
    if(!stavka?.tip_popusta) return cijena;
    if(stavka.tip_popusta === 'iznos') return cijena - Number(stavka.popust || 0);
    if(stavka.tip_popusta === 'procenat') return cijena - Number(stavka.popust || 0) * cijena / 100; 
  }

  function getCijenaStavkeBezPdv(stavka) {
    return izracunajCijenuSaPopustom(stavka, 
      stavka?.roba?.cijene_roba?.[0]?.cijena_bez_pdv 
      || stavka?.cijena_bez_pdv 
      || 0
    );
  }

  function getPorezForId(porezId) {
    return porezi?.find(porez => porez.id === porezId) || {};
  }

  function getPorezStopaForId(porezId) {
    return getPorezForId(porezId)?.stopa || 0;
  }
  
  function getIznosPdv(stavka) {
    return getPorezStopaForId(stavka?.porez_id) * getCijenaStavkeBezPdv(stavka);
  }

  function getUkupnaCijenaStavke(stavka) {
    return Number(getCijenaStavkeBezPdv(stavka)) + getIznosPdv(stavka);
    //stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena || stavka?.ukupna_cijena || 0;
  }

  function getUkupnaCijenaBezPdv(stavka) {
    return getCijenaStavkeBezPdv(stavka) * (stavka && stavka.kolicina ? stavka.kolicina : 1);
  }

  function getUkupnaCijenaSaPdv(stavka) {
    return getUkupnaCijenaStavke(stavka) * (stavka && stavka.kolicina ? stavka.kolicina : 1);
  }

  function getUkupanIznosPdv(stavka) {
    return getUkupnaCijenaSaPdv(stavka) - getUkupnaCijenaBezPdv(stavka);
  }

  function handleChoosePopust(option, stavka, index) {
    if (option.value === 'procenat') {
      setFieldValue(`values.${index}.popust`, 
        stavka.roba ? stavka.roba?.cijene_roba[0]?.popust_procenti : stavka.grupa.popust_procenti);
    } else if (option.value === 'iznos') {
      setFieldValue(`values.${index}.popust`, 
        stavka.roba ? stavka.roba?.cijene_roba[0]?.popust_iznos : stavka.grupa.popust_iznos);
    } else {
      setFieldValue(`values.${index}.popust`, 0);
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
                <p onClick={() => remove(index)} className="btn btn__link danger">
                  Ukloni stavku
                  <span>
                    <RemoveIcon/>
                  </span>
                </p>
              </div>
              <div className="row" style={{marginBottom: 11}}>
                <div className="col-xl-4 pr-0">
                  <div className="form-group">
                    <StavkeDropdown
                      name={`stavke.${index}`}
                      className="form__input"/>
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
                      loadOptions={
                        poreziService.getPoreziDropdown
                      }
                      onChangeExtra={
                        (option) => setFieldValue(`stavke.${index}.porez`, getPorezForId(option.value))
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-2">
                  <div className="form-group">
                    <DropDownStatic 
                      name={`stavke.${index}.tip_popusta`}
                      options={TIPOVI_POPUSTA}
                      onChangeExtra={(option) => handleChoosePopust(option, stavka, index)}
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
                      onChange={(event) => setFieldValue(`stavke.${index}.opis`, event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
                        <input
                          type="text"
                          value={formatirajCijenu(getUkupnaCijenaStavke(stavka))}
                          className="form__input mb-12"
                          placeholder="Sa PDV"
                          disabled
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
                        <input
                          name="kolicina"
                          type="number"
                          className="form__input mb-12"
                          value={stavka && stavka.kolicina ? stavka.kolicina : 1 }
                          onChange={(event) => setFieldValue(`stavke.${index}.kolicina`, event.target.valueAsNumber)}
                        />
                      </div>
                    
                    </div>
                    <div className="col-xl-3 pr-0">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form__input mb-12"
                          value={formatirajCijenu(getPorezStopaForId(stavka?.porez_id) * getCijenaStavkeBezPdv(stavka))}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form__input mb-12"
                          value={stavka?.popust}
                          onChange={(event) => setFieldValue(`stavke.${index}.popust`, event.target.valueAsNumber)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 pr-0">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupan iznos PDV-a</p>
                          <h2 className="heading-secondary">{formatirajCijenu(getUkupanIznosPdv(stavka))}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 pr-0">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupna cijena bez PDV-a</p>
                          <h2 className="heading-secondary">{formatirajCijenu(getUkupnaCijenaBezPdv(stavka))}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="form-group">
                        <div className="form__box">
                          <p className="txt-light">Ukupna cijena sa PDV-om</p>
                          <h2 className="heading-secondary">{formatirajCijenu(getUkupnaCijenaSaPdv(stavka))}</h2>
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
      <div onClick={() => insert(values.stavke.length)} className="main-content__box--footer">
        <span>+ dodaj novu stavku</span>
      </div>
    </>
  );
};

export default BezgotovinskiStavkeFieldArray;
