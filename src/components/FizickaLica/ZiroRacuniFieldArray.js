import { useFormikContext } from 'formik';
import React from 'react';
import InputField from '../shared/forms/InputField';
import $t from '../../lang';
import { ReactComponent as Plus } from '../../assets/icon/plus.svg';

const ZiroRacuniFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext();
  const getBank = (broj_racuna) => {
    if (broj_racuna) {
      const prvaTri = broj_racuna.substring(0, 3);

      if (prvaTri.includes('550')) {
        return 'Podgorička';
      } else if (prvaTri.includes('535')) {
        return 'Prva';
      } else if (prvaTri.includes('555')) {
        return 'Addiko';
      } else if (prvaTri.includes('510')) {
        return 'CKB';
      } else if (prvaTri.includes('530')) {
        return 'Montenegro AD';
      } else if (prvaTri.includes('540')) {
        return 'ERSTE';
      } else if (prvaTri.includes('520')) {
        return 'Hipotekarna';
      }
    }
  };
  return (
    <div>
      <label className="form__label" for="lista-racuna">
        Lista računa
      </label>

      {values.ziro_racuni.map((ziro_racun, index) => (
        <div className="pr df ai-c">
          <InputField
            label=""
            obavezno
            className="form__input half-wd-full-tab mb-20 mob-mr-10"
            name={`ziro_racuni.${index}.broj_racuna`}
          />
          <span className="form__span">{getBank(ziro_racun.broj_racuna)}</span>
          <button
            className="btn btn__link danger"
            type="button"
            onClick={() => remove(index)}
          >
            {$t('common.izbrisi')}
          </button>
        </div>
      ))}
      <div className="pr df ai-c">
        <button
          type="button"
          className="btn btn__link df"
          onClick={() => insert(values.ziro_racuni.length, '')}
        >
          <Plus className="icon icon__stroke-link sm" />
          <span className="btn btn__link success">{$t('common.dodajNovi')}</span>
        </button>
      </div>
    </div>
  );
};
export default ZiroRacuniFieldArray;
