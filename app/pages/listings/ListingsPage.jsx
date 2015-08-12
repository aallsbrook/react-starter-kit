'use strict';

import './_ListingsPage.scss';

import React from 'react';

import DetailSection from '../../components/DetailSection/DetailSection';
import Listing from '../../components/Listing/Listing';

import AppActions from '../../actions/AppActions';
import ErrorStore from '../../stores/ErrorStore';
import ProfileStore from '../../stores/ProfileStore';
import StyleListingsStore from '../../stores/StyleListingsStore';
import TrimDetailsStore from '../../stores/TrimDetailsStore';

import { STYLE_LISTINGS_GET_ERROR, STYLE_LISTINGS_PER_PAGE, STYLE_LISTINGS_RANGE } from '../../constants/AppConstants';

/**
 * Page controller for the Listings view.
 */
class ListingsPage extends React.Component {

  /**
   * On creation of page we must set the page title, initially populate the listings (if any are cached), determine the
   * string to display for the detail section, and finally set the initial state of the page.
   * @param args
   */
  constructor (...args) {
    super(...args);

    this.setPageTitle();

    let pagesToDisplay = 1;

    let listings = StyleListingsStore.getStyleListings(this.props.params.id, pagesToDisplay);
    let listingsCount = StyleListingsStore.getListingsCount(this.props.params.id);
    let zipCode = ProfileStore.getZipCode();
    let detailSectionTitle;
    if (listingsCount && typeof listingsCount === 'number') {
      let vehicleOrVehicles = 'vehicle';
      if (listingsCount > 1) {
        vehicleOrVehicles += 's';
      }
      detailSectionTitle = listingsCount + ' matching ' + vehicleOrVehicles + ' within 50 miles of ' + zipCode;
    }

    this.state = {
      listings: listings,
      detailSectionTitle: detailSectionTitle,
      totalListings: listingsCount,
      pagesDisplayed: pagesToDisplay,
      zipCode: zipCode,
      loading: false
    };

    this.onStyleListingsChange = this.onStyleListingsChange.bind(this);
    this.onErrorChange = this.onErrorChange.bind(this);

  }

  /**
   * Add needed change listeners when component successfully mounts
   */
  componentDidMount () {
    ErrorStore.addChangeListener((this.onErrorChange));
    StyleListingsStore.addChangeListener(this.onStyleListingsChange);
  }

  /**
   * Remove change listeners when component is being unmounted
   */
  componentWillUnmount () {
    ErrorStore.removeChangeListener(this.onErrorChange);
    StyleListingsStore.removeChangeListener(this.onStyleListingsChange);
  }

  /**
   * Render the needed components for the page. This includes the DetailSection, all the needed Listing components,
   * and the Load More link/button (if required). Also if there is an errorObj present on state, an error message should
   * be displayed
   * @returns {XML}
   */
  render () {

    let loadMore;
    if (this.state.loading) {
      loadMore = (
        <div className="ListingsPage-loading loading-spinner--green">
        </div>
      );
    } else if (this.state.listings.length < this.state.totalListings) {
      let loadMoreText = 'Load More';
      if (this.state.errorObj) {
        loadMoreText = 'Try Again';
      }
      loadMore = (
        <div className="ListingsPage-loadmore pseudolink" onClick={this.handleLoadMore.bind(this)}>
          {loadMoreText}
        </div>
      );
    }
    let errorMessage;
    if (this.state.errorObj && !this.state.loading) {
      errorMessage = (
        <div className="ListingsPage-error">
          There was a problem loading more results.
        </div>
      );
    }
    return (
      <div className="ListingsPage page">
        <DetailSection title={this.state.detailSectionTitle}>
          <div className="ListingsPage-listings">
            {this.state.listings.map(this.renderListing, this)}
          </div>
        </DetailSection>
        {errorMessage}
        {loadMore}
      </div>
    );
  }

  /**
   * Helper method for rendering each listing returned by the StyleListing store
   * @param listing
   * @returns {XML}
   */
  renderListing (listing) {
    return (
      <Listing height="3.797rem" width="5.063rem" listingObj={listing} handleSelect={this.handleSelect.bind(this)}/>
    );
  }

  /**
   * Function called when Load More/Try Again button/link is pressed at the bottom of the page. We call the AppAction to
   * load the next page of results from the server, and set the pages state to loading.
   */
  handleLoadMore () {
    let nextPageNum = this.state.pagesDisplayed + 1;
    AppActions.getStyleListings(this.props.params.id, this.state.zipCode, STYLE_LISTINGS_RANGE, STYLE_LISTINGS_PER_PAGE, nextPageNum);
    this.setState({
      loading: true
    });
  }

  /**
   * Function called when a Listing is selected. Will take you to the Listing details page
   */
  handleSelect (event, listingId) {
    window.location.hash = '/listing/' + listingId;
  }

  /**
   * Method called when a change occurs within the StyleListingsStore. We should get the next page of results
   * from the store, and append them to the current listings
   */
  onStyleListingsChange () {
    let nextPageNum = this.state.pagesDisplayed + 1;
    let newListings = StyleListingsStore.getStyleListings(this.props.params.id, nextPageNum);
    if (newListings.length > 0) {
      let allListings = this.state.listings;
      this.setState({
        listings: allListings.concat(newListings),
        pagesDisplayed: nextPageNum,
        loading: false,
        errorObj: null
      });
    }
  }

  /**
   * Method called when an error occurs on the get style listings call. A generic error message should be displayed
   * to the user, as well as the Load More text changing to Try Again
   */
  onErrorChange () {
    let errorObj = ErrorStore.getError(STYLE_LISTINGS_GET_ERROR);
    if (errorObj) {
      this.setState({
        errorObj: errorObj,
        loading: false
      });
    }
  }

  /**
   * Helper method to set the page title. Since the page title is based of the car make/model, we access this
   * information through the TrimDetailsStore, and build the display string accordingly. Finally calling the
   * setTitle prop passed down from AppController.
   */
  setPageTitle () {
    let trimDetail = TrimDetailsStore.getTrimDetailForStyle(this.props.params.id);
    let pageTitle = '';
    if (!!trimDetail.model) {
      if (!!trimDetail.model.make) {
        pageTitle = trimDetail.model.make;
      }
      if (!!trimDetail.model.model_name) {
        pageTitle += ' ' + trimDetail.model.model_name;
      }
    }
    pageTitle += ' Listings';
    this.props.setTitle(pageTitle);
  }

}

ListingsPage.propTypes = {
  setTitle: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired
};

export default ListingsPage;
