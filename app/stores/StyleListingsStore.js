'use strict';

import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';
import _ from 'lodash';

import {
  STYLE_LISTINGS_UPDATED,
  STYLE_LISTINGS_GET_SUCCESS,
  STYLE_LISTINGS_PER_PAGE
} from '../constants/AppConstants';

class StyleListingsStore extends _BaseStore {

  constructor (...args) {
    super(...args);
    this.set('styleListingsCount', {});
    this.set('styleListings', {});
  }

  emitChange () {
    this.emit(STYLE_LISTINGS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(STYLE_LISTINGS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(STYLE_LISTINGS_UPDATED, callback);
  }

  getListingsCount (styleId) {
    return this.data.getIn(['styleListingsCount', styleId]) || 0;
  }

  getStyleListings (styleId, pageNum) {
    let allListings = this.data.getIn(['styleListings', styleId]) || [];
    let startingIndex = (pageNum - 1) * STYLE_LISTINGS_PER_PAGE;
    let endingIndex = pageNum * STYLE_LISTINGS_PER_PAGE;
    let pagedListings = allListings.slice(startingIndex, endingIndex);
    return pagedListings;
  }

  getFirstStyleImage (styleId) {
    let styleListings = this.getStyleListings(styleId, 1);
    let imageURL = 'noimage';
    if (styleListings.length) {
      imageURL = _.result(_.find(styleListings, 'hasimage', 'yes'), 'tiny_image_url');
      if (!imageURL) {
        return 'noimage';
      }
    }
    return imageURL;
  }

  setStyleListings (styleId, newListings) {
    let styleListings = this.get('styleListings');
    let tempListingsArray = styleListings.get(styleId) || [];
    if (newListings.length > 0) {
      tempListingsArray = tempListingsArray.concat(newListings);
      //check that all listings are unique based of the id
      tempListingsArray = _.uniq(tempListingsArray, false, (listing) => {
        return listing.id;
      });
    }
    styleListings = styleListings.set(styleId, tempListingsArray);
    this.set('styleListings', styleListings);
  }

  setStyleListingsCount (styleId, count) {
    let tempListingsCount = this.get('styleListingsCount');
    tempListingsCount = tempListingsCount.set(styleId, count);
    this.set('styleListingsCount', tempListingsCount);
  }

}

let store = new StyleListingsStore();

register((action) => {
  switch (action.type) {
    case STYLE_LISTINGS_GET_SUCCESS:
      store.setStyleListings(action.action.response.id, action.action.response.data);
      store.setStyleListingsCount(action.action.response.id, action.action.response.paging.total);
      break;
    default:
  }
});

export default store;
