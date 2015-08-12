'use strict';

import './_ImageGrid.scss';

import React from 'react';

import Error from '../../components/Error/Error';
import Image from '../../components/Image/Image';

import { ImageGridConstants } from '../ComponentConstants';

import Placeholder from './placeholder.png';

/**
 * A generic component that will render an array of images in a grid layout. While loading a blank white placeholder
 * is displayed, with no loading icon. If an image fails to load, it is removed from being displayed. If all images fail
 * to load a general Error Component is displayed with a retry button.
 */
class ImageGrid extends React.Component {
  /**
   * Set the initial state of the component with the images array passed as a prop. Since we will potentially need to
   * remove images if they fail, we are mapping the images prop to the component state.
   * @param args
   */
  constructor (...args) {
    super(...args);


    this.state = {
      images: this.props.images
    };
  }

  /**
   * If new props are passed into this component we must update the state accordingly
   * @param newProps
   */
  componentWillReceiveProps (newProps) {
    this.setState({
      images: newProps.images
    });
  }

  /**
   * Helper method to render the component, including the error piece of the images array is blank
   * @returns {XML}
   */
  render () {
    let error;

    if (this.state.images && this.state.images.length === 0) {
      //creating an arbitrary error code to pass into Error Component to force the general error messaging to display
      let errorObj = {
        code: 5
      };
      error = (
        <div className="ImageGrid-error">
          <Error errorObj={errorObj}
                 retryCallback={this._handleRetry.bind(this)}/>
        </div>
      );
    }

    let className = 'ImageGrid ' + this.props.type;

    let images;

    if(this.state.images.length > 0) {
      images = (
        <div className={className}>
          {this.state.images.map(this._renderImage, this)}
        </div>
      );
    }
    return (
      <div className="image-grid-container">
        {images}
        {error}
      </div>
    );
  }

  /**
   * Helper function for rendering each image in the array. Maps all needed handlers to the Image component
   * @param image
   * @param index
   * @returns {XML}
   * @private
   */
  _renderImage (image, index) {
    return (
      <div ref={'img_wrapper_' + index} key={index} className="ImageGrid-Image">
        <img className="ImageGrid-placeholder" src={Placeholder}/>
        <Image ref={index}
               id={index}
               index={index}
               src={image.thumbnail}
               clickHandler={this._handleImageClick.bind(this)}
               loadHandler={this._handleImageLoad.bind(this)}
               errorHandler={this._handleImageLoadError.bind(this)}/>
             <div className="icon-media-play" data-index={index} onClick={this._handleIconClick.bind(this)}></div>
      </div>
    );
  }

  /**
   * imgId is just the array index of the image that was clicked
   * @param imgId
   * @param event
   * @private
   */
  _handleImageClick (imgId, event) {
    console.log('ImageGrid handleImageClick');
    if (this.props.clickHandler) {
      this.props.clickHandler(this.props.id, imgId, event);
    }
  }

  _handleIconClick (event) {
    if (this.props.clickHandler) {
      let index = event.target.getAttribute('data-index');
      console.log('handleIconClick', index, event);
      this._handleImageClick(index, event);
    }
  }

  /**
   * Image load handler, used to update the CSS as needed for loaded state
   * @param id
   * @private
   */
  _handleImageLoad (id) {
    React.findDOMNode(this.refs['img_wrapper_' + id]).classList.add('loaded');
  }

  /**
   * Image error handler, we must remove the image that failed to load from the state images array
   * @param id
   * @private
   */
  _handleImageLoadError (id) {
    let images = this.state.images;
    images.splice(id, 1);
    this.setState({
      images: images
    });
  }

  /**
   * Retry handler for error component. if the user presses this button we will attempt to reload all images
   * by setting the images state array to what was passed in via props
   * @private
   */
  _handleRetry () {
    this.setState({
      images: this.props.images
    });
  }

}

ImageGrid.propTypes = {
  id: React.PropTypes.string,
  images: React.PropTypes.arrayOf(React.PropTypes.shape({
    thumbnail: React.PropTypes.string.isRequired,
    full: React.PropTypes.string.isRequired
  })).isRequired,
  clickHandler: React.PropTypes.func,
  type: React.PropTypes.oneOf([ImageGridConstants.Type.PHOTOS, ImageGridConstants.Type.VIDEOS]).isRequired
};

export default ImageGrid;
