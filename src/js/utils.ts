import { ListElement } from './types';

export const filterByLetter = ( array: string[], inputElement: HTMLInputElement ) => {
  const value = getInputValue( inputElement );

  if ( value ) {
    return array.filter( ( item ) => {
      return item.slice( 0, value.length ) === value.toLowerCase();
    } );
  }

  return [];
};

export const getAbbr = ( array: string[], arrayAbbr: string[], inputElement: HTMLInputElement ) => {
  const value = getInputValue( inputElement );
  const index = array.indexOf( value.toLowerCase() );

  if ( index !== -1 ) {
    return arrayAbbr[ index ];
  }

  return '';
};

export const getListElements = ( list: ListElement ) => {
  return list.querySelectorAll( 'li' );
};

export const getInputValue = ( inputElement: HTMLInputElement ) => {
  return inputElement.value.trim();
};

export const setInputValue = ( inputElement: HTMLInputElement, list: ListElement ) => {
  const items = Array.from( getListElements( list ) );

  if ( items.length ) {
    const item = items.find( ( item ) => {
      return item.classList.contains( 'list__item_active' );
    } );

    if ( item ) {
      inputElement.value = item.textContent || '';
    }
  }
};
