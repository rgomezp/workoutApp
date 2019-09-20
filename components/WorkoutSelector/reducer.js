import {LOAD_DATA_INTO_REDUX, LOAD_HISTORY_INTO_REDUX} from './actions';
import { UPDATE_HISTORY_IN_REDUX } from '../WorkoutPage/actions';

const initialState = {};

function exercises(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LOAD_DATA_INTO_REDUX:
      return {...state, ...data};
    default:
      return state;
  }
}

function history(state = {}, action) {
  const {type, data} = action;
  switch (type) {
    case LOAD_HISTORY_INTO_REDUX:
      return {...state, ...data}
    case UPDATE_HISTORY_IN_REDUX:
      return {...state, ...data}
    default:
      return state;
  }
}

export {exercises, history};