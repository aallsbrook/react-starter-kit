import 'core-js/es6/promise';
import Request from 'superagent';
import _ from 'lodash';

import {
  DEFAULT_REQUEST_TIMEOUT
} from '../constants/AppConstants';

export default {
  getTodoItems: function () {
    //until mock server is setup, just return some fake data here
    return new Promise((resolve) => {
      resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
        return {
          id: i,
          description: item
        };
      }));
    });
    /*
    return this._getURL('/todoItems').then(function (responseObj) {
      return responseObj.body.items;
    }, function (error) {
      throw error;
    });
    */
  },
  _getURL: function (url) {
    return new Promise((resolve, reject) => {
      Request
        .get(url)
        .timeout(DEFAULT_REQUEST_TIMEOUT)
        .end(function (error, response) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
    });
  }
};
