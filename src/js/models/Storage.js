export const getData = ( name ) => {
	return JSON.parse( localStorage.getItem( name ) || '""' );
}

export const setData = ( name, data ) => {
	localStorage.setItem( name, JSON.stringify( data )  );
}
