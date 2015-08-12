'use strict';

import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const ENV = pkg.env;

export const APP_TITLE = pkg.name;
export const APP_VERSION = pkg.version || '3.0.0';

// Generate a CORS error.
// export const TEST_SERVER_DOWN_API_URL = 'http://lmig.dvia.com.s3-website-us-east-1.amazonaws.com/carzen';

// Generate a timeout
export const TEST_SERVER_DOWN_API_URL = 'http://1.1.1.1:1023';
//export const TEST_SERVER_DOWN_API_URL = 'http://localhost:1234';

export const API_URLS = {
  development: 'http://shared-dev.carzen.com',
  staging: 'http://staging.carzen.com',
  production: 'https://api.carzen.com'
};

export const DEFAULT_REQUEST_TIMEOUT = 10000; //in milliseconds

export const ERROR_UPDATED = 'ERROR_UPDATED';
export const PROFILE_UPDATED = 'PROFILE_UPDATED';

export const INTERVIEW_COMPLETED = 'INTERVIEW_COMPLETED';

export const ITEMS_GET_REQUEST = 'ITEMS_GET_REQUEST';
export const ITEMS_GET_SUCCESS = 'ITEMS_GET_SUCCESS';
export const ITEMS_GET_ERROR = 'ITEMS_GET_ERROR';
export const ITEMS_UPDATED = 'ITEMS_UPDATED';

export const PROMOTIONS_POST_REQUEST = 'PROMOTIONS_POST_REQUEST';
export const PROMOTIONS_POST_SUCCESS = 'PROMOTIONS_POST_SUCCESS';
export const PROMOTIONS_POST_ERROR = 'PROMOTIONS_POST_ERROR';

export const PROMOTIONS_GET_REQUEST = 'PROMOTIONS_GET_REQUEST';
export const PROMOTIONS_GET_SUCCESS = 'PROMOTIONS_GET_SUCCESS';
export const PROMOTIONS_GET_ERROR = 'PROMOTIONS_GET_ERROR';
export const PROMOTIONS_UPDATED = 'PROMOTIONS_UPDATED';

export const RECOMMENDED_GET_REQUEST = 'RECOMMENDED_GET_REQUEST';
export const RECOMMENDED_GET_SUCCESS = 'RECOMMENDED_GET_SUCCESS';
export const RECOMMENDED_GET_ERROR = 'RECOMMENDED_GET_ERROR';
export const RECOMMENDED_UPDATED = 'RECOMMENDED_UPDATED';

export const TRIM_DETAILS_GET_REQUEST = 'TRIM_DETAILS_GET_REQUEST';
export const TRIM_DETAILS_GET_SUCCESS = 'TRIM_DETAILS_GET_SUCCESS';
export const TRIM_DETAILS_GET_ERROR = 'TRIM_DETAILS_GET_ERROR';
export const TRIM_DETAILS_UPDATED = 'TRIM_DETAILS_UPDATED';

export const TRIMS_GET_REQUEST = 'TRIMS_GET_REQUEST';
export const TRIMS_GET_SUCCESS = 'TRIMS_GET_SUCCESS';
export const TRIMS_GET_ERROR = 'TRIMS_GET_ERROR';
export const TRIMS_UPDATED = 'TRIMS_UPDATED';

export const STYLE_LISTINGS_GET_REQUEST = 'STYLE_LISTINGS_GET_REQUEST';
export const STYLE_LISTINGS_GET_SUCCESS = 'STYLE_LISTINGS_GET_SUCCESS';
export const STYLE_LISTINGS_GET_ERROR = 'STYLE_LISTINGS_GET_ERROR';
export const STYLE_LISTINGS_UPDATED = 'STYLE_LISTINGS_UPDATED';

export const STYLE_LISTINGS_PER_PAGE = 40;
export const STYLE_LISTINGS_RANGE = 50;

export const LISTING_DETAILS_GET_REQUEST = 'LISTING_DETAILS_GET_REQUEST';
export const LISTING_DETAILS_GET_SUCCESS = 'LISTING_DETAILS_GET_SUCCESS';
export const LISTING_DETAILS_GET_ERROR = 'LISTING_DETAILS_GET_ERROR';
export const LISTING_DETAILS_UPDATED = 'LISTING_DETAILS_UPDATED';

export const VALIDATE_ZIPCODE_REQUEST = 'VALIDATE_ZIPCODE_REQUEST';
export const VALIDATE_ZIPCODE_SUCCESS = 'VALIDATE_ZIPCODE_SUCCESS';
export const VALIDATE_ZIPCODE_ERROR = 'VALIDATE_ZIPCODE_ERROR';

//Keys used to identify data saved in Local Storage
export const TRAITS_KEY = 'traits';
export const ATTRIBUTE_RANK_KEY = 'ranked_attributes';
export const ZIPCODE_KEY = 'zipcode';
export const CONNECTION_TYPE_NONE = 'NONE';

export const GET_A_QUOTE_DEFAULT_URL_PARAMS = 'cmpgnde=202&keyCode=ADHEM&src=lm-ddis-aut-czn1501101814';

//status values used in API responses
export const PROMOTION_RETRY_STATUS = 'retry';
export const PROMOTION_GIVEUP_STATUS = 'give_up';

export const PROMO_ACCEPT_TERMS = '1';
export const PROMO_DECLINE_TERMS = '0';

export const DEFAULT_ROUTE = 'recommended';
export const INITIAL_DEFAULT_ROUTE = 'interview';

export const LM_MOBILE_URLS = {
  development: 'https://ete-mobile.libertymutual.com/',
  staging: 'https://ete-mobile.libertymutual.com/',
  production: 'https://mobile.libertymutual.com/'
};
