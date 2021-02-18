import React, { useEffect, useState } from 'react';
import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  storeRacun,
  deleteRacun,
  getRacuni,
  getRacun,
} from '../../store/actions/RacuniActions';
import { racunSelector } from '../../store/selectors/RacuniSelector';

import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/me';

const RacuniTableRow = ({ item }) => {
  const dispatch = useDispatch();
  const [_item, setItem] = useState(item);

  const { preduzece } = useSelector(racunSelector());

  const history = useHistory();
  const bojaStatus = {
    placen: { klasa: 'tag tag__success', naziv: 'Plaćen' },
    neNaplativ: { klasa: 'tag tag__danger', naziv: 'Nenaplativ' },
    cekaSe: { klasa: 'tag tag__warning', naziv: 'Čeka se' },
    privremen: { klasa: 'tag tag__neutral', naziv: 'Privremen' },
  };

  useEffect(() => {
    // OBRISATI POSLE PREZENTACIJE
    if (item.status === 'KREIRAN' && !item.partner) {
      dispatch(getRacun(item.id));
      if (preduzece) {
        setItem({
          ...item,
          partner: { preduzece: { kratki_naziv: preduzece.kratki_naziv } },
        });
      }
    }
  }, [dispatch, item, preduzece]);

  const currencyFormat = (num) => {
    // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return num.toString().replace('.', ',');
  };

  const handleClick = () => {
    if (
      item.vrsta_racuna === 'GOTOVINSKI' ||
      item.vrsta_racuna === 'gotovinski'
      // item.status === 'KREIRAN' &&
      // !item.partner
    ) {
      history.push(`/racuni/show/${item.id}`);
    } else {
      history.push(`/racuni/bezgotovinski/show/${item.id}`);
    }
  };

  const handleIzmjeni = (e) => {
    e.stopPropagation();
    history.push(`/racuni/bezgotovinski/edit/${item.id}`);
  };

  const handleObrisi = (e) => {
    e.stopPropagation();
    dispatch(deleteRacun(item.id));
    dispatch(getRacuni());
  };
  const vrstaRacuna = (racun) => {
    let value;
    if (racun === 'gotovinski') {
      value = racun.substring(0, 3) + '.';
    } else if (racun === 'bezgotovinski') {
      value = racun.substring(0, 6) + '.';
    } else {
      value = racun;
    }
    return value;
  };

  return (
    <tr onClick={handleClick} className="mob-relative-block">
      <td className="cl">
        {_item.ikof && <Success />}
        {vrstaRacuna(_item.vrsta_racuna)}
      </td>
      <td className="cl">{_item.broj_racuna}</td>
      <td className="cd fw-500">
        {_item.partner?.preduzece?.kratki_naziv ||
          `${_item.partner?.fizicko_lice?.ime}
           ${_item.partner?.fizicko_lice?.prezime}`}
      </td>
      <td className="cl dshow-cell">
        {currencyFormat(_item.ukupna_cijena_bez_pdv) + '€'}
      </td>
      <td className="cl dshow-cell">
        {currencyFormat(_item.ukupan_iznos_pdv) + '€'}
      </td>
      <td className="cd fw-500">
        {currencyFormat(_item.ukupna_cijena_sa_pdv) + '€'}
      </td>
      <td className="cd">
        {/* <span className={bojaStatus[item.status].klasa}>
          {bojaStatus[item.status].naziv}
        </span> */}
        {
          <span className="tag tag__success">
            {_item.status}{' '}
            {item.status === 'KREIRAN' && !item.partner ? '-Gr' : ''}
          </span>
        }
      </td>

      <td className="cl">
        {/* {new Date(item.created_at).toLocaleDateString('en-GB')} */}
        <Moment locale="me" format="DD. MMM YYYY.">
          {_item.created_at}
        </Moment>
      </td>
      <td className="mob-absolute-topright">
        <div className="df jc-end ai-c">
          <button className="btn btn__light btn__xs">
            <IconLg />
            <div className="drop-down">
              <Link
                onClick={handleIzmjeni}
                className={`${_item.ikof && _item.jikr ? 'disabled' : ''}`}
              >
                <Izmjeni />
                Izmjeni
              </Link>
              <Link
                onClick={handleObrisi}
                className={`${_item.ikof && _item.jikr ? 'disabled' : ''}`}
              >
                <Obrisi />
                Obriši
              </Link>
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RacuniTableRow;
