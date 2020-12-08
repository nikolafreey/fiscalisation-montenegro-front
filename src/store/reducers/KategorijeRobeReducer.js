import produce from 'immer';
import {
  SET_KATEGORIJE_ROBE,
  SET_PODKATEGORIJE_ROBE,
} from '../actionTypes/KategorijeRobeActionTypes';

const initialState = {
  kategorijeRobe: [],
  podkategorijeRobe: []
};

const kategorijeRobeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_KATEGORIJE_ROBE:
        draft.kategorijeRobe = action.payload;
        break;
      case SET_PODKATEGORIJE_ROBE:
        draft.podkategorijeRobe = action.payload;
        break;
      default:
        break;
    }
  });

export default kategorijeRobeReducer;
