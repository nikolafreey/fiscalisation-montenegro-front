import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as Edit } from '../../assets/icon/edit.svg';
import { ReactComponent as Delete } from '../../assets/icon/delete.svg';
import { ReactComponent as Dots } from '../../assets/icon/dots.svg';
import { Link } from 'react-router-dom';
import { FIZICKA_LICA, PREDUZECA } from '../../constants/routes';
import { useDispatch } from 'react-redux';
import {
  deletePartner,
  getPartneri,
} from '../../store/actions/PartneriActions';

const PartneriTableRow = ({ item: partner, onItemClick, selectedId }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePartner(id));
    dispatch(getPartneri());
  };

  console.log('partner', partner);

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
          {/* <img
            // src={partner.preduzece?.logotip} // TODO:mora logotip path logfo.png ili logo
            className="img-round sm"
            alt=""
            // alt={partner.preduzece?.kratki_naziv}
          /> */}
          <div className="td-title">
            <p>
              <span>
                {partner.preduzece_partner
                  ? partner.preduzece_partner?.kratki_naziv
                  : partner.fizicko_lice?.ime + " " + partner.fizicko_lice?.prezime ||
                    partner.kontakt_ime + ' ' + partner.kontakt_prezime}
              </span>
              {partner?.preduzece_partner?.verifikovan !== 0 &&
                partner.preduzece_partner && (
                  <i>
                    <Badge className="icon icon__fill-color-badge sm" />
                  </i>
                )}
            </p>

            {partner.preduzece_partner_id && (
              <h4 className="heading-quaternary">
                {partner.preduzece_partner?.grad}
              </h4>
            )}
          </div>
        </div>
      </td>
      <td className="cl">
        {partner.preduzece_partner?.pib || partner.fizicko_lice?.jmbg}
      </td>

      <td className="cd fw-500">
        {partner.kontakt_telefon ||
          partner.fizicko_lice?.telefon ||
          partner.preduzece_partner?.telefon}
      </td>

      <td className="mob-absolute-topright">
        <div className="df jc-end ai-c">
          <button type="button" className="btn btn__light-dd btn__xs">
            <Dots className="icon lg" />
            <div className="drop-down" id="ddl">
              {partner?.preduzece_partner?.verifikovan === 0 ||
              partner.fizicko_lice_id ? (
                <Link
                  to={
                    partner.preduzece_partner
                      ? PREDUZECA.EDIT.replace(
                          ':id',
                          `${partner?.preduzece_partner?.id}`
                        )
                      : FIZICKA_LICA.EDIT.replace(
                          ':id',
                          `${partner?.fizicko_lice?.id}`
                        )
                  }
                >
                  <Edit className="icon icon__dark md" />
                  Izmijeni
                </Link>
              ) : null}
              <a onClick={() => handleDelete(partner.id)}>
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
