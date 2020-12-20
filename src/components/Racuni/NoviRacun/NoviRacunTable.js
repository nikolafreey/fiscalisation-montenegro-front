import React from 'react';
import { useDispatch } from 'react-redux';
import { getStavke } from '../../../store/actions/RacuniActions';
import List from '../../shared/lists/List';
import PaginationControls from '../../shared/lists/PaginationControls';
import NoviRacunTableRow from './NoviRacunTableRow';


const NoviRacunTable = ({ robe, usluge }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <span className="heading-quaternary">Usluge/robe</span>
              </th>
              <th>
                <span className="heading-quaternary">JM</span>
              </th>
              <th>
                <span className="heading-quaternary">Cijena sa PDV</span>
              </th>
              <th>
                <span className="heading-quaternary">Dodaj</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <List
              data={robe.data}
              renderItem={({item}) => <NoviRacunTableRow roba={item}/>}
              onItemClick={() => {}}
            />
            <List
              data={usluge.data}
              renderItem={({item}) => <NoviRacunTableRow usluga={item}/>}
              onItemClick={() => {}}
            />
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={robe.total >= usluge.total ? robe : usluge }
        onPageChange={(page) => dispatch(getStavke({ page }))}
      />
    </>
  );
};

export default NoviRacunTable;
