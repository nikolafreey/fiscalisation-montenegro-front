import React, { useState } from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';

const PreduzeceDetails = ({ preduzece }) => {
  let c = '';
  let a = '';

  const ziroRacuni = () => {
    // console.log('pred', preduzece);
    return preduzece?.ziro_racuni?.map((racun) => {
      a = racun.broj_racuna;
      // console.log(a);
      if (a) {
        const prvaTri = a.substring(0, 3);

        if (prvaTri.includes('550')) {
          return <p>{'Podgorička' + a}</p>;
        } else if (prvaTri.includes('535')) {
          return <p>{'Prva' + a}</p>;
        } else if (prvaTri.includes('555')) {
          return <p>{'Addiko' + a}</p>;
        } else if (prvaTri.includes('510')) {
          return <p>{'CKB ' + a}</p>;
        } else if (prvaTri.includes('530')) {
          return <p>{'Montenegro AD' + a}</p>;
        } else if (prvaTri.includes('540')) {
          return <p>{'ERSTE' + a}</p>;
        } else if (prvaTri.includes('520')) {
          return <p>{'Hipotekarna' + a}</p>;
        }
        return <p>{a}</p>;
      }
    });
  };
  return (
    <div className="side-info">
      <div className="side-info__logo-wrapper">
        <img src={preduzece?.logotip} alt={preduzece?.kratki_naziv} />
      </div>
      <div className="side-info__wrapper">
        <h2 className="side-info__title">
          <span>{preduzece?.kratki_naziv}</span>
          <i>
            <svg
              className="icon icon__fill-color-badge lg"
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
          </i>
        </h2>
        <div className="side-info__desc">
          <p className="cl">{preduzece?.puni_naziv}</p>
          <ul className="list">
            <li className="item cl">{preduzece?.djelatnost}</li>
            <li className="item cl">{preduzece?.adresa}</li>
            <li className="item cl">
              {preduzece?.grad}, {preduzece?.drzava}
            </li>
          </ul>
          <p className="lh-sm">{preduzece?.opis}</p>
        </div>
      </div>
      <div className="side-info__wrapper">
        <div className="side-info__info as-end">
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">pib</p>
            </div>
            <div className="col-r">
              <p>{preduzece?.pib}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">pdv</p>
            </div>
            <div className="col-r">
              <p>{preduzece?.pdv}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">{preduzece?.iban ? 'iban' : null}</p>
            </div>
            <div className="col-r">
              <p>{preduzece?.iban ? preduzece?.iban : null}</p>
            </div>
          </div>
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p className="txt-up">
                {preduzece?.bic_swift ? 'bic / swift' : null}
              </p>
            </div>
            <div className="col-r">
              <p>{preduzece?.bic_swift ? 'bic / swift' : null}</p>
            </div>
          </div>
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
      <div className="side-info__wrapper">
        <h3 className="heading-tertiary">Žiro računi</h3>
        <div className="side-info__info">
          <div className="side-info__info--inner-wrapper">
            {/* <div className="col-l">{c}</div> */}
            <div className="col-r">{ziroRacuni()}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="side-info__wrapper">
        <h3 className="heading-tertiary tab-ml-10p">Kontakt informacije</h3>
        <div className="side-info__info as-end">
          <div className="side-info__info--inner-wrapper">
            <div className="col-l">
              <p>Telefon</p>
            </div>
            <div className="col-r">
              <p>
                <a href={`tel:${preduzece?.telefon}`}>{preduzece?.telefon}</a>
              </p>
              <div className="df ai-c jc-end">
                {!!preduzece?.telefon_whatsapp && (
                  <>
                    <p>WhatsApp</p>
                    <CheckIcon className="icon icon__dark sm" />
                  </>
                )}
              </div>
              <div className="df ai-c jc-end">
                {!!preduzece?.telefon_viber && (
                  <>
                    <p>Viber</p>
                    <CheckIcon className="icon icon__dark sm" />
                  </>
                )}
              </div>
              <div className="df ai-c jc-end">
                {!!preduzece?.telefon_facetime && (
                  <>
                    <p>Facetime</p>
                    <CheckIcon className="icon icon__dark sm" />{' '}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="side-info__info as-end">
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.fax ? 'Fax' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a href={`tel:${preduzece?.fax}`}>{preduzece?.fax}</a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.email ? 'Email' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a href={`mailto:${preduzece?.email}`}>{preduzece?.email}</a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.website ? 'Websajt' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a
                href={preduzece?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preduzece?.website}
              </a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.twitter_username ? 'Twitter' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a
                href={`http://www.twiter.com/${preduzece?.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preduzece?.twitter_username}
              </a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.instagram_username ? 'Instagram' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a
                href={`http://www.instagram.com/${preduzece?.instagram_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preduzece?.instagram_username}
              </a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.facebook_username ? 'Facebook' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a
                href={`http://www.facebook.com/${preduzece?.facebook_username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preduzece?.facebook_username}
              </a>
            </p>
          </div>
        </div>
        <div className="side-info__info--inner-wrapper">
          <div className="col-l">
            <p>{preduzece?.skype_username ? 'Skype' : null}</p>
          </div>
          <div className="col-r">
            <p>
              <a
                href={`skype:${preduzece?.skype_username}?call`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {preduzece?.skype_username}
              </a>
            </p>
          </div>
        </div>
      </div>
      <hr />
      {preduzece?.ovlascena_lica?.length > 0 && (
        <div className="side-info__wrapper">
          <h3 className="heading-tertiary">Ovlašćeno lice</h3>
          <div className="side-info__info">
            <div className="side-info__info--inner-wrapper">
              <div className="col-l">
                <p>Ime i prezime</p>
              </div>
              <div className="col-r">
                <p>
                  {preduzece?.ovlascena_lica[0].ime +
                    ' ' +
                    preduzece?.ovlascena_lica[0].prezime}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="side-info__info">
        {preduzece?.ovlascena_lica?.length > 0 && (
          <div className="col-r mb-20">
            {!!preduzece?.ovlascena_lica[0].telefon && (
              <p>{preduzece?.ovlascena_lica[0].telefon}</p>
            )}
            <div className="df ai-c jc-end">
              {!!preduzece?.ovlascena_lica[0].telefon_whatsapp && (
                <>
                  <p>WhatsApp</p>
                  <CheckIcon className="icon icon__dark sm" />{' '}
                </>
              )}
            </div>
            <div className="df ai-c jc-end">
              {!!preduzece?.ovlascena_lica[0].telefon_viber && (
                <>
                  <p>Viber</p>
                  <CheckIcon className="icon icon__dark sm" />
                </>
              )}
            </div>
            <div className="df ai-c jc-end">
              {!!preduzece?.ovlascena_lica[0].telefon_facetime && (
                <>
                  <p>Facetime</p>
                  <CheckIcon className="icon icon__dark sm" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="side-info__wrapper">
        {(preduzece?.kontakt_ime || preduzece?.kontakt_prezime) && (
          <>
            <h3 className="heading-tertiary">Osoba za kontakt</h3>
            <div className="side-info__info as-end">
              <div className="side-info__info--inner-wrapper">
                <div className="col-l">
                  <p>
                    {preduzece?.kontakt_ime || preduzece?.kontakt_prezime
                      ? 'Ime i prezime'
                      : null}
                  </p>
                </div>
                <div className="col-r">
                  <p>
                    {preduzece?.kontakt_ime
                      ? preduzece?.kontakt_ime + ' '
                      : null}
                    {preduzece?.kontakt_prezime
                      ? preduzece?.kontakt_prezime
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="side-info__info as-end">
          <div className="side-info__info--inner-wrapper">
            {(!!preduzece?.kontakt_whatsapp ||
              !!preduzece?.kontakt_viber ||
              !!preduzece?.kontakt_facetime) && (
              <div className="col-l">
                <div>Telefon</div>
              </div>
            )}
            <div className="col-r mb-20">
              <p>
                <a href="tel:+67123434">{preduzece.kontakt_telefon}</a>
              </p>
              <div className="df ai-c jc-end">
                {!!preduzece?.kontakt_whatsapp && (
                  <>
                    <p>WhatsApp</p>
                    <CheckIcon className="icon icon__dark sm" />{' '}
                  </>
                )}
              </div>
              <div className="df ai-c jc-end">
                {!!preduzece?.kontakt_viber && (
                  <>
                    <p>Viber</p>
                    <CheckIcon className="icon icon__dark sm" />{' '}
                  </>
                )}
              </div>
              <div className="df ai-c jc-end">
                {!!preduzece?.kontakt_facetime && (
                  <>
                    <p>Facetime</p>
                    <CheckIcon className="icon icon__dark sm" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreduzeceDetails;
