export const PollutedAPI = 'https://api.openaq.org/v1/measurements?country=';

export const WikiAPI = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&explaintext&redirects=1&prop=extracts&exintro&exsentences=2&titles=';

export const countries = [ 'poland', 'germany', 'spain', 'france' ];

export const countriesAbbr = [ 'PL', 'DE', 'ES', 'FR' ];

export const elements = {
  form: document.querySelector( '.form' ) as HTMLFormElement,
  searchInput: document.querySelector( '[name="country"]' ) as HTMLInputElement,
  searchButton: document.querySelector( '.form__button' ) as HTMLButtonElement,
  autocompleteList: document.querySelector( '.list_autocomplete' ) as HTMLUListElement,
  cityList: document.querySelector( '.list_cities' ) as HTMLUListElement,
  error: document.querySelector( '.error' ) as HTMLElement
};
