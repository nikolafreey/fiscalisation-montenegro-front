import { useFormikContext } from 'formik';
import React from 'react';
import InputField from '../../shared/forms/InputField';
import $t from '../../../lang';
import { ReactComponent as Plus } from '../../../assets/icon/plus.svg';
import DropDown from '../../shared/forms/DropDown';
import { atributiService } from '../../../services/AtributiService';
import Cijena from './Cijena';
import { Link } from 'react-router-dom';

const CijeneFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext();
  return (
    <>
      {values.cijene.map((cijena, index) => (
        <div className="df jc-sb mt-15">
          <div className="form__group w-28">
            <DropDown
              name={`cijene.${index}.tip_atributa_id`}
              //className="form__input"
              label={$t('cijene.tip_atributa_id')}
              loadOptions={atributiService.getTipoviAtributaDropdown}
            />
          </div>
          <div className="form__group w-28">
            <DropDown
              isMulti
              name={`cijene.${index}.atribut_id`}
              //className="form__input"
              label={$t('cijene.atribut_id')}
              defaultOptions={!!cijena.tip_atributa_id}
              key={cijena.tip_atributa_id}
              loadOptions={() =>
                atributiService.getAtributiPoTipuAtributaDropdown(
                  cijena.tip_atributa_id
                )
              }
            />
          </div>
          <div className="form__group w-28">
            <InputField
              type="number"
              name={`cijene.${index}.ukupna_cijena`}
              className="form__input "
              label={$t('cijene.cijena')}
            />
          </div>
          <button
            className="btn btn__link danger mb-0"
            type="button"
            onClick={() => remove(index)}
          >
            {$t('common.izbrisi')}
          </button>
        </div>
      ))}
      <div className="df ai-c">
        <Link
          // type="button"
          className="link mt-0"
          onClick={() => insert(values.cijene.length, '')}
        >
          
          {`+ ${$t('common.dodajNovi')}`}
          {/* <span className="btn btn__link success">{$t('common.dodajNovi')}</span> */}
        </Link>
      </div>
    </>
  );
};
export default CijeneFieldArray;
