import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import Label from './Label';

const DropDownStatic = ({ onChangeExtra, label, options, ...props }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const { setValue } = helpers;
  const selectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#F3F4F6',
      borderRadius: 4,
      height: '45px',
      minHeight: 'unset',
    }),
  };
  return (
    <div>
      <Label htmlFor={props.id || props.name} className="form__label">{label}</Label>

      <Select
        options={options}
        name={field.name}
        onChange={(option) => {
          setValue(option.value);
          setSelectedLabel(option);
          if (onChangeExtra) onChangeExtra(option);
        }}
        value={selectedLabel ? selectedLabel : props.defaultValue }
        styles={selectStyle}
        isSearchable
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default DropDownStatic;
