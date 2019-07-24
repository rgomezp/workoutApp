import { combineReducers } from 'redux';
import {exercises} from './components/WorkoutSelector/reducer';

const rootReducer = combineReducers({
  exercises,
});

export default rootReducer;