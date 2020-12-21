import React from 'react';
import { LIST, GRID } from '../../../constants/layout';
import { ReactComponent as ListIcon } from '../../../assets/icon/list.svg';
import { ReactComponent as GridIcon } from '../../../assets/icon/grid.svg';

const ChooseView = ({ view, setView }) => {
  return (
    <div className="grid-view">
      <button
        className={'btn xs' + (view === LIST ? ' active' : '')}
        onClick={() => setView(LIST)}
      >
        <ListIcon stroke={view === LIST ? "currentColor" : "#F9FAFB"} />
      </button>
      <button
        className={'btn xs' + (view === GRID ? ' active' : '')}
        onClick={() => setView(GRID)}
      >
        <GridIcon stroke={view === GRID ? "currentColor" : "#F9FAFB"}/>
      </button>
    </div>
  );
};

export default ChooseView;
