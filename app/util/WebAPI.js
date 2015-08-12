/*eslint camelcase:0*/

'use strict';

import 'core-js/es6/promise';
import Request from 'superagent';

import PromotionsActions from '../actions/PromotionsActions';

import {
  APP_VERSION,
  TEST_SERVER_DOWN_API_URL,
  API_URLS,
  ENV,
  DEFAULT_REQUEST_TIMEOUT,
  CONNECTION_TYPE_NONE,
  PROMOTION_RETRY_STATUS,
  PROMOTION_GIVEUP_STATUS
} from '../constants/AppConstants';


import _ from 'lodash';
import Util from './Util';

export default {
  getItems: function () {
    return new Promise((resolve) => {
      resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
        return {
          id: i,
          label: item
        };
      }));

    });
  },
  getPromotions: function (appsflyerId) {
    return this._getURL(this._determineAPIURL() + '/v4/promotions?appsflyer_uid=' + appsflyerId).then(function (responseObj) {
      if (responseObj.body.retry) {
        if (responseObj.body.retry.status === PROMOTION_RETRY_STATUS) {
          let id = Util.getQueryStringValueOfKey(responseObj.req.url, 'appsflyer_uid');
          setTimeout(function () {
            PromotionsActions.getPromotions(id);
          }, responseObj.body.retry.seconds * 1000);
        } else if (responseObj.body.retry.status === PROMOTION_GIVEUP_STATUS) {
          //give up on checking promotions
          throw new Error('Server requested client give up on promotion retry');
        } else {
          //received unknown retry status from server, handle accordingly
          throw new Error('Received unknown retry status from server for /promotions');
        }
      } else {
        //returns an array of promotion objects
        return responseObj.body.data;
      }
    }, function (error) {
      throw error;
    });
  },
  completePromotion: function (promoId, appsflyerId, accept, email) {
    let postObj = {
      appsflyer_uid: appsflyerId,
      accept: accept,
      email: email
    };
    return this._postURL(this._determineAPIURL() + '/v4/promotions/' + promoId + '/accept', postObj).then(function (responseObj) {
      //return id and accept value
      let splitURL = responseObj.req.url.split('/');
      let id = splitURL[splitURL.length - 2];
      return {
        id: id,
        accept: responseObj.req._data.accept
      };
    }, function (error) {
      throw error;
    });
  },
  getRecommended: function (profile) {
    return this._postURL(this._determineAPIURL() + '/v4/models/recommended', profile).then(function (responseObj) {
      return {
        cloudURL: responseObj.body.cloud,
        data: responseObj.body.data.sections
      };
    }, function (error) {
      throw error;
    });
  },
  getTrimDetails: function (id) {
    return this._getURL(this._determineAPIURL(this) + '/v4/styles/' + id).then(function (responseObj) {
      return {
        cloudURL: responseObj.body.cloud,
        data: responseObj.body.data
      };
    }, function (error) {
      throw error;
    });
  },
  getTrims: function (id) {
    return this._getURL(this._determineAPIURL(this) + '/v4/models/' + id + '/styles').then(function (responseObj) {
        var returnObj = {
          cloudURL: responseObj.body.cloud,
          data: responseObj.body.data
        };
        //lets transform the images string to an array
        for (var x = 0; x < returnObj.length; x++) {
          returnObj[x].gallery_images = returnObj[x].gallery_images.split(' ');
        }
        return returnObj;
      },
      function (error) {
        throw error;
      });
  },
  getStyleListings (id, zip, range, perPage, pageNum) {
    let params = {
      zip: zip,
      range: range,
      per_page: perPage,
      page: pageNum
    };
    return this._getURL(this._determineAPIURL(this) + '/v4/styles/' + id + '/listings', params).then(function (responseObj) {
      let splitUrl = responseObj.req.url.split('/');
      let styleId = splitUrl[splitUrl.length - 2];
      var returnObj = {
        id: styleId,
        paging: responseObj.body.paging,
        data: responseObj.body.data
      };
      return returnObj;
    },
    function (error) {
      throw error;
    });
  },
  getListingDetails (id) {
    return this._getURL(this._determineAPIURL(this) + '/v4/listings/' + id).then(function (responseObj) {
      return responseObj.body.data;
    },
    function (error) {
      throw error;
    });
  },
  saveProfile: function (traits, ranks) {
    const profileURL = this._determineAPIURL(this) + '/v4/profile_preferences/track';
    const data = {
      profile: {
        personal_traits: _.map(traits, 'traitText'),
        ordered_car_attributes: _.map(ranks, 'text')
      }
    };
    const logError = function (error) {
      console.warn('An error occurred during saveProfile ', error);
    };

    return this._postURL(profileURL, data).catch(logError);
  },
  validateZip: function (zip) {
    const zipURL = this._determineAPIURL() + '/v4/check_zipcode';
    let params = {
      zip: zip
    };
    return this._getURL(zipURL, params).then(function (responseObj) {
      return Util.getQueryStringValueOfKey(responseObj.req.url, 'zip');
    }, function (error) {
      throw error;
    });
  },
  _getURL: function (url, params) {
    let that = this;
    return new Promise((resolve, reject) => {
      var networkError = that._checkNetworkStatus();
      if (networkError) {
        reject(networkError);
      }
      var defaultRequestParams = that._getDefaultRequestParams();
      var requestParams = _.assign(defaultRequestParams, params);
      Request
        .get(url)
        .query(requestParams)
        .timeout(DEFAULT_REQUEST_TIMEOUT)
        .end(function (error, response) {
          var hasError = that._checkForError(error, response);
          if (hasError) {
            reject(hasError);
          } else {
            resolve(response);
          }

        });
    });
  },
  _postURL: function (url, data) {
    let that = this;
    return new Promise((resolve, reject) => {
      var networkError = that._checkNetworkStatus();
      if (networkError) {
        reject(networkError);
      }
      Request
        .post(url)
        .set('Content-Type', 'application/json')
        .send(data)
        .timeout(DEFAULT_REQUEST_TIMEOUT)
        .end(function (error, response) {
          var hasError = that._checkForError(error, response);
          if (hasError) {
            reject(hasError);
          } else {
            resolve(response);
          }
        });
    });
  },
  _checkNetworkStatus: function () {
    if ((!!navigator.connection && navigator.connection.type === CONNECTION_TYPE_NONE) || !navigator.onLine) {
      return {
        code: -1
      };
    }
  },
  _checkForError: function (error, response) {
    var errorObj = null;
    if (error) {
      var statusCode = error.status || 0;
      errorObj = {
        code: statusCode,
        message: error.message
      };
    } else if (response.body.error) {
      //the server has returned w/ a 200 status code, but an internal error occurred
      //Liberty approved copy is returned in the message value, we are also returning the 200 status
      //code so the Error component will correctly handle this case
      errorObj = {
        code: response.status,
        internal: response.body.error_message_internal,
        displayMessage: response.body.error_message_for_user
      };
    }
    return errorObj;
  },
  _determineAPIURL: function () {
    // For testing server down condition handeling
    let useServerDownUrl = window.App.state.useServerDownUrl;
    if (!!useServerDownUrl) {
      return TEST_SERVER_DOWN_API_URL;
    }
    return API_URLS[ENV];
  },
  _getDefaultRequestParams: function () {
    //This value is provided via the cordova device plugin, since when testing in a browser cordova isn't
    //available this value defaults to a blank string
    var os_version = '';
    if (window.device) {
      os_version = window.device.version;
    }

    var screenSize = window.screen.availWidth + 'x' + window.screen.availHeight;

    return {
      app_version: APP_VERSION,
      idiom: 'phone',
      os: 'web',
      os_ver: os_version,
      pixels: screenSize,
      dipscale: window.devicePixelRatio,
      client: 'hybrid'
    };
  }
};
