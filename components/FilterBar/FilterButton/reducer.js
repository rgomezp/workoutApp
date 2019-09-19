import {FILTER_BUTTON_PRESSED} from './actions';

function workoutFilters(state = {}, action) {
  const { type, data } = action;
  var key;
  if (data) {
    key = Object.keys(data);
  }

  switch (type) {
    case FILTER_BUTTON_PRESSED:
      if (key == "Upper") {
        return {...state, upper: data.Upper}
      } else if (key == "Legs") {
        return {...state, legs: data.Legs}
      } else if (key == "Core") {
        return {...state, core: data.Core}
      } else if (key == "Cardio") {
        return {...state, cardio: data.Cardio}
      }
    default:
      return {...state};
  }
}

export {workoutFilters};