
const LOAD_DATA_INTO_REDUX = 'LOAD_DATA_INTO_REDUX';

function loadDataIntoRedux(data){
  console.log("loading into redux");
  return { type : LOAD_DATA_INTO_REDUX, data : data }
}

export {loadDataIntoRedux, LOAD_DATA_INTO_REDUX}
