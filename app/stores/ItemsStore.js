'use strict';

import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';

import {
  ITEMS_UPDATED,
  ITEMS_GET_SUCCESS
} from '../constants/AppConstants';

class ItemsStore extends _BaseStore {

  emitChange () {
    this.emit(ITEMS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(ITEMS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(ITEMS_UPDATED, callback);
  }
}

let store = new ItemsStore();

register((action) => {
  switch (action.type) {
    case ITEMS_GET_SUCCESS:
      store.setAll(action.action.response);
      break;
    default:
  }
});

export default store;
