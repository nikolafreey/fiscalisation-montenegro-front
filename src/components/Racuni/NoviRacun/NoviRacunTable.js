import React from 'react';
import { useDispatch } from 'react-redux';
import { LIST } from '../../../constants/layout';
import { getStavke } from '../../../store/actions/RacuniActions';
import List from '../../shared/lists/List';
import PaginationControls from '../../shared/lists/PaginationControls';
import NoviRacunTableRow from './NoviRacunTableRow';


const NoviRacunTable = ({ robe, usluge, view }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={view === LIST ? "table-wrapper" : "table-wrapper-grid-view"}>
        <table className={view === LIST ? "table" : "table-grid-view"}>
          <thead>
            <tr className={view === LIST ? "" : "d-none"}>
              <th className="w-45 mob-w-100">
                <span className="heading-quaternary">Usluge/robe</span>
              </th>
              <th className="w-7">
                <span className="heading-quaternary">JM</span>
              </th>
              <th className="w-23 txt-right">
                <span className="heading-quaternary">Cijena sa PDV</span>
              </th>
              <th className="w-25">
                <span className="heading-quaternary">Dodaj</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <List
              data={robe.data}
              renderItem={({item}) => <NoviRacunTableRow key={item.id} roba={item}/>}
              onItemClick={() => {}}
            />
            <List
              data={usluge.data}
              renderItem={({item}) => <NoviRacunTableRow key={item.id} usluga={item}/>}
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
