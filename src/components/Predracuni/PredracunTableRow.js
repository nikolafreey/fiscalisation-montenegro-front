import React from 'react';
// import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { useDispatch } from 'react-redux';
import { storeRacun } from '../../store/actions/RacuniActions';
import Moment from 'react-moment';
import 'moment/locale/me';

const PredracuniTableRow = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddRacun = () => {
    dispatch(storeRacun({ racun_id: item.id }));
  };

  const bojaStatus = {
    placen: { klasa: 'tag tag__success', naziv: 'Plaćen' },
    neNaplativ: { klasa: 'tag tag__danger', naziv: 'Nenaplativ' },
    cekaSe: { klasa: 'tag tag__warning', naziv: 'Čeka se' },
    privremen: { klasa: 'tag tag__neutral', naziv: 'Privremen' },
  };

  return (
    <tr>
      <td className="cl">{item.broj_racuna}</td>
      <td className="cd fw-500">
        {item.partner?.preduzece?.kratki_naziv ||
          `${item.partner?.fizicko_lice?.ime}
           ${item.partner?.fizicko_lice?.prezime}`}
      </td>
      <td className="cd fw-500 dshow-cell">
        {Number(item.ukupna_cijena_bez_pdv).toFixed(2).replace('.', ',') + '€'}
      </td>
      <td className="cd fw-500 dshow-cell">
        {Number(item.ukupan_iznos_pdv).toFixed(2).replace('.', ',') + '€'}
      </td>
      <td className="cd fw-500">
        {Number(item.ukupna_cijena_sa_pdv).toFixed(2).replace('.', ',') + '€'}
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
    </tr>
  );
};

export default PredracuniTableRow;
