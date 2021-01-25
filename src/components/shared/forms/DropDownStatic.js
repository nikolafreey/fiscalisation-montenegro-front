import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import Label from './Label';

const DropDownStatic = ({ onChangeExtra, label, options, ...props }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <Select
        options={options}
        name={field.name}
        onChange={(option) => {
          setValue(option.value);
          setSelectedLabel(option);
          if (onChangeExtra) onChangeExtra(option);
        }}
        value={selectedLabel ? selectedLabel : props.defaultValue }
        isSearchable
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default DropDownStatic;
