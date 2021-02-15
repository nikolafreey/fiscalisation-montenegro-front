import { useField } from 'formik';
import React from 'react';
import Label from './Label';

const Checkbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const id = props.id || props.name;

  return (
    <>
      <input {...field} {...props}  className="form__checkbox"/>

      <Label className="form__checkbox-label" htmlFor={id}>
        {label}
      </Label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default Checkbox;
