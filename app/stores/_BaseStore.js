import { EventEmitter } from 'events';
import { Map, List } from 'immutable';

/**
 * A general store that all other stores can extend from. This store leverages immutable-js
 * so anything extending this will inherit that functionality if the provided methods are used.
 */
export default class BaseStore extends EventEmitter {

  /**
   *Initialize our blank Immutable Map to use within store
   * @param args
   */
  constructor (...args) {
    super(...args);
    this.data = Map({});
  }

  /**
   * Get the value (primitive, Map, List, etc) from the given key
   * @param key
   * @returns {*}
   */
  get (key) {
    return this.data.get(key);
  }

  /**
   * Set the value of a specific key for this store. Also converts JavaScript Arrays to ImmutableJS Lists, and Objects
   * to ImmutableJS Maps.
   * @param key
   * @param value
   */
  set (key, value) {
    if (value.length) {
      value = List(value);
    } else if (typeof value === 'object') {
      value = Map(value);
    }
    this.data = this.data.set(key, value);
  }

  /**
   * Delete the key/value pair of the provided key
   * @param key
   */
  remove (key) {
    this.data = this.data.delete(key);
  }


}
