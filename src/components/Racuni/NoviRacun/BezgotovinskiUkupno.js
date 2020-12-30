import { useFormikContext } from 'formik';
import React from 'react';
import { TIPOVI_POPUSTA } from '../../../constants/racuni';
import {
  formatirajCijenu,
  izracunajUkupnuCijenuStavki,
  izracunajUkupnuCijenuStavkiBezPdv,
} from '../../../helpers/racuni';
import DropDownStatic from '../../shared/forms/DropDownStatic';

const BezgotovinskiUkupno = () => {
  const { values, setFieldValue } = useFormikContext();

  const ukupnaCijena = izracunajUkupnuCijenuStavki(values.stavke);
  const ukupnaCijenaBezPdv = izracunajUkupnuCijenuStavkiBezPdv(values.stavke);
  const ukupnoPdv = ukupnaCijena - ukupnaCijenaBezPdv;

  return (
    <>
      <h2 class="heading-secondary">Ukupno</h2>
      <div class="main-content__box">
        <div class="content">
          <div class="main-content__box--inner-wrapper">
            <div class="row">
              <div class="col-xl-4">
                <div class="form-group h-100">
                  <label for="" class="form__label">
                    Napomena
                  </label>
                  <textarea
                    name="opis"
                    id=""
                    cols="30"
                    rows="6"
                    class="form__input h-83"
                    value={values.opis}
                    onChange={(event) =>
                      setFieldValue('opis', event.target.value)
                    }
                  ></textarea>
                </div>
              </div>
              <div class="col-xl-8">
                <div class="row">
                  <div class="col-xl-4">
                    <div class="form-group">
                      <label for="" class="form__label">
                        Tip popusta
                      </label>
                      <DropDownStatic
                        name="tip_popusta"
                        options={TIPOVI_POPUSTA}
                      />
                      <div class="form__box">
                        <p class="txt-light">Ukupan iznos PDV-a</p>
                        <h2 class="heading-secondary">
                          {formatirajCijenu(ukupnoPdv)}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-group">
                      <label for="" class="form__label">
                        Popust bez PDV-a
                      </label>
                      <DropDownStatic
                        name={`popust_bez_pdv`}
                        options={[
                          { value: true, label: 'DA' },
                          { value: false, label: 'NE' },
                        ]}
                      />
                      <div class="form__box">
                        <p class="txt-light">Ukupna cijena bez PDV-a</p>
                        <h2 class="heading-secondary">
                          {formatirajCijenu(ukupnaCijenaBezPdv)}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-group">
                      <label for="" class="form__label">
                        Iznos popusta
                      </label>
                      <input
                        type="number"
                        class="form__input mb-12"
                        value={values.popust}
                        onChange={(event) =>
                          setFieldValue('popust', event.target.valueAsNumber)
                        }
                      />
                      <div class="form__box">
                        <p class="txt-light">Ukupna cijena sa PDV-om</p>
                        <h2 class="heading-secondary">
                          {formatirajCijenu(ukupnaCijena)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiUkupno;
