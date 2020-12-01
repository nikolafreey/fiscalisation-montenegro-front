import { useFormikContext } from 'formik'
import React from 'react'
import InputField from '../shared/forms/InputField';

const ZiroRacuniFieldArray = ({ insert, remove }) => {
  const { values } = useFormikContext()
  
  return (
    <div>
      {
        values.ziro_racuni.map((ziro_racun, index) => (
          <>
            <InputField name={`ziro_racuni.${index}.broj_racuna`}/>
            <button type='button' onClick={() => remove(index)}>Obrisi</button>
          </>
        ))
      }
      <button type='button' onClick={() => insert(values.ziro_racuni.length, '')}>Dodaj</button>
    </div>
  );
}

export default ZiroRacuniFieldArray
