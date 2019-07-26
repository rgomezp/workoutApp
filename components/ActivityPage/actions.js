const UPDATE_DATA_IN_REDUX = 'UPDATE_DATA_IN_REDUX';

function updateDataInRedux(data){
  return { type : UPDATE_DATA_IN_REDUX, data }
}

export {updateDataInRedux, UPDATE_DATA_IN_REDUX}
