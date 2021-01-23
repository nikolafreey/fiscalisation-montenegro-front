import React from 'react'
import NoviRacunKusur from './NoviRacunKusur';

class NoviRacunPrintTemplate extends React.Component {
    render() {
        return (
            <>
            {/* Old racun */}
            <div className="side-info" style={{ width: '60%', display: 'none' }}>
                <div className="side-info__wrapper">
                    <p className="txt-light txt-up">ukupno</p>
                    <h1 className="heading-primary">
                        {this.props.ukupnaCijena.toFixed(2).replace('.', ',')}{' '}
                        <span className="txt-light">€</span>
                    </h1>
                </div>

                {this.props.usluge}
                {this.props.robe}

                <hr />
                <div className="row mb-15">
                    {Object.keys(this.props.porezi).map((porezId) => (
                        <>
                            <div className="col-lg-8">
                                <p>Ukupno za {this.props.porezi[porezId].naziv}</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="txt-right">
                                    {this.props.porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
                                </p>
                            </div>
                            <div className="col-lg-8">
                                <p>{this.props.porezi[porezId].naziv}</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="txt-right">
                                    {this.props.porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') + '€'}
                                </p>
                            </div>
                        </>
                    ))}
                </div>
                <hr />
                <div className="row mb-20">
                    <div className="col-lg-8">
                        <p>Ukupan PDV</p>
                    </div>
                    <div className="col-lg-4">
                        <p className="txt-right">
                            {Number(this.props.ukupnaCijena - this.props.ukupnaCijenaBezPdv)
                                .toFixed(2)
                                .replace('.', ',') + '€'}
                        </p>
                    </div>
                    <div className="col-lg-7">
                        <p>Ukupno za plaćanje</p>
                    </div>
                    <div className="col-lg-5">
                        <p className="txt-right">
                            {this.props.ukupnoPlacanje.toFixed(2).replace('.', ',') + '€'}
                        </p>
                    </div>
                </div>
                <NoviRacunKusur ukupnaCijena={this.props.ukupnaCijena} />
            </div>
        
            {/* Novi racun dizajn */}

            <div class="fiscal-bill-wrapper">
      <div class="fiscal-bill">
        <div class="fiscal-bill__header">
          <div class="fiscal-bill__header--logo">
            <img src="https://picsum.photos/seed/picsum/200/100" alt="logo" />
          </div>
          <div class="fiscal-bill__header--info">
            <p>Monte Store</p>
            <p>Ulica Mata Laketića, bb</p>
            <p>Podgorica, Crna Gora</p>
            <p>PIB: 02823422</p>
          </div>
          <span>Operater: Milena Perović</span>
        </div>

        <div class="fiscal-bill__body">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td class="left">LG Televizor LF2314</td>
              <td class="right">324,20</td>
            </tr>
            <tr>
              <td class="left">SAMSUNG Frizider 78779s8s</td>
              <td class="right">254,00</td>
            </tr>
            <tr>
              <td class="left">Kabal USB 23s</td>
              <td class="right">8,60</td>
            </tr>
            <tr>
              <td class="left">DELL MS116 USB Optical crni miš</td>
              <td class="right">326,00</td>
            </tr>
            <tr>
              <td class="left">ASUS DRW-24D5MT DVD±RW crni</td>
              <td class="right">23,00</td>
            </tr>
            <tr>
              <td class="left">DAHUA ARC3008C Alarmna centrala</td>
              <td class="right">168,00</td>
            </tr>
          </table>
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td class="left">Osnovica za PDV 21%</td>
              <td class="right">1103,80</td>
            </tr>
            <tr>
              <td class="left">Iznos PDV 21%</td>
              <td class="right">191,58</td>
            </tr>
            <tr>
              <td class="left">Ukupno PDV</td>
              <td class="right">191,58</td>
            </tr>
          </table>
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td class="left"><h2>Ukupno</h2></td>
              <td class="right"><h2>1103,80</h2></td>
            </tr>
          </table>
        </div>
        <div class="fiscal-bill__footer">
          <p>Br. računa: LO531YW868/13440/2021/BW312YB572</p>
          <p>IKOF: FF56CF15AB59C5221FA74A6E875E87B9</p>
          <p>JIKR: cee347fb-dbea-4be1-be27-f08c61222e5a</p>
          <div class="fiscal-bill__footer--qr-code">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="qr code"/>
          </div>
        </div>
      </div>
    </div>



        </>                     
        )
    }
}

export default NoviRacunPrintTemplate;