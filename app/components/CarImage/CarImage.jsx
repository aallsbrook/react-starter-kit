'use strict';

import './_CarImage.scss';

import React from 'react';

import { CarImageConstants } from '../ComponentConstants';

/**
 * A component to load the desired car image based off it's model info, including support for different sizes
 * and leveraging srcSet for different screen densities. Builds the required URL based off the cars info.
 *
 * Also this component controls the display of the loading icon and image place holder. The loading icon will
 * displayed over the placeholder until the image loads or has an error. ON successful load the image will be displayed
 * as expected, if an error occured we hide the img element (to prevent the browsers default failed image placeholder
 * from displaying), and just display the car placeholder.
 *
 * Prop types are listed below (all are required):
 * cloudURL: Provided in the API response data, this is the base used in building the image URL
 * colorCode: Color code of the model to be displayed. Provided in API response data and is used in the image URL
 * evoxSend: A number value provided by API, needed to build image URL
 * imageSize:
 * imageNumber
 * styleID:
 */
export default class CarImage extends React.Component {

  constructor (...args) {
    super(...args);
  }

  componentDidMount () {
    let timeoutId = setTimeout(this.handleTimeout.bind(this), CarImageConstants.TIMEOUT * 1000);
    this.setState({
      timeoutId: timeoutId
    });
  }
  /**
   * Remove all event listeners
   */
  componentWillUnmount () {
    clearTimeout(this.state.timeoutId);
    //TODO: is this actually clearing the event listeners, as they are on the img element, not the root div of this component?
    const element = React.findDOMNode(this.refs.CarImage);
    element.removeEventListener('load', this.handleLoad);
    element.removeEventListener('error', this.handleError);
  }

  /**
   * Wrap a html img element in a div to apply custom styling, and build the src strings using below helper functions
   * @returns {XML}
   */
  render () {
    if (this.props.type === CarImageConstants.Type.BORDER) {

      var divStyle = {
        width: this.props.width ? this.props.width : '100%',
        height: this.props.height ? this.props.height : '100%'
      };

      return (
        <div className="CarImage CarImage--border car-image-loading" style={divStyle} >
          <div className="CarImage--spinner"></div>
          <div className="CarImage--placeholder"></div>
          <img ref="CarImage" width="100%" src={this.props.imageURL}
               onError={this.handleError.bind(this)}
               onLoad={this.handleLoad.bind(this)}/>
        </div>
      );
    } else if (this.props.type === CarImageConstants.Type.EVOX) {
      return (
        <div className={'CarImage CarImage-' + this.props.evoxObj.imageSize + ' car-image-loading'}>
          <div className="CarImage--spinner"></div>
          <div className="CarImage--placeholder"></div>
          <img ref="CarImage" id={'carImage_' + this.props.evoxObj.styleID}
               src={this.getDefaultImageString()}
               srcSet={this.getSrcSetString()}
               onError={this.handleError.bind(this)}
               onLoad={this.handleLoad.bind(this)}/>
        </div>
      );
    } else if (this.props.type === CarImageConstants.Type.STACK) {
      return (
        <div className="CarImage CarImage--image-stack car-image-loading">
          <div className="bottom-img"></div>
          <div className="top-img">
            <img ref="CarImage" src={this.props.imageURL}
                 onError={this.handleError.bind(this)}
                 onLoad={this.handleLoad.bind(this)}/>
          </div>
        </div>
      );
    }
  }

  /**
   * Create the default src string to be used. This is as a back up to the srcSet string if for
   * some reason the Polyfill to add this support to older devices (4.x) isn't working
   * @returns {string}
   */
  getDefaultImageString () {
    return this.props.evoxObj.cloudURL + '/' + this.props.evoxObj.evoxSend + '/' +
      this.props.evoxObj.evoxSend + '_' + this.getImageSizeString() + '_' +
      this.props.evoxObj.imageNumber + '_' + this.props.evoxObj.colorCode + '.png';
  }

  /**
   * Helper function to translate the easy to use size words to the dimension string the URL needs
   * @returns {*}
   */
  getImageSizeString () {
    switch (this.props.evoxObj.imageSize) {
      case CarImageConstants.Size.SUPER_SMALL:
        return '128x72';
      case CarImageConstants.Size.SMALL:
        return '210x118';
      case CarImageConstants.Size.MEDIUM:
        return '320x180';
      case CarImageConstants.Size.LARGE:
        return '500x280';
      default:
        //defaulting to super-small if no size provided
        return '128x72';
    }
  }

  /**
   * Build the srcSet string that will allow the browser to choose the best image
   * to display based on the devices dimensions and pixel density
   * @returns {string}
   */
  getSrcSetString () {
    //TODO: update with new @3x and @4x once backend supports it
    var baseImageURL = this.props.evoxObj.cloudURL + '/' + this.props.evoxObj.evoxSend + '/' +
      this.props.evoxObj.evoxSend + '_' + this.getImageSizeString() + '_' +
      this.props.evoxObj.imageNumber + '_' + this.props.evoxObj.colorCode;

    //these are not support by the backend yet, update this once they are
    //var xhdpiURL = baseImageURL + '-xhdpi.png';
    //var xxhdpiURL = baseImageURL + '-xxhdpi.png';
    //var xxxhdpiURL = baseImageURL + '-xxxhdpi.png';

    //Move this to xhdpi naming convention once backend supports it
    var xURL = baseImageURL + '.png';
    var xxURL = baseImageURL + '@2x.png';
    var srcSetString = xURL + ' 1x,' +
      xxURL + ' 2x';

    return srcSetString;
  }

  /**
   * Callback triggered when image successfully loads. We hide the loading class here
   * @param event
   */
  handleLoad (event) {
    // If the image height and width are 1 pixel, no image was returned
    if (event.target.naturalWidth === 1 && event.target.naturalHeight === 1) {
      this.handleError(event);
    }
    clearTimeout(this.state.timeoutId);
    var parentElement;
    if (event && event.target && event.target.parentNode) {
      if (this.props.type === CarImageConstants.Type.STACK && event.target.parentNode.parentNode) {
        parentElement = event.target.parentNode.parentNode;
      } else {
        parentElement = event.target.parentNode;
      }
      parentElement.classList.remove('car-image-loading');
    }
    if (this.props.handleLoad) {
      this.props.handleLoad(event);
    }
  }

  /**
   * Callback triggered when image fails to load. Hide the image element and replace the loading class
   * with error class
   * @param event
   */
  handleError (event) {
    clearTimeout(this.state.timeoutId);
    let parentElement;
    if (event && event.target && event.target.parentNode) {
      if ((this.props.type === CarImageConstants.Type.STACK) && event.target.parentElement.parentElement) {
        parentElement = event.target.parentElement.parentElement;
      } else {
        parentElement = event.target.parentElement;
      }
      parentElement.className = parentElement.className.replace('car-image-loading', 'error');
      event.target.style.display = 'none';
    }
    if (this.props.handleError) {
      this.props.handleError(event);
    }
  }

  handleTimeout () {
    let element = React.findDOMNode(this);
    element.className = element.className.replace('car-image-loading', 'error');
  }
}

CarImage.propTypes = {
  type: React.PropTypes.oneOf([CarImageConstants.Type.BORDER, CarImageConstants.Type.EVOX, CarImageConstants.Type.STACK]).isRequired,
  imageURL: React.PropTypes.string,
  evoxObj: React.PropTypes.shape({
    cloudURL: React.PropTypes.string.isRequired,
    colorCode: React.PropTypes.string.isRequired,
    evoxSend: React.PropTypes.number.isRequired,
    imageSize: React.PropTypes.oneOf([CarImageConstants.Size.SUPER_SMALL, CarImageConstants.Size.SMALL, CarImageConstants.Size.MEDIUM, CarImageConstants.Size.LARGE]).isRequired,
    imageNumber: React.PropTypes.string.isRequired,
    styleID: React.PropTypes.number.isRequired
  }),
  handleLoad: React.PropTypes.func,
  handleError: React.PropTypes.func
};
