import { useField } from 'formik';
import React from 'react';
import Label from './Label';

const InputField = ({ label, obavezno = false, ...props }) => {
  const [field, meta] = useField(props);

  const id = props.id || props.name;

  return (
    <>
      <Label className="form__label" htmlFor={id}>
        {label}
        <span className="txt-light">{obavezno ? '' : ' - Nije Obavezno'}</span>
      </Label>

      {/* {meta.touched && meta.error ? (
        <div className="error-text">
          <input {...field} {...props} />
        </div>
      ) : (
        <input {...field} {...props} />
      )} */}

      <div className={meta.touched && meta.error ? 'error-text' : ''}>
        <input {...field} {...props} />
      </div>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputField;
