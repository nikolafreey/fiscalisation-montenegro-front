import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async';
import Label from './Label';


const DropDown = ({ label, defaultOptions=true, loadOptions, ...props }) => {
  
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
          setValue(option.value);
          console.log(option);
          setSelectedLabel(option);
        }}
        value={selectedLabel}
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        isSearchable
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
      
    </div>
  )
}

export default DropDown
