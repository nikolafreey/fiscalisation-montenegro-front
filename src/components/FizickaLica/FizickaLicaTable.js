import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFizickaLica,
  setFizickoLice,
} from '../../store/actions/FizickaLicaActions';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const FizickaLicaTable = ({ fizickaLica }) => {
  const dispatch = useDispatch();

  const fizickoLice = useSelector(fizickoLiceSelector());

  const fizickaLicaRow = ({ item }) => (
    <tr
      onClick={() => dispatch(setFizickoLice(item))}
      style={{ backgroundColor: fizickoLice.id === item.id ? 'gray' : 'white' }}
    >
      <th scope="row">{item.id}</th>
      <td>{item.ime}</td>
      <td>{item.prezime}</td>
      <td>{item.email}</td>
    </tr>
  );

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">E-mail</th>
          </tr>
        </thead>
        <tbody>
          <List data={fizickaLica.data} renderItem={fizickaLicaRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={fizickaLica}
        onPageChange={(page) => dispatch(getFizickaLica({ page }))}
      />
    </>
  );
};

export default FizickaLicaTable;
