import React from 'react';
import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';
import { useDispatch } from 'react-redux';
import { storeRacun } from '../../store/actions/RacuniActions';

const UlazniRacuniTableRow = ({ item }) => {
  const dispatch = useDispatch();

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
      <td className="cd fw-500">
        {item.preduzece_id
          ? item.partner?.preduzece?.kratki_naziv
          : item.partner?.fizicko_lice?.ime +
            ' ' +
            item.partner?.fizicko_lice?.prezime}
      </td>
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
      <td>
        <div className="df jc-end ai-c">
          <button className="btn btn__light btn__xs">
            <IconLg />
            <div className="drop-down">
              <a href="#">
                <Izmjeni />
                Izmjeni
              </a>
              <a href="#">
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

export default UlazniRacuniTableRow;
