import { ErrorMessage, useField } from 'formik';
import React from 'react'
import AsyncSelect from 'react-select/async';
import Label from './Label';


const DropDown = ({ label, defaultOptions=false, loadOptions, ...props }) => {
  
  const [field, meta, helpers] = useField(props);

  const { error, value } = meta;
  const { setValue } = helpers;
  
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <AsyncSelect
        name={field.name}
        onChange={(option) => setValue(option.value)}
        value={value}
        cacheOptions 
        defaultOptions={defaultOptions} 
        loadOptions={loadOptions}
      />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
      
    </div>
  )
}

export default DropDown
