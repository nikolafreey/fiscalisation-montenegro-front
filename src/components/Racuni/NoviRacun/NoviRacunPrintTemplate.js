import React from 'react';

class NoviRacunPrintTemplate extends React.Component {
  render() {
    const {
      preduzece,
      kod_operatera,
      stavke,
      ukupna_cijena_sa_pdv,
      ukupan_iznos_pdv,
      ukupna_cijena_bez_pdv,
      jikr,
      ikof,
      broj_racuna,
    } = this.props.racun;
    return (
      <>
        <div className="fiscal-bill-wrapper">
          <div className="fiscal-bill">
            <div className="fiscal-bill__header">
              <div className="fiscal-bill__header--logo">
                {/* <img src="https://picsum.photos/seed/picsum/200/100" alt="logo" /> */}
              </div>
              <div className="fiscal-bill__header--info">
                <p>
                  {' '}
                  {preduzece && preduzece.puni_naziv
                    ? preduzece.puni_naziv
                    : ''}
                </p>
                <p> {preduzece && preduzece.adresa ? preduzece.adresa : ''}</p>
                <p>
                  {' '}
                  {preduzece && preduzece.grad ? preduzece.grad : ''}, &nbsp;
                  {preduzece && preduzece.drzava ? preduzece.drzava : ''}
                </p>
                <p>PIB: {preduzece && preduzece.pib ? preduzece.pib : ''}</p>
              </div>
              <span>Operater: {kod_operatera ? kod_operatera : '-'}</span>
            </div>

            <div className="fiscal-bill__body">
              <table cellspacing="0" cellpadding="0">
                {stavke?.length > 0
                  ? stavke?.map((stavka) => {
                      return (
                        <tr>
                          <td className="left">{stavka.naziv}</td>
                          <td className="right">{stavka.cijena_sa_pdv}</td>
                        </tr>
                      );
                    })
                  : null}
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">Osnovica za PDV 21%</td>
                  <td className="right">{ukupna_cijena_bez_pdv}</td>
                </tr>
                <tr>
                  <td className="left">Iznos PDV 21%</td>
                  <td className="right">{ukupan_iznos_pdv}</td>
                </tr>
                <tr>
                  <td className="left">Ukupno PDV</td>
                  <td className="right">{ukupna_cijena_sa_pdv}</td>
                </tr>
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">
                    <h2>Ukupno</h2>
                  </td>
                  <td className="right">
                    <h2>{ukupna_cijena_sa_pdv}</h2>
                  </td>
                </tr>
              </table>
            </div>
            <div className="fiscal-bill__footer">
              <p>Br. računa: {broj_racuna}</p>
              <p>IKOF: {ikof ? ikof : '-'}</p>
              <p>JIKR: {jikr ? jikr : '-'}</p>
              <div className="fiscal-bill__footer--qr-code"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NoviRacunPrintTemplate;
