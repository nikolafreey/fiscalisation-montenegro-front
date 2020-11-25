import { ErrorMessage, Field, useField } from 'formik';
import React from 'react'
import Label from './Label';

const InputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const id = props.id || props.name;
  
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>

      <input {...field} {...props} />

      {meta.touched && meta.error ? (

<div className="error">{meta.error}</div>

) : null}
      
    </div>
  )
}

export default InputField
