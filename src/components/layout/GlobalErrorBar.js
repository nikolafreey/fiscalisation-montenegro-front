import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { globalErrorSelector } from '../../store/selectors/ErrorSelector';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const GlobalErrorBar = () => {
  // const notify = () => {
  //   toast('Greška: ' + globalError);
  //   console.log('globalError notify:', globalError);
  // };

  // useEffect(() => {
  //   console.log('globalError', globalError);
  //   globalError && notify();
  // }, [notify]);
  const globalError = useSelector(globalErrorSelector());

  console.log('globalError', globalError);

  return <div></div>;
};

export default GlobalErrorBar;
