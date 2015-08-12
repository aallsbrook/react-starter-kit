'use strict';

import './_ListingsSummary.scss';

import React from 'react';
import AppActions from '../../actions/AppActions';

import ListItem from '../ListItem/ListItem';
import CarImage from '../CarImage/CarImage';
import StyleListingsStore from '../../stores/StyleListingsStore';
import ProfileStore from '../../stores/ProfileStore';
import ErrorStore from '../../stores/ErrorStore';

import { STYLE_LISTINGS_GET_ERROR, STYLE_LISTINGS_RANGE, STYLE_LISTINGS_PER_PAGE } from '../../constants/AppConstants';
import { CarImageConstants } from '../ComponentConstants';

export default class ListingsSummary extends React.Component {
  /**
   * The ListingsSummary constructor. Accepts an arbitrary ammount of arguments
   * which get passed to the React.Component super class.
   *
   * @instance
   * @public
   */
  constructor (...args) {
    super(...args);
    let zipCode = ProfileStore.getZipCode();
    this.state = {
      serverError: false,
      zipCode: zipCode
    };

    this.onChange = this.onChange.bind(this);
    this.onErrorChange = this.onErrorChange.bind(this);
  }

  /**
   * Called by React immediately before the component is rendered. Attaches the
   * StyleListingsStore and ErrorStore event listeners. Also requests the style
   * listings from AppActions.
   *
   * @instance
   * @public
   */
  componentDidMount () {
    StyleListingsStore.addChangeListener(this.onChange);
    ErrorStore.addChangeListener(this.onErrorChange);
    // let appStateStyleID = this.props.getAppState().styleID;

    //console.log("xxxxxxx ListingsSummary#componentDidMount: appStateStyleID",appStateStyleID)

    // Only make API call when appStateStyleID != this.state.id
    //if (this.props.trimId != appStateStyleID) {
    //
    //  // Since profile changed update appStateProfile
    //  this.props.updateAppState("styleID", this.props.trimId);
    //
    //  // Make API call
    //  //AppActions.getTrimDetails(this.state.id);
    //  AppActions.getStyleListings(this.props.trimId, this.state.zipCode, STYLE_LISTINGS_RANGE, STYLE_LISTINGS_PER_PAGE, 1);
    //
    //}

    AppActions.getStyleListings(this.props.trimId, this.state.zipCode, STYLE_LISTINGS_RANGE, STYLE_LISTINGS_PER_PAGE, 1);

  }

  /**
   * Called by React immediately after the component is removed from the DOM.
   * Removes the StyleListingsStore and ErrorStore event listeners.
   *
   * @instance
   * @public
   */
  componentWillUnmount () {
    StyleListingsStore.removeChangeListener(this.onChange);
    ErrorStore.removeChangeListener(this.onErrorChange);
  }

  /**
   * Called by React to render ListingsSummary. Chooses whether or not to render
   * the car image and any error messages.
   *
   * @instance
   * @public
   * @returns {JSX} The ListingsSummary JSX
   */
  render () {
    let errorOccured = false;
    let errorMessage;

    let carImage = <div className="ListingsSummary--spinner"></div>;
    if (this.state.firstImage) {
      carImage = (
        <CarImage type={CarImageConstants.Type.STACK} imageURL={this.state.firstImage} />
      );
    }

    let listingsInfo = 'Searching for listings';
    if (this.state.totalListings && typeof this.state.totalListings === 'number') {
      let vehicleOrVehicles = 'vehicle';
      if (this.state.totalListings > 1) {
        vehicleOrVehicles += 's';
      }
      listingsInfo = this.state.totalListings + ' matching ' + vehicleOrVehicles + ' within 50 miles of ' + this.state.zipCode;
    } else if (this.state.totalListings === 0) {
      errorOccured = true;
      errorMessage = 'No Listings found for this vehicle';
    }

    if (this.state.serverError) {
      errorOccured = true;
      errorMessage = 'There was a problem retrieving listings';
    }

    return (
      <ListItem classes={'ListingsSummary' + (!this.state.totalListings ? ' loading' : '') + (errorOccured ? ' error' : '')} handleSelect={this.handleClick.bind(this)}>
        <div>
          <div className="ListingsSummary--image">
            {carImage}
          </div>
          <div className="ListingsSummary--info">
            {listingsInfo}
          </div>
          <div className="ListingsSummary--error">
            {errorMessage}
          </div>
        </div>
      </ListItem>
    );
  }

  /**
   * Handles a click on the ListingsSummary.
   *
   * @instance
   * @private
   */
  handleClick () {
    window.location.hash = 'listings/' + this.props.trimId;
  }

  /**
   * Gets called if there is a change in the StyleListingsStore's data. Sets
   * the component's firstImage and totalListings state properties.
   *
   * @instance
   * @private
   */
  onChange () {
    let firstImage = StyleListingsStore.getFirstStyleImage(this.props.trimId);
    let totalListings = StyleListingsStore.getListingsCount(this.props.trimId);
    this.setState({
      firstImage: firstImage,
      totalListings: totalListings
    });
  }

  /**
   * Gets called if there is a change in the ErrorStore. If it is a
   * styleListingsError, the serverError state property is set to true so that
   * the server error message is rendered.
   *
   * @instance
   * @private
   */
  onErrorChange () {
    let styleListingsError = ErrorStore.getError(STYLE_LISTINGS_GET_ERROR);
    if (styleListingsError) {
      this.setState({serverError: true});
    }
  }
}

ListingsSummary.propTypes = {
  trimId: React.PropTypes.string.isRequired
};
