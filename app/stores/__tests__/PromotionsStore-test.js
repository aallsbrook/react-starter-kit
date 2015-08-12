/*eslint camelcase:0*/

import 'babel-core/polyfill';
import PromotionsStore from '../PromotionsStore.js';
import { assert } from 'chai';

describe('PromotionsStore', () => {

  let promosArray = [
    {
      promotion_id: 1,
      appsflyer_uid: '1434973963000-7381494',
      promotion_src: 'czn-swp-bah-rightbanner',
      promotion_cmpgncde: '2914',
      promotion_webid: '0000000128'
    }
  ];

  it('Should set and get promos', function () {
    PromotionsStore.setPromos(promosArray);

    let expectedPromosObj = {
      1: promosArray[0]
    };

    assert.deepEqual(PromotionsStore.getPromos(), expectedPromosObj, 'promo not successfully set or returned');
  });

  it('Should check for available promos', function () {
    //PromotionsStore.setPromos(promosArray);
    assert(PromotionsStore.isPromoAvailable(), 'promo not being seen as available');
  });

  it('Should get available promo id successfully', function () {
    assert.equal(PromotionsStore.getAvailablePromo(), promosArray[0].promotion_id, 'getAvailablePromo did not return the expected id');
  });

  it('Should get a promo object by id', function () {
    assert.deepEqual(PromotionsStore.getPromo(1), promosArray[0], 'getPromo did not return the expected promo object');
  });

  it('Should mark a promo as complete', function () {

    let promoResponse = '1';

    PromotionsStore.markPromoAsCompleted(promosArray[0].promotion_id, promoResponse);

    assert(PromotionsStore.getPromo(promosArray[0].promotion_id).completed, 'promo not marked as completed');
    assert.equal(PromotionsStore.getPromo(promosArray[0].promotion_id).accept, promoResponse, 'promo response value not recorded correctly on promo obj');
    assert.isFalse(PromotionsStore.isPromoAvailable(), 'promo not successfully marked as complete, and is being returned by isPromoAvailable');
    assert.isUndefined(PromotionsStore.getAvailablePromo(), 'promo not successfully marked as complete, and is being returned by getAvailablePromo');
  });

});
