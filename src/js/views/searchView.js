import { abbr, elements } from '../base';
import { getItems } from '../views/autocompleteView';

export const getInputValue = () => elements.searchInput.value.trim();

export const setInputValue = () => {
	const items = Array.from( getItems() );	

	if ( items.length ) {
		items.find( item => {
			if( item.classList.contains( 'list__item_active' ) ) {
				elements.searchInput.value = item.textContent;
			}			
		} );		
	}
};

export const getAbbr = ( items ) => {
	const value = getInputValue().toLowerCase();
	const index = items.indexOf( value );

	return abbr[ index ];
};

export const clearCities = () => {
	elements.cityList.innerHTML = '';
};

export const displayCities = ( items ) => {
	const ids = Object.keys( items );	

	const html = ids.map( id => {
		return `
			<li class="list__item">
				<h2>${ items[ id ].title }</h2>
				<p>${ items[ id ].extract }</p>
			</li>
		`
	} );

	elements.cityList.insertAdjacentHTML( 'beforeend', html.join( '' ) );
};
