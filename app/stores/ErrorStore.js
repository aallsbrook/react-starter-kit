'use strict';

import { EventEmitter } from 'events';
import { register } from '../dispatcher/AppDispatcher';

import {
  ERROR_UPDATED,
  RECOMMENDED_GET_ERROR,
  TRIMS_GET_ERROR,
  PROMOTIONS_POST_ERROR,
  STYLE_LISTINGS_GET_ERROR,
  VALIDATE_ZIPCODE_ERROR
} from '../constants/AppConstants';

/**
 * ErrorStore is used for Async Error management (mainly from API calls)
 * Basic usage is to have your page add a change listener to this store,
 * and check that the needed *_GET_ERROR action type is being listened to.
 * Your error change listener will be called anytime an error occurs. To check
 * that it was from the action you wanted just pass in the desired action into getError
 * This will return the error object, or undefined if the error was not for the action.
 * If you don't pass an action then the error object will be returned no matter the action.
 *
 * To actually display the error page see the AppController (and Error) components
 *
 * The current error object structure is:
 * {
 *  code: 404,
 *  message: "Message string"
 * }
 *
 * For more info on this structure see Error component
 */
class ErrorStore extends EventEmitter {

  /**
   * Constructor function, sets default values for error and action
   * @param args
   */
  constructor (...args) {
    super(...args);
    this.error = {};
    this.action = null;
  }

  /**
   * Returns the error object. If an action is passed into this function it will only return
   * an error object if the action that caused the error matches the provided param, otherwise
   * undefined would be returned
   * @param action
   * @returns {{}|*}
   */
  getError (action) {
    if (action) {
      if (action === this.action) {
        return this.error;
      }
    } else {
      return this.error;
    }
  }

  /**
   *  Internally used to set the error and action that caused it. This should
   *  never be called externally. Instead if you have the need to display an error
   *  just directly use the showError function available to all pages.
   * @param error
   * @param action
   */
  setError (error, action) {
    this.error = error;
    this.action = action;
    this.emitChange();
  }

  /**
   *  Adds a callback function that will be called anytime the ErrorStore is changed
   *  Should be added in your componentDidMount function
   * @param callback
   */
  addChangeListener (callback) {
    this.on(ERROR_UPDATED, callback);
  }

  /**
   *  Removes the callback function, should be added in componentWillUnmount.
   * @param callback
   */
  removeChangeListener (callback) {
    this.removeListener(ERROR_UPDATED, callback);
  }

  /**
   * Internally used function to emit the appropriate event when the stores data changes
   */
  emitChange () {
    this.emit(ERROR_UPDATED);
  }

}

let store = new ErrorStore();

register((action) => {
  switch (action.type) {
    case RECOMMENDED_GET_ERROR:
    case TRIMS_GET_ERROR:
      store.setError(action.action.error, action.type);
      break;
    case PROMOTIONS_POST_ERROR:
      store.setError(action.action.error, action.type);
      break;
    case STYLE_LISTINGS_GET_ERROR:
      store.setError(action.action.error, action.type);
      break;
    case VALIDATE_ZIPCODE_ERROR:
      store.setError(action.action.error, action.type);
      break;
  }
});

export default store;
