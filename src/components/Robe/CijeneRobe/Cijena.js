import React, { useEffect } from 'react';
import $t from '../../../lang';
import { poreziService } from '../../../services/PoreziService';
import { poreziSelector } from '../../../store/selectors/UslugeSelector';
import DropDown from '../../shared/forms/DropDown';
import DropDownStatic from '../../shared/forms/DropDownStatic';
import InputField from '../../shared/forms/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import { getPorezi } from '../../../store/actions/UslugeActions';
import CijeneFieldArray from './CijeneFieldArray';

const Cijena = ({ getPriceNoVat, getPriceVat, getVat, getStopaPerId }) => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();
  console.log('ss', values);
  const options = [
    { value: 0, label: 'Cijena bez PDV' },
    { value: 1, label: 'Cijena sa PDV' },
  ];

  useEffect(() => {
    dispatch(getPorezi());
  }, [dispatch]);

  return (
    <>
      <div class="col-md-4">
        <h2 class="heading-secondary">Cijena </h2>
        <p class="txt-light">
          Možete kreirati cijene za pojedinačne atribute. Na pr. ako unosite
          artikal/robu “Majica” za veličine XS i S možete dodati posebne cijene.
        </p>
        <div class="df jc-sb mtb-25">
          <div class="col-l txt-light">
            <p className="mb-10">Cijena artikla / robe:</p>
            <p className="mb-10">Bez PDV-a:</p>
            <p className="mb-10">
              PDV
              {getStopaPerId(values.porez_id) * 100}%:
            </p>
            <p className="mb-10">Ukupna cijena</p>
          </div>
          <div class="col-r mt-30">
            <p className="mb-10">/</p>
            <p className="mb-10">
              {Number(
                getPriceNoVat(
                  values.pdv_ukljucen,
                  values.porez_id,
                  values.ukupna_cijena
                )
              )
                .toFixed(2)
                .replace('.', ',') + '€'}
            </p>
            <p className="mb-10">
              {Number(
                getVat(
                  values.pdv_ukljucen,
                  values.porez_id,
                  values.ukupna_cijena
                )
              )
                .toFixed(2)
                .replace('.', ',') + '€'}
            </p>
            <p className="mb-10">
              {Number(
                getPriceVat(
                  values.pdv_ukljucen,
                  values.porez_id,
                  values.ukupna_cijena
                )
              )
                .toFixed(2)
                .replace('.', ',') + '€'}
            </p>
          </div>
        </div>
        <div class="df jc-sb mtb-25">
          <div class="col-l txt-light">
            <p>Cijena za:</p>
            <p class="mb-10 txt-dark">Boja: Crvena, Zelena</p>
            <p class="mb-10">Bez PDV-a:</p>
            <p class="mb-10">PDV 21%:</p>
            <p class="mb-10">Ukupna cijena</p>
          </div>
          <div class="col-r mt-50">
            <p class="mb-10">20,00</p>
            <p class="mb-10">4,20</p>
            <p class="mb-10">24,20</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="df jc-sb">
          <div class="form__group w-48">
            <InputField
              type="number"
              name="nabavna_cijena_bez_pdv"
              className="form__input"
              label={$t('cijene.nabavna_bez_pdv')}
            />
          </div>
          <div class="form__group w-48">
            <InputField
              type="number"
              name="nabavna_cijena_sa_pdv"
              className="form__input"
              label={$t('cijene.nabavna_sa_pdv')}
            />
          </div>
        </div>

        <div class="df jc-sb">
          <div class="form__group w-48">
            <DropDown
              name="porez_id"
              label={$t('cijene.porezi')}
              loadOptions={poreziService.getPoreziDropdown}
            />
          </div>
          <div class="form__group w-48">
            <DropDownStatic
              name="pdv_ukljucen"
              label={$t('cijene.pdv_ukljucen')}
              options={options}
              defaultValue={options[1]}
            />
          </div>
        </div>
        <div class="form__group">
          <InputField
            type="number"
            name="ukupna_cijena"
            className="form__input w-100"
            label={$t('cijene.cijena')}
          />
        </div>
        <FieldArray name="cijene">
          {(arrayHelpers) => <CijeneFieldArray {...arrayHelpers} />}
        </FieldArray>
      </div>
    </>
  );
};

export default Cijena;
