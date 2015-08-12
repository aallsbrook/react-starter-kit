'use strict';

import _BaseStore from './_BaseStore';
import {register} from '../dispatcher/AppDispatcher';

import {
  MODELS_UPDATED,
  MODELS_GET_SUCCESS
} from '../constants/AppConstants';

class ModelsStore extends _BaseStore {

  emitChange () {
    this.emit(MODELS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(MODELS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(MODELS_UPDATED, callback);
  }

  getModelByID (modelID) {
    var allModels = this.getAll();
    for (var x = 0; x < allModels.length; x++) {
      if (allModels[x].id === modelID) {
        return allModels[x];
      }
    }
  }
}

let store = new ModelsStore();

register((action) => {
  switch (action.type) {
    case MODELS_GET_SUCCESS:
      store.setAll(action.action.response);
      break;
    default:
  }
});

export default store;
