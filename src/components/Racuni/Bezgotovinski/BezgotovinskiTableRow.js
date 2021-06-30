import React from 'react';
import {
  formatirajCijenu,
  formatirajCijenuBezE,
} from './../../../helpers/racuni';

const BezgotovinskiTableRow = ({ item }) => {
  const currencyFormat = (num) => {
    if (num) return num.toString().replace('.', ',');
  };
  console.log('item=', item);

  const calcIznos = ({ jedinicna_cijena_bez_pdv, kolicina }) => {
    return (jedinicna_cijena_bez_pdv * kolicina).toFixed(2).replace('.', ',');
  };

  return (
    <tr>
      <td className="cd">
        <p className="cd fw-500">{item && item.naziv ? item.naziv : ''}</p>
        {item && item.opis ? item.opis : ''}
      </td>
      <td>
        {item && item.jedinicna_cijena_bez_pdv
          ? // ? formatirajCijenu(item.jedinicna_cijena_bez_pdv)
            Number(item.jedinicna_cijena_bez_pdv)
              // .toFixed(2)
              .toFixed(5)
              .replace('.', ',')
          : ''}
      </td>
      <td>
        {item && item.jedinicna_cijena_bez_pdv
          ? // ? formatirajCijenu(item.jedinicna_cijena_bez_pdv)
            Number(item.cijena_sa_pdv).toFixed(5).replace('.', ',')
          : ''}
      </td>
      {/* <td className="cl white-space-pre">
        {item && item.jedinicna_cijena_bez_pdv
          // ? formatirajCijenu(item.jedinicna_cijena_bez_pdv)
          ? Number(item.cijena_sa_pdv).toString()
          : ''}
      </td> */}
      {/* <td className="cl">{item && item.pdv_iznos ?formatirajCijenu(item.pdv_iznos*item.kolicina ): ''}</td> */}
      {/* {item && item.popust_procenat && Number(item.popust_procenat)>0 && ( */}
      <td className="cd">
        {item && item.popust_procenat && Number(item.popust_procenat) > 0
          ? formatirajCijenuBezE(item.popust_procenat) +
            '% (- ' +
            formatirajCijenu(
              (item.cijena_sa_pdv - item.cijena_sa_pdv_popust) * item.kolicina
            ) +
            ')'
          : item && item.popust_iznos && Number(item.popust_iznos) > 0
          ? '-' + formatirajCijenu(item.popust_iznos * item.kolicina)
          : '/ '}
      </td>
      <td className="cd">
        {item && item.kolicina
          ? Number(item.kolicina).toString() + ' ' + item.jedinica_naziv
          : ''}
      </td>
      <td className="cd w-10">
        {item
          ? formatirajCijenu(item.cijena_bez_pdv_popust * item.kolicina)
          : ''}
      </td>
      <td className="cd w-10">
        {item
          ? formatirajCijenu(item.cijena_sa_pdv_popust * item.kolicina)
          : ''}
      </td>
    </tr>
  );
};

export default BezgotovinskiTableRow;
