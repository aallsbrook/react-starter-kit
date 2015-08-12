'use strict';

import './_Trim.scss';

import React from 'react';
import CarImage from '../CarImage/CarImage';

import { CarImageConstants } from '../../components/ComponentConstants';

export default class Trim extends React.Component {

  render () {

    let evoxObj = {
      cloudURL: this.props.cloudURL,
      colorCode: this.props.trim.default_color_code,
      evoxSend: this.props.trim.evox_send,
      imageSize: CarImageConstants.Size.SUPER_SMALL,
      imageNumber: '032',
      styleID: this.props.trim.style_id
    };

    return (
      <div className="Trim" id={'trim_' + this.props.trim.style_id}>
        <div className="Trim-item">
          <div className="Trim-item--image-and-price">
            <CarImage type={CarImageConstants.Type.EVOX} evoxObj={evoxObj}/>
            <span className="Trim-item--price">
              <span className="Trim-item--price-label">MSRP:</span><br></br>
              <b>{this.numberToCurrencyString(this.props.trim.msrp)}</b>
            </span>
          </div>
          <div className="Trim-item--content">
            <div className="Trim-item--car-info">
              <div><span className="Trim-item--name">{this.props.trim.cf_style_name}</span></div>
              <div className="Trim-item--hanging-indent"><span className="Trim-item--car-info-key">MPG: </span><span
                className="Trim-item--car-info-value">{this.getMPGDisplayString()}</span></div>
              <div className="Trim-item--hanging-indent"><span className="Trim-item--car-info-key">Engine: </span><span
                className="Trim-item--car-info-value">{this.props.trim.engine || '\u2013\u2013'}</span></div>
              <div className="Trim-item--hanging-indent"><span
                className="Trim-item--car-info-key">Drivetrain: </span><span
                className="Trim-item--car-info-value">{this.props.trim.drive || '\u2013\u2013'}</span></div>
              <div className="Trim-item--hanging-indent"><span className="Trim-item--car-info-key">Transmission: </span><span
                className="Trim-item--car-info-value">{this.props.trim.transmission || '\u2013\u2013'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  numberToCurrencyString (num) {
    return '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  getMPGDisplayString () {
    if (this.props.trim.mpg_city && this.props.trim.mpg_hway) {
      return 'City ' + this.props.trim.mpg_city + '/Hwy ' + this.props.trim.mpg_hway;
    } else {
      return String.fromCharCode(8211) + String.fromCharCode(8211);
    }
  }
}

Trim.propTypes = {
  cloudURL: React.PropTypes.string.isRequired,
  trim: React.PropTypes.object.isRequired
};

export default Trim;
