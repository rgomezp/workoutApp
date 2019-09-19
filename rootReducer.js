import { combineReducers } from 'redux';
import {exercises, history} from './components/WorkoutSelector/reducer';
import {holdingArea} from './components/SetContainer/reducer';
import {workoutFilters} from './components/FilterBar/FilterButton/reducer';

const rootReducer = combineReducers({
  exercises,
  holdingArea,
  history,
  workoutFilters
});

export default rootReducer;