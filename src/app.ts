import './css/app.scss';
import { Pages, Options, KeyboardKeys } from './js/types';
import Search from './js/models/search';
import { getData } from './js/models/storage';
import { elements, countries, countriesAbbr } from './js/base';
import { filterByLetter, getAbbr, setInputValue } from './js/utils';
import { clearList, displayList } from './js/views/listView';
import { displayError, hideError } from './js/views/errorView';
import { displayLoader, removeLoader } from './js/views/loaderView';
import { disableFormElements, enableFormElements } from './js/views/formView';
import { removeHighlightFromListItem, highlightListItemByKey, highlightListItemByMouse } from './js/views/listItemView';

const state: {
  search?: {
    country: string
    options: Options
    getPollutedCities(): Promise<Pages>
  }
} = {};

const controlSearch = async () => {
  const abbr = getAbbr( countries, countriesAbbr, elements.searchInput );

  if ( abbr ) {
    state.search = new Search( abbr, {
      limit: 50,
      orderBy: 'value',
      sort: 'desc',
      parameter: 'pm25',
      dateFrom: new Date()
    } );

    disableFormElements( elements.form );
    hideError( elements.error );
    displayLoader( elements.cityList );
    clearList( [ elements.autocompleteList, elements.cityList ] );

    try {
      const pollutedCities = await state.search.getPollutedCities();
      displayList( pollutedCities, elements.cityList );
    } catch ( error ) {
      displayError( elements.error, 'Something went wrong, please try again' );
    }

    enableFormElements( elements.form );
    removeLoader( '.loader' );
  } else {
    displayError( elements.error, 'Wrong country provided' );
  }
};

elements.searchInput.addEventListener( 'keyup', ( e ) => {
  if ( e.code === KeyboardKeys.arrowDown ) {
    highlightListItemByKey( e, elements.autocompleteList );
    return;
  } else if ( e.code === KeyboardKeys.arrowUp ) {
    highlightListItemByKey( e, elements.autocompleteList );
    return;
  } else if ( e.code === KeyboardKeys.enter || e.code === KeyboardKeys.numpadEnter ) {
    setInputValue( elements.searchInput, elements.autocompleteList );
    controlSearch();
    return;
  } else if ( e.code === KeyboardKeys.escape ) {
    ( <HTMLInputElement>e.target ).value = '';
  }

  clearList( [ elements.autocompleteList ] );
  displayList( filterByLetter( countries, elements.searchInput ), elements.autocompleteList );
} );

elements.searchInput.addEventListener( 'keydown', ( e ) => {
  if ( e.code === KeyboardKeys.arrowUp || e.code === KeyboardKeys.enter || e.code === KeyboardKeys.numpadEnter ) {
    e.preventDefault();
  }
} );

elements.autocompleteList.addEventListener( 'mouseleave', () => {
  removeHighlightFromListItem( elements.autocompleteList );
} );

elements.autocompleteList.addEventListener( 'mouseover', ( e ) => {
  highlightListItemByMouse( e, elements.autocompleteList );
} );

window.addEventListener( 'click', ( e ) => {
  if ( ( <HTMLElement>e.target ).matches( '.list_autocomplete .list__item, .list_autocomplete .list__item *, .btn-primary' ) ) {
    setInputValue( elements.searchInput, elements.autocompleteList );
    controlSearch();
    return;
  }

  clearList( [ elements.autocompleteList ] );
  const targetElement = e.target as HTMLInputElement;

  if ( targetElement.matches( '[name="country"]' ) && !targetElement.disabled ) {
    displayList( filterByLetter( countries, elements.searchInput ), elements.autocompleteList );
  }
} );

window.addEventListener( 'load', () => {
  const value = getData( 'inputValue' );
  elements.searchInput.value = value;
} );
