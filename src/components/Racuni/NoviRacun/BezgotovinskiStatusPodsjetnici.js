import React from 'react';

const BezgotovinskiStatusPodsjetnici = ({ footer }) => {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2 class="heading-secondary">Podsjetnici za plaćanje</h2>
            <p class="txt-light">
              Možete izabrati da se podsjetnici za plaćanje šalju kupcu ukoliko
              račun nije označen kao plaćen.
            </p>
          </div>
          <div class="col-md-4">
            <div class="form__group">
              <label class="form__label" for="">
                Pošalji podsjetnik
              </label>
              <select name="customer" id="" class="form__input">
                <option value="">Bez slanja podsjetnika</option>
                <option value="">--------</option>
                <option value="">--------</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form__group">
              <label class="form__label" for="">
                Tekst podsjetnika
              </label>
              <textarea
                id=""
                cols="30"
                rows="6"
                class="form__input"
                placeholder="Podsjetnik za plaćanje računa"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2 class="heading-secondary">
              Automatizovano slanje periodičnih računa
            </h2>
            <p class="txt-light">
              Možete izabrati da se novi račun sa gore navedenim stavkama šalje
              kupcu svakog dana, nedjelje, mjeseca ili godine za usluge koje se
              ponavljaju tako da ne morate ručno kreirati svaki put novi račun
            </p>
          </div>
          <div class="col-xl-4">
            <div class="form__group">
              <label class="form__label" for="">
                Kreiraj i pošalji novi račun
              </label>
              <select name="customer" id="" class="form__input">
                <option value="">Svakog mjeseca</option>
                <option value="">--------</option>
                <option value="">--------</option>
              </select>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="form-group">
              <label for="" class="form__label">
                Dan za slanje
              </label>
              <input type="text" class="form__input mb-12" value="" />
            </div>
            <div class="form-group">
              <label for="" class="form__label">
                Vrijeme slanja
              </label>
              <input
                type="text"
                class="form__input mb-12"
                value="Svakog 5. u mjesecu"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2 class="heading-secondary">Status</h2>
            <p class="txt-light">Označite status računa</p>
          </div>
          <div class="col-md-3">
            <div class="form__label">Status</div>
            <div class="form__group">
              <div class="form__radio-group">
                <input
                  type="radio"
                  class="form__radio-input"
                  id="paid"
                  name="status"
                />
                <label for="paid" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Plaćen
                </label>
              </div>
              <div class="form__radio-group">
                <input
                  type="radio"
                  class="form__radio-input"
                  id="partiallyPaid"
                  name="status"
                />
                <label for="partiallyPaid" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Djelimično plaćen
                </label>
              </div>
              <div class="form__radio-group">
                <input
                  type="radio"
                  class="form__radio-input"
                  id="notPaid"
                  name="status"
                />
                <label for="notPaid" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Nije plaćen
                </label>
              </div>
              <div class="form__radio-group">
                <input
                  type="radio"
                  class="form__radio-input"
                  id="uncollectible"
                  name="status"
                />
                <label for="uncollectible" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Nenaplativ
                </label>
              </div>
              <div class="form__radio-group">
                <input
                  type="radio"
                  class="form__radio-input"
                  id="temporary"
                  name="status"
                />
                <label for="temporary" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Privremeni
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <a href="">+ Dodaj novi iznos uplate</a>
            <div class="form__group">
              <div class="form__label">Iznos uplate</div>
              <div class="df jc-sb">
                <input type="text" class="form__input w-48" value="100,00" />
                <input
                  type="text"
                  class="form__input w-48"
                  value="Datum uplate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BezgotovinskiStatusPodsjetnici;
