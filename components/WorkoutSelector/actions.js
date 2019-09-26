const LOAD_DATA_INTO_REDUX = 'LOAD_DATA_INTO_REDUX';
const LOAD_HISTORY_INTO_REDUX = 'LOAD_HISTORY_INTO_REDUX';

function loadDataIntoRedux(data){
  return { type : LOAD_DATA_INTO_REDUX, data }
}

function loadHistoryIntoRedux(data){
  return { type : LOAD_HISTORY_INTO_REDUX, data }
}

export {loadDataIntoRedux, loadHistoryIntoRedux, LOAD_HISTORY_INTO_REDUX, LOAD_DATA_INTO_REDUX}
