'use strict';

import './_MomentumScroll.scss';

import React from 'react';

import CarImage from '../CarImage/CarImage';

import { CarImageConstants, CarouselConstants } from '../ComponentConstants';

// injectTapEventPlugin = require("react-tap-event-plugin");
import injectTapEventPlugin from 'react-tap-event-plugin';

import { numberToCurrencyString } from '../../util/Util';

injectTapEventPlugin();

/**
 * A generic Carousel class to be used throughout the app. This component uses the react-slick library:
 * https://github.com/akiran/react-slick
 *
 * Available properties are:
 *
 * headerText (required): A String to display above Carousel (can be a blank string if none is required)
 * content (required): An object to represent the content for each slide, structured like:
 *  {
 *    type: (required) - One of the available values in CarouselConstants.ContentType
 *    data: (required) - An array representing the data to display (currently for CAR_IMAGE content type this should
 *                        be an array of models)
 *  }
 * useArrows: Boolean if Carousel should have control arrows on left and right (defaults to false)
 * useDots: Boolean if Carouse should display dots at bottom representing each item (defaults to false)
 * inifinite: Boolean if Carousel should infinitly scroll, or be limited with no automatic wrapping
 * slidesToShow: Number of slides to actively show on the displayed carousel (defaults to 1)
 * slidesToScroll: Max number of slides to scroll at a single time (defaults to 1)
 * handleSelect (required): A function to be called when a specific item in the carousel is clicked
 */
export default class MomentumScroll extends React.Component {

  constructor (...args) {
    super(...args);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  /**
   * Create Carousel settings object with provided values or defaults, then
   * render the Carousel Component
   * @returns {XML}
   */
  render () {

    var content;

    if (this.props.content.type === CarouselConstants.ContentType.CAR_IMAGE && this.props.content.data) {
      content = this.props.content.data.models.map(this.renderCarItems, this);
    }

    return (
      <div className={this.props.className}>
        <div className="Carousel-title">
          {this.props.headerText}
        </div>
        <div className="momentumScrollingContainer">
          <ul className="momentumScrollingList">
            {content}
          </ul>
        </div>
      </div>
    );

  }

  /**
   * Helper function for rendering Carousel Content type CAR_IMAGE. Using each model that is passed
   * in to content data create an element to wrap the CarImage and label data in
   * @param carInfo
   * @param index
   * @returns {XML}
   */
  renderCarItems (carInfo) {

    let evoxObj = {
      cloudURL: this.props.content.cloudURL,
      colorCode: carInfo.default_color_code,
      evoxSend: carInfo.evox_send,
      imageSize: this.props.content.imageSize,
      imageNumber: '032',
      styleID: carInfo.id
    };

    return (
      <li id={'carousel_carimage_' + carInfo.id} className="Carousel-CarImage momentumScrollingListItem"
          key={carInfo.id}
          onTouchTap={this.handleClick.bind(this)}>
        <CarImage type={CarImageConstants.Type.EVOX} evoxObj={evoxObj}/>

        <div className="Carousel-CarImage--label">
          <div className="carTitleWrap">
            <div className="carTitle">{carInfo.make + ' ' + carInfo.model_name}</div>
          </div>
          <span className="carDecr">from <span
            className="carMSRP">{numberToCurrencyString(carInfo.min_msrp)}</span> MSRP</span>
        </div>
      </li>
    );
  }

  /**
   * Click event handler to trigger the provided handleSelect callback
   * @param event
   */
  handleClick (event) {
    this.props.handleSelect(this.getIdFromParent(event.target));
  }


  /**
   * Helper function for determining the model id of selected CarImage. It's a recursive function
   * because the click event could potentially be triggered by a child element, which doesn't have
   * the id available.
   * @param element
   * @returns {*}
   */
  getIdFromParent (element) {
    //TODO: There has to be a better way..
    var splitString = element.parentElement.id.split('_');
    if (splitString.length <= 1) {
      return this.getIdFromParent(element.parentElement);
    } else {
      return splitString[splitString.length - 1];
    }
  }

}

MomentumScroll.propTypes = {
  headerText: React.PropTypes.string.isRequired,
  content: React.PropTypes.object.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  className: React.PropTypes.string
};
