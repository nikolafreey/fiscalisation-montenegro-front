import React from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';

const PreduzeceDetails = ({ preduzece }) => {
  return (
    <div className="side-info">
      <div
        className="side-info__logo"
        style={{ backgroundImage: `url('${preduzece.logotip}')` }}
      />
      <div className="side-info__desc">
        <div className="df ai-c">
          <h2>{preduzece.kratki_naziv}</h2>
          <svg
            className="icon icon__fill-color-badge ml-s lg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <p className="cl">{preduzece.puni_naziv}</p>
        <ul className="list">
          <li className="item cl">{preduzece.djelatnost}</li>
          <li className="item cl">{preduzece.adresa}</li>
          <li className="item cl">
            {preduzece.grad}, {preduzece.drzava}
          </li>
        </ul>
        <p className="lh-sm">{preduzece.opis}</p>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <p className="txt-up mb-20">pib</p>
          <p className="txt-up mb-20">pdv</p>
          <p className="txt-up mb-20">iban</p>
          <p className="txt-up mb-20">bic / swift</p>
        </div>
        <div className="col-r">
          <p className="mb-20">{preduzece.pib}</p>
          <p className="mb-20">{preduzece.pdv}</p>
          <p className="mb-20">{preduzece.iban}</p>
          <p className="mb-20">{preduzece.bic_swift}</p>
        </div>
      </div>
      <div
        className="side-info__map"
        style={
          {
            /*"background-image: url('assets/img/map.png')"*/
          }
        }
      ></div>

      <hr />
      <h3 className="heading-tertiary">Žiro računi</h3>
      <div className="side-info__info">
        <div className="col-l">
          <p className="txt-up mb-20">pib</p>
          <p className="txt-up mb-20">pdv</p>
          <p className="txt-up mb-20">iban</p>
          <p className="txt-up mb-20">bic / swift</p>
        </div>
        <div className="col-r">
          <p className="mb-20">02834567</p>
          <p className="mb-20">31/45-5435-3535</p>
          <p className="mb-20">1268768768834567</p>
          <p className="mb-20">423423424234</p>
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
            <a href={`tel:${preduzece.telefon}`}>{preduzece.telefon}</a>
          </p>
          <div className="df ai-c jc-end">
            <p>WhatsApp</p>
            {!!preduzece.telefon_whatsapp && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Viber</p>
            {!!preduzece.telefon_viber && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Facetime</p>
            {!!preduzece.telefon_facetime && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
        </div>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <p className="mb-20">Fax</p>
          <p className="mb-20">Email</p>
          <p className="mb-20">Websajt</p>
          <p className="mb-20">Twitter</p>
          <p className="mb-20">Instagram</p>
          <p className="mb-20">Facebook</p>
          <p className="mb-20">Skype</p>
        </div>
        <div className="col-r">
          <p className="mb-20">
            <a href="tel:+67123434">{preduzece.fax}</a>
          </p>
          <p className="mb-20">
            <a href="mailto:info@efel.me">{preduzece.email}</a>
          </p>
          <p className="mb-20">
            <a
              href="http://www.efel.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              {preduzece.website}
            </a>
          </p>
          <p className="mb-20">
            <a
              href="http://www.twwiter.com/efelmotors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {preduzece.twitter_username}
            </a>
          </p>
          <p className="mb-20">
            <a
              href="http://www.instagram.com/efel_motors_doo"
              target="_blank"
              rel="noopener noreferrer"
            >
              {preduzece.instagram_username}
            </a>
          </p>
          <p className="mb-20">
            <a
              href="http://www.facebook.com/efel_motors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {preduzece.facebook_username}
            </a>
          </p>
          <p className="mb-20">
            <a
              href="skype:efel.motors?call"
              target="_blank"
              rel="noopener noreferrer"
            >
              {preduzece.skype_username}
            </a>
          </p>
        </div>
      </div>
      <hr />
      <h3 className="heading-tertiary">Ovlašćeno lice</h3>
      <div className="side-info__info">
        <div className="col-l">
          <p className="mb-20">Ime i prezime</p>
        </div>
        <div className="col-r">
          {preduzece.ovlascena_lica?.length > 0 && (
            <p className="mb-20">
              {preduzece.ovlascena_lica[0].ime +
                ' ' +
                preduzece.ovlascena_lica[0].prezime}
            </p>
          )}
        </div>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <div className="mb-20">Telefon</div>
        </div>
        {preduzece.ovlascena_lica?.length > 0 && (
        <div className="col-r mb-20">
        <div className="df ai-c jc-end">
            <p>WhatsApp</p>
            {!!preduzece.ovlascena_lica[0].telefon_whatsapp && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Viber</p>
            {!!preduzece.ovlascena_lica[0].telefon_viber && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Facetime</p>
            {!!preduzece.ovlascena_lica[0].telefon_facetime && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
        </div>)}
      </div>
      <hr />
      <h3 className="heading-tertiary">Osoba za kontakt</h3>
      <div className="side-info__info">
        <div className="col-l">
          <p className="mb-20">Ime i prezime</p>
        </div>
        <div className="col-r">
          <p className="mb-20">
            {preduzece.kontakt_ime + ' ' + preduzece.kontakt_prezime}
          </p>
        </div>
      </div>
      <div className="side-info__info">
        <div className="col-l">
          <div className="mb-20">Telefon</div>
        </div>
        <div className="col-r mb-20">
          <div className="df ai-c jc-end">
            <p>WhatsApp</p>
            {!!preduzece.kontakt_whatsapp && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Viber</p>
            {!!preduzece.kontakt_viber && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
          <div className="df ai-c jc-end">
            <p>Facetime</p>
            {!!preduzece.kontakt_facetime && (
              <CheckIcon className="icon icon__dark sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreduzeceDetails;
