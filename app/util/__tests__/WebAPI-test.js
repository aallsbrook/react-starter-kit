/*eslint no-undef:0*/

import 'babel-core/polyfill';
import WebAPI from '../WebAPI.js';
import { assert } from 'chai';
import PromotionsActions from '../../actions/PromotionsActions';
import Util from '../Util.js';

describe('WebAPI', () => {

  let clock, determineAPIURLMock, getPromoActionMock, getQueryStringValueOfKeyMock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    determineAPIURLMock = sinon.stub(WebAPI, '_determineAPIURL').returns('testingURL');
    getPromoActionMock = sinon.stub(PromotionsActions, 'getPromotions');
    getQueryStringValueOfKeyMock = sinon.stub(Util, 'getQueryStringValueOfKey').returns('123');
  });

  it('Should call getItems successfully', function (done) {
    WebAPI.getItems().then(function (response) {
      assert.equal(response.length, 3, 'Incorrect number of items returned');
      done();
    }, function (error) {
      done(error);
    });
  });

  it('Should call getPromotions successfully', function (done) {

    let promoResponse = {
      body: {
        data: [{
          asdf: 'asdf'
        }]
      }
    };

    let getURLMock = sinon.stub(WebAPI, '_getURL').returns(new Promise((resolve) => {
      resolve(promoResponse);
    }));

    WebAPI.getPromotions('123').then(function (response) {
      assert.equal(response, promoResponse.body.data, 'getPromotions return value not as expected');
      done();
    });

    getURLMock.restore();
  });

  it('Should handle retry correctly in getPromotions', function (done) {

    let promoRetryResponse = {
      body: {
        retry: {
          status: 'retry',
          seconds: 1
        }
      },
      req: {
        url: 'testingURL'
      }
    };

    let getURLMock = sinon.stub(WebAPI, '_getURL').returns(new Promise((resolve) => {
      resolve(promoRetryResponse);
    }));

    WebAPI.getPromotions('123').then(function () {
      clock.tick(1000);
      assert.equal(getPromoActionMock.callCount, 1, 'getPromotions action not called again when retry response given');
      done();
    });

    getURLMock.restore();

  });

  afterEach(() => {
    clock.restore();
    determineAPIURLMock.restore();
    getPromoActionMock.restore();
    getQueryStringValueOfKeyMock.restore();
  });

});
