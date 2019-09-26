const UPDATE_DATA_IN_REDUX = 'UPDATE_DATA_IN_REDUX';
const UPDATE_HISTORY_IN_REDUX = 'UPDATE_HISTORY_IN_REDUX';

function updateDataInRedux(data){
  return { type : UPDATE_DATA_IN_REDUX, data }
}

function updateHistoryInRedux(data){
  return { type : UPDATE_HISTORY_IN_REDUX, data }
}

export {updateDataInRedux, updateHistoryInRedux, UPDATE_HISTORY_IN_REDUX, UPDATE_DATA_IN_REDUX} 