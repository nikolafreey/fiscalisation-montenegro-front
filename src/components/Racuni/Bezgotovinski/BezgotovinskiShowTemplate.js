import React from 'react';
import QRCode from 'react-qr-code';
import noLogo from '../../../assets/img/no-logo.png';
import List from '../../shared/lists/List';
import BezgotovinskiTableRow from './BezgotovinskiTableRow';
import Moment from 'react-moment';
import 'moment/locale/me';
import BezgotovinskiPoreziPreview from './BezgotovinskiPoreziPreview';
import { BASE_URL } from '../../../config';

class BezgotovinskiShowTemplate extends React.Component {
  render() {
    const ikof = this.props.ikof;
    const jikr = this.props.jikr;
    const qr_url = this.props.qr_url;
    const broj_racuna = this.props.broj_racuna;
    const redni_broj = this.props.redni_broj;
    const status = this.props.status;
    const preduzece = this.props.preduzece;
    const opis = this.props.opis;
    const vrsta_racuna = this.props.vrsta_racuna;
    const nacin_placanja = this.props.nacin_placanja;
    const datum_izdavanja = this.props.datum_izdavanja;
    const datum_za_placanje = this.props.datum_za_placanje;
    const partner = this.props.partner;
    const created_at = this.props.created_at;
    const stavke = this.props.stavke;
    const ukupna_cijena_bez_pdv = this.props.ukupnoBezPdvIpopusta;
    const ukupna_cijena_sa_pdv = this.props.ukupnoSaPdvIpopusta;
    const ukupan_iznos_pdv = this.props.ukupan_iznos_pdv;
    const ukupniPopust = this.props.popust_ukupno;
    const ukupnoBezPdv = this.props.ukupnoBezPdv;
    const ukupna_cijena_bez_pdv_popust = this.props
      .ukupna_cijena_bez_pdv_popust;
    const ukupna_cijena_sa_pdv_popust = this.props.ukupna_cijena_sa_pdv_popust;
    const sve_stavke = this.props.stavke;
    const user = this.props.user;

    let a = '';
    const ziroRacuni = () => {
      return preduzece?.ziro_racuni?.map((racun) => {
        a = racun.broj_racuna;
        if (a) {
          const prvaTri = a.substring(0, 3);

          if (prvaTri.includes('550')) {
            return <p>{'Podgorička: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('535')) {
            return <p>{'Prva Banka CG: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('555')) {
            return <p>{'Addiko: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('510')) {
            return <p>{'CKB: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('530')) {
            return <p>{'NLB: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('540')) {
            return <p>{'ERSTE: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('520')) {
            return <p>{'Hipotekarna: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('525')) {
            return <p>{'Komercijalna: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('560')) {
            return <p>{'Universal Capital: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('570')) {
            return <p>{'Zapad Banka: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('575')) {
            return <p>{'Ziraat Bank: ' + a}</p>;
            // return <p>{a}</p>;
          } else if (prvaTri.includes('565')) {
            return <p>{'Lovćen Banka: ' + a}</p>;
            // return <p>{a}</p>;
          }
          return <p>{a}</p>;
        }
      });
    };

    let b = '';
    const ziroRacuniPartner = () => {
      let partnerTip = partner?.fizicko_lice_id
        ? partner?.fizicko_lice
        : partner?.preduzece_partner;
      return partnerTip?.ziro_racuni?.map((racun) => {
        b = racun.broj_racuna;
        if (b) {
          const prvaTri = b.substring(0, 3);

          if (prvaTri.includes('550')) {
            return <p>{'Podgorička: ' + b}</p>;
          } else if (prvaTri.includes('535')) {
            return <p>{'Prva: ' + b}</p>;
          } else if (prvaTri.includes('555')) {
            return <p>{'Addiko: ' + b}</p>;
          } else if (prvaTri.includes('510')) {
            return <p>{'CKB: ' + b}</p>;
          } else if (prvaTri.includes('530')) {
            return <p>{'Montenegro AD: ' + b}</p>;
          } else if (prvaTri.includes('540')) {
            return <p>{'ERSTE: ' + b}</p>;
          } else if (prvaTri.includes('520')) {
            return <p>{'Hipotekarna: ' + b}</p>;
          }
          return <p>{b}</p>;
        }
      });
    };

    let bojaKlasa = '';
    let itemStatus = '';
    switch (status) {
      case 'nijeplacen':
        itemStatus = 'Nije Plaćen';
        bojaKlasa = 'tag tag__warning';
        break;
      case 'placen':
        itemStatus = 'Plaćen';
        bojaKlasa = 'tag tag__success';
        break;
      case 'nenaplativ':
        itemStatus = 'Nenaplativ';
        bojaKlasa = 'tag tag__danger';
        break;
      case 'privremeni':
        itemStatus = 'Privremeni';
        bojaKlasa = 'tag tag__neutral';
        break;
      default:
    }

    return (
      <>
        <div className="invoice-template">
          <div className="invoice-page">
            <div className="invoice-page-top">
              <div className="invoice-template__header">
                <div className="status" style={{ display: 'none' }}>
                  {<span className={bojaKlasa}>{itemStatus}</span>}
                </div>
                {/* <div className="invoice__header--logo">
                  {preduzece && preduzece.logotip ? (
                    <img
                      src={
                        preduzece && preduzece.logotip
                          ? preduzece.logotip
                          : noLogo
                      }
                      alt="logo"
                      style={{ width: 200, height: 100 }}
                    />
                  ) : (
                    ''
                  )}
                </div> */}
                <div className="wrapper-100 fs-8 header-info">
                  {preduzece && preduzece.logotip ? (
                    <div className="article-33">
                      <p className="">
                        <img
                          src={
                            preduzece && preduzece.logotip
                              ? BASE_URL.slice(0, -3) +
                                'logotipi/' +
                                preduzece.logotip
                              : noLogo
                          }
                          alt="logo"
                          style={{ maxWidth: 160, maxHeight: 160 }}
                        />
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="article-33">
                    <p className="">
                      {preduzece && preduzece.kratki_naziv
                        ? preduzece.kratki_naziv +
                          ' ' +
                          preduzece.oblik_preduzeca
                        : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.djelatnost
                        ? preduzece.djelatnost
                        : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.opis ? preduzece.opis : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.adresa ? preduzece.adresa : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.grad ? preduzece.grad : ''},
                      &nbsp;
                      {preduzece && preduzece.drzava ? preduzece.drzava : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.telefon ? preduzece.telefon : ''},
                      &nbsp;
                      {preduzece && preduzece.fax ? preduzece.fax : ''}
                    </p>
                    <p className="">
                      {preduzece && preduzece.email ? preduzece.email : ''}{' '}
                      &nbsp;
                    </p>
                    <p className="">
                      {preduzece && preduzece.website ? preduzece.website : ''}{' '}
                      &nbsp;
                    </p>
                  </div>
                  <div className="article-33">
                    <div className="invoice-template__box-info">
                      <p className="">
                        {preduzece && preduzece.pib ? 'PIB: ' + preduzece.pib : ''}
                      </p>
                      <p className="">
                        {preduzece && preduzece.pdv ? 'PDV: ' + preduzece.pdv : ''}
                      </p>
                      <p className="">
                        {preduzece && preduzece.iban ? 'IBAN: ' + preduzece.iban : ''}
                      </p>
                      <p className="">
                        {preduzece && preduzece.bic_swift ? 'BIC/SWIFT: ' + preduzece.bic_swift : ''}
                      </p>
                      {/* {preduzece && preduzece.logotip ? ( */}
                      <p className="">{ziroRacuni()}</p>
                      {/* ) : ''} */}
                    </div>

                    {/* <div className="invoice-template__box-values">
                      <p className="txt-right">
                        {preduzece && preduzece.pib ? preduzece.pib : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.pdv ? preduzece.pdv : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.iban ? preduzece.iban : ''}
                      </p>
                      <p className="txt-right">
                        {preduzece && preduzece.bic_swift
                          ? preduzece.bic_swift
                          : ''}
                      </p>
                    </div> */}

                  </div>
                  {/* <div className="article-33">
                    <div className="text-right">{ziroRacuni()}</div>
                  </div> */}
                </div>

                <div className="wrapper-100 mt-25">
                  <div className="wrapper-60">
                    <h2 className="heading-secondary">
                      Račun: {redni_broj}/
                      <Moment locale="me" format="YYYY">
                        {datum_izdavanja}
                      </Moment>
                    </h2>
                    <p className="mb-20">
                      {preduzece && preduzece.grad ? preduzece.grad : ''},
                      &nbsp;
                      {datum_izdavanja && (
                        <Moment locale="me" format="DD. MMM YYYY.">
                          {datum_izdavanja}
                        </Moment>
                      )}
                      {' / Rok za plaćanje: '}
                      {datum_za_placanje && (
                        <Moment locale="me" format="DD. MMM YYYY.">
                          {datum_za_placanje}
                        </Moment>
                      )}{' '}
                    </p>

                    <div className="wrapper-100 fs-8">
                      {/* ------------------ QR CODE ------------------ */}
                      {jikr && ikof ? (
                        <div className="wrapper-30">
                          <QRCode value={qr_url} size="96" />{' '}
                        </div>
                      ) : null}

                      {/*------------------ QR CODE ------------------*/}

                      <div className="wrapper-70">
                        <div className="invoice-template__footer--info">
                          <p className="">{jikr ? 'JIKR' : ''}</p>
                          <p className="">{ikof ? 'IKOF' : ''}</p>
                          <p className="">{broj_racuna ? 'Broj' : ''}</p>
                          <p className="">{created_at ? 'Datum' : ''}</p>
                          <p className="">{nacin_placanja ? 'Vrsta' : ''}</p>
                        </div>
                        <div className="invoice-template__footer--values">
                          <p>{jikr ? jikr : ''}</p>
                          <p>{ikof ? ikof : ''}</p>
                          <p>{broj_racuna ? broj_racuna : ''}</p>
                          <p>
                            {created_at ? (
                              <Moment locale="me" format="Do MMMM YYYY, HH:mm:ss">
                                {created_at}
                              </Moment>
                            ) : (
                              ''
                            )}
                          </p>
                          <p>
                            {nacin_placanja
                              ? vrsta_racuna + ' / ' + nacin_placanja
                              : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wrapper-40 box-border">
                    <h3 className="heading-secondary">
                      {partner && partner.preduzece_partner
                        ? partner?.preduzece_partner?.kratki_naziv
                        : partner?.fizicko_lice?.ime +
                          ' ' +
                          partner?.fizicko_lice?.prezime}
                    </h3>
                        <p className="">
                          {partner &&
                          partner?.preduzece_partner?.adresa &&
                          partner?.preduzece_partner?.grad
                            ? partner?.preduzece_partner?.adresa +
                              ', ' +
                              partner?.preduzece_partner?.grad
                            : ''}
                        </p>
                        <p className="">
                          {partner && partner?.preduzece_partner?.drzava
                            ? partner?.preduzece_partner?.drzava
                            : ''}
                        </p>
                    <div className="df jc-sb">
                      <div className="df fd-column">
                        <p className="">
                          {partner && partner.preduzece_partner ? '' : 'JMBG: '}
                        </p>
                        <p className="">
                          {partner && partner?.preduzece_partner?.pib
                            ? 'PIB: '
                            : ''}
                        </p>
                        <p className="">
                          {partner && partner?.preduzece_partner?.pdv
                            ? 'PDV: '
                            : ''}
                        </p>
                      </div>
                      <div className="df fd-column">
                        <p className="txt-right">
                          {partner && partner.preduzece_partner
                            ? ''
                            : partner?.fizicko_lice?.jmbg}
                        </p>
                        <p className="txt-right">
                          {partner && partner?.preduzece_partner?.pib
                            ? partner?.preduzece_partner?.pib
                            : ''}
                        </p>
                        <p className="txt-right">
                          {partner && partner?.preduzece_partner?.pdv
                            ? partner?.preduzece_partner?.pdv
                            : ''}
                        </p>
                      </div>
                      {/* TODO: ubaciti prikaz ziro racuna partnera ili ne prikazivati ako  ih nema */}
                      {/* <div className="df fd-column">
                          <p className="txt-right">{ziroRacuniPartner()}</p>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-page-bottom">
              <table>
                <thead>
                  <tr>
                    <th className="prva-kolona">
                      <p className="heading-quaternary">Opis</p>
                    </th>
                    <th>
                      <p className="heading-quaternary nowrap">Cijena</p>
                    </th>
                    <th>
                      {/* {ukupniPopust > 0 && ( */}
                      <p className="heading-quaternary">Popust sa PDV-om</p>
                      {/* )} */}
                    </th>
                    <th>
                      <p className="heading-quaternary">Količina</p>
                    </th>
                    {/* <th>
                      <p className="heading-quaternary">PDV</p>
                    </th> */}
                    <th>
                      <p className="heading-quaternary">Ukupno</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <List
                    data={stavke ? stavke : []}
                    renderItem={BezgotovinskiTableRow}
                  />
                </tbody>
              </table>
              <div className="invoice-template__footer">
                <div className="wrapper-100">
                  <div className="wrapper-60">
                    <table>
                      <BezgotovinskiPoreziPreview stavke={stavke} />
                    </table>
                  </div>
                  <div className="wrapper-40">
                    <div className="invoice-template__box-info">
                      <p className="fw-500">Bez PDV-a:</p>

                      {/* <p className="fw-500">Ukupno bez popusta:</p> */}
                      {Number(ukupniPopust) > 0 && (
                        <p className="fw-500">
                          {Number(ukupniPopust) > 0 > 0 && 'Popust sa PDV-om:'}
                        </p>
                      )}
                      <p className="fw-500">PDV:</p>
                      <p className="fw-500">Total:</p>
                      {/* <p className="fw-500">PDV 21%:</p>
                    <p className="fw-500">Ukupno:</p> */}
                    </div>
                    <div className="invoice-template__box-values">
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_bez_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up ">&euro;</span>
                      </p>

                      {/* <p className="fw-500 txt-right">
                      {Number(ukupnoBezPdv).toFixed(2)}{' '}
                      <span className="txt-up ">&euro;</span>
                    </p> */}
                      {ukupniPopust > 0 && (
                        <p className="txt-right cd fw-500">
                          {'-'}
                          {Number(ukupniPopust).toFixed(2)}{' '}
                          <span className="txt-up ">&euro;</span>
                        </p>
                      )}

                      <p className="txt-right cd fw-500">
                        {Number(ukupan_iznos_pdv).toFixed(2)}{' '}
                        <span className="txt-up ">&euro;</span>
                      </p>
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_sa_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up ">&euro;</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="wrapper-100 napomena">
                  <div className="wrapper-50">
                    {opis && (
                      <>
                        <p className="fw-500">Napomena:</p>
                        <p className="mb-25 white-space-pre">{opis}</p>
                      </>
                    )}
                  </div>
                </div>

                <div>&nbsp;</div>
                <div className="wrapper-100 mt-m">
                  <div className="wrapper-40">
                    <p>
                      {/* TODO: prikazati korisnika koji je kreirao račun a ne trenutnog */}
                      {user?.ime && user?.prezime && (
                        <p>
                          Račun izdao:
                          <br />
                          {user?.ime + ' ' + user?.prezime} /{' '}
                          {user?.kod_operatera}
                        </p>
                      )}
                    </p>
                    <hr className="mt-50 bd__bottom" />
                  </div>
                  <div className="wrapper-20">&nbsp;</div>
                  <div className="wrapper-40">
                    <p>
                      Račun Preuzeo:
                      <br />
                      &nbsp;
                    </p>
                    <hr className="mt-50 bd__bottom" />
                  </div>
                </div>

                <p className="footer-fixed">
                  PostFiskal by Restart IT d.o.o. /{' '}
                  {user?.preduzeca[0]?.software_kod
                    ? user?.preduzeca[0]?.software_kod
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default BezgotovinskiShowTemplate;
