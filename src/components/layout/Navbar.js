import React from 'react'
import UserControls from '../auth/UserControls'
import '../../main.scss';

const Navbar = () => {
  return (
    <div class="header">
      <form action="#" class="search">
        <button class="search__button">
        </button>
        <input
          type="text"
          class="search__input"
          placeholder="Pretraga  (kliknite ovdje ili pritisnite na tastaturi “/”)"
        />
      </form>
      <div>
      
        <UserControls />
      </div>
    </div>
  )
}

export default Navbar
