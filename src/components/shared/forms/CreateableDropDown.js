import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Label from './Label';

const CreatableDropDown = ({
  label,
  defaultOptions = true,
  loadOptions,
  ...props
}) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;

  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <CreatableSelect
        name={field.name}
        onChange={(option) => {
          if (props.isMulti) {
            setValue(option.map((item) => item.value));
          } else setValue(option.value);
          console.log('asdf', option);
          setSelectedLabel(option);
        }}
        value={selectedLabel}
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        isSearchable
        {...props}
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default CreatableDropDown;
