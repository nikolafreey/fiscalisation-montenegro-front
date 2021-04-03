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
    const ukupna_cijena_bez_pdv_popust = this.props.ukupna_cijena_bez_pdv_popust;
    const ukupna_cijena_sa_pdv_popust = this.props.ukupna_cijena_sa_pdv_popust;
    const sve_stavke=this.props.stavke;

  console.log('props',sve_stavke);
    return (
      <>
        <div className="invoice" style={{ width: '100%' }}>
          <div className="invoice__header">
            <div className="status">
              {status && <div className="tag tag__warning">{status}</div>}
            </div>
            <div className="invoice__header--logo">
              <img
                src={
                  preduzece && preduzece.logotip ? preduzece.logotip : noLogo
                }
                alt="logo"
                style={{ widt: 200, height: 100 }}
              />
            </div>
            <div className="row">
              <div style={{ width: '33.3333333333%' }} className="col-md-4">
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
                  {preduzece && preduzece.grad ? preduzece.grad : ''}, &nbsp;
                  {preduzece && preduzece.drzava ? preduzece.drzava : ''}
                </p>
              </div>
              <div style={{ width: '33.3333333333%' }} className="col-md-4">
                <div className="df jc-sb">
                  <div className="df fd-column">
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
                  <div className="df fd-column">
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
              </div>
              <div style={{ width: '33.3333333333%' }} className="col-md-4">
                <div className="df jc-sb" style={{ display: 'none' }}>
                  <div className="df fd-column">
                    <p className="txt-light">CKB</p>
                    <p className="txt-light">NLB</p>
                    <p className="txt-light">Prva Banka CG</p>
                  </div>
                  <div className="df fd-column">
                    <p className="txt-right">540-1214134-1312</p>
                    <p className="txt-right">520-121334-14</p>
                    <p className="txt-right">535-11234-32</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mtb-50">
              <div className="row">
                <div style={{ width: '50%' }} className="col-md-6">
                  <h2 className="heading-secondary">Račun {broj_racuna}</h2>
                  <p>
                    {preduzece && preduzece.grad ? preduzece.grad : ''}, &nbsp;
                    {created_at && (
                      <Moment locale="me" format="DD. MMM YYYY.">
                        {created_at}
                      </Moment>
                    )}{' '}
                  </p>
                </div>
                <div style={{ width: '50%' }} className="col-md-6">
                  <div className="invoice__header--box">
                    <h2 className="heading-secondary">
                      {partner && partner.kontakt_ime
                        ? partner.kontakt_ime
                        : ''}{' '}
                      &nbsp;
                      {partner && partner.kontakt_prezime
                        ? partner.kontakt_prezime
                        : ''}
                    </h2>
                    <div className="df jc-sb">
                      <div className="df fd-column">
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
                      <div className="df fd-column">
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
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <span className="heading-quaternary">Opis  </span>
                  </th>
                  <th>
                    <span className="heading-quaternary">Jedinična cijena  </span>
                  </th>
                  <th>
                    <span className="heading-quaternary">Kolicina</span>
                  </th>
                  <th>
                    <span className="heading-quaternary">Iznos</span>
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
          </div>
          <div className="table-wrapper" style={{ width: '100%' }}>
           
            <BezgotovinskiPoreziPreview stavke={stavke} />
           
          </div>

          <div className="invoice__footer">
            <div className="row">
              {/* <div className="offset-md-8"></div> */}
              <div style={{ width: '33.3333333333%' }}></div>
              <div style={{ width: '33.3333333333%' }}></div>
              <div style={{ width: '33.3333333333%' }} className="col-md-4">
                <div className="df jc-sb">
                  <div className="df fd-column">
                    <p className="fw-500">Ukupno bez PDV-a i popusta:</p>
                   
                    {/* <p className="fw-500">Ukupno bez popusta:</p> */}
                    <p className="fw-500">Ukupan popust:</p>
                    <p className="fw-500">Ukupan PDV:</p>
                    <p className="fw-500">Ukupno sa popustom:</p>
                    {/* <p className="fw-500">PDV 21%:</p>
                    <p className="fw-500">Ukupno:</p> */}
                  </div>
                  <div className="df fd-column">
                    <p className="fw-500 txt-right">
                      {Number(ukupna_cijena_bez_pdv_popust).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p>
                    
                    {/* <p className="fw-500 txt-right">
                      {Number(ukupnoBezPdv).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p> */}
                    {ukupan_iznos_pdv>0
                          &&  <p className="fw-500 txt-right">
                      {'-'}{Number(ukupniPopust).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p>}
                   
                    <p className="fw-500 txt-right">
                      {Number(ukupan_iznos_pdv).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p>
                    <p className="fw-500 txt-right">
                      {Number(ukupna_cijena_sa_pdv_popust).toFixed(2)}{' '}
                      <span className="txt-up txt-light">Eur</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div style={{ width: '50%' }} className="col-md-6">
                {opis && (
                  <>
                    <p className="fw-500">Napomena:</p>
                    <p className="txt-light mb-25">{opis}</p>
                  </>
                )}
                <div className="row">
                  <div style={{ width: '33.3333333333%' }} className="col-md-4">
                    {/* ------------------ QR CODE ------------------ */}
                    {jikr && ikof ? (
                      <QRCode value="Set url here" size="64" />
                    ) : null}
                    {/*------------------ QR CODE ------------------*/}
                  </div>
                  <div style={{ width: '66.6666666667%' }} className="col-md-8">
                    <div className="df jc-sb">
                      <div className="df fd-column">
                        <p className="txt-light">{jikr ? 'JIKR' : ''}</p>
                        <p className="txt-light">{ikof ? 'IKOF' : ''}</p>
                      </div>
                      <div className="df fd-column">
                        <p className="txt-right">{jikr ? jikr : ''}</p>
                        <p className="txt-right">{ikof ? ikof : ''}</p>
                      </div>
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
