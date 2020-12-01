import axios, { AxiosResponse } from 'axios';
import { Options, Measurements, PollutedCitiesResponse, WikipediaResponse } from '../types';
import { PollutedAPI, WikiAPI } from '../base';
import 'regenerator-runtime/runtime';

const setDate = ( date: Date | string ) => {
  if ( date instanceof Date ) {
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice( -2 );
    const day = `0${date.getUTCDate()}`.slice( -2 );

    return `${year}-${month}-${day}`;
  }

  return date;
};

const setTitles = ( items: Measurements[] ) => {
  const str = items.map( ( { city } ) => {
    return city.split( '/' )[ 0 ];
  } );

  return encodeURIComponent( str.join( '|' ) );
};

const filterByDuplicates = ( items: Measurements[] ) => {
  const arr = items.filter( ( item, index, array ) => {
    return index === array.findIndex( ( { city } ) => {
      return city === item.city;
    } );
  } );

  arr.splice( 10 );
  return arr;
};

export default class Search {
  constructor(
    readonly country: string,
    readonly options: Options
  ) {}

  async getPollutedCities() {
    const { limit, orderBy, sort, parameter, dateFrom } = this.options;
    const country  = this.country;
    const pollutedCities: AxiosResponse<PollutedCitiesResponse> = await axios( `${PollutedAPI}${ country }&limit=${ limit }&order_by=${ orderBy }&sort=${ sort }&parameter=${ parameter }&date_from=${ setDate( dateFrom ) }` );
    const arrByDuplicates = filterByDuplicates( pollutedCities.data.results );
    const wikipediaResponse: AxiosResponse<WikipediaResponse> = await axios( `${WikiAPI}${ setTitles( arrByDuplicates ) }` );
    const { data: { query: { pages } } } = wikipediaResponse;

    return pages;
  }
}
