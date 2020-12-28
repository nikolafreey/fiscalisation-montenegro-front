import { useFormikContext } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  stavkeRobeSelector,
  stavkeUslugeSelector,
} from '../../../store/selectors/RacuniSelector';
import StavkeDropdown from './StavkeDropdown';
import { ReactComponent as RemoveIcon } from '../../../assets/icon/remove.svg';

const BezgotovinskiStavkeFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext();
  
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
                      class="form__input"
                      placeholder="Bez PDV"
                    />
                  </div>
                </div>
                <div class="col-xl-2 pr-0">
                  <div class="form-group">
                    <select name="customer" id="" class="form__input mb-12">
                      <option value="">Komad</option>
                      <option value="">--------</option>
                      <option value="">--------</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-2 pr-0">
                  <div class="form-group">
                    <select name="customer" id="" class="form__input mb-12">
                      <option value="">PDV 21%</option>
                      <option value="">--------</option>
                      <option value="">--------</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-2">
                  <div class="form-group">
                    <select name="customer" id="" class="form__input mb-12">
                      <option value="">Procenat %</option>
                      <option value="">--------</option>
                      <option value="">--------</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-4 pr-0">
                  <div class="form-group h-100">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="6"
                      class="text-area h-100"
                      placeholder="Opis usluge"
                    ></textarea>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form__input mb-12"
                          placeholder="Sa PDV"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form__input mb-12"
                          value="23"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 pr-0">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form__input mb-12"
                          value="4,10"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form__input mb-12"
                          value="10"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-4 pr-0">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupan iznos PDV-a</p>
                          <h2 class="heading-secondary">94,3</h2>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4 pr-0">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupna cijena bez PDV-a</p>
                          <h2 class="heading-secondary">460,01</h2>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="form-group">
                        <div class="form__box">
                          <p class="txt-light">Ukupna cijena sa PDV-om</p>
                          <h2 class="heading-secondary">554,31</h2>
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
