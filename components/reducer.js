import {SAVE_SETS_TO_HOLDING_AREA, SAVE_REPS_TO_HOLDING_AREA, SAVE_WEIGHT_TO_HOLDING_AREA} from './actions';

const initialState = {sets:"", reps:"", weight:"", notes:""};

/**
 * Stores exercise data in redux temporarily to be saved to local storage
 * @param {Object} state 
 * @param {Object} action 
 */
function holdingArea(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_SETS_TO_HOLDING_AREA:
      return {...state, sets: data.sets}
    case SAVE_REPS_TO_HOLDING_AREA:
      return {...state, reps: data.reps}
    case SAVE_WEIGHT_TO_HOLDING_AREA:
      return {...state, weight: data.weight}
    default:
      return state;
  }
}

export {holdingArea};