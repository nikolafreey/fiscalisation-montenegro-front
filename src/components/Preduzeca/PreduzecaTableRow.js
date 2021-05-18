import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as PlusIcon } from '../../assets/icon/plus.svg';
import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPartneri, storePartner } from '../../store/actions/PartneriActions';
import { getPreduzeca } from '../../store/actions/PreduzecaActions';
// import { userSelector } from '../../store/selectors/UserSelector';
import { partneriSelector } from '../../store/selectors/PartneriSelector';

const PreduzecaTableRow = ({ item, onItemClick, selectedId, partneri }) => {
  const dispatch = useDispatch();
  const handleAddPartner = () => {
    dispatch(storePartner({ preduzece_tabela_id: item.id }));
    dispatch(getPreduzeca());
  };
  // const user = useSelector(userSelector());
  console.log('partneri', partneri);
  console.log('item', item);

  return (
    <tr
      onClick={() => onItemClick(item)}
      className={
        'mob-relative-block ' + (selectedId === item.id ? 'active' : '')
      }
    >
      {/* TODO: ako postoji logotip ako ne onda default ili bez img i klasa td-title margin-left:0 ili bez te klase*/}
      <td>
        <div className="inner-td-wrapper">
          {/* <img
            src={item.logotip}
            className="img-round sm"
            alt=""
            //alt={item.kratki_naziv}
          /> */}
          <div className="td-title">
            <p>
              {item.kratki_naziv}
              <i>
                {item.verifikovan !== 0 && (
                  <Badge className="icon icon__fill-color-badge ml-s sm" />
                )}
              </i>
            </p>
            <h3 className="heading-quaternary">{item.grad}</h3>
          </div>
        </div>
      </td>
      <td className="cl">{item.pib}</td>
      <td className="cd fw-500">{item.telefon}</td>
      <td>
        <button
          disabled={
            partneri &&
            partneri.data.some((tmp) => tmp?.preduzece_tabela_id === item?.id)
          }
          onClick={handleAddPartner}
          type="button"
          className={`btn btn__${item.partneri?.length ? 'light' : 'dark'}`}
        >
          {partneri &&
          partneri.data.some((tmp) => tmp?.preduzece_tabela_id === item?.id) ? (
            <CheckIcon className="icon icon__dark sm" />
          ) : (
            <PlusIcon className="icon icon__dark sm" />
          )}
          Partner
        </button>
      </td>
    </tr>
  );
};

export default PreduzecaTableRow;
