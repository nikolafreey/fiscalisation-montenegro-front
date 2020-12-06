import { Field, ErrorMessage } from 'formik';
import React from 'react';
import TextError from './TextError';

const Checkbox = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={options.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes()}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Checkbox;

//Ovu konstantu dodajemo u props od <FormikControl />
// const checkboxOptions = [
//     {key: 'Option1', value: 'Option1'},
//     {key: 'Option2', value: 'Option2'},
//     {key: 'Option3', value: 'Option3'},
// ];

// Dodati u initialValues = [
//     checkboxOption: []
// ]
