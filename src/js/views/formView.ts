export const disableFormElements = ( formElement: HTMLFormElement ) => {
  const formElements = Array.from( formElement.elements );

  formElements.forEach( ( element ) => {
    element.setAttribute( 'disabled', 'true' );
  } );
};

export const enableFormElements = ( formElement: HTMLFormElement ) => {
  const formElements = Array.from( formElement.elements );

  formElements.forEach( ( element ) => {
    element.removeAttribute( 'disabled' );
  } );
};
