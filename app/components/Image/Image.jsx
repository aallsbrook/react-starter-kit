'use strict';

import './_Image.scss';

import React from 'react';

import { ImageConstants } from '../ComponentConstants';

/**
 * Image component is a generic warpper around the HTML img tag. It does add a timeout functionality that
 * will cause the errorHandler function to be called if the image is not loaded within 5 seconds (this value
 * is set via a constant in ComponentConstants.js)
 */
class Image extends React.Component {

  /**
   * When the image element has successfully been added to the DOM, we create a timeout to be used
   */
  componentDidMount () {
    let timeoutId = setTimeout(this._handleTimeout.bind(this), ImageConstants.TIMEOUT * 1000);
    this.setState({
      timeoutId: timeoutId
    });
  }

  /**
   * In case the user changes page before the timeout is reached, and the image has yet to load or error,
   * we clear the timeout, so that it can't be called unexpectedly
   */
  componentWillUnmount () {
    clearTimeout(this.state.timeoutId);
  }

  /**
   * Render the HTML img tag with the needed properties
   * @returns {XML}
   */
  render () {
    return (
      <img id={this.props.id}
           data-index={this.props.index}
           src={this.props.src}
           onClick={this._handleClick.bind(this)}
           onError={this._handleError.bind(this)}
           onLoad={this._handleLoad.bind(this)}
           className="Image-img"/>
    );
  }

  /**
   * Click handler to link the click event of the img element to the parent component of Image. The values passed to the
   * handler are (in order):
   * id: The id that was passed into the Image element as a prop
   * event: The event object of the click
   * @param event
   * @private
   */
  _handleClick (event) {
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.id, event);
    }
  }

  /**
   * Error handler to link the onError event of the img element to the parent component of Image. The error
   * handler is currently called with a single parameter, which is the id that was passed in as a prop to Image
   * @private
   */
  _handleError () {
    clearTimeout(this.state.timeoutId);
    if (this.props.errorHandler) {
      this.props.errorHandler(this.props.id);
    }
  }

  /**
   * Load handler to link the onLoad event of the img element to the parent component of Image. The load
   * handler is currently called with a single parameter, which is the id that was passed in as a prop to Image
   * @private
   */
  _handleLoad () {
    clearTimeout(this.state.timeoutId);
    if (this.props.loadHandler) {
      this.props.loadHandler(this.props.id);
    }
  }

  /**
   * Timeout handler method that is called if the image has not successfully loaded, or errored out within 5 seconds.
   * It calls the errorHandler prop function (if it exists) with the id passed into Image.
   * @private
   */
  _handleTimeout () {
    if (this.props.errorHandler) {
      this.props.errorHandler(this.props.id);
    }
  }

}

Image.propTypes = {
  id: React.PropTypes.string.isRequired,
  index: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
  clickHandler: React.PropTypes.func,
  errorHandler: React.PropTypes.func,
  loadHandler: React.PropTypes.func
};

export default Image;
