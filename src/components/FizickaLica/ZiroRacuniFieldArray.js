import { useFormikContext } from 'formik'
import React from 'react'
import InputField from '../shared/forms/InputField';
import $t from '../../lang';

const ZiroRacuniFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext()
  
  return (
    <div>
      {
        values.ziro_racuni.map((ziro_racun, index) => (
          <>
            <InputField name={`ziro_racuni.${index}.broj_racuna`}/>
            <button type='button' onClick={() => remove(index)}>{$t('common.izbrisi')}</button>
          </>
        ))
      }
      <button type='button' onClick={() => insert(values.ziro_racuni.length, '')}>{$t('common.dodajNovi')}</button>
    </div>
  );
}

export default ZiroRacuniFieldArray
