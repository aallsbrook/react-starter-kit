'use strict';

import './_Carousel.scss';
import './slick.scss';
import './slick-theme.scss';

import React from 'react';
import Slider from 'react-slick';

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
export default class Carousel extends React.Component {

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
    var settings = {
      dots: this.props.useDots || false,
      arrows: this.props.useArrows || false,
      infinite: this.props.infinite || false,
      centerMode: this.props.centerMode || false,
      speed: this.props.speed || 1000,
      slidesToShow: this.props.slidesToShow || 1,
      slidesToScroll: this.props.slidesToScroll || 1
    };

    var content;
    if (this.props.content.type === CarouselConstants.ContentType.CAR_IMAGE && this.props.content.data) {
      content = this.props.content.data.models.map(this.renderCarItems, this);
    } else if (this.props.content.type === CarouselConstants.ContentType.CAR_DETAIL && this.props.content.data) {
      let defaultImages = ['032', '001', '014'];
      content = defaultImages.map(this.renderCarDetail, this);
    }

    return (
      <div className={this.props.className}>
        <div className='Carousel-title'>
          {this.props.headerText}
        </div>
        <Slider {...settings}>
          {content}
        </Slider>
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
      <div id={'carousel_carimage_' + carInfo.id} className='Carousel-CarImage' key={carInfo.id}
           onTouchTap={this.handleClick.bind(this)}>
        <CarImage type={CarImageConstants.Type.EVOX} evoxObj={evoxObj}/>

        <div className='Carousel-CarImage--label'>
          <div className='carTitleWrap'>
            <div className='carTitle'>{carInfo.make + ' ' + carInfo.model_name}</div>
            <div className='carDecr'>from <span className='carMSRP'>{numberToCurrencyString(carInfo.min_msrp)}</span>
              <span> MSRP</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  renderCarDetail (imageNum) {

    let evoxObj = {
      cloudURL: this.props.content.cloudURL,
      colorCode: this.props.content.data.style.default_color_code,
      evoxSend: this.props.content.data.style.evox_send,
      imageSize: CarImageConstants.Size.MEDIUM,
      imageNumber: imageNum,
      styleID: this.props.content.data.style.style_id
    };

    return (
      <div className='Carousel-CarImage' key={imageNum}>
        <CarImage type={CarImageConstants.Type.EVOX} evoxObj={evoxObj}/>
      </div>
    );
  }

  /**
   * Click event handler to trigger the provided handleSelect callback
   * @param event
   */
  handleClick (event) {
    this.props.handleSelect(this.getId(event.currentTarget));
  }

  /**
   * Helper function for determining the model id of selected CarImage.
   * @param element
   * @returns {*}
   */
  getId (element) {
    var splitString = element.id.split('_');
    return splitString[splitString.length - 1];
  }

}

Carousel.propTypes = {
  className: React.PropTypes.string,
  headerText: React.PropTypes.string.isRequired,
  content: React.PropTypes.object.isRequired,
  useArrows: React.PropTypes.bool,
  useDots: React.PropTypes.bool,
  centerMode: React.PropTypes.bool,
  infinite: React.PropTypes.bool,
  speed: React.PropTypes.number,
  slidesToShow: React.PropTypes.number,
  slidesToScroll: React.PropTypes.number,
  handleSelect: React.PropTypes.func.isRequired
};
