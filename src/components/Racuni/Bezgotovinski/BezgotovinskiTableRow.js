import React from 'react';

const BezgotovinskiTableRow = ({ item }) => {
  const currencyFormat = (num) => {
    if (num) return num.toString().replace('.', ',');
  };

  const calcIznos = ({ jedinicna_cijena_bez_pdv, kolicina }) => {
    return (jedinicna_cijena_bez_pdv * kolicina).toFixed(2).replace('.', ',');
  };
  return (
    <tr>
      <td className="cd fw-500">{item && item.naziv ? item.naziv : ''}</td>
      <td className="cl">
        {item && item.jedinicna_cijena_bez_pdv
          ? currencyFormat(item.jedinicna_cijena_bez_pdv) + ' €'
          : ''}
      </td>
      <td className="cl">
        {item && item.kolicina ? currencyFormat(item.kolicina) + ' kom' : ''}
      </td>
      <td className="cl">
        {item && item.popust_iznos
          ? item.popust_iznos + ' EUR'
          : item && item.popust_procenat
          ? item.popust_procenat +
            '% (- ' +
            (
              (item.popust_procenat / 100) *
              item.jedinicna_cijena_bez_pdv
            ).toFixed(2) +
            ')'
          : ' '}
      </td>
      <td className="cl">{item && item.pdv_iznos ? item.pdv_iznos : ''}</td>
      <td>
        <p className="cd fw-500">{item ? calcIznos(item) + ' EUR' : ''}</p>
      </td>
    </tr>
  );
};

export default BezgotovinskiTableRow;
