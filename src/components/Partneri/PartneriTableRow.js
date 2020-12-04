import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as Edit } from '../../assets/icon/edit.svg';
import { ReactComponent as Delete } from '../../assets/icon/delete.svg';
import { ReactComponent as Dots } from '../../assets/icon/dots.svg';
import { useDispatch, useSelector } from 'react-redux';
import { partnerSelector } from '../../store/selectors/PartneriSelector';

const PartneriTableRow = ({ item: partner, onItemClick }) => {
  const dispatch = useDispatch();

  const selectedPartner = useSelector(partnerSelector());

  return (
    <tr
      onClick={() => onItemClick(partner)}
      style={{
        backgroundColor:
          selectedPartner.id === partner.id ? '#F9FAFB' : 'white',
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

      <td className="cd fw-500">{partner.kontakt_telefon}</td>

      <td>
        <div class="df jc-end ai-c">
          <button type="button" class="btn btn__light btn__xs">
            <Dots className="icon lg" />
            <div class="drop-down" id="ddl">
              <a href="#">
                <Edit className="icon icon__dark md" />
                Izmijeni
              </a>
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
