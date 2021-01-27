import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';

const RadioButton = (props) => {
  const { label, name, options, onChange, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            field.value = option.value;
            console.log(field);
            return (
              <React.Fragment key={options.key}>
                <div className="form__radio-group">
                  <input
                    className="form__radio-input"
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    // checked={field.value === option.value}
                    onChange={onChange}
                  />
                  <label className="form__radio-label" htmlFor={option.value}>
                    <span className="form__radio-button"></span>
                    {option.key}
                  </label>
                </div>
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
