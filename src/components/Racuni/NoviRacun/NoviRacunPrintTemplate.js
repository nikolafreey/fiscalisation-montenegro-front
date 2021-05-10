import React from 'react';
import { formatirajCijenu } from './../../../helpers/racuni';

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
      popust_ukupno,
      ukupna_cijena_bez_pdv_popust,
      ukupna_cijena_sa_pdv_popust,
      porezi,
      user_id,
      user,
    } = this.props.racun;

    let operaterIme = preduzece?.users.find((pred) => pred.id === user_id).ime;
    let operaterPrezime = preduzece?.users.find((pred) => pred.id === user_id)
      .prezime;

    console.log('operaterIme', operaterIme);
    console.log('operaterPrezime', operaterPrezime);

    function vratiUkupnoPlacanje() {
      var ukupnoPlacanje = 0;
      var ukupniPorezi = [];
      for (const p in stavke) {
        ukupniPorezi[p] += porezi[p];
        ukupnoPlacanje += Number(stavke[p].cijena_sa_pdv_popust);
        console.log('cik', stavke[p].pdv_iznos_ukupno, porezi);
      }
      return ukupnoPlacanje;
    }
    //  const ukPlati=stavke.map((stavka)=>{
    //     ukPlati +=stavka.cijena_sa_pdv_popust;
    //   })

    const ukPlati = vratiUkupnoPlacanje();
    console.log('u printu', stavke, kod_operatera);
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
              {/* <span>
                Operater: {kod_operatera ? kod_operatera : user?.kod_operatera}
              </span> */}
              <span>
                Operater:{' '}
                {preduzece && preduzece.users.length > 0
                  ? operaterIme + ' ' + operaterPrezime
                  : '-'}
                {preduzece && preduzece.kod_operatera
                  ? ' (' + preduzece.kod_operatera + ')'
                  : '-'}
              </span>
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
                {stavke?.length > 0
                  ? Object.keys(stavke).map((stavkaId) => {
                      const stavka = stavke[stavkaId];

                      return (
                        <div className="side-info__wrapper">
                          <div className="side-info__info as-end mb-10">
                            <div className="side-info__info--inner-wrapper mb-0">
                              <div className="col-l w-break">
                                <p className="txt-dark">{stavka.naziv}</p>
                                <p className="txt-light">{stavka.opis}</p>
                              </div>
                              <div className="col-r w-break-unset">
                                <div className="spn-mr-10 df">
                                  {Number(stavka.popust_procenat) > 0 ||
                                  Number(stavka.popust_iznos) > 0
                                    ? (
                                        Number(stavka.cijena_sa_pdv_popust) *
                                        Number(stavka.kolicina)
                                      )
                                        .toFixed(2)
                                        .replace('.', ',')
                                    : (
                                        Number(stavka.cijena_sa_pdv) *
                                        Number(stavka.kolicina)
                                      )
                                        .toFixed(2)
                                        .replace('.', ',')}
                                </div>
                              </div>
                            </div>
                            {(Number(stavka.popust_procenat) > 0 ||
                              Number(stavka.popust_iznos) > 0) && (
                              <div className="side-info__info--inner-wrapper mb-0">
                                <div className="col-l w-break">
                                  <p className="ml-15 txt-dark">
                                    Kol <span>x</span> Cijena
                                  </p>
                                </div>
                                <div className="col-r w-break-unset mr-m">
                                  {Number(stavka.kolicina)
                                    .toFixed(2)
                                    .replace('.', ',')}{' '}
                                  x{' '}
                                  {Number(stavka.cijena_sa_pdv)
                                    .toFixed(2)
                                    .replace('.', ',')}
                                </div>
                              </div>
                            )}

                            {(stavka.popust_iznos > 0 ||
                              stavka.popust_procenat > 0) && (
                              <>
                                <div className="side-info__info--inner-wrapper mb-0">
                                  <div className="col-l w-break">
                                    <p className="ml-15 txt-dark">
                                      Popust{' '}
                                      {Number(stavka.popust_procenat) > 0
                                        ? Number(stavka.popust_procenat) + '%'
                                        : 'u iznosu'}
                                    </p>
                                  </div>
                                  <div className="col-r w-break-unset">
                                    <span className="mr-m">
                                      {'-'}
                                      {(
                                        (Number(stavka.cijena_sa_pdv) -
                                          Number(stavka.cijena_sa_pdv_popust)) *
                                        Number(stavka.kolicina)
                                      )
                                        .toFixed(2)
                                        .replace('.', ',')}
                                    </span>
                                  </div>
                                </div>

                                <div className="side-info__info--inner-wrapper mb-0">
                                  <div className="col-l w-break">
                                    <p className="ml-15 txt-dark">
                                      Cijena sa popustom{' '}
                                    </p>
                                  </div>
                                  <div className="col-r w-break-unset">
                                    <span className="mr-m">
                                      {(
                                        Number(stavka.cijena_sa_pdv_popust) *
                                        Number(stavka.kolicina)
                                      )
                                        .toFixed(2)
                                        .replace('.', ',')}
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  : null}
                {/* kraj */}
              </table>
              <table cellspacing="0" cellpadding="0">
                {porezi &&
                  Object.keys(porezi).map((porezId) => {
                    const porez = porezi[porezId];

                    return (
                      <div>
                        <tr>
                          <td className="w-33">
                            {'PDV '} {porez.naziv}
                          </td>
                          <td className="w-33">
                            {formatirajCijenu(stavke[porezId].pdv_iznos_ukupno)}
                          </td>
                        </tr>
                      </div>
                    );
                  })}
              </table>

              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">Ukupno PDV </td>
                  <td className="right">
                    {formatirajCijenu(ukupan_iznos_pdv)}
                  </td>
                </tr>
                <tr>
                  <td className="left">
                    <h2>Ukupno </h2>
                  </td>
                  <td className="right">
                    <h2>{formatirajCijenu(ukupna_cijena_sa_pdv_popust)}</h2>
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
