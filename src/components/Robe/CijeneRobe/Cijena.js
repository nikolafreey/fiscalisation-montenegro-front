import React, { useEffect } from 'react';
import $t from '../../../lang';
import { poreziService } from '../../../services/PoreziService';
import DropDown from '../../shared/forms/DropDown';
import DropDownStatic from '../../shared/forms/DropDownStatic';
import InputField from '../../shared/forms/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, useFormikContext } from 'formik';
import { getPorezi } from '../../../store/actions/UslugeActions';
import CijeneFieldArray from './CijeneFieldArray';
import { tipoviAtributaSelector } from '../../../store/selectors/AtributiSelector';

const Cijena = ({ getPriceNoVat, getPriceVat, getVat, getStopaPerId }) => {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const tipoviAtributa = useSelector(tipoviAtributaSelector());

  const options = [
    { value: 0, label: 'Cijena bez PDV' },
    { value: 1, label: 'Cijena sa PDV' },
  ];

  const getAtributiZaCijenuString = (cijena) => {
    if (!tipoviAtributa) return null;
    const tipAtributa = tipoviAtributa.find(
      (tipAtributa) => tipAtributa.id === cijena.tip_atributa_id
    );
    if (!tipAtributa) return null;
    const naziviAtributaString = tipAtributa.atributi
      ?.filter((atribut) => cijena.atribut_id?.includes(atribut.id))
      .map((atribut) => atribut.naziv)
      .join(', ');
    return `${tipAtributa.naziv}: ${naziviAtributaString || ''}`;
  };

  const getFormattedPriceString = (callback, ...args) => {
    const price = callback(...args);
    
    return isNaN(price)
      ? 0
      : Number(price)
          .toFixed(2)
          .replace('.', ',') + '€';
  };

  const getFormattedPercentageString = (callback, ...args) => {
    const percentage = callback(...args) * 100;
    
    return isNaN(percentage) ? '' : percentage.toFixed(2) + '%'
  }

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
              PDV&nbsp;
              {getFormattedPercentageString(getStopaPerId, values.porez_id)}
              :
            </p>
            <p className="mb-10">Ukupna cijena</p>
          </div>
          <div class="col-r mt-30">
            <p className="mb-10">
              {getFormattedPriceString(
                getPriceNoVat,
                values.pdv_ukljucen,
                values.porez_id,
                values.ukupna_cijena
              )}
            </p>
            <p className="mb-10">
              {getFormattedPriceString(
                getVat,
                values.pdv_ukljucen,
                values.porez_id,
                values.ukupna_cijena
              )}
            </p>
            <p className="mb-10">
              {getFormattedPriceString(
                getPriceVat,
                values.pdv_ukljucen,
                values.porez_id,
                values.ukupna_cijena
              )}
            </p>
          </div>
        </div>
        {values.cijene.map((cijena) => {
          return (
            <div class="df jc-sb mtb-25">
              <div class="col-l txt-light">
                <p>Cijena za:</p>
                <p class="mb-10 txt-dark">
                  {getAtributiZaCijenuString(cijena)}
                </p>
                <p class="mb-10">Bez PDV-a:</p>
                <p class="mb-10">
                  PDV&nbsp;
                  {isNaN(getStopaPerId(values.porez_id) * 100)
                    ? ''
                    : getStopaPerId(values.porez_id) * 100 + '%'}
                  :
                </p>
                <p class="mb-10">Ukupna cijena</p>
              </div>
              <div class="col-r mt-50">
                <p class="mb-10">
                  {getFormattedPriceString(
                    getPriceNoVat,
                    values.pdv_ukljucen,
                    values.porez_id,
                    cijena.ukupna_cijena
                  )}
                </p>
                <p class="mb-10">
                  {getFormattedPriceString(
                    getVat,
                    values.pdv_ukljucen,
                    values.porez_id,
                    cijena.ukupna_cijena
                  )}
                </p>
                <p class="mb-10">
                  {getFormattedPriceString(
                    getPriceVat,
                    values.pdv_ukljucen,
                    values.porez_id,
                    cijena.ukupna_cijena
                  )}
                </p>
              </div>
            </div>
          );
        })}
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
