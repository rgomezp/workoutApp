import { combineReducers } from 'redux';
import {exercises} from './components/WorkoutSelector/reducer';
import {holdingArea} from './components/reducer';

const rootReducer = combineReducers({
  exercises,
  holdingArea
});

export default rootReducer;