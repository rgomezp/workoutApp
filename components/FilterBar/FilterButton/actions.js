
const BUTTON_PRESSED = 'BUTTON_PRESSED';

function filterButtonPressed(data){
  return { type : BUTTON_PRESSED, data : data }
}

export {filterButtonPressed, BUTTON_PRESSED}
