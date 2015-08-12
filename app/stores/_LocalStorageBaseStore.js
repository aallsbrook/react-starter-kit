'use strict';

import { EventEmitter } from 'events';

/**
 * A Base store for saving data in LocalStorage. Should be extended by any store that needs this functionality.
 *
 * It is likely that the storage structure behind the scenes could change as requirements change, but this will
 * allow those changes to not effect any stores currently implemented.
 */
export default class LocalStorageBaseStore extends EventEmitter {

  constructor (...args) {
    super(...args);
  }

  /**
   * Local Storage getter
   * @param key
   */
  get (key) {
    return localStorage.getItem(key);
  }

  /**
   * Local Storage setter
   * @param key
   * @param value
   */
  set (key, value) {
    localStorage.setItem(key, value);
  }

  /**
   * Local Storage remove
   * @param key
   */
  remove (key) {
    localStorage.removeItem(key);
  }


}
