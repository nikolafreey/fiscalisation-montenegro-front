import React from 'react';

const BezgotovinskiUkupno = () => {
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
                    name="note"
                    id=""
                    id=""
                    cols="30"
                    rows="6"
                    class="form__input h-83"
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
                      <select name="customer" id="" class="form__input mb-12">
                        <option value="">Procenat %</option>
                        <option value="">--------</option>
                        <option value="">--------</option>
                      </select>
                      <div class="form__box">
                        <p class="txt-light">Ukupan iznos PDV-a</p>
                        <h2 class="heading-secondary">94,30</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-group">
                      <label for="" class="form__label">
                        Popust bez PDV-a
                      </label>
                      <select name="customer" id="" class="form__input mb-12">
                        <option value="">Da</option>
                        <option value="">--------</option>
                        <option value="">--------</option>
                      </select>
                      <div class="form__box">
                        <p class="txt-light">Ukupan iznos PDV-a</p>
                        <h2 class="heading-secondary">94,30</h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="form-group">
                      <label for="" class="form__label">
                        Iznos popusta
                      </label>
                      <input type="text" class="form__input mb-12" value="23" />
                      <div class="form__box">
                        <p class="txt-light">Ukupan iznos PDV-a</p>
                        <h2 class="heading-secondary">94,30</h2>
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
