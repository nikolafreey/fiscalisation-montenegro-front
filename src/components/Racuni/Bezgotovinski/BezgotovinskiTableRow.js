import React from 'react'

const BezgotovinskiTableRow = ({ item }) => {

    const currencyFormat = (num) => {
        if (num)
            return num.toString().replace('.', ',');

    };

    const calcIznos = ({ jedinicna_cijena_bez_pdv, kolicina }) => (
        (Math.floor(jedinicna_cijena_bez_pdv * kolicina * 100) / 100).toString().replace('.', ',')
    )

    return (
        <tr>
            <td className="cd fw-500">
                {item && item.naziv ? item.naziv : ''}
            </td>
            <td className="cl">
                {item && item.jedinicna_cijena_bez_pdv ?
                    currencyFormat(item.jedinicna_cijena_bez_pdv) + ' €' : ''
                }
            </td>
            <td className="cl">
                {item && item.kolicina ?
                    currencyFormat(item.kolicina) + ' kom' : ''
                }
            </td>
            <td>
                <p className="cd fw-500">
                    {item ? calcIznos(item) + ' EUR' : ''}
                </p>
            </td>
        </tr>
    )
}

export default BezgotovinskiTableRow;
