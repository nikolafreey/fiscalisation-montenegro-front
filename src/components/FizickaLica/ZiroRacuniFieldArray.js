import { useFormikContext } from 'formik';
import React from 'react';
import InputField from '../shared/forms/InputField';
import $t from '../../lang';
import { ReactComponent as Plus } from '../../assets/icon/plus.svg';

const ZiroRacuniFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext();
  console.log(values);
  return (
    <div>
      <label className="form__label" for="lista-racuna">
        Lista računa
      </label>

      {values.ziro_racuni.map((ziro_racun, index) => (
        <>
          <div className="pr df ai-c">
            <InputField
              className="form__input w-50 mb-20"
              name={`ziro_racuni.${index + 1}.broj_racuna`}
            />
            <button
              className="btn btn__link warning"
              type="button"
              onClick={() => remove(index)}
            >
              {$t('common.izbrisi')}
            </button>
          </div>
        </>
      ))}
      <div class="df ai-c">
        <button
          type="button"
          class="btn btn__link df"
          onClick={() => insert(values.ziro_racuni.length, '')}
        >
          <Plus class="icon icon__stroke-link sm" />
          <span class="btn btn__link success">{$t('common.dodajNovi')}</span>
        </button>
      </div>
    </div>
  );
};
export default ZiroRacuniFieldArray;
