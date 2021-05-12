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

    console.log('props', sve_stavke);
    return (
      <>
        <div className="invoice-template">
          <div className="invoice-page">
            <div className="invoice-page-top">
              <div className="invoice-template__header">
                <div className="status">
                  {status && <div className="tag tag__warning">{status}</div>}
                </div>
                <div className="invoice-template__logo">
                  <img
                    src={
                      preduzece && preduzece.logotip
                        ? preduzece.logotip
                        : noLogo
                    }
                    alt="logo"
                    // style={{ widt: 200, height: 100 }}
                  />
                </div>
                <div className="wrapper-100">
                  <div className="article-33">
                    <p className="txt-light">
                      {preduzece && preduzece.puni_naziv
                        ? preduzece.puni_naziv
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
                    <div className="invoice-template__box-info">
                      <p className="txt-light">CKB</p>
                      <p className="txt-light">NLB</p>
                      <p className="txt-light">Prva Banka CG</p>
                    </div>
                    <div className="invoice-template__box-values">
                      <p className="txt-right">540-1214134-1312</p>
                      <p className="txt-right">520-121334-14</p>
                      <p className="txt-right">535-11234-32</p>
                    </div>
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
                  </div>
                  <div className="wrapper-50 box-border">
                    <h2 className="heading-secondary">
                      {partner && partner.kontakt_ime
                        ? partner.kontakt_ime
                        : ''}{' '}
                      &nbsp;
                      {partner && partner.kontakt_prezime
                        ? partner.kontakt_prezime
                        : ''}
                    </h2>

                    <div className="wrapper-50">
                      <p className="txt-light">
                        {partner && partner.pib ? 'PIB' : ''}
                      </p>
                      <p className="txt-light">
                        {partner && partner.pib ? 'PDV' : ''}
                      </p>
                      <p className="txt-light">
                        {partner && partner.pib ? 'IBAN' : ''}
                      </p>
                      <p className="txt-light">
                        {partner && partner.pib ? 'BIC/SWIFT' : ''}
                      </p>
                    </div>
                    <div className="wrapper-50">
                      <p className="txt-right">
                        {partner && partner.pib ? partner.pib : ''}
                      </p>
                      <p className="txt-right">
                        {partner && partner.pib ? partner.pib : ''}
                      </p>
                      <p className="txt-right">
                        {partner && partner.pib ? partner.pib : ''}
                      </p>
                      <p className="txt-right">
                        {partner && partner.pib ? partner.pib : ''}
                      </p>
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
                      <p className="heading-quaternary">Opis </p>
                    </th>
                    <th>
                      <p className="heading-quaternary nowrap">
                        Jedinična cijena
                      </p>
                    </th>
                    <th>
                      <p className="heading-quaternary">Kolicina</p>
                    </th>
                    <th>
                      <p className="heading-quaternary">Popust</p>
                    </th>
                    {/* <th>
                      <p className="heading-quaternary">PDV</p>
                    </th> */}
                    <th>
                      <p className="heading-quaternary">Iznos</p>
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
                      <p className="fw-500">Popust:</p>
                      <p className="fw-500">PDV:</p>
                      <p className="fw-500">Total:</p>
                      {/* <p className="fw-500">PDV 21%:</p>
                    <p className="fw-500">Ukupno:</p> */}
                    </div>
                    <div className="invoice-template__box-values">
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_bez_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up txt-light">Eur</span>
                      </p>

                      {/* <p className="fw-500 txt-right">
                      {Number(ukupnoBezPdv).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p> */}
                      {ukupan_iznos_pdv > 0 && (
                        <p className="txt-right cd fw-500">
                          {'-'}
                          {Number(ukupniPopust).toFixed(2)}{' '}
                          <span className="txt-up txt-light">Eur</span>
                        </p>
                      )}

                      <p className="txt-right cd fw-500">
                        {Number(ukupan_iznos_pdv).toFixed(2)}{' '}
                        <span className="txt-up txt-light">Eur</span>
                      </p>
                      <p className="txt-right cd fw-500">
                        {Number(ukupna_cijena_sa_pdv_popust).toFixed(2)}{' '}
                        <span className="txt-up txt-light">Eur</span>
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
                  {jikr && ikof ? (
                    <div className="invoice-template__qr">
                      {/* ------------------ QR CODE ------------------ */}

                      <QRCode value="Set url here" size="100" />
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default BezgotovinskiShowTemplate;
