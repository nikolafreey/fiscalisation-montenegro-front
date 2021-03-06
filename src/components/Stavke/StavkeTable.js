import React from 'react';
import { useDispatch } from 'react-redux';
import { getStavke } from '../../store/actions/RacuniActions';
import PaginationControls from '../shared/lists/PaginationControls';
import StavkeTableRow from './StavkeTableRow';

const StavkeTable = ({ robe, usluge, filter }) => {
  const dispatch = useDispatch();

  console.log('robe', robe);

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>
                <span className="heading-quaternary">Usluge / Robe</span>
              </th>
              <th>
                <span className="heading-quaternary">Jedinica Mjere</span>
              </th>
              <th>
                <span className="heading-quaternary">Kategorija / Grupa</span>
              </th>
              <th>
                <span className="heading-quaternary txt-right">
                  Cijena sa PDV
                </span>
              </th>
              <th className="w-5">
                <span className="heading-quaternary"> </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {robe &&
              filter !== 'usluge' &&
              filter !== 'robe' &&
              robe?.data?.map((item) => (
                <StavkeTableRow key={item.id} roba={item} />
              ))}
            {usluge &&
              filter !== 'usluge' &&
              filter !== 'robe' &&
              usluge?.data?.map((item) => (
                <StavkeTableRow key={item.id} usluga={item} />
              ))}
          </tbody>
          <tbody>
            {robe &&
              filter === 'robe' &&
              robe?.data?.map((item) => (
                <StavkeTableRow key={item.id} roba={item} />
              ))}
            {usluge &&
              filter === 'usluge' &&
              usluge?.data?.map((item) => (
                <StavkeTableRow key={item.id} usluga={item} />
              ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={robe.total >= usluge.total ? robe : usluge}
        onPageChange={(page) => dispatch(getStavke({ page }))}
      />
    </>
  );
};

export default StavkeTable;
