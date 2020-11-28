import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PREDUZECA } from '../../constants/routes';
import { getFizickaLica } from '../../store/actions/FizickaLicaActions';
import { getPreduzeca } from '../../store/actions/PreduzecaActions';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const PreduzecaTable = ({ preduzeca }) => {
  const dispatch = useDispatch();

  const preduzecaRow = ({ item }) => (
    <Link to={PREDUZECA.SHOW.replace(':id', item.id)}>
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.ime}</td>
        <td>{item.prezime}</td>
        <td>{item.email}</td>
      </tr>
    </Link>
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
          <List data={preduzeca.data} renderItem={preduzecaRow} />
        </tbody>
      </table>
      <PaginationControls
        paginatedData={preduzeca}
        onPageChange={(page) => dispatch(getPreduzeca({ page }))}
      />
    </>
  );
};

export default PreduzecaTable;
