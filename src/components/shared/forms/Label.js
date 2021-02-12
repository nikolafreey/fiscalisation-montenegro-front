import React from 'react'

const Label = ({ children, ...props}) => {
  return (
    <label {...props} className="form__label">
      {children}
    </label>
  )
}

export default Label
