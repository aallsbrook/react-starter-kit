'use strict';

import './_Video.scss';
import React from 'react';

export default class Video extends React.Component {

  constructor (...args) {
    super(...args);
  }

  /**
   * Renders the HTML5 video element
   *
   * @instance
   * @public
   * @returns {JSX} Returns the Video HTML
   */
  render () {

    return (
      <div className="Video hidden" onClick={this.handleClick.bind(this)}>
        <video
          ref="videoEl"
          controls
          preload="auto"
          width="auto"
          height="auto"
          src={this.props.sourceUrl}
          type="video/mp4" />
        <div className="Video-custom-controls">
          <div className="close" onClick={this.handleCloseClick.bind(this)}>
            <span>Close</span>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handles a click event on the Video container
   *
   * @instance
   * @private
   * @param {Event}
   * Recieves the click event from React and passes it to the handleVideoClick property.
   */
  handleClick (event) {
    this.props.handleVideoClick(event);
  }

  /**
   * Handles click event on Close button in full screen mode
   *
   * @instance
   * @public
   */
  handleCloseClick () {
    event.stopPropagation();
    this.props.handleCloseClick();
  }
}

Video.propTypes = {
  sourceUrl: React.PropTypes.string.isRequired,
  handleVideoClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
  width: React.PropTypes.string,
  height: React.PropTypes.string
};
