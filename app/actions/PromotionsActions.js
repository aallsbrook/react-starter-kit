'use strict';

import { dispatchAsync } from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  PROMOTIONS_GET_REQUEST,
  PROMOTIONS_GET_SUCCESS,
  PROMOTIONS_GET_ERROR,
  PROMOTIONS_POST_REQUEST,
  PROMOTIONS_POST_SUCCESS,
  PROMOTIONS_POST_ERROR
} from '../constants/AppConstants';

export default {
  getPromotions: function (appsflyerId) {
    dispatchAsync(WebAPI.getPromotions(appsflyerId), {
      request: PROMOTIONS_GET_REQUEST,
      success: PROMOTIONS_GET_SUCCESS,
      failure: PROMOTIONS_GET_ERROR
    });
  },
  completePromotion: function (promoId, appsflyerId, accept, email) {
    dispatchAsync(WebAPI.completePromotion(promoId, appsflyerId, accept, email), {
      request: PROMOTIONS_POST_REQUEST,
      success: PROMOTIONS_POST_SUCCESS,
      failure: PROMOTIONS_POST_ERROR
    });
  }
};
