import {TYPE_BUTTON_PRESSED} from './actions';

function addWorkoutTypePicker(state = {}, action) {
  const { type, data } = action;

  switch (type) {
    case TYPE_BUTTON_PRESSED:
      return {workoutType : data.type}
    default:
      return {...state};
  }
}

export {addWorkoutTypePicker};