import { useFormikContext } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  KOREKTIVNI_RACUN,
  PDV_OBVEZNIK,
  NACIN_PLACANJA_BEZGOTOVINSKI,
} from '../../../constants/racuni';
import { partneriService } from '../../../services/PartneriService';
import DropDown from '../../shared/forms/DropDown';
import DropDownStatic from '../../shared/forms/DropDownStatic';

const BezgotovinskiHeader = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="main-content__box">
      <div className="main-content__box--inner-wrapper">
        <div className="row">
          <div className="col-xl-4 col-md-4 col-sm-12 pr-0">
            <h2 className="heading-secondary">Novi račun</h2>
            <p className="txt-light b-mob-mb-20">
              Unesite kupca, tip računa i krajnji datum za plaćanje
            </p>
          </div>
          <div className="col-xl-8 col-md-8">
            <div className="section-box__right tabp-fd-row">
              <div className="section-box__right--top-wrap">
                <div className="half">
                  <div className="form__group mb-15">
                    <label className="form__label">Kupac</label>
                    <DropDown
                      className="mb-12 mob-mb-20"
                      name="partner_id"
                      loadOptions={partneriService.getPartneriDropdown}
                      isSearchable
                    />
                  </div>
                </div>
                <div className="half">
                  <div className="form__group">
                    <label className="form__label">Korektivni račun</label>
                    <DropDownStatic
                      name="korektivni_racun"
                      options={KOREKTIVNI_RACUN}
                      defaultValue={KOREKTIVNI_RACUN[0]}
                      onChange={(racun) =>
                        setFieldValue('korektivni_racun', racun)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="section-box__right--bottom-wrap">
                <div className="half">
                  <div className="form__group mb-15">
                    <label className="form__label">Datum Izdavanja</label>
                    <ReactDatePicker
                      selected={values.datum_izdavanja}
                      onChange={(date) =>
                        setFieldValue('datum_izdavanja', date)
                      }
                      className="form__input w-100"
                      placeholderText="Datum Izdavanja"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className="half">
                  <div className="form__group">
                    <label className="form__label">Rok za plaćanje</label>
                    <ReactDatePicker
                      selected={values.datum_za_placanje}
                      onChange={(date) =>
                        setFieldValue('datum_za_placanje', date)
                      }
                      className="form__input w-100"
                      placeholderText="Rok za plaćanje"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
              </div>
              <div className="section-box__right--bottom-wrap">
                <div className="half">
                  <div className="form__group">
                    <label className="form__label">
                      U sistemu PDV-a?
                    </label>
                    <DropDownStatic
                      name="pdv_obveznik"
                      options={PDV_OBVEZNIK}
                      defaultValue={PDV_OBVEZNIK[0]}
                      onChange={(pdv) => setFieldValue('pdv_obveznik', pdv)}
                    />
                  </div>
                </div>
                <div className="half">
                  <div className="form__group">
                    <label className="form__label">Način Plaćanja</label>
                    <DropDownStatic
                      name="nacin_placanja"
                      options={NACIN_PLACANJA_BEZGOTOVINSKI}
                      defaultValue={NACIN_PLACANJA_BEZGOTOVINSKI[0]}
                      onChange={(nacin) =>
                        setFieldValue('nacin_placanja', nacin)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BezgotovinskiHeader;
