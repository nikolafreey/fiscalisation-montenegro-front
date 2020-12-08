import React from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';

const RobeDetails = ({ roba = {} }) => {
  return (
    <div className="side-info">
      <div
        className="side-info__logo img-round xl"
        style={{ backgroundImage: `url(${roba.avatar})` }}
      ></div>
      <div className="side-info__desc">
        <div className="df ai-c">
          <h2>{roba.ime + ' ' + roba.prezime}</h2>
        </div>
        <ul className="list">
          <li className="item cl">{roba.zanimanje}</li>
          <li className="item cl">{roba.adresa}</li>
          <li className="item cl">
            {roba.grad}, {roba.drzava}
          </li>
        </ul>
        <p className="lh-sm">
          Elementum malesuada tristique vitae ut. Nunc parturient natoque nulla
          molestie sed cursus. Risus congue quisque morbi nibh mauris vel.
        </p>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <p className="txt-up mb-20">jmbg</p>
          <p className="txt-up mb-20">ib</p>
          <p className="mb-20">Nacionalnost</p>
          <p className="mb-20">Državljanstvo</p>
          <p className="mb-20">Preduzeće</p>
          <p className="mb-20">Radno mjesto</p>
        </div>
        <div className="col-r">
          <p className="mb-20">{roba.jmbg}</p>
          <p className="mb-20">{roba.ib}</p>
          <p className="mb-20">{roba.nacionalnost}</p>
          <p className="mb-20">{roba.drzavljanstvo}</p>
          <p className="mb-20">{roba.preduzece?.kratki_naziv}</p>
          <p className="mb-20">{roba.radno_mjesto}</p>
        </div>
      </div>
      <div
        className="side-info__map"
        style={{ bacgroundImage: `url('assets/img/map.jpg')` }}
      ></div>

      <hr />
      <h3 className="heading-tertiary">Tekući računi</h3>
      <div className="side-info__info">
        <div className="col-l">
          <p className="txt-up mb-20">ckb</p>
          <p className="txt-up mb-20">nlb</p>
          <p className="mb-20">Prva Banka CG</p>
        </div>
        <div className="col-r">
          <p className="mb-20">540-1214134-1312</p>
          <p className="mb-20">520-121334-14</p>
          <p className="mb-20">535-11234-32</p>
        </div>
      </div>
      <hr />
      <h3 className="heading-tertiary">Kontakt informacije</h3>
      <div className="side-info__info">
        <div className="col-l">
          <div className="mb-20">Telefon</div>
        </div>
        <div className="col-r mb-20">
          <p>
            <a href={`tel:${roba.telefon}`}>{roba.telefon}</a>
          </p>
          {/*<div className="df ai-c jc-end">
            <p>WhatsApp</p>
            {roba.telefon_whatsapp && <CheckIcon className="icon icon__dark sm" />}
          </div>
          <div className="df ai-c jc-end">
            <p>Viber</p>
            {roba.telefon_viber && <CheckIcon className="icon icon__dark sm" />}
          </div>
          <div className="df ai-c jc-end">
            <p>Facetime</p>
            {roba.telefon_facetime && <CheckIcon className="icon icon__dark sm" />}
          </div>*/}
        </div>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <p className="mb-20">Email</p>
          <p className="mb-20">CV</p>
        </div>
        <div className="col-r">
          <p className="mb-20">
            <a href={`mailto:${roba.email}`}>{roba.email}</a>
          </p>
          <p className="mb-20">
            <a href={roba.cv_link} target="_blank" rel="noopener noreferrer">
              Pogledaj CV
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RobeDetails;
