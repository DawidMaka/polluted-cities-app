import { KeyboardKeys, ListElement } from '../types';
import { getListElements } from '../utils';

export const removeHighlightFromListItem = ( list: ListElement ) => {
  const items = getListElements( list );

  if ( items.length ) {
    items.forEach( ( item ) => {
      item.classList.remove( 'list__item_active' );
    } );
  }
};

export const highlightListItemByMouse = ( e: MouseEvent, list: ListElement ) => {
  if ( ( e.target as HTMLLIElement ).nodeName === 'LI' ) {
    removeHighlightFromListItem( list );
    ( <Element>e.target ).closest( '.list__item' )!.classList.add( 'list__item_active' );
  }
};

export const highlightListItemByKey = ( e: KeyboardEvent, list: ListElement ) => {
  const items = Array.from( getListElements( list ) );

  if ( items.length ) {
    let index = items.findIndex( ( item ) => {
      return item.classList.contains( 'list__item_active' );
    } );

    removeHighlightFromListItem( list );

    if ( e.code === KeyboardKeys.arrowDown ) {
      index = index === items.length - 1 ? 0 : ++index;
    } else if ( e.code === KeyboardKeys.arrowUp ) {
      index = index <= 0 ? items.length - 1 : --index;
    }

    items[ index ].classList.add( 'list__item_active' );
  }
};
