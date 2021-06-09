import React, { useEffect, useState } from 'react';
import { ReactComponent as Success } from '../../assets/icon/success.svg';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
// import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';
import { ReactComponent as Fiskalizuj } from '../../assets/icon/checkmark.svg';
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
import { racuniService } from '../../services/RacuniService';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const RacuniTableRow = ({ item, racuni }) => {
  const dispatch = useDispatch();
  const [_item, setItem] = useState(item);
  const [_racuni, setRacuni] = useState(item);

  const { preduzece } = useSelector(racunSelector());

  let fizickaLicaPartneri;
  let preduzecaPartneri;
  console.log('racuni', racuni);
  console.log('racuni.partneri', racuni.partneri);
  if (racuni.partneri) {
    fizickaLicaPartneri = racuni.partneri
      .map(
        (tmp) =>
          tmp.fizicko_lice && {
            ime: tmp?.fizicko_lice?.ime + ' ' + tmp?.fizicko_lice?.prezime,
            id: tmp?.id,
          }
      )
      .filter((tmp) => tmp != null);
    preduzecaPartneri = racuni?.partneri
      ?.map(
        (tmp) =>
          !tmp.fizicko_lice && {
            ime: tmp?.preduzece_partner?.kratki_naziv,
            id: tmp?.id,
          }
      )
      .filter((tmp) => tmp != null);
  }

  const history = useHistory();
  const bojaStatus = [
    { klasa: 'tag tag__success', naziv: 'Plaćen' },
    { klasa: 'tag tag__danger', naziv: 'Nenaplativ' },
    { klasa: 'tag tag__warning', naziv: 'Nije Plaćen' },
    { klasa: 'tag tag__neutral', naziv: 'Privremeni' },
  ];

  let bojaKlasa = '';
  let itemStatus = '';
  switch (_item.status) {
    case 'nijeplacen':
      itemStatus = 'Nije Plaćen';
      bojaKlasa = 'tag tag__warning';
      break;
    case 'placen':
      itemStatus = 'Plaćen';
      bojaKlasa = 'tag tag__success';
      break;
    case 'nenaplativ':
      itemStatus = 'Nenaplativ';
      bojaKlasa = 'tag tag__danger';
      break;
    case 'privremeni':
      itemStatus = 'Privremeni';
      bojaKlasa = 'tag tag__neutral';
      break;
    default:
  }

  // useEffect(() => {
  //   // OBRISATI POSLE PREZENTACIJE
  //   if (item.status === 'KREIRAN' && !item.partner) {
  //     dispatch(getRacun(item.id));
  //     if (preduzece) {
  //       setItem({
  //         ...item,
  //         partner: { preduzece: { kratki_naziv: preduzece.kratki_naziv } },
  //       });
  //     }
  //   }
  // }, [dispatch, item, preduzece]);

  const currencyFormat = (num) => {
    // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return Number(num).toFixed(2).replace('.', ',');
  };

  const handleClick = () => {
    // TODO: item.vrsta_racuna.toLowerCase() === 'gotovinski'
    const vrstaRacuna = item.vrsta_racuna.toLowerCase();
    console.log(vrstaRacuna);
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

  const handleFiskalizuj = (e) => {
    e.stopPropagation();
    racuniService
      .fiskalizujRacun(item.id)
      .then((data) => {
        dispatch(getRacuni());
        toast.success(
          `Fiskalizacija računa broj ${item.redni_broj} je uspjela!`,
          toastSettings
        );
      })
      .catch((err) => {
        dispatch(getRacuni());
        let message = err?.response?.data?.error
          ? err.response.data.error
          : err.message;
        toast.error(
          'Fiskalizacija računa nije moguća: ' + message,
          toastSettings
        );
      });
  };

  const handleIzmjeni = (e) => {
    e.stopPropagation();
    history.push(`/racuni/bezgotovinski/edit/${item.id}`);
  };
  const handlePogledajA4 = (e) => {
    e.stopPropagation();
    history.push(`/racuni/bezgotovinski/show/${item.id}`);
  };

  const handleObrisi = (e) => {
    e.stopPropagation();
    dispatch(deleteRacun(item.id));
    dispatch(getRacuni());
  };
  const vrstaRacuna = (racun) => {
    let value;
    if (racun === 'gotovinski' || racun === 'GOTOVINSKI') {
      // value = racun.substring(0, 3) + '.';
      value = 'g';
    } else if (racun === 'bezgotovinski' || racun === 'BEZGOTOVINSKI') {
      // value = racun.substring(0, 6) + '.';
      value = 'b';
    } else {
      value = racun;
    }
    return value;
  };

  return (
    <tr onClick={handleClick} className="mob-relative-block">
      <td className="cl">
        <div className="inner-td-wrapper lowercase">
          {_item?.qr_url && <Success />}
          &nbsp;
          {<span title={_item.vrsta_racuna} className="tag tag__neutral">{vrstaRacuna(_item?.vrsta_racuna)}</span>}
        </div>
      </td>
      <td className="cl">{_item?.redni_broj}</td>
      {preduzecaPartneri &&
        preduzecaPartneri[0] &&
        preduzecaPartneri?.length !== 0 && (
          <td className="cd fw-500">
            {preduzecaPartneri &&
              preduzecaPartneri.find((fl) => fl.id === _item?.partner_id)?.ime}
          </td>
        )}
      {fizickaLicaPartneri &&
        fizickaLicaPartneri[0] &&
        fizickaLicaPartneri?.length !== 0 && (
          <td className="cd fw-500">
            {fizickaLicaPartneri &&
              fizickaLicaPartneri.find((fl) => fl.id === _item?.partner_id)
                ?.ime}
          </td>
        )}
      {!preduzecaPartneri && !fizickaLicaPartneri && (
        <td className="cd fw-500">
          {_item?.partner?.fizicko_lice_id
            ? _item?.partner?.fizicko_lice?.ime +
              ' ' +
              _item?.partner?.fizicko_lice?.prezime
            : _item?.partner?.preduzece_partner?.kratki_naziv}
        </td>
      )}
      <td className="cl dshow-cell">
        {currencyFormat(_item?.ukupna_cijena_bez_pdv_popust) + '€'}
      </td>
      <td className="cl dshow-cell">
        {currencyFormat(_item?.ukupan_iznos_pdv) + '€'}
      </td>
      <td className="cd fw-500">
        {currencyFormat(_item?.ukupna_cijena_sa_pdv_popust) + '€'}
      </td>
      <td className="cd">
        {/* <span className={bojaStatus[item.status].klasa}>
          {bojaStatus[item.status].naziv}
        </span> */}
        {<span className={bojaKlasa}>{itemStatus}</span>}
      </td>

      <td className="cl">
        {/* {new Date(item.created_at).toLocaleDateString('en-GB')} */}
        <Moment locale="me" format="DD. MMM YYYY.">
          {_item?.created_at}
        </Moment>
      </td>
      <td className="mob-absolute-topright">
        <div className="df jc-end ai-c">
          <button className="btn btn__light-dd btn__xs">
            <IconLg />
            <div className="drop-down">
              {_item.vrsta_racuna == 'gotovinski' && (
                <Link onClick={handlePogledajA4}
                >Pogledaj na A4</Link>
              )}

              <Link
                onClick={handleIzmjeni}
                className={`${_item?.qr_url ? 'disabled' : ''}`}
              >
                <Izmjeni />
                Izmijeni
              </Link>

              {!_item?.qr_url && (
                <Link
                  onClick={handleFiskalizuj}
                  className={`${_item?.qr_url ? 'disabled' : ''}`}
                >
                  <Success />
                  Fiskalizuj
                </Link>
              )}
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RacuniTableRow;
