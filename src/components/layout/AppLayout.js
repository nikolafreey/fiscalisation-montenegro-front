import React from 'react';
import GlobalErrorBar from './GlobalErrorBar';
import '../../main.scss';

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <GlobalErrorBar />
      {children}
    </div>
  );
};

export default AppLayout;
