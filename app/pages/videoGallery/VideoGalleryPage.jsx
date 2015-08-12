'use strict';

import './_VideoGalleryPage.scss';

import React from 'react';
import Video from '../../components/Video/Video';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import TrimDetailsStore from '../../stores/TrimDetailsStore';
import RecommendedStore from '../../stores/RecommendedStore';
import AppActions from '../../actions/AppActions';
import { ImageGridConstants } from '../../components/ComponentConstants';

class VideoGalleryPage extends React.Component {

  constructor (...args) {
    super(...args);
    let videos = TrimDetailsStore.getVideosForStyle(this.props.params.id);

    this.state = {
      videos: videos,
      videoSrc: ''
    };

    this._setTitle();

    this._handleTrimDetailsChange = this._handleTrimDetailsChange.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
  }

  _setTitle () {
    let title = '';
    let yearAndStyle = TrimDetailsStore.getYearAndStyle(this.props.params.id);
    let appState = this.props.getAppState();
    let modelData = RecommendedStore.getModelDataById(parseInt(appState.styleID));

    if (yearAndStyle.year) {
      title += yearAndStyle.year;
    }
    if (!!modelData) {
      if (!!modelData.make) {
        title += ' ' + modelData.make;
      }
      if (!!modelData.model_name) {
        title += ' ' + modelData.model_name;
      }
    }
    if (yearAndStyle.style) {
      title += ' ' + yearAndStyle.style;
    }

    this.props.setTitle(title);
  }

  componentDidMount () {
    // Hide the leftnav menu button
    document.querySelector('.mui-app-bar-navigation-icon-button').classList.add('hidden');
    document.getElementById('BodyElement').classList.add('hide-hamburger-icon');

    TrimDetailsStore.addChangeListener(this._handleTrimDetailsChange);
    AppActions.getTrimDetails(this.props.params.id);

    if (!!screen.unlockOrientation) {
      screen.unlockOrientation();
    }

  }

  componentWillUnmount () {
    TrimDetailsStore.removeChangeListener(this._handleTrimDetailsChange);

    if (!!screen.lockOrientation) {
      screen.lockOrientation('portrait');
    }

  }

  /**
   * Called when the videoSrc state property is updated.
   * Handles mounting the video element on the page, triggering fullscreen
   * and beginning playback of the mounted video
   * @instance
   * @public
   */
  componentDidUpdate () {
    if (this.refs.currentVideo && this.state.videoSrc.length > 0) {
      let videoContainerNode = React.findDOMNode(this.refs.currentVideo);
      let videoDomNode = React.findDOMNode(this.refs.currentVideo.refs.videoEl);

      if (videoDomNode) {
        this._triggerVideoFullScreen(videoDomNode, videoContainerNode);
      }
    }
  }

  /**
   * Renders the video gallery page
   *
   * @instance
   * @public
   * @@returns {JSX} Returns the Video Gallery Html
   */
  render () {
    let video;

    if (this.state.videoSrc && this.state.videoSrc.length > 0) {
      video = (
        <Video
          ref="currentVideo"
          sourceUrl={this.state.videoSrc}
          handleVideoClick={this._handleVideoClick.bind(this)}
          handleCloseClick={this._handleCloseClick.bind(this)} />
      );
    }
    return (
      <div className="page VideoGalleryPage" ref="videoGalleryPage">
        <div className="VideoGalleryPage-VideoGrid">
          <ImageGrid id="video-grid"
                     images={this.state.videos}
                     clickHandler={this._handleThumbnailClick.bind(this)}
                     type={ImageGridConstants.Type.VIDEOS}/>
        </div>
        {video}
      </div>
    );
  }

  /**
   * Handles updating the videos state property
   * when trimDetails is updated with data
   *
   * @instance
   * @public
   */
  _handleTrimDetailsChange () {
    let videos = TrimDetailsStore.getVideosForStyle(this.props.params.id);

    this.setState({
      videos: videos
    });
    this._setTitle();
  }

  /**
   * Callback for when a thumbnail in the ImageGrid is clicked
   * updates the state videoSrc property with the url for the
   * video of the thumbnail clicked
   *
   * @instance
   * @public
   */
  _handleThumbnailClick (imageGridId, imgId, event) {
    let videoIndex = event.target.getAttribute('data-index');
    let videoData = this.state.videos[videoIndex];

    // Check for existence of cordova video plugin
    if (window.plugins && window.plugins.videoPlayer) {
      window.plugins.videoPlayer.play(videoData.video);
    } else {
      this.setState({videoSrc: videoData.video});
    }
  }

  /**
   * Triggers fullscreen video playback based on browser
   * specific function, begins video playback, then unhides then
   * video element's parent
   *
   * @instance
   * @public
   */
  _triggerVideoFullScreen (videoDomNode, videoContainerNode) {
    console.log('_triggerVideoFullScreen', videoDomNode);
    if (!this._inFullScreenMode()) {
      if (videoDomNode.requestFullscreen) {
        videoDomNode.requestFullscreen();
      } else if (videoDomNode.mozRequestFullScreen) {
        videoDomNode.mozRequestFullScreen();
      } else if (videoDomNode.webkitRequestFullScreen) {
        videoDomNode.webkitRequestFullScreen();
      }
    }
    videoDomNode.play();

    // Unhide video parent after fullscreen is triggered and video is playing
    videoContainerNode.classList.remove('hidden');
  }

  /**
   * Handles pausing and playing video when in fullscreen mode
   *
   * @instance
   * @public
   */
  _handleVideoClick (event) {
    // Begin playback if video not currently playing
    if (event.target.paused) {
      event.target.play();
    } else {
      event.target.pause();
    }

  }

  /**
   * Updates videoSrc state property to unmount video element when close
   * icon is clicked
   *
   * @instance
   * @public
   */
  _handleCloseClick () {
    let videoContainerNode = React.findDOMNode(this.refs.currentVideo);
    videoContainerNode.classList.add('hidden');
    this.setState({videoSrc: ''});
  }

  /**
   * Helper function to determine if you're currently in fullscreen mode
   *
   * @instance
   * @public
   */
  _inFullScreenMode () {
    return (document.fullScreenElement && document.fullScreenElement !== null) ||
      (document.mozFullScreen || document.webkitIsFullScreen);
  }
}


VideoGalleryPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  getAppState: React.PropTypes.func.isRequired
};

export default VideoGalleryPage;
