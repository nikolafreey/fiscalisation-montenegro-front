import React, {useEffect} from 'react';
import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';
import { useDispatch } from 'react-redux';
import { storeRacun, deleteRacun, getRacuni } from '../../store/actions/RacuniActions';
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/me';

const RacuniTableRow = ({ item }) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const bojaStatus = {
    placen: { klasa: 'tag tag__success', naziv: 'Plaćen' },
    neNaplativ: { klasa: 'tag tag__danger', naziv: 'Nenaplativ' },
    cekaSe: { klasa: 'tag tag__warning', naziv: 'Čeka se' },
    privremen: { klasa: 'tag tag__neutral', naziv: 'Privremen' },
  };

  const currencyFormat = (num) => {
    // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return num.toString().replace('.', ',');
  };

  const handleClick = () => {
    history.push(`/racuni/bezgotovinski/show/${item.id}`);
  }

  const handleIzmjeni = (e) => {
    e.stopPropagation()
    history.push(`/racuni/bezgotovinski/edit/${item.id}`);
  }

  const handleObrisi = (e) => {
    e.stopPropagation()
     dispatch(deleteRacun(item.id))
     dispatch(getRacuni());
  }

  return (
    <tr onClick={handleClick}>
      <td className="cl">{item.ikof && <Success />}</td>
      <td className="cl">{item.broj_racuna}</td>
      <td className="cd fw-500">
        {item.partner?.preduzece?.kratki_naziv ||
          `${item.partner?.fizicko_lice?.ime}
           ${item.partner?.fizicko_lice?.prezime}`}
      </td>
      <td className="cd fw-500 dshow-cell">
        {currencyFormat(item.ukupna_cijena_bez_pdv) + '€'}
      </td>
      <td className="cd fw-500 dshow-cell">
        {currencyFormat(item.ukupan_iznos_pdv) + '€'}
      </td>
      <td className="cd fw-500">
        {currencyFormat(item.ukupna_cijena_sa_pdv) + '€'}
      </td>
      <td className="cd fw-500">
        {/* <span className={bojaStatus[item.status].klasa}>
          {bojaStatus[item.status].naziv}
        </span> */}
        {<span className="tag tag__success">{item.status}</span>}
      </td>
      <td className="cd fw-500">
        {/* {new Date(item.created_at).toLocaleDateString('en-GB')} */}
        <Moment locale="me" format="DD. MMM YYYY.">
          {item.created_at}
        </Moment>
      </td>
      <td>
        <div className="df jc-end ai-c">
          <button className="btn btn__light btn__xs">
            <IconLg />
            <div className="drop-down">
              <a onClick={handleIzmjeni} className={`${item.ikof && item.jikr ? 'disabled' : ''}`}>
                <Izmjeni />
                Izmjeni
              </a>
              <a onClick={handleObrisi} className={`${item.ikof && item.jikr ? 'disabled' : ''}`}>
                <Obrisi />
                Obriši
              </a>
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RacuniTableRow;
