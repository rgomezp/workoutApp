import { combineReducers } from 'redux';
import {exercises, history} from './components/WorkoutSelector/reducer';
import {holdingArea} from './components/SetContainer/reducer';

const rootReducer = combineReducers({
  exercises,
  holdingArea,
  history
});

export default rootReducer;