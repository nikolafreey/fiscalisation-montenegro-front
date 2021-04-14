import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as Edit } from '../../assets/icon/edit.svg';
import { ReactComponent as Delete } from '../../assets/icon/delete.svg';
import { ReactComponent as Dots } from '../../assets/icon/dots.svg';
import { Link } from 'react-router-dom';
import { FIZICKA_LICA, PREDUZECA } from '../../constants/routes';

const PartneriTableRow = ({ item: partner, onItemClick, selectedId }) => {
  return (
    <tr
      onClick={() => onItemClick(partner)}
      className={
        'mob-relative-block ' + (selectedId === partner.id ? 'active' : '')
      }
    >
      <td>
        <div className="inner-td-wrapper">
          {/* <div
            className="img-round sm"
            style={{ backgroundImage: `url(${partner.preduzece?.logotip})` }}
          ></div> */}
          <img
            // src={partner.preduzece?.logotip} // TODO:mora logotip path logfo.png ili logo 
            className="img-round sm"
            alt={partner.preduzece?.kratki_naziv}
          />
          <div className="td-title">
            <p>
              <span>
                {partner.preduzece
                  ? partner.preduzece.kratki_naziv
                  : partner.fizicko_lice?.ime}
              </span>
              <i>
                <Badge className="icon icon__fill-color-badge sm" />
              </i>
            </p>

            {partner.preduzece && (
              <h4 className="heading-quaternary">{partner.preduzece.grad}</h4>
            )}
          </div>
        </div>
      </td>

      <td className="cl">
        {partner.preduzece ? partner.preduzece.pib : partner.fizicko_lice?.jmbg}
      </td>

      <td className="cd fw-500">
        {partner.kontakt_telefon ||
          partner.fizicko_lice?.telefon ||
          partner.preduzece?.telefon}
      </td>

      <td className="mob-absolute-topright">
        <div className="df jc-end ai-c">
          <button type="button" className="btn btn__light btn__xs">
            <Dots className="icon lg" />
            <div className="drop-down" id="ddl">
              <Link
                disabled
                to={
                  partner.preduzece
                    ? PREDUZECA.EDIT.replace(':id', `${partner.preduzece.id}`)
                    : FIZICKA_LICA.EDIT.replace(
                        ':id',
                        `${partner.fizicko_lice.id}`
                      )
                }
              >
                <Edit className="icon icon__dark md" />
                Izmijeni
              </Link>
              <Link>
                <Delete className="icon icon__dark md" />
                Obriši
              </Link>
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PartneriTableRow;
