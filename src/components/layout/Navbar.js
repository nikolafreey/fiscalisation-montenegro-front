import React from 'react';
import UserControls from '../auth/UserControls';
import {ReactComponent as Logo} from '../../assets/icon/company-logo/postFiscal.svg';
const Navbar = () => {
  return (
    <div className="header">
      <div className="logo tshow">
        <Logo />
      </div>
      <form action="#" className="search df ai-c">
        {/* <button className="search__button"></button>
        <input
          type="text"
          className="search__input"
          placeholder="Pretraga  (kliknite ovdje ili pritisnite na tastaturi “/”)"
        /> */}
      </form>
      <UserControls />
    </div>
  );
};

export default Navbar;
