const FILTER_BUTTON_PRESSED = 'FILTER_BUTTON_PRESSED';

function filterButtonPressed(data){
  return { type : FILTER_BUTTON_PRESSED, data : data }
}

export {filterButtonPressed, FILTER_BUTTON_PRESSED}
