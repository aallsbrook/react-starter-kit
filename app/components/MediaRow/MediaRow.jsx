'use strict';

import './_MediaRow.scss';

import React from 'react';

class MediaRow extends React.Component {

  render () {
    let images, videos, hasSingleChild = false, doNotShow = false;

    if (this.props.hasImages) {
      images = (
        <div className="MediaRow-photos" onClick={this._handlePhotosClick.bind(this)}>
          <span className="icon MediaRow-photos--icon"></span>
          Photos
        </div>
      );
    }
    if (this.props.hasVideos) {
      videos = (
        <div className="MediaRow-videos" onClick={this._handleVideosClick.bind(this)}>
          <span className="icon MediaRow-videos--icon"></span>
          Videos
        </div>
      );
    }

    if ((this.props.hasImages && !this.props.hasVideos) || (!this.props.hasImages && this.props.hasVideos)) {
      hasSingleChild = true;
    } else if (!this.props.hasImages && !this.props.hasVideos) {
      doNotShow = true;
    }

    return (
      <div className={'MediaRow' + (hasSingleChild ? ' hasSingleChild' : '') + (doNotShow ? ' hidden' : '')}>
        {images}
        {videos}
      </div>
    );
  }

  _handlePhotosClick () {
    window.location.hash = '/imageGallery/' + this.props.styleId;
  }

  _handleVideosClick () {
    window.location.hash = '/videoGallery/' + this.props.styleId;
  }

}

MediaRow.propTypes = {
  hasImages: React.PropTypes.bool,
  hasVideos: React.PropTypes.bool,
  styleId: React.PropTypes.string.isRequired
};

export default MediaRow;
