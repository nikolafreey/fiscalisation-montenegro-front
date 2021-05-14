import React from 'react';
import Sidebar from './Sidebar';
import SidebarRouter from '../../../routes/SidebarRouter';
import Navbar from '../Navbar';
import Footer from '../Footer';

const SidebarLayout = () => {
  
  return (
    <div className="row">
      <Sidebar />
      <div className="col-md-11 col-xl-9 col-xs-12" id="main-content">
        <Navbar />
        <SidebarRouter />
      <Footer />
      </div>
    </div>
  );
};

export default SidebarLayout;
