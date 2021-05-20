import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SidebarRouter from '../../../routes/SidebarRouter';
import Navbar from '../Navbar';
import Footer from '../Footer';

const SidebarLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // }

  // const [windowDimensions, setWindowDimensions] = useState(
  //   getWindowDimensions()
  // );

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //     console.log('height', windowDimensions);
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [windowDimensions]);

  const handleMenuIsOpen = (params) => {
    setMenuOpen(params);
  };

  return (
    <div className="row">
      <Sidebar handleMenuIsOpen={handleMenuIsOpen} />
      <div
        className={
          !menuOpen ? 'col-md-11 col-xl-9 col-xs-12 right-wrapper' : 'col-xl-9 col-xs-12 right-wrapper push'
        }
        id="main-content"
      >
        <Navbar />
        <SidebarRouter />
        <Footer />
      </div>
    </div>
  );
};

export default SidebarLayout;
