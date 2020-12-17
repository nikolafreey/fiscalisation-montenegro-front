import React from 'react';
import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { useDispatch } from 'react-redux';
import { storeRacun } from '../../store/actions/RacuniActions';

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
      <td className="cl">
        <Success />
      </td>
      <td className="cl">{item.broj_racuna}</td>
      <td className="cd fw-500">{item.preduzece_id}</td>
      <td className="cd fw-500 dshow-cell">
        {item.ukupna_cijena_bez_pdv + '€'}
      </td>
      <td className="cd fw-500 dshow-cell">{item.ukupan_iznos_pdv + '€'}</td>
      <td className="cd fw-500">{item.ukupna_cijena_sa_pdv + '€'}</td>
      <td className="cd fw-500">
        {/* <span className={bojaStatus[item.status].klasa}>
          {bojaStatus[item.status].naziv}
        </span> */}
        {<span className="tag tag__success">{item.status}</span>}
      </td>
      <td className="cd fw-500">
        {new Date(item.created_at).toLocaleDateString('en-GB')}
      </td>
    </tr>
  );
};

export default PredracuniTableRow;
