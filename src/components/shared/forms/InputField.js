import { useField } from 'formik';
import React from 'react';
import Label from './Label';

const InputField = ({ label, obavezno = false, ...props }) => {
  const [field, meta] = useField(props);

  const id = props.id || props.name;

  return (
    <>
      <Label class="form__label" htmlFor={id}>
        {`${label} ${obavezno ? '' : ' - Nije Obavezno'}`}
      </Label>

      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputField;
