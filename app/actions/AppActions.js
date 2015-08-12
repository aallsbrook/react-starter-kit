'use strict';

import { dispatchAsync } from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  ITEMS_GET_REQUEST,
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR,
  RECOMMENDED_GET_REQUEST,
  RECOMMENDED_GET_SUCCESS,
  RECOMMENDED_GET_ERROR,
  TRIM_DETAILS_GET_REQUEST,
  TRIM_DETAILS_GET_SUCCESS,
  TRIM_DETAILS_GET_ERROR,
  TRIMS_GET_REQUEST,
  TRIMS_GET_SUCCESS,
  TRIMS_GET_ERROR,
  STYLE_LISTINGS_GET_REQUEST,
  STYLE_LISTINGS_GET_SUCCESS,
  STYLE_LISTINGS_GET_ERROR,
  LISTING_DETAILS_GET_REQUEST,
  LISTING_DETAILS_GET_SUCCESS,
  LISTING_DETAILS_GET_ERROR,
  VALIDATE_ZIPCODE_REQUEST,
  VALIDATE_ZIPCODE_SUCCESS,
  VALIDATE_ZIPCODE_ERROR
} from '../constants/AppConstants';

export default {
  getItems: function () {
    dispatchAsync(WebAPI.getItems(), {
      request: ITEMS_GET_REQUEST,
      success: ITEMS_GET_SUCCESS,
      failure: ITEMS_GET_ERROR
    });
  },
  getRecommended: function (profile) {
    dispatchAsync(WebAPI.getRecommended(profile), {
      request: RECOMMENDED_GET_REQUEST,
      success: RECOMMENDED_GET_SUCCESS,
      failure: RECOMMENDED_GET_ERROR
    });
  },
  getTrimDetails: function (id) {
    dispatchAsync(WebAPI.getTrimDetails(id), {
      request: TRIM_DETAILS_GET_REQUEST,
      success: TRIM_DETAILS_GET_SUCCESS,
      failure: TRIM_DETAILS_GET_ERROR
    });
  },
  getTrims: function (id) {
    dispatchAsync(WebAPI.getTrims(id), {
      request: TRIMS_GET_REQUEST,
      success: TRIMS_GET_SUCCESS,
      failure: TRIMS_GET_ERROR
    });
  },
  getStyleListings: function (id, zip, range, perPage, pageNum) {
    dispatchAsync(WebAPI.getStyleListings(id, zip, range, perPage, pageNum), {
      request: STYLE_LISTINGS_GET_REQUEST,
      success: STYLE_LISTINGS_GET_SUCCESS,
      failure: STYLE_LISTINGS_GET_ERROR
    });
  },
  getListingDetails: function (id) {
    dispatchAsync(WebAPI.getListingDetails(id), {
      request: LISTING_DETAILS_GET_REQUEST,
      success: LISTING_DETAILS_GET_SUCCESS,
      failure: LISTING_DETAILS_GET_ERROR
    });
  },
  validateZip: function (zip) {
    dispatchAsync(WebAPI.validateZip(zip), {
      request: VALIDATE_ZIPCODE_REQUEST,
      success: VALIDATE_ZIPCODE_SUCCESS,
      failure: VALIDATE_ZIPCODE_ERROR
    });
  }
};
