import React from 'react';
import GlobalErrorBar from './GlobalErrorBar';

const AppLayout = ({ children }) => {
  return (
    <div className="container">
      <GlobalErrorBar />
      {children}
    </div>
  );
};

export default AppLayout;
