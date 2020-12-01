import { Pages, ListElement } from '../types';
import { setData } from '../models/storage';
import { elements } from '../base';
import { getInputValue } from '../utils';

export const clearList = ( list: ( ListElement )[] ) => {
  const value = getInputValue( elements.searchInput );
  setData( 'inputValue', value );

  list.forEach( ( element ) => {
    return element.innerHTML = '';
  } );
};

export const displayList = ( items: Pages | string[], list: ListElement ) => {
  let html: string[];

  if ( items instanceof Array ) {
    html = items.map( ( item ) => {
      return `
		      <li class="list__item">${ item.charAt( 0 ).toUpperCase() + item.slice( 1 ).toLowerCase() }</li>
		    `;
    } );
  } else {
    const ids = Object.keys( items );
    html = ids.map( ( id ) => {
      return `
        <li class="list__item">
          <h2>${ items[ id ].title }</h2>
          <p>${ items[ id ].extract }</p>
        </li>
      `;
    } );
  }

  list.insertAdjacentHTML( 'beforeend', html.join( '' ) );
};
