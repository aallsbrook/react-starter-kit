'use strict';

import _LocalStorageBaseStore from './_LocalStorageBaseStore';
import { register } from '../dispatcher/AppDispatcher';
import { DefaultRankSort } from '../pages/interview/InterviewProcess';

import {
  ATTRIBUTE_RANK_KEY,
  TRAITS_KEY,
  ZIPCODE_KEY,
  PROFILE_UPDATED,
  INTERVIEW_COMPLETED
} from '../constants/AppConstants';

/**
 * A storage location for all profile related data, that will also be stored in LocalStorage
 */
class ProfileStore extends _LocalStorageBaseStore {
  constructor (...args) {
    super(...args);
  }

  addChangeListener (callback) {
    this.on(PROFILE_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(PROFILE_UPDATED, callback);
  }

  /**
   * Get all selected traits from the interview process
   */
  getTraits () {
    return JSON.parse(this.get(TRAITS_KEY));
  }

  /**
   * Set the selected traits from the interview process
   * @param traits
   */
  setTraits (traits) {
    this.set(TRAITS_KEY, JSON.stringify(traits));
  }

  getAttributesRank () {
    return JSON.parse(this.get(ATTRIBUTE_RANK_KEY));
  }

  setAttributesRank (rank) {
    this.set(ATTRIBUTE_RANK_KEY, JSON.stringify(rank));
  }

  getZipCode () {
    return this.get(ZIPCODE_KEY);
  }

  setZipCode (zip) {
    this.set(ZIPCODE_KEY, zip);
  }

  getProfileObject () {
    let personalTraits = [], attributesRank = [];
    let traits = this.getTraits();
    if (!!traits) {
      for (let x = 0; x < traits.length; x++) {
        personalTraits.push(traits[x].traitText);
      }
    }
    let attributes = this.getAttributesRank();
    if (!!attributes) {
      for (let x = 0; x < attributes.length; x++) {
        attributesRank.push(attributes[x].text);
      }
    } else {
      for (let x = 0; x < DefaultRankSort.length; x++) {
        attributesRank.push(DefaultRankSort[x].text);
      }
    }
    return {
      profile: {
        personal_traits: personalTraits, // eslint-disable-line camelcase
        ordered_car_attributes: attributesRank // eslint-disable-line camelcase
      }
    };
  }

  emitChange () {
    this.emit(PROFILE_UPDATED);
  }
}

let store = new ProfileStore();

// Action here is an object from AppDispatcher of type { type : "asdf", action : /*data*/ }
register((action) => {
  switch (action.type) {
    case INTERVIEW_COMPLETED:
      if (action.action.rankedAttributes) {
        store.setAttributesRank(action.action.rankedAttributes);
      }
      if (action.action.selectedTraits) {
        store.setTraits(action.action.selectedTraits);
      }
      if (action.action.zipCode) {
        store.setZipCode(action.action.zipCode);
      }
      store.emitChange();
      break;
    default:
  }
});

export default store;
