import React from 'react';
import {
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDRACUNI,
  PREDUZECA,
  RACUNI,
  ULAZNI_RACUNI,
  USLUGE,
  STAVKE,
  MODULI,
  PODESAVANJA,
} from '../../../constants/routes';
import SidebarLink from './SidebarLink';
import { ReactComponent as heroHome } from '../../../assets/icon/hero-home.svg';
import { ReactComponent as heroRacuni } from '../../../assets/icon/hero-racuni.svg';
import { ReactComponent as heroUlazniRacuni } from '../../../assets/icon/hero-prijem_racuna.svg';
import { ReactComponent as heroPartneri } from '../../../assets/icon/hero-partneri.svg';
import { ReactComponent as heroPreduzeca } from '../../../assets/icon/hero-preduzeca.svg';
import { ReactComponent as heroStavke } from '../../../assets/icon/hero-stavke.svg';
import { ReactComponent as heroPredracuni } from '../../../assets/icon/hero-predracuni.svg';
import { ReactComponent as heroDokumenta } from '../../../assets/icon/hero-dokumenta.svg';
import { ReactComponent as heroIzvjestaji } from '../../../assets/icon/hero-izvjestaji.svg';
import { ReactComponent as heroModuli } from '../../../assets/icon/hero-moduli.svg';
import { ReactComponent as heroNovosti } from '../../../assets/icon/hero-novosti.svg';
import { ReactComponent as heroRazgovori } from '../../../assets/icon/hero-razgovori.svg';
import { ReactComponent as heroUgovori } from '../../../assets/icon/hero-ugovori.svg';
import { ReactComponent as heroPodesavanja } from '../../../assets/icon/hero-podesavanja.svg';
import { ReactComponent as heroPodrska } from '../../../assets/icon/hero-podrska.svg';
import { ReactComponent as Logo } from '../../../assets/icon/company-logo/postFiscal.svg';
import { useState, useEffect } from 'react';

const Sidebar = ({ handleMenuIsOpen }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuToggler = () => {
    setMenuIsOpen(!menuIsOpen);
    handleMenuIsOpen(!menuIsOpen);
  };

  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
});

let handleMenuMobClose;
  if(width <= 780){
    handleMenuMobClose =() => {
      setMenuIsOpen(false);
      handleMenuIsOpen(false);
    }
  }

  return (
    <div
      className={menuIsOpen ? 'col-xl-3 col-md-3' : 'col-md-1 col-xl-3'}
      id="sidebar"
    >
      <div className="logo dshow">
        <Logo />
      </div>
      <div
        className={menuIsOpen ? 'menu-icon active' : 'menu-icon '}
        onClick={menuToggler}
      >
        <span className="line line-1"></span>
        <span className="line line-2"></span>
      </div>
      <div className={menuIsOpen ? 'sidebar active' : 'sidebar'}>
        <ul className="items">
          <SidebarLink
            ImageSource={heroHome}
            label="Pregled"
            to={HOME}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          {/* <SidebarLink ImageSource={heroRazgovori} label="Razgovori" to={'#'} />
          <SidebarLink ImageSource={heroNovosti} label="Novosti" to={'#'} /> */}
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Ra??uni</h3>
          <SidebarLink
            ImageSource={heroRacuni}
            label="Ra??uni"
            to={RACUNI.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          {/* <SidebarLink
            ImageSource={heroPredracuni}
            label="Predra??uni"
            to={PREDRACUNI.INDEX}
          /> */}
          {/* <SidebarLink
            ImageSource={heroUlazniRacuni}
            label="Prijem ra??una"
            to={ULAZNI_RACUNI.INDEX}
          /> */}
          <SidebarLink
            ImageSource={heroStavke}
            label="Stavke"
            to={STAVKE.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
        </ul>
        <ul className="items">
          <h3 className="heading-quaternary">Partneri</h3>
          <SidebarLink
            ImageSource={heroPartneri}
            label="Partneri"
            to={PARTNERI.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          {/* <SidebarLink ImageSource={heroUgovori} label="Ugovori" to={'#'} /> */}

          {/* <SidebarLink ImageSource={heroDokumenta} label="Dokumenta" to={'#'} /> */}
          <SidebarLink
            ImageSource={heroPreduzeca}
            label="Preduzeca"
            to={PREDUZECA.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          {/* <SidebarLink
            ImageSource={heroIzvjestaji}
            label="Izvje??taji"
            to={'#'}
          /> */}

          {/* <SidebarLink
            ImageSource={heroHome}
            label="Fizicka lica"
            to={FIZICKA_LICA.INDEX}
          /> */}
        </ul>

        <ul className="items">
          <h3 className="heading-quaternary">Pode??avanja</h3>

          <SidebarLink
            ImageSource={heroModuli}
            label="Moduli"
            to={MODULI.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          <SidebarLink
            ImageSource={heroPodesavanja}
            label="Pode??avanja"
            to={PODESAVANJA.INDEX}
            menuIsOpen={menuIsOpen}
            onClick={handleMenuMobClose}
          />
          {/* <SidebarLink ImageSource={heroPodrska} label="Podr??ka" to={'#'} /> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
