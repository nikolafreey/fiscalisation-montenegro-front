import React from 'react';
import QRCode from 'react-qr-code';
import noLogo from '../../../assets/img/no-logo.png';
import List from '../../shared/lists/List';
import BezgotovinskiTableRow from './BezgotovinskiTableRow';
import Moment from 'react-moment';
import 'moment/locale/me';
import BezgotovinskiPoreziPreview from './BezgotovinskiPoreziPreview';

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
            // return <p>{'Podgorička: ' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('535')) {
            // return <p>{'Prva: ' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('555')) {
            // return <p>{'Addiko: ' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('510')) {
            // return <p>{'CKB: ' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('530')) {
            // return <p>{'Montenegro AD' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('540')) {
            // return <p>{'ERSTE: ' + a}</p>;
            return <p>{a}</p>;
          } else if (prvaTri.includes('520')) {
            // return <p>{'Hipotekarna: ' + a}</p>;
            return <p>{a}</p>;
          }
          return <p className="txt-light">{a}</p>;
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
                <div className="invoice__header--logo">
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
                  ) : ''}
                </div>
                <div className="wrapper-100">
                  <div className="article-33">
                    <p className="txt-light">
                      {preduzece && preduzece.puni_naziv
                        ? preduzece.kratki_naziv
                        : ''}
                    </p>
                    <p className="txt-light">
                      {preduzece && preduzece.djelatnost
                        ? preduzece.djelatnost
                        : ''}
                    </p>
                    <p className="txt-light">
                      {preduzece && preduzece.opis ? preduzece.opis : ''}
                    </p>
                    <p className="txt-light">
                      {preduzece && preduzece.adresa ? preduzece.adresa : ''}
                    </p>
                    <p className="txt-light">
                      {preduzece && preduzece.grad ? preduzece.grad : ''},
                      &nbsp;
                      {preduzece && preduzece.drzava ? preduzece.drzava : ''}
                    </p>
                  </div>
                  <div className="article-33">
                    <div className="invoice-template__box-info">
                      <p className="txt-light">
                        {preduzece && preduzece.pib ? 'PIB' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.pdv ? 'PDV' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.iban ? 'IBAN' : ''}
                      </p>
                      <p className="txt-light">
                        {preduzece && preduzece.bic_swift ? 'BIC/SWIFT' : ''}
                      </p>
                    </div>

                    <div className="invoice-template__box-values">
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
                    </div>
                  </div>
                  <div className="article-33">
                    <div className="text-right">{ziroRacuni()}</div>
                  </div>
                </div>

                <div className="wrapper-100 mt-25">
                  <div className="wrapper-50">
                    <h2 className="heading-secondary">Račun: {redni_broj}</h2>
                    {preduzece && preduzece.grad ? preduzece.grad : ''},
                    {created_at && (
                      <p className="nowrap w-100">
                        <Moment
                          locale="me"
                          format="DD. MMM YYYY."
                          className="nowrap"
                        >
                          {created_at}
                        </Moment>
                      </p>
                    )}{' '}
                    {/* TODO: prikazati korisnika koji je kreira račun a ne trenutnog */}
                    {/* {user?.ime && user?.prezime && (
                      <p> {user?.ime + ' ' + user?.prezime} </p>
                    )} */}
                  </div>
                  <div className="wrapper-50 box-border">
                    <h2 className="heading-secondary">
                      {partner && partner.preduzece_partner
                        ? partner?.preduzece_partner?.kratki_naziv
                        : partner?.fizicko_lice?.ime +
                          ' ' +
                          partner?.fizicko_lice?.prezime}
                    </h2>
                    <div className="df jc-sb">
                      <div className="df fd-column">
                        <p className="txt-light">
                          {partner && partner.preduzece_partner ? '' : 'JMBG: '}
                        </p>
                        <p className="txt-light">
                          {partner && partner?.preduzece_partner?.pib
                            ? 'PIB: '
                            : ''}
                        </p>
                        <p className="txt-light">
                          {partner && partner?.preduzece_partner?.pdv
                            ? 'PDV: '
                            : ''}
                        </p>
                        <p className="txt-light">
                          {partner &&
                          partner?.preduzece_partner?.adresa &&
                          partner?.preduzece_partner?.grad
                            ? 'Adresa: '
                            : ''}
                        </p>
                        <p className="txt-light">
                          {partner && partner?.preduzece_partner?.drzava
                            ? 'Država: '
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
                        <p className="txt-right">
                          {partner &&
                          partner?.preduzece_partner?.adresa &&
                          partner?.preduzece_partner?.grad
                            ? partner?.preduzece_partner?.adresa +
                              ', ' +
                              partner?.preduzece_partner?.grad
                            : ''}
                        </p>
                        <p className="txt-right">
                          {partner && partner?.preduzece_partner?.drzava
                            ? partner?.preduzece_partner?.drzava
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
                    <th>
                      <p className="heading-quaternary">Opis</p>
                    </th>
                    <th>
                      <p className="heading-quaternary nowrap">
                        Jed. cijena bez PDV
                      </p>
                    </th>
                    <th>
                      <p className="heading-quaternary">Količina</p>
                    </th>
                    <th>
                      {ukupniPopust > 0 && (
                        <p className="heading-quaternary">Popust</p>
                      )}
                    </th>
                    {/* <th>
                      <p className="heading-quaternary">PDV</p>
                    </th> */}
                    <th>
                      <p className="heading-quaternary">Ukupno bez PDV-a</p>
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
                <div className="wrapper-100 mtb-20">
                  <div className="table-sm-wrapper">
                    <table>
                      <BezgotovinskiPoreziPreview stavke={stavke} />
                    </table>
                  </div>

                  <div className="invoice-template__footer--box">
                    <div className="invoice-template__box-info">
                      <p className="fw-500">Bez PDV-a:</p>

                      {/* <p className="fw-500">Ukupno bez popusta:</p> */}
                      {ukupniPopust > 0 && <p className="fw-500">Popust:</p>}
                      <p className="fw-500">PDV:</p>
                      <p className="fw-500">Total:</p>
                      {/* <p className="fw-500">PDV 21%:</p>
                    <p className="fw-500">Ukupno:</p> */}
                    </div>
                    <div className="invoice-template__box-values">
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_bez_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up txt-light">&euro;</span>
                      </p>

                      {/* <p className="fw-500 txt-right">
                      {Number(ukupnoBezPdv).toFixed(2)}{' '}
                      <span className="txt-up txt-light">&euro;</span>
                    </p> */}
                      {ukupniPopust > 0 && (
                        <p className="txt-right cd fw-500">
                          {'-'}
                          {Number(ukupniPopust).toFixed(2)}{' '}
                          <span className="txt-up txt-light">&euro;</span>
                        </p>
                      )}

                      <p className="txt-right cd fw-500">
                        {Number(ukupan_iznos_pdv).toFixed(2)}{' '}
                        <span className="txt-up txt-light">&euro;</span>
                      </p>
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_sa_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up txt-light">&euro;</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="wrapper-100">
                  <div className="wrapper-50">
                    {opis && (
                      <>
                        <p className="fw-500">Napomena:</p>
                        <p className="txt-light mb-25">{opis}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="wrapper-100">
                  {/* ------------------ QR CODE ------------------ */}
                  {jikr && ikof ? (
                    <div className="col-md-3">
                      <QRCode value={qr_url} size="128" />{' '}
                    </div>
                  ) : null}

                  {/*------------------ QR CODE ------------------*/}

                  <div className="wrapper-50">
                    <div className="invoice-template__footer--info">
                      <p className="txt-light">{jikr ? 'JIKR' : ''}</p>
                      <p className="txt-light">{ikof ? 'IKOF' : ''}</p>
                    </div>
                    <div className="invoice-template__footer--values">
                      <p className="txt-right">{jikr ? jikr : ''}</p>
                      <p className="txt-right">{ikof ? ikof : ''}</p>
                    </div>
                  </div>
                </div>
                <p className="txt-light">
                  PostFiskal by Restart IT d.o.o. / {' '}
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
