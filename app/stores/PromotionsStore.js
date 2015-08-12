'use strict';

import _LocalStorageBaseStore from './_LocalStorageBaseStore';
import { register } from '../dispatcher/AppDispatcher';

import {
  PROMOTIONS_GET_SUCCESS,
  PROMOTIONS_UPDATED,
  PROMOTIONS_POST_SUCCESS
} from '../constants/AppConstants';

class PromotionsStore extends _LocalStorageBaseStore {

  constructor (...args) {
    super(...args);
  }

  emitChange () {
    this.emit(PROMOTIONS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(PROMOTIONS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(PROMOTIONS_UPDATED, callback);
  }

  isPromoAvailable () {
    let tempPromos = this.getPromos();
    for (let id in tempPromos) {
      if (!tempPromos[id].completed) {
        return true;
      }
    }
    return false;
  }

  getAvailablePromo () {
    let tempPromos = this.getPromos();
    for (let id in tempPromos) {
      if (!tempPromos[id].completed) {
        return id;
      }
    }
  }

  getPromo (id) {
    let tempPromos = this.getPromos();
    return tempPromos[id];
  }

  getPromos () {
    let promos = this.get('promos');
    if (promos) {
      return JSON.parse(promos);
    } else {
      return {};
    }
  }

  setPromos (promos) {
    let tempPromos = this.getPromos();
    for (let x = 0; x < promos.length; x++) {
      tempPromos[promos[x].promotion_id] = promos[x];
    }
    this.set('promos', JSON.stringify(tempPromos));
    this.emitChange();
  }

  markPromoAsCompleted (id, acceptValue) {
    let tempPromos = this.getPromos();
    tempPromos[id].completed = true;
    tempPromos[id].accept = acceptValue;
    this.set('promos', JSON.stringify(tempPromos));
    this.emitChange();
  }

}

let store = new PromotionsStore();

register((action) => {
  switch (action.type) {
    case PROMOTIONS_GET_SUCCESS:
      //an array of promo objects is given to us
      if (action.action.response) {
        store.setPromos(action.action.response);
      }
      break;
    case PROMOTIONS_POST_SUCCESS:
      store.markPromoAsCompleted(action.action.response.id, action.action.response.accept);
      break;
    default:
  }
});

export default store;
