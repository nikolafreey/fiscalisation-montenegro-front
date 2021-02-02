import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Label from './Label';

const DropDown = ({
  onChangeExtra = null,
  label,
  defaultOptions = true,
  loadOptions,
  defaultValue,
  ...props
}) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;

  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <AsyncSelect
        name={field.name}
        onChange={(option) => {
          if (props.isMulti) {
            setValue(option.map((item) => item.value));
          } else setValue(option.value);
          setSelectedLabel(option);
          if (onChangeExtra) onChangeExtra(option);
        }}
        value={defaultValue ? defaultValue : selectedLabel}
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

export default DropDown;
