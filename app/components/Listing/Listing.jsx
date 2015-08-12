/*eslint camelcase:0*/

'use strict';

import './_Listing.scss';

import React from 'react';

import CarImage from '../../components/CarImage/CarImage';
import ListItem from '../../components/ListItem/ListItem';

import { CarImageConstants } from '../ComponentConstants';

/**
 * A component used to display an overview of a specific Listing, including the first available picture, MSRP, location, and color
 */
class Listing extends React.Component {

  render () {
    return (
      <ListItem handleSelect={this._handleSelect.bind(this)}>
      <div className="Listing">
        <div className="Listing-image">
          <CarImage height={this.props.height} width={this.props.width} type={CarImageConstants.Type.BORDER} imageURL={this.props.listingObj.image_url}/>
        </div>
        <div className="Listing-info">
          <div className="Listing-info--msrp">
            {this.props.listingObj.price || 'Price Unavailable'}
          </div>
          <div className="Listing-info--location">
            {this._locationObjectToDisplayString(this.props.listingObj.location)}
          </div>
          <div className="Listing-info--color">
            {this.props.listingObj['exterior-color']}
          </div>
        </div>
      </div>
        </ListItem>
    );
  }

  _handleSelect (event) {
    if (this.props.handleSelect) {
      this.props.handleSelect(event, this.props.listingObj.id);
    }
  }

  /**
   * Helper method to transform the locationObject provided by the backend into a display string of City, State
   * @param locationObj
   * @returns {string}
   * @private
   */
  _locationObjectToDisplayString (locationObj) {
    return locationObj.city + ', ' + locationObj.state;
  }
}

Listing.propTypes = {
  listingObj: React.PropTypes.shape({
    image_url: React.PropTypes.string,
    price: React.PropTypes.string.isRequired,
    'exterior-color': React.PropTypes.string.isRequired,
    location: React.PropTypes.shape({
      city: React.PropTypes.string.isRequired,
      state: React.PropTypes.string.isRequired
    }),
    id: React.PropTypes.string.isRequired
  }).isRequired,
  height: React.PropTypes.string.optional,
  width: React.PropTypes.string.optional,
  handleSelect: React.PropTypes.func
};

export default Listing;
