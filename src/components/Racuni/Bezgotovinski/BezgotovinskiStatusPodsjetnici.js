import React from 'react';
import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';

const BezgotovinskiStatusPodsjetnici = () => {
  const { values, setFieldValue } = useFormikContext();
console.log(values)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="heading-secondary">Podsjetnici za plaćanje</h2>
            <p className="txt-light">
              Možete izabrati da se podsjetnici za plaćanje šalju kupcu ukoliko
              račun nije označen kao plaćen.
            </p>
          </div>
          <div className="col-md-4">
            <div className="form__group">
              <label className="form__label" for="">
                Pošalji podsjetnik
              </label>
              <select name="customer" id="" className="form__input">
                <option value="">Bez slanja podsjetnika</option>
                <option value="">--------</option>
                <option value="">--------</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form__group">
              <label className="form__label" for="">
                Tekst podsjetnika
              </label>
              <textarea
                id=""
                cols="30"
                rows="6"
                className="form__input"
                placeholder="Podsjetnik za plaćanje računa"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="heading-secondary">
              Automatizovano slanje periodičnih računa
            </h2>
            <p className="txt-light">
              Možete izabrati da se novi račun sa gore navedenim stavkama šalje
              kupcu svakog dana, nedjelje, mjeseca ili godine za usluge koje se
              ponavljaju tako da ne morate ručno kreirati svaki put novi račun
            </p>
          </div>
          <div className="col-xl-4">
            <div className="form__group">
              <label className="form__label" for="">
                Kreiraj i pošalji novi račun
              </label>
              <select name="customer" id="" className="form__input">
                <option value="">Svakog mjeseca</option>
                <option value="">--------</option>
                <option value="">--------</option>
              </select>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="form-group">
              <label for="" className="form__label">
                Dan za slanje
              </label>
              <input type="text" className="form__input mb-12" value="" />
            </div>
            <div className="form-group">
              <label for="" className="form__label">
                Vrijeme slanja
              </label>
              <input
                type="text"
                className="form__input mb-12"
                value="Svakog 5. u mjesecu"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2 className="heading-secondary">Status</h2>
            <p className="txt-light">Označite status računa</p>
          </div>
          <div className="col-md-3">
            <div className="form__label">Status</div>
            <div className="form__group">
              <div className="form__radio-group">
                <input
                  type="radio"
                  className="form__radio-input"
                  id="paid"
                  value="Plaćen"
                  name="status"
                  checked={values && values.status === "Plaćen"}
                  onChange={(event) => setFieldValue("status", "Plaćen")}
                />
                <label for="paid" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Plaćen
                </label>
              </div>
              <div className="form__radio-group">
                <input
                  type="radio"
                  className="form__radio-input"
                  id="partiallyPaid"
                  value="Djelimično plaćen"
                  name="status"
                  checked={values &&  values.status === "Djelimično plaćen"}
                  onChange={(event) => setFieldValue("status", "Djelimično plaćen")}
                />
                <label for="partiallyPaid" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Djelimično plaćen
                </label>
              </div>
              <div className="form__radio-group">
                <input
                  type="radio"
                  className="form__radio-input"
                  id="notPaid"
                  value="Nije plaćen"
                  name="status"
                  checked={values &&  values.status === "Nije plaćen"}
                  onChange={(event) => setFieldValue("status", "Nije plaćen")}
                />
                <label for="notPaid" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Nije plaćen
                </label>
              </div>
              <div className="form__radio-group">

                <input
                  type="radio"
                  className="form__radio-input"
                  id="uncollectible"
                  value="Nenaplativ"
                  name="status"
                  checked={values && values.status === "Nenaplativ"}
                  onChange={(event) => setFieldValue("status", "Nenaplativ")}
                />
                <label for="uncollectible" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Nenaplativ
                </label>
              </div>
              <div className="form__radio-group">
                <input
                  type="radio"
                  className="form__radio-input"
                  id="temporary"
                  value="Privremeni"
                  name="status"
                  checked={values && values.status === "Privremeni"}
                  onChange={(event) => setFieldValue('status', 'Privremeni')}
                />
                <label for="temporary" className="form__radio-label">
                  <span className="form__radio-button"></span>
                  Privremeni
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            {values && values.status === "djelimicno_placen" && <>
              {/* <a href="">+ Dodaj novi iznos uplate</a> */}
              <div className="form__group">
                <div className="form__label">Iznos uplate</div>
                <div className="df jc-sb">
                  <input
                    style={{ marginRight: 20 }}
                    name="iznos_uplate"
                    type="text"
                    className="form__input w-48"
                    value={values && values.iznos_uplate}
                    placeholder="100,00"
                    onChange={(event) => setFieldValue(`iznos_uplate`, event.target.value)} />
                  <ReactDatePicker
                    selected={values && values.datum_uplate}
                    onChange={(date) => setFieldValue('datum_uplate', date)}
                    className="select"
                    placeholderText="Datum uplate"
                  />
                </div>
              </div>
            </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiStatusPodsjetnici;
