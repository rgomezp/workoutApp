const TYPE_BUTTON_PRESSED = 'TYPE_BUTTON_PRESSED';

function typeButtonPressed(data){
  return { type : TYPE_BUTTON_PRESSED, data : data }
}

export {typeButtonPressed, TYPE_BUTTON_PRESSED}
