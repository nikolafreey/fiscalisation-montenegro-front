import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as Edit } from '../../assets/icon/edit.svg';
import { ReactComponent as Delete } from '../../assets/icon/delete.svg';
import { ReactComponent as Dots } from '../../assets/icon/dots.svg';
import { Link } from 'react-router-dom';
import { FIZICKA_LICA, PREDUZECA } from '../../constants/routes';

const PartneriTableRow = ({ item: partner, onItemClick, selectedId }) => {
  console.log(selectedId);
  return (
    <tr
      onClick={() => onItemClick(partner)}
      style={{
        backgroundColor: selectedId === partner.id ? '#F9FAFB' : 'white',
      }}
    >
      <td>
        <div class="inner-td-wrapper">
          <div
            class="img-round sm"
            style={{ backgroundImage: `url(${partner.preduzece?.logotip})` }}
          ></div>
          <div class="td-title">
            <div class="df ai-c">
              <p>
                {partner.preduzece
                  ? partner.preduzece.kratki_naziv
                  : partner.fizicko_lice?.ime}
              </p>
              <Badge className="icon icon__fill-color-badge ml-s sm" />
            </div>
            {partner.preduzece && (
              <h3 class="heading-quaternary">{partner.preduzece.grad}</h3>
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

      <td>
        <div class="df jc-end ai-c">
          <button type="button" class="btn btn__light btn__xs">
            <Dots className="icon lg" />
            <div class="drop-down" id="ddl">
              <Link
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
              <a href="#">
                <Delete className="icon icon__dark md" />
                Obriši
              </a>
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PartneriTableRow;
