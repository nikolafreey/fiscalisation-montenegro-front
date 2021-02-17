import React from 'react'

const Label = ({ children, ...props}) => {
  return (
    <label {...props} className="mb-0">
      {children}
    </label>
  )
}

export default Label
