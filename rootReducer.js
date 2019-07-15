import { combineReducers } from 'redux';
import {workoutSelectorReducer} from './components/WorkoutSelector/reducer';

const rootReducer = combineReducers({
  workoutSelectorReducer,
});

export default rootReducer;