// Application wide configuration
export const SITE_NAME = 'ThaiProperty.in.th';

// default API endpoint url
export const API_BASE_URL_DEV = 'http://localhost:5000/api';
export const API_BASE_URL_DEV_HTTPS = 'https://localhost:5001/api';
export const API_BASE_URL_PROD = 'http://react.thaiproperty.in.th/api';

// Google Map
export const GOOGLE_MAP_API_KEY = 'AIzaSyDCQ3Jlt7fPokdW1bs2jRcwf46l7kYJx5k';
export const GOOGLE_MAP_DEFAULT_ZOOM = 13;
export const GOOGLE_MAP_DEFAULT_CENTER = {
  lat: 13.754231,
  lng: 100.560095
};
export const GOOGLE_CLUSTERER_GRID_SIZE = 20; // how far to group nearest marker into cluster

// message notifications options
export const SHOW_MESSAGE_DURATION = 5; // seconds
export const SHOW_MESSAGE_DURATION_EXTENDED = 10; // seconds

export const getApiServerUrl = () => {
    if ((process.env && process.env.NODE_ENV === 'development') || process.env.NODE_ENV === 'test') {
      return API_BASE_URL_DEV;
    } else {
      return API_BASE_URL_PROD;
    }
}

export class ConsoleColor 
{
    static REQUEST = 'background:#3366aa; color: #ffffff; font-weight: bold';
    static RESPONSE = 'background:#33aa66; color: #ffffff; font-weight: bold';
}