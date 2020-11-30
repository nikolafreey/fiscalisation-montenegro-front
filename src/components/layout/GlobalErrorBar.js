import React from 'react'
import { useSelector } from 'react-redux'
import { globalErrorSelector } from '../../store/selectors/ErrorSelector'

const GlobalErrorBar = () => {
  const globalError = useSelector(globalErrorSelector());
  
  return (
    <div>
      {globalError}
    </div>
  )
}

export default GlobalErrorBar
