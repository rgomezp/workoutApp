import { combineReducers } from 'redux';
import workoutSelectorReducer from './components/WorkoutSelector/reducer';

const navigation = () => ({});

const rootReducer = combineReducers({
  workoutSelectorReducer,
  navigation
});

export default rootReducer;