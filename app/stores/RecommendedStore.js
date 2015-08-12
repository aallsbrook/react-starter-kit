'use strict';

import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';
import { getIndexBy } from '../util/Util';

import {
  RECOMMENDED_GET_SUCCESS,
  RECOMMENDED_UPDATED
} from '../constants/AppConstants';

class RecommendedStore extends _BaseStore {

  constructor (...args) {
    super(...args);
    this.set('recommended', {});
  }

  emitChange () {
    this.emit(RECOMMENDED_UPDATED);
  }

  addChangeListener (callback) {
    this.on(RECOMMENDED_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(RECOMMENDED_UPDATED, callback);
  }

  /**
   * Helper function to return the cloud url.
   * @returns {*|string}
   */
  getCloudURL () {
    return this.data.get('cloudURL') || '';
  }

  /**
   * Return an array of the recommended sections.
   * @returns {*|Array}
   */
  getRecommended () {
    //TODO: figure out why React isn't playing well with an Immutable List
    return this.get('recommended').toArray() || [];
  }

  /**
   * Get a specific models detailed information object
   * @param id
   * @returns {*}
   */
  getModelDataById (id) {
    let recommendationData = this.getRecommended();
    let recommendationDataLength = recommendationData.length;

    for (let i = 0; i < recommendationDataLength; i++) {
      let modelDataIndex = getIndexBy(recommendationData[i].models, 'id', id);

      if (!!modelDataIndex || modelDataIndex >= 0) {
        return recommendationData[i].models[modelDataIndex];
      }

    }

    return null;
  }

}

let store = new RecommendedStore();

register((action) => {
  switch (action.type) {
    case RECOMMENDED_GET_SUCCESS:
      store.set('cloudURL', action.action.response.cloudURL);
      store.set('recommended', action.action.response.data, true);
      break;
    default:
  }
});

export default store;
