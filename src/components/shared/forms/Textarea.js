import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

const Textarea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label className="form__label" htmlFor={name}>
        {label} <span className="txt-light">- Nije Obavezno</span>
      </label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Textarea;
