'use strict';

import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';

import {
  LISTING_DETAILS_UPDATED,
  LISTING_DETAILS_GET_SUCCESS
} from '../constants/AppConstants';

class ListingDetailsStore extends _BaseStore {

  constructor (...args) {
    super(...args);
    this.set('listingDetails', {});
  }

  emitChange () {
    this.emit(LISTING_DETAILS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(LISTING_DETAILS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(LISTING_DETAILS_UPDATED, callback);
  }

  getListingDetails (listingID) {
    return this.data.getIn(['listingDetails', listingID]) || {};
  }

  setListingDetails (listingID, listingDetails) {
    var tempDetails = this.get('listingDetails');
    tempDetails = tempDetails.set(listingID, listingDetails);
    this.set('listingDetails', tempDetails);
  }

}

let store = new ListingDetailsStore();

register((action) => {
  switch (action.type) {
    case LISTING_DETAILS_GET_SUCCESS:
      store.setListingDetails(action.action.response.id.toString(), action.action.response);
      break;
  }
});

export default store;
