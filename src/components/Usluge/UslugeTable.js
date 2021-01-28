import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { USLUGE } from '../../constants/routes';
import { getUsluge, setUsluga } from '../../store/actions/UslugeActions';
import { uslugaSelector } from '../../store/selectors/UslugeSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const UslugeTable = ({ usluge }) => {
  const dispatch = useDispatch();

  const usluga = useSelector(uslugaSelector());

  const uslugeRow = ({ item }) => (
    <tr
      onClick={() => dispatch(setUsluga(item))}
      style={{ backgroundColor: usluga.id === item.id ? 'gray' : 'white' }}
    >
      <th scope="row">{item.id}</th>
      <td>{item.naziv}</td>
      <td>{item.opis}</td>
      <td>{Number(item.cijena_bez_pdv).toFixed(2).replace('.', ',')}</td>
      <td>{Number(item.pdv_iznos).toFixed(2).replace('.', ',')}</td>
      <td>{Number(item.ukupna_cijena).toFixed(2).replace('.', ',')}</td>
      <td>{item.status}</td>
    </tr>
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Naziv</th>
            <th scope="col">Opis</th>
            <th scope="col">Cijena</th>
          </tr>
        </thead>
        <tbody>
          <List data={usluge.data} renderItem={uslugeRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={usluge}
        onPageChange={(page) => dispatch(getUsluge({ page }))}
      />
    </>
  );
};

export default UslugeTable;