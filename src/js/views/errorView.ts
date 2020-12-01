export const displayError = ( element: HTMLElement, text: string ) => {
  element.textContent = text;
};

export const hideError = ( element: HTMLElement ) => {
  element.textContent = '';
};
