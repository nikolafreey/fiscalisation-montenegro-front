import { useField } from 'formik';
import React from 'react';
import Label from './Label';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const id = props.id || props.name;

  return (
    <>
      <Label htmlFor={id}>{label}</Label>

      <input {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputField;
