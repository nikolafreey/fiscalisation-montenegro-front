import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import StavkeDropdown from './StavkeDropdown';
import { ReactComponent as RemoveIcon } from '../../../assets/icon/remove.svg';
import { useDispatch } from 'react-redux';
import { getStavke } from '../../../store/actions/RacuniActions';
import { formatirajCijenu } from '../../../helpers/racuni';
import DropDown from '../../shared/forms/DropDown';
import { jediniceMjereService } from '../../../services/JediniceMjereService';
import { poreziService } from '../../../services/PoreziService';
import { TIPOVI_POPUSTA } from '../../../constants/racuni';
import DropDownStatic from '../../shared/forms/DropDownStatic';

const BezgotovinskiStavkeFieldArray = ({ insert, remove }) => {
  const dispatch = useDispatch();
  
  const { values, setFieldValue } = useFormikContext();

  const [porezi, setPorezi] = useState([]);

  useEffect(() => {
    dispatch(getStavke());
    (async () => setPorezi((await poreziService.getPorezi()).data))();
  }, []);

  function getCijenaStavkeBezPdv(stavka) {
    return stavka?.roba?.cijene_roba?.[0]?.cijena_bez_pdv || stavka?.cijena_bez_pdv || 0;
  }

  function getUkupnaCijenaStavke(stavka) {
    return stavka?.roba?.cijene_roba?.[0]?.ukupna_cijena || stavka?.ukupna_cijena || 0;
  }

  function getPorezStopaForId(porezId) {
    return porezi?.find(porez => porez.id === porezId)?.stopa || 0;
  }

  function getUkupnaCijenaBezPdv(stavka) {
    return getCijenaStavkeBezPdv(stavka) * (stavka?.kolicina || 0);
  }

  function getUkupnaCijenaSaPdv(stavka) {
    return getUkupnaCijenaStavke(stavka) * (stavka?.kolicina || 0);
  }

  function getUkupanIznosPdv(stavka) {
    return getUkupnaCijenaSaPdv(stavka) - getUkupnaCijenaBezPdv(stavka);
  }
  
  return (
    <>
      {values.stavke.map((stavka, index) => (
        <>
          <div class="main-content__box--body mb-20">
            <div class="container">
              <div class="df jc-sb ai-c w-100">
                <h2 class="heading-secondary">1</h2>
                <p onClick={() => remove(index)} class="btn btn__link danger">
                  Ukloni stavku
                  <span>
                    <RemoveIcon/>
                  </span>
                </p>
              </div>
              <div class="row">
                <div class="col-xl-4 pr-0">
                  <div class="form-group">
                    <StavkeDropdown
                      name={`stavke.${index}`}
                      className="form__input"
                      label={'Stavke'}
                    />
                  </div>
                </div>
                <div class="col-xl-2 pr-0">
                  <div class="form-group">
                    <input
                      type="text"
                      value={formatirajCijenu(getCijenaStavkeBezPdv(stavka))}
                      class="form__input"
                      placeholder="Bez PDV"
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div class="col-xl-2 pr-0">
                  <div class="form-group">
                  <DropDown
                    name={`stavke.${index}.jedinica_mjere_id`}
                    loadOptions={
                      jediniceMjereService.getJediniceMjereDropdown
                    }
                  />
                  </div>
                </div>
                <div class="col-xl-2 pr-0">
                  <div class="form-group">
                    <DropDown
                      name={`stavke.${index}.porez_id`}
                      loadOptions={
                        poreziService.getPoreziDropdown
                      }
                    />
                  </div>
                </div>
                <div class="col-xl-2">
                  <div class="form-group">
                    <DropDownStatic 
                      name={`stavke.${index}.tip_popusta`}
                      options={TIPOVI_POPUSTA}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-4 pr-0">
                  <div class="form-group h-100">
                    <textarea
                      name="opis"
                      id=""
                      cols="30"
                      rows="6"
                      class="text-area h-100"
                      placeholder="Opis usluge"
                      value={stavka?.opis || ''}
                      onChange={(event) => setFieldValue(`stavke.${index}.opis`, event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          type="text"
                          value={formatirajCijenu(getUkupnaCijenaStavke(stavka))}
                          class="form__input mb-12"
                          placeholder="Sa PDV"
                          disabled
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          name="kolicina"
                          type="number"
                          class="form__input mb-12"
                          value={stavka?.kolicina}
                          onChange={(event) => setFieldValue(`stavke.${index}.kolicina`, event.target.valueAsNumber)}
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form__input mb-12"
                          value={formatirajCijenu(getPorezStopaForId(stavka?.porez_id) * getCijenaStavkeBezPdv(stavka))}
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-xl-3">
                      <div class="form-group">
                        <input
                          type="number"
                          class="form__input mb-12"
                          value={stavka?.popust_procenat}
                          onChange={(event) => setFieldValue(`stavke.${index}.popust_procenat`, event.target.valueAsNumber)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-4 pr-0">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupan iznos PDV-a</p>
                          <h2 class="heading-secondary">{formatirajCijenu(getUkupanIznosPdv(stavka))}</h2>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4 pr-0">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupna cijena bez PDV-a</p>
                          <h2 class="heading-secondary">{formatirajCijenu(getUkupnaCijenaBezPdv(stavka))}</h2>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupna cijena sa PDV-om</p>
                          <h2 class="heading-secondary">{formatirajCijenu(getUkupnaCijenaSaPdv(stavka))}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="hr-main" />
          
        </>
      ))}
      <div onClick={() => insert(values.stavke.length)} class="main-content__box--footer">
        <span>+ dodaj novu stavku</span>
      </div>
    </>
  );
};

export default BezgotovinskiStavkeFieldArray;
