import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFizickaLica,
  setFizickoLice,
} from '../../store/actions/FizickaLicaActions';
import { getRobe, setRoba } from '../../store/actions/RobeActions';
import { fizickoLiceSelector } from '../../store/selectors/FizickaLicaSelector';
import { robaSelector } from '../../store/selectors/RobeSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const RobeTable = ({ robe }) => {
  const dispatch = useDispatch();

  const roba = useSelector(robaSelector());

  const robaRow = ({ item }) => (
    <tr
      onClick={() => dispatch(setRoba(item))}
      style={{ backgroundColor: roba.id === item.id ? 'gray' : 'white' }}
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
          <List data={robe.data} renderItem={robaRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={robe}
        onPageChange={(page) => dispatch(getRobe({ page }))}
      />
    </>
  );
};

export default RobeTable;
