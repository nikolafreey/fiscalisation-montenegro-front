import { useField } from 'formik';
import React from 'react';
import Label from './Label';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const id = props.id || props.name;

  return (
    <div>
<<<<<<< HEAD
      <Label className="form__label" htmlFor={id}>
=======
      <Label class="form__label" htmlFor={id}>
>>>>>>> 55d3ed6d79255bc16353b9146a9fe8e53712fe6a
        {label}
      </Label>

      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
