import { routerActions } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRacuni, setRacun } from '../../store/actions/RacuniActions';
import { racunSelector } from '../../store/selectors/RacuniSelector';
import List from '../shared/lists/List';
import PaginationControls from '../shared/lists/PaginationControls';
import RacuniTableRow from './RacuniTableRow';

const RacuniTable = ({ racuni }) => {
  const dispatch = useDispatch();

  const selectedRacun = useSelector(racunSelector());

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="w-5">
                <span className="heading-quaternary"> </span>
              </th>
              <th>
                <span className="heading-quaternary">Broj</span>
              </th>
              <th>
                <span className="heading-quaternary">Preduzeće/Lice</span>
              </th>
              <th className="dshow-cell">
                <span className="heading-quaternary">Iznos bez PDV</span>
              </th>
              <th className="dshow-cell">
                <span className="heading-quaternary">PDV</span>
              </th>
              <th>
                <span className="heading-quaternary">Iznos sa PDV</span>
              </th>
              <th>
                <span className="heading-quaternary">Status</span>
              </th>

              <th className="w-15">
                <span className="heading-quaternary">Datum</span>
              </th>
              <th className="w-5">
                <span className="heading-quaternary"> </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <List data={racuni.data || []} renderItem={RacuniTableRow} /> */}
            {racuni &&
              racuni.data.map((item) => (
                <RacuniTableRow key={item.id} item={item} racuni={racuni} />
              ))}
          </tbody>
        </table>
      </div>
      <PaginationControls
        paginatedData={racuni}
        onPageChange={(page) => dispatch(getRacuni({ page }))}
      />
    </>
  );
};

export default RacuniTable;
