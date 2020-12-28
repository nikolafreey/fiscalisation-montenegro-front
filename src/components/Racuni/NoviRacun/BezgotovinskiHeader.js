import React from 'react';

const BezgotovinskiHeader = () => {
  return (
    <div class="main-content__box">
      <div class="main-content__box--inner-wrapper">
        <div class="row">
          <div class="col-xl-4 pr-0">
            <h2 class="heading-secondary">Novi račun</h2>
            <p class="txt-light">
              Unesite kupca, tip računa i krajnji datum za plaćanje
            </p>
          </div>
          <div class="col-xl-4 pr-0">
            <div class="form-group">
              <label class="form__label" for="">
                Kupac
              </label>
              <select name="customer" id="" class="form__input mb-12">
                <option value="">Preduzeće ili Fizičko lice</option>
                <option value="">Fizicko lice</option>
              </select>
              <input
                type="text"
                class="form__input"
                placeholder="Datum izdavanja"
              />
            </div>
          </div>
          <div class="col-xl-4">
            <div class="form-group">
              <label class="form__label" for="">
                Tip računa
              </label>
              <select name="customer" id="" class="form__input mb-12">
                <option value="">Račun</option>
                <option value="">--------</option>
                <option value="">--------</option>
              </select>
              <input
                type="text"
                class="form__input"
                placeholder="Rok za plaćanje"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BezgotovinskiHeader;
