import React from 'react';
import QRCode from "react-qr-code";

class BezgotovinskiShowTemplate extends React.Component {


    render() {
        const { ikof, jikr, broj_racuna } = this.props.racun;

        return (
            <>
                <div className="invoice" style={{ width: '100%' }}>
                    <div className="invoice__header">
                        <div className="invoice__header--logo">
                            <img
                                src="https://picsum.photos/seed/picsum/200/100"
                                alt="logo"
                            />
                        </div>
                        <div className="row">
                            <div style={{ width: '33.3333333333%' }} className="col-md-4">
                                <p className="txt-light">
                                    Restart IT doo - Društvo za određene radnje i djelatnosti</p>
                                <p className="txt-light">Kompjutersko programiranje</p>
                                <p className="txt-light">Ulica Marka Jonovića 36a</p>
                                <p className="txt-light">Podgorica, Crna Gora</p>
                            </div>
                            <div style={{ width: '33.3333333333%' }} className="col-md-4">
                                <div className="df jc-sb">
                                    <div className="df fd-column">
                                        <p className="txt-light">PIB</p>
                                        <p className="txt-light">PDV</p>
                                        <p className="txt-light">IBAN</p>
                                        <p className="txt-light">BIC/SWIFT</p>
                                    </div>
                                    <div className="df fd-column">
                                        <p className="txt-right">02834567</p>
                                        <p className="txt-right">31/45-5435-3535</p>
                                        <p className="txt-right">1268768768834567</p>
                                        <p className="txt-right">423423424234</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '33.3333333333%' }} className="col-md-4">
                                <div className="df jc-sb">
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
                                <div className="col-md-6">
                                    <h2 className="heading-secondary">Račun {broj_racuna}</h2>
                                    <p>Podgorica, 12.1.2021.</p>
                                </div>
                                <div className="col-md-6">
                                    <div className="invoice__header--box">
                                        <h2 className="heading-secondary">Yahting Montenegro</h2>
                                        <div className="df jc-sb">
                                            <div className="df fd-column">
                                                <p className="txt-light">PIB</p>
                                                <p className="txt-light">PDV</p>
                                                <p className="txt-light">IBAN</p>
                                                <p className="txt-light">BIC/SWIFT</p>
                                            </div>
                                            <div className="df fd-column">
                                                <p className="txt-right">02834567</p>
                                                <p className="txt-right">31/45-5435-3535</p>
                                                <p className="txt-right">1268768768834567</p>
                                                <p className="txt-right">423423424234</p>
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
                                        <span className="heading-quaternary">Opis</span>
                                    </th>
                                    <th>
                                        <span className="heading-quaternary"
                                        >Jedinična cijena</span>
                                    </th>
                                    <th>
                                        <span className="heading-quaternary">Ukupno</span>
                                    </th>
                                    <th><span className="heading-quaternary">Iznos</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="cd fw-500">Usluge izrade web sajta</td>
                                    <td className="cl">1.010,00</td>
                                    <td className="cl">1.010,00</td>
                                    <td>
                                        <p className="cd fw-500">
                                            1.240,00 <span className="txt-up txt-light">eur</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cd fw-500">Usluge obnove domena</td>
                                    <td className="cl">20,00</td>
                                    <td className="cl">20,00</td>
                                    <td>
                                        <p className="cd fw-500">
                                            20,00 <span className="txt-up txt-light">eur</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="invoice__footer">
                        <div className="row">
                            <div className="offset-md-8"></div>
                            <div className="col-md-4">
                                <div className="df jc-sb">
                                    <div className="df fd-column">
                                        <p className="fw-500">Bez PDV-a:</p>
                                        <p className="fw-500">PDV 21%:</p>
                                        <p className="fw-500">Ukupno:</p>
                                    </div>
                                    <div className="df fd-column">
                                        <p className="fw-500 txt-right">
                                            1.260,00 <span className="txt-up txt-light">Eur</span>
                                        </p>
                                        <p className="fw-500 txt-right">
                                            264,60 <span className="txt-up txt-light">Eur</span>
                                        </p>
                                        <p className="fw-500 txt-right">
                                            1524,60 <span className="txt-up txt-light">Eur</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="fw-500">Napomena:</p>
                                <p className="txt-light mb-25">
                                    Egestas mattis nec eu posuere. Ullamcorper quam
                                    molestie sollicitudin suspendisse mi.
                                </p>
                                <div className="row">
                                    <div className="col-md-4">
                                    {/* ------------------ QR CODE ------------------ */}
                                    <QRCode value="Set url here" size="64"/>
                                     {/*------------------ QR CODE ------------------*/}
                                    </div>
                                    <div className="col-md-8">
                                        <div className="df jc-sb">
                                            <div className="df fd-column">
                                                <p className="txt-light">JIKR</p>
                                                <p className="txt-light">IKOF</p>
                                            </div>
                                            <div className="df fd-column">
                                                <p className="txt-right">{jikr}</p>
                                                <p className="txt-right">{ikof}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};
export default BezgotovinskiShowTemplate;
