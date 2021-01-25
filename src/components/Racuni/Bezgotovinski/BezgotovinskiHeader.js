import { useFormikContext } from 'formik';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { KOREKTIVNI_RACUN } from '../../../constants/racuni';
import { partneriService } from '../../../services/PartneriService';
import DropDown from '../../shared/forms/DropDown';
import DropDownStatic from '../../shared/forms/DropDownStatic';   

const BezgotovinskiHeader = () => {
  const { values, setFieldValue } = useFormikContext();
  
  return (
    <div className="main-content__box">
      <div className="main-content__box--inner-wrapper">
        <div className="row">
          <div className="col-xl-4 pr-0">
            <h2 className="heading-secondary">Novi račun</h2>
            <p className="txt-light">
              Unesite kupca, tip računa i krajnji datum za plaćanje
            </p>
          </div>
          <div className="col-xl-4 pr-0">
            <div className="form-group">
              <label className="form__label">
                Kupac
              </label>
              <DropDown
                name="partner_id"
                loadOptions={
                  partneriService.getPartneriDropdown
                }
              />
              <ReactDatePicker
                selected={values.datum_izdavanja}
                onChange={(date) => setFieldValue('datum_izdavanja', date)}
                className="select"
                placeholderText="Datum Izdavanja"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="col-xl-4">
            <div className="form-group">
              <label className="form__label">
                Korektivni račun
              </label>
              <DropDownStatic 
                name="korektivni_racun"
                options={KOREKTIVNI_RACUN}
                defaultValue={KOREKTIVNI_RACUN[0]}
              />
              <ReactDatePicker
                selected={values.datum_za_placanje}
                onChange={(date) => setFieldValue('datum_za_placanje', date)}
                className="select"
                placeholderText="Rok za placanje"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BezgotovinskiHeader;
