import {LOAD_DATA_INTO_REDUX} from './actions';

const initialState = {exercises: undefined};

function workoutSelectorReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LOAD_DATA_INTO_REDUX:
      console.log("in reducer");
      return {...state, exercises: data,};
    default:
      return state;
  }
}

export {workoutSelectorReducer};