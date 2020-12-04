import React from 'react';
import { ReactComponent as Badge } from '../../assets/icon/badge.svg';
import { ReactComponent as PlusIcon } from '../../assets/icon/plus.svg';
import { ReactComponent as CheckIcon } from '../../assets/icon/checkmark.svg';
import { useDispatch, useSelector } from 'react-redux';
import { preduzeceSelector } from '../../store/selectors/PreduzecaSelector';
import { storePartner } from '../../store/actions/PartneriActions';

const PreduzecaTableRow = ({ item, onItemClick }) => {
  const dispatch = useDispatch();

  const preduzece = useSelector(preduzeceSelector());

  const handleAddPartner = () => {
    dispatch(storePartner({ preduzece_id: item.id }));
  };

  return (
    <tr
      onClick={() => onItemClick(item)}
      style={{
        backgroundColor: preduzece.id === item.id ? '#F9FAFB' : 'white',
      }}
    >
      <td>
        <div className="inner-td-wrapper">
          <div
            className="img-round sm"
            style={{ backgroundImage: `url('${item.logotip}')` }}
          ></div>
          <div className="td-title">
            <div className="df ai-c">
              <p>{item.kratki_naziv}</p>
              <Badge className="icon icon__fill-color-badge ml-s sm" />
            </div>
            <h3 className="heading-quaternary">{item.grad}</h3>
          </div>
        </div>
      </td>
      <td className="cl">{item.pib}</td>
      <td className="cd fw-500">{item.telefon}</td>
      <td>
        <button
          disabled={item.partneri?.length}
          onClick={handleAddPartner}
          type="button"
          className={`btn btn__${item.partneri?.length ? 'light' : 'dark'}`}
        >
          {item.partneri?.length ? (
            <CheckIcon className="icon icon__dark sm" />
          ) : (
            <PlusIcon className="icon icon__light sm" />
          )}
          Partner
        </button>
      </td>
    </tr>
  );
};

export default PreduzecaTableRow;
