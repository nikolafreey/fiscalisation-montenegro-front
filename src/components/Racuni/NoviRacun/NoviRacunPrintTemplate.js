import React from 'react'
import NoviRacunKusur from './NoviRacunKusur';

class NoviRacunPrintTemplate extends React.Component {
  render() {
    return (
      <>


        {/* Novi racun dizajn */}
        <div className="fiscal-bill-wrapper">
          <div className="fiscal-bill">
            <div className="fiscal-bill__header">
              <div className="fiscal-bill__header--logo">
                <img src="https://picsum.photos/seed/picsum/200/100" alt="logo" />
              </div>
              <div className="fiscal-bill__header--info">
                <p>Monte Store</p>
                <p>Ulica Mata Laketića, bb</p>
                <p>Podgorica, Crna Gora</p>
                <p>PIB: 02823422</p>
              </div>
              <span>Operater: Milena Perović</span>
            </div>

            <div className="fiscal-bill__body">
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">LG Televizor LF2314</td>
                  <td className="right">324,20</td>
                </tr>
                <tr>
                  <td className="left">SAMSUNG Frizider 78779s8s</td>
                  <td className="right">254,00</td>
                </tr>
                <tr>
                  <td className="left">Kabal USB 23s</td>
                  <td className="right">8,60</td>
                </tr>
                <tr>
                  <td className="left">DELL MS116 USB Optical crni miš</td>
                  <td className="right">326,00</td>
                </tr>
                <tr>
                  <td className="left">ASUS DRW-24D5MT DVD±RW crni</td>
                  <td className="right">23,00</td>
                </tr>
                <tr>
                  <td className="left">DAHUA ARC3008C Alarmna centrala</td>
                  <td className="right">168,00</td>
                </tr>
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left">Osnovica za PDV 21%</td>
                  <td className="right">1103,80</td>
                </tr>
                <tr>
                  <td className="left">Iznos PDV 21%</td>
                  <td className="right">191,58</td>
                </tr>
                <tr>
                  <td className="left">Ukupno PDV</td>
                  <td className="right">191,58</td>
                </tr>
              </table>
              <table cellspacing="0" cellpadding="0">
                <tr>
                  <td className="left"><h2>Ukupno</h2></td>
                  <td className="right"><h2>1103,80</h2></td>
                </tr>
              </table>
            </div>
            <div className="fiscal-bill__footer">
              <p>Br. računa: LO531YW868/13440/2021/BW312YB572</p>
              <p>IKOF: FF56CF15AB59C5221FA74A6E875E87B9</p>
              <p>JIKR: cee347fb-dbea-4be1-be27-f08c61222e5a</p>
              <div className="fiscal-bill__footer--qr-code">
                {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="qr code" /> */}
              </div>
            </div>
          </div>
        </div>



      </>
    )
  }
}

export default NoviRacunPrintTemplate;