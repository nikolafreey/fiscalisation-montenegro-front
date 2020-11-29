import React from 'react';
import GlobalErrorBar from './GlobalErrorBar';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return <div>
    <Navbar/>
    <GlobalErrorBar />
    {children}
    </div>;
};

export default AppLayout;
