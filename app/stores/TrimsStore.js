'use strict';

import _BaseStore from './_BaseStore';
import {register} from '../dispatcher/AppDispatcher';

import {
  TRIMS_UPDATED,
  TRIMS_GET_SUCCESS
} from '../constants/AppConstants';

/**O
 * A store specific for data displayed on the trims page. internal data is structured as
 * follows (all within an Immutable Map):
 *
 * {
 *  cloudURL: string that is used in loading image URLs
 *  trims: A Map of Model ID to model info, this allows us to cache multiple models trims per session
 * }
 */
class TrimsStore extends _BaseStore {

  /**
   * Initialize our blank trims Map
   * @param args
   */
  constructor (...args) {
    super(...args);
    this.set('trims', {});
  }

  /**
   * Emit the trims updated event so anything concerned can act accordingly
   */
  emitChange () {
    this.emit(TRIMS_UPDATED);
  }

  /**
   * Register a callback to be used whem Trims store is updated
   * @param callback
   */
  addChangeListener (callback) {
    this.on(TRIMS_UPDATED, callback);
  }

  /**
   * Remove above mentioned callback
   * @param callback
   */
  removeChangeListener (callback) {
    this.removeListener(TRIMS_UPDATED, callback);
  }

  /**
   * Helper function to return the cloud url.
   * @returns {*|string}
   */
  getCloudURL () {
    return this.data.get('cloudURL') || '';
  }

  /**
   * Get an array of Trims object from the modelId param passed in, or return an empty array if none
   * @param modelId
   * @returns {any|*|Array}
   */
  getTrimsForModel (modelId) {
    return this.data.getIn(['trims', modelId]) || [];
  }

  /**
   * Set trims for a specific model id
   * @param modelId
   * @param trims
   */
  setTrimsForModel (modelId, trims) {
    var tempTrims = this.get('trims');
    tempTrims = tempTrims.set(modelId, trims);
    this.set('trims', tempTrims);
  }
}

let store = new TrimsStore();

register((action) => {
  switch (action.type) {
    case TRIMS_GET_SUCCESS:
      //TODO: should keys be a constant?
      store.set('cloudURL', action.action.response.cloudURL);
      //TODO: A better way to get model id
      store.setTrimsForModel(action.action.response.data[0].carzen_model_id.toString(), action.action.response.data);
      break;
    default:
  }
});

export default store;
