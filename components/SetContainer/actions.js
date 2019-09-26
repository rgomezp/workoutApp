const SAVE_SETS_TO_HOLDING_AREA = 'SAVE_SETS_TO_HOLDING_AREA'; 
const SAVE_REPS_TO_HOLDING_AREA = 'SAVE_REPS_TO_HOLDING_AREA';
const SAVE_WEIGHT_TO_HOLDING_AREA = 'SAVE_WEIGHT_TO_HOLDING_AREA'; 
const SAVE_DIFFICULTY_TO_HOLDING_AREA = 'SAVE_DIFFICULTY_TO_HOLDING_AREA';

function holdingArea(data){
  if(data.sets){
    return { type : SAVE_SETS_TO_HOLDING_AREA, data : data }
  } else if (data.reps) {
    return { type : SAVE_REPS_TO_HOLDING_AREA, data : data }
  } else if (data.weight) {
    return { type : SAVE_WEIGHT_TO_HOLDING_AREA, data : data }
  } else if (data.difficulty) { 
    return { type : SAVE_DIFFICULTY_TO_HOLDING_AREA, data : data }
  } else {
    return { type : 'CLEAR_HOLDING_AREA'} // clears holding area (sets everything to undefined)
  }
}

export {holdingArea, SAVE_DIFFICULTY_TO_HOLDING_AREA, SAVE_SETS_TO_HOLDING_AREA, SAVE_REPS_TO_HOLDING_AREA, SAVE_WEIGHT_TO_HOLDING_AREA}
