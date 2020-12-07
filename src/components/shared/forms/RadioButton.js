import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';

const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={options.key}>
                <label className="form__label" htmlFor={option.value}>
                  {option.key}
                </label>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                />
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButton;
