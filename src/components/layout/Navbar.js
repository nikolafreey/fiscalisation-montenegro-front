import React from 'react';
import UserControls from '../auth/UserControls';

const Navbar = () => {
  return (
    <div className="header">
      <div className="logo tshow">računi</div>
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
