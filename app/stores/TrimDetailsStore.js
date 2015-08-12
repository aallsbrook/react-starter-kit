'use strict';

import _BaseStore from './_BaseStore';
import { register } from '../dispatcher/AppDispatcher';

import {
  TRIM_DETAILS_UPDATED,
  TRIM_DETAILS_GET_SUCCESS
} from '../constants/AppConstants';

class TrimDetailsStore extends _BaseStore {

  constructor (...args) {
    super(...args);
    this.set('trimDetails', {});
  }

  emitChange () {
    this.emit(TRIM_DETAILS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(TRIM_DETAILS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(TRIM_DETAILS_UPDATED, callback);
  }

  getCloudURL () {
    return this.data.get('cloudURL') || '';
  }

  getTrimDetailForStyle (styleID) {
    return this.data.getIn(['trimDetails', styleID]) || {};
  }

  setTrimDetailForStyle (styleID, trimDetail) {
    var tempDetails = this.get('trimDetails');
    tempDetails = tempDetails.set(styleID, trimDetail);
    this.set('trimDetails', tempDetails);
  }

  getImagesForStyle (styleID) {
    let trimDetail = this.getTrimDetailForStyle(styleID);
    if (trimDetail && trimDetail.gallery) {
      let imageObj = {
        interior: trimDetail.gallery.Interior,
        exterior: trimDetail.gallery.Exterior
      };
      return imageObj;
    }
    return null;
  }

  getVideosForStyle (styleID) {
    let videoData = [];
    let trimDetails = this.getTrimDetailForStyle(styleID);

    if (trimDetails && trimDetails.videos) {
      let videos = trimDetails.videos.model_videos;
      for(let i = 0; i < videos.length; i++) {
        videoData.push({
          thumbnail: videos[i].thumb,
          full: videos[i].still,
          video: videos[i].video
        });
      }
    }

    // TODO: Remove, used so all trimDetails have video
    /*if (videoData.length === 0) {
      for (let i = 0; i < 5; i++) {
        videoData.push({
          thumbnail: 'http://icarsassets-shared-dev.s3.amazonaws.com/WheelsTV/1onONE_Images/1onONE_2015_Acura_ILX_thumb.jpg',
          full: 'http://icarsassets-shared-dev.s3.amazonaws.com/WheelsTV/1onONE_Images/1onONE_2015_Acura_ILX_LargeStill.jpg',
          video: 'http://icarsassets-shared-dev.s3.amazonaws.com/WheelsTV/1onONE_MP4/1onONE_2015_Acura_ILX.mp4'
        });
      }
    }*/

    return videoData;
  }

  getYearAndStyle (styleID) {
    let year, style;
    let trimDetail = this.getTrimDetailForStyle(styleID);
    if (trimDetail && trimDetail.style && trimDetail.style.model_year) {
      year = trimDetail.style.model_year;
    }
    if (trimDetail && trimDetail.style && trimDetail.style.style_name) {
      style = trimDetail.style.style_name;
    }
    return {
      year: year,
      style: style
    };
  }

}

let store = new TrimDetailsStore();

register((action) => {
  switch (action.type) {
    case TRIM_DETAILS_GET_SUCCESS:
      store.set('cloudURL', action.action.response.cloudURL);
      store.setTrimDetailForStyle(action.action.response.data.style.style_id.toString(), action.action.response.data);
      break;
    default:
  }
});

export default store;
