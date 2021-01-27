import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { getUsluge, deleteUsluga } from '../../store/actions/UslugeActions';
import { ReactComponent as IconLg } from '../../assets/icon/icon-lg.svg';
import { ReactComponent as Obrisi } from '../../assets/icon/obrisi.svg';
import { ReactComponent as Izmjeni } from '../../assets/icon/izmjeni.svg';

const UslugeTableRow = ({ usluga = {}, roba = {} }) => {
    // console.log(roba)
    // console.log(usluga)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleIzmjeni = (id) => {
        history.push(`/usluge/edit/${id}`);
    }

    const handleObrisi = (id) => {
        dispatch(deleteUsluga(id))
        dispatch(getUsluge());
    }

    return (
        <>
            <tr>
                <td>
                    <p>{usluga && usluga.naziv || roba && roba.roba && roba.roba.naziv}</p>
                    <h3 className="heading-quaternary">{usluga && usluga.opis || roba && roba.roba && roba.roba.opis}</h3>
                </td>
                <td className="cl">
                    {usluga && usluga.jedinica_mjere?.naziv || roba && roba.roba && roba.roba.jedinica_mjere?.naziv}
                </td>
                <td className="cl">
                    {usluga && usluga.grupa?.naziv}
                </td>
                <td className="cd fw-500 txt-right">
                    <p>
                        {usluga && usluga.ukupna_cijena && usluga.ukupna_cijena.replace('.', ',') + '€' ||
                            roba && roba.roba && roba.roba.cijene_roba[0]?.ukupna_cijena.replace('.', ',') + '€'}
                    </p>
                </td>
                <td>
                    <div className="df jc-end ai-c">
                        <button className="btn btn__light btn__xs">
                            <IconLg />
                            <div className="drop-down">
                                <a onClick={() => handleIzmjeni(usluga.id || roba.roba.id)}>
                                    <Izmjeni />
                Izmjeni
              </a>
                                <a onClick={() => handleObrisi(usluga.id || roba.roba.id)}>
                                    <Obrisi />
                Obriši
              </a>
                            </div>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}


export default UslugeTableRow;