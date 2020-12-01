export const getData = ( name: string ): string => {
  return JSON.parse( localStorage.getItem( name ) || '""' );
};

export const setData = ( name: string, data: string ) => {
  localStorage.setItem( name, JSON.stringify( data )  );
};
