import {UPDATE_DATA_IN_REDUX} from './actions';

const initialState = {};

function exercises(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case UPDATE_DATA_IN_REDUX:
      return {...state, ...data};
    default:
      return state;
  }
}

export {exercises};