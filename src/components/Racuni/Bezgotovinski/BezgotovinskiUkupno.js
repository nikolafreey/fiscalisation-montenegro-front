import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { TIPOVI_POPUSTA } from '../../../constants/racuni';
import {
  formatirajCijenu,
  izracunajPojedinacnePoreze,
  izracunajUkupnuCijenuStavki,
  izracunajUkupnuCijenuStavkiBezPdv,
} from '../../../helpers/racuni';
import DropDownStatic from '../../shared/forms/DropDownStatic';

const BezgotovinskiUkupno = () => {
  const { values, setFieldValue } = useFormikContext();
  const [popustVisible, setPopustVisible] = useState(false)

  const popust = values.popust ? {
    popust: values.popust,
    tip_popusta: values.tip_popusta,
    popust_bez_pdv: values.popust_bez_pdv
  } : null;

  function izracunajPopustNaCijenu(cijena) {
    if (popust.tip_popusta === 'procenat') {
      return cijena * popust.popust / 100;
    }
    if (popust.tip_popusta === 'iznos') {
      return popust.popust;
    }
  }

  function izracunajCijeneSaPopustom() {
    const ukupnaCijena = izracunajUkupnuCijenuStavki(values.stavke, true);
    const ukupnaCijenaBezPdv = izracunajUkupnuCijenuStavkiBezPdv(values.stavke, true);
    const ukupnoPdv = ukupnaCijena - ukupnaCijenaBezPdv;

    if (!popust) return {
      ukupnaCijena,
      ukupnaCijenaBezPdv,
      ukupnoPdv
    };

    if (popust.popust_bez_pdv) {
      return {
        ukupnaCijena: ukupnaCijena - izracunajPopustNaCijenu(ukupnaCijena),
        ukupnaCijenaBezPdv,
        ukupnoPdv
      }
    } else {
      const porezi = values.stavke ? izracunajPojedinacnePoreze(values.stavke) : {};

      return Object.keys(porezi).reduce((cijene, porezId) => {
        const porez = porezi[porezId];
        const bezPdv = porez.ukupno - porez.pdvIznos;

        const bezPdvSaPopustom = bezPdv - izracunajPopustNaCijenu(bezPdv);
        const iznosPdvSaPopustom = Number(porez.stopa) * bezPdvSaPopustom;
        const ukupnoSaPopustom = bezPdvSaPopustom + iznosPdvSaPopustom;


        return {
          ukupnaCijena: cijene.ukupnaCijena + ukupnoSaPopustom,
          ukupnaCijenaBezPdv: cijene.ukupnaCijenaBezPdv + bezPdvSaPopustom,
          ukupnoPdv: cijene.ukupnoPdv + iznosPdvSaPopustom
        }
      }, {
        ukupnaCijena: 0,
        ukupnaCijenaBezPdv: 0,
        ukupnoPdv: 0
      });
    }
  }

  const cijene = izracunajCijeneSaPopustom();

  return (
    <>
      <h2 className="heading-secondary">Ukupno</h2>
      <div className="main-content__box">
        <div className="content">
          <div className="main-content__box--inner-wrapper">
            <div className="row">
              <div className="col-xl-4">
                <div className="form-group h-100">
                  <label  className="form__label">
                    Napomena
                  </label>
                  <textarea
                    name="opis"
                    id=""
                    cols="30"
                    rows="6"
                    className="form__input h-83"
                    value={values.opis}
                    onChange={(event) =>
                      setFieldValue('opis', event.target.value)
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="row">
                  {!popustVisible && <div onClick={() => setPopustVisible(!popustVisible)} className="main-content__box--footer col-xl-10">
                    <span className="link">+ Dodaj popust</span>
                  </div>}
                  <div className="col-xl-4">
                    <div className="form-group">

                      {popustVisible && <>
                        <label  className="form__label">
                          Tip popusta
                      </label>
                        <DropDownStatic
                          name="tip_popusta"
                          options={TIPOVI_POPUSTA}
                          className="mb-12"
                        />
                      </>}
                      <div className="form__box" style={{ marginTop: 12 }}>
                        <p className="txt-light">Ukupan iznos PDV-a</p>
                        <h2 className="heading-secondary">
                          {formatirajCijenu(cijene.ukupnoPdv)}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="form-group">
                      {popustVisible && <>
                        <label  className="form__label">
                          Popust bez PDV-a
                      </label>
                        <DropDownStatic
                          name={`popust_bez_pdv`}
                          options={[
                            { value: true, label: 'DA' },
                            { value: false, label: 'NE' },
                          ]}
                          className="mb-12"
                        />
                      </>}
                      <div className="form__box" style={{ marginTop: 12 }}>
                        <p className="txt-light">Ukupna cijena bez PDV-a</p>
                        <h2 className="heading-secondary">
                          {formatirajCijenu(cijene.ukupnaCijenaBezPdv)}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="form-group">
                      {popustVisible && <>
                        <label  className="form__label">
                          Iznos popusta
                      </label>
                        <input
                          type="number"
                          className="form__input"
                          value={values.popust}
                          onChange={(event) =>
                            setFieldValue('popust', event.target.valueAsNumber)
                          }
                        />
                      </>}
                      <div className="form__box" style={{ marginTop: 12 }}>
                        <p className="txt-light">Ukupna cijena sa PDV-om</p>
                        <h2 className="heading-secondary">
                          {formatirajCijenu(cijene.ukupnaCijena)}
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
