export interface Options {
  limit: number,
  orderBy: string,
  sort: string,
  parameter: string,
  dateFrom: Date | string,
}

export interface WikipediaResponse {
  batchcomplete: string;
  query: {
    pages: Pages
  }
}

export interface Pages {
  [key: string]: {
    extract: string;
    ns: number;
    pageid: number;
    title: string;
  }
}

export interface PollutedCitiesResponse {
  meta: {
    name: string;
    license: string;
    website: string;
    page: number;
    limit: number;
    found: number;
  };
  results: Measurements[];
}

export interface Measurements {
  city: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  country: string,
  date: {
    local: string,
    utc: string,
  },
  location: string,
  parameter: string,
  unit: string,
  value: number
}

export type ListElement = HTMLUListElement | HTMLOListElement;

export enum KeyboardKeys {
  arrowDown = 'ArrowDown',
  arrowUp = 'ArrowUp',
  enter = 'Enter',
  numpadEnter = 'NumpadEnter',
  escape = 'Escape'
}
