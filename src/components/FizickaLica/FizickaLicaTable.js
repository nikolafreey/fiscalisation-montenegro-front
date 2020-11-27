import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FIZICKA_LICA } from '../../constants/routes';
import { getFizickaLica } from '../../store/actions/FizickaLicaActions';
import { fizickaLicaSelector } from '../../store/selectors/FizickaLicaSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';

const FizickaLicaTable = () => {
  const dispatch = useDispatch();

  const fizickaLica = useSelector(fizickaLicaSelector());

  useEffect(() => {
    dispatch(getFizickaLica());
  }, [dispatch]);

  const fizickaLicaRow = ({ item }) => (
    <Link to={FIZICKA_LICA.SHOW.replace(':id', item.id)}>
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
      <table class="table">
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
