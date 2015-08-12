'use strict';

import './_TrimDetailsPage.scss';

import React from 'react';
import AppActions from '../../actions/AppActions';
import ErrorStore from '../../stores/ErrorStore';
import PromotionsStore from '../../stores/PromotionsStore';
import TrimDetailsStore from '../../stores/TrimDetailsStore';
import RecommendedStore from '../../stores/RecommendedStore';

import Button from '../../components/Button/Button';
import Carousel from '../../components/Carousel/Carousel';
import DetailSection from '../../components/DetailSection/DetailSection';
import ListingsSummary from '../../components/ListingsSummary/ListingsSummary';
import MediaRow from '../../components/MediaRow/MediaRow';
import Table from '../../components/Table/Table';

import { TRIM_DETAILS_GET_ERROR, GET_A_QUOTE_DEFAULT_URL_PARAMS, ENV, LM_MOBILE_URLS } from '../../constants/AppConstants';
import { ButtonConstants, CarouselConstants, ModalConstants } from '../../components/ComponentConstants';
import { getMPGDisplayString, numberToCurrencyString, openURLInDeviceBrowser, valueMissing } from '../../util/Util';

class TrimDetailsPage extends React.Component {

  /**
   * The TrimDetailsPage constructor. Requests the trim detail data from the
   * TrimDetailsStore and then sets that data to state properties.
   *
   * @instance
   * @public
   */
  constructor (...args) {
    super(...args);

    let trimDetail = TrimDetailsStore.getTrimDetailForStyle(this.props.params.id);
    let cloudURL = TrimDetailsStore.getCloudURL();
    let images = TrimDetailsStore.getImagesForStyle(this.props.params.id);
    let videos = TrimDetailsStore.getVideosForStyle(this.props.params.id);
    let hasImages = false;
    let hasVideos = false;

    if (images && (images.interior || images.exterior)) {
      hasImages = true;
    }

    if (!!videos.length) {
      hasVideos = true;
    }

    this.state = {
      carouselContent: {
        type: CarouselConstants.ContentType.CAR_DETAIL,
        data: trimDetail,
        cloudURL: cloudURL
      },
      cloudURL: cloudURL,
      id: this.props.params.id,
      trimDetail: trimDetail,
      hasImages: hasImages,
      hasVideos: hasVideos,
      pageTitle: '',
      styleName: trimDetail.style ? trimDetail.style.style_name : '',
      sortedReviews: []
    };


    this.setTitle();

    if (this.state.trimDetail && this.state.trimDetail.reviews) {
      this.sortReviews();
    }

    this.onChange = this.onChange.bind(this);
    this.onErrorChange = this.onErrorChange.bind(this);
  }

  /**
   * Called by React immediately before the component is rendered. Attaches
   * event handlers to listen to change events on ErrorStore and
   * TrimDetailsStore. Also requests trim details from AppActions.
   *
   * @instance
   * @public
   */
  componentDidMount () {
    // Show the leftnav menu button (it may have been hidden by the ImageGalleryPage)
    document.querySelector('.mui-app-bar-navigation-icon-button').classList.remove('hidden');
    document.getElementById('BodyElement').classList.remove('hide-hamburger-icon');

    ErrorStore.addChangeListener(this.onErrorChange);
    TrimDetailsStore.addChangeListener(this.onChange);

    //console.log("trimDetailsPage#componentDidMount: only render if this.state.id is empty or different then appStateStyleID cache", this.state.id, appStateStyleID)
    //let appStateStyleID = this.props.getAppState().styleID;
    //// Only make API call when appStateStyleID != this.state.id
    //if (this.state.id != appStateStyleID) {
    //
    //  // Since profile changed update appStateProfile
    //  this.props.updateAppState("styleID", this.state.id);
    //
    //  // Make API call
    //  AppActions.getTrimDetails(this.state.id);
    //}

    AppActions.getTrimDetails(this.state.id);


  }

  /**
   * Called by React immediately after the component is removed from the DOM.
   * Removes the event handlers listening to changes in ErrorStore and
   * TrimDetailsStore.
   *
   * @instance
   * @public
   */
  componentWillUnmount () {
    ErrorStore.removeChangeListener(this.onErrorChange);
    TrimDetailsStore.removeChangeListener(this.onChange);
  }

  /**
   * Called when React renders TrimDetailsPage.
   *
   * @instance
   * @public
   * @returns {JSX} The JSX for the entire trim details page.
   */
  render () {
    let carousel, listingsSummary, keySpecs, insurance, reviews;
    if(this.state.carouselContent.data && this.state.carouselContent.data.style) {
      carousel = (
        <Carousel headerText=''
                  content={this.state.carouselContent}
                  useDots={true}
                  handleSelect={this.handleSelect}/>
      );
    }

    listingsSummary = (
      <DetailSection title="Listings">
        <ListingsSummary trimId={this.state.id} />
      </DetailSection>
    );

    if(this.state.trimDetail && this.state.trimDetail.tech_specs && this.state.trimDetail.style) {
      keySpecs = this.renderKeySpecs();
    }

    insurance = (
      <DetailSection title='Insurance'>
        <div>
          <div className="trim-detail-left-continer">
            <span>As a CarZen user you may qualify for discounted rates through Liberty Mutual Insurance.</span>
          </div>
          <div className="trim-detail-right-continer">
            <Button buttonType={ButtonConstants.Type.MEDIUM_SECONDARY}
                    buttonText='Get a Quote'
                    onClick={this.handleGetAQuote}/>
          </div>
        </div>
      </DetailSection>
    );


    reviews = this.state.sortedReviews.map(this.renderReviews, this);

    return (
      <div className='page trim-details-page'>
        <div className="headerAndCarousel">
          <div className='TrimDetails-header'>
            <h3>{this.state.styleName}</h3>

            <p>from
              <b> {numberToCurrencyString(this.state.carouselContent.data.style ? this.state.carouselContent.data.style.msrp : 0)} </b>
              MSRP </p>
          </div>
          {carousel}
          <div id="EVOX_Attribution"></div>
        </div>
        <MediaRow hasImages={this.state.hasImages} hasVideos={this.state.hasVideos} styleId={this.props.params.id}/>
        {listingsSummary}
        {keySpecs}
        <div className="insurance">
          {insurance}
        </div>
        <div className="modelOverview">
          {reviews}
        </div>
      </div>
    );
  }

  /**
   * Builds the key specs table for the render() method.
   *
   * @instance
   * @private
   * @returns {JSX} The Key Specs table as JSX.
   */
  renderKeySpecs () {
    let tableData = [];
    //mpg
    tableData.push({
      displayKey: 'MPG',
      value: getMPGDisplayString(this.state.trimDetail.style.mpg_city, this.state.trimDetail.style.mpg_hway)
    });
    //drivetrain
    tableData.push({
      displayKey: 'Drivetrain',
      value: this.state.trimDetail.style.cf_drive_train || valueMissing()
    });
    //engine
    tableData.push({
      displayKey: 'Engine',
      value: this.state.trimDetail.style.engine || valueMissing()
    });
    //horsepower & transmission type/desc
    let horsepower, transType, transDesc;
    for (var x = 0; x < this.state.trimDetail.tech_specs.length; x++) {
      for (var y = 0; y < this.state.trimDetail.tech_specs[x].value.length; y++) {
        switch (this.state.trimDetail.tech_specs[x].value[y].name) {
          case 'Horsepower':
            horsepower = this.state.trimDetail.tech_specs[x].value[y].value;
            break;
          case 'Trans Type':
            transType = this.state.trimDetail.tech_specs[x].value[y].value;
            break;
          case 'Trans Description Cont.':
            transDesc = this.state.trimDetail.tech_specs[x].value[y].value;
            break;
        }
      }
    }
    tableData.push({
      displayKey: 'Horsepower',
      value: horsepower || valueMissing()
    });
    tableData.push({
      displayKey: 'Transmission Type',
      value: transType || valueMissing()
    });
    tableData.push({
      displayKey: 'Transmission Description',
      value: transDesc || valueMissing()
    });
    //passenger capacity
    tableData.push({
      displayKey: 'Passenger Capacity',
      value: this.state.trimDetail.style.passenger_capacity || valueMissing()
    });

    return (
      <DetailSection title='Key Specs'>
        <Table data={tableData}/>
      </DetailSection>
    );
  }

  /**
   * Renders a review.
   *
   * @instance
   * @private
   * @param {Object}
   *            review - An object with two properties: key and value. Key is
   *                     the review type, and value is the review content.
   * @returns {JSX} The review JSX
   */
  renderReviews (review) {
    let title = '';
    switch (review.key) {
      case 'model_changes':
        title = 'Recent Model Changes';
        break;
      case 'model_overview':
        title = 'Model Overview';
        break;
      case 'model_strengths':
        title = 'Strengths';
        break;
      case 'model_value':
        title = 'Conclusion';
        break;
    }
    return (
      <DetailSection title={title} key={review.key}>
        <p>{review.value}</p>
      </DetailSection>
    );
  }

  /**
   * Creates an array of reviews in a particular order and sets it to
   * this.state.sortedReviews.
   *
   * @instance
   * @private
   */
  sortReviews () {
    //TODO - revisit for a better way to do this when time permits
    let sortedReviews = [];
    let strengths = this.state.trimDetail.reviews.model_strengths;
    if (strengths) {
      sortedReviews.push({
        key: 'model_strengths',
        value: strengths
      });
    }
    let overview = this.state.trimDetail.reviews.model_overview;
    if (overview) {
      sortedReviews.push({
        key: 'model_overview',
        value: overview
      });
    }
    let recentChanges = this.state.trimDetail.reviews.model_changes;
    if (recentChanges) {
      sortedReviews.push({
        key: 'model_changes',
        value: recentChanges
      });
    }
    let conclusion = this.state.trimDetail.reviews.model_value;
    if (conclusion) {
      sortedReviews.push({
        key: 'model_value',
        value: conclusion
      });
    }
    // TODO - We shouldn't be setting state like this.
    this.state.sortedReviews = sortedReviews;
  }

  /**
   * Called when there is a change in the data in TrimDetailsStore. Sets the
   * page's state with data from TrimDetailsStore, and calls sortReviews() and
   * setTitle().
   *
   * @instance
   * @private
   */
  onChange () {
    let trimDetails = TrimDetailsStore.getTrimDetailForStyle(this.state.id);
    let cloudURL = TrimDetailsStore.getCloudURL();
    let images = TrimDetailsStore.getImagesForStyle(this.props.params.id);
    let hasImages = false;
    if (images && (images.interior || images.exterior)) {
      hasImages = true;
    }
    let hasVideos = false;
    let videos = TrimDetailsStore.getVideosForStyle(this.props.params.id);
    if (!!videos.length) {
      hasVideos = true;
    }

    this.setState({
      trimDetail: trimDetails,
      hasImages: hasImages,
      hasVideos: hasVideos,
      cloudURL: cloudURL,
      styleName: trimDetails.style ? trimDetails.style.style_name : '',
      carouselContent: {
        type: CarouselConstants.ContentType.CAR_DETAIL,
        data: trimDetails,
        cloudURL: cloudURL
      }
    });
    if (this.state.trimDetail && this.state.trimDetail.reviews) {
      this.sortReviews();
    }
    this.setTitle();
  }

  /**
   * Called when there is a change in the data in ErrorStore. Displays a modal
   * with the error message.
   *
   * @instance
   * @private
   */
  onErrorChange () {
    let contentObj = {
      data: ErrorStore.getError(TRIM_DETAILS_GET_ERROR),
      retry: this.handleRetry.bind(this)
    };
    if (contentObj.data) {
      this.props.showModal(ModalConstants.Type.ERROR, contentObj);
    }
  }

  /**
   * Event handler for when the 'Get a Quote' button is pressed. Gets promos
   * from PromotionsStore, generates a URL and loads it.
   *
   * @instance
   * @private
   */
  handleGetAQuote () {
    //if more promotions are ever added in the future, this will need to be updated accordingly
    let allPromos = PromotionsStore.getPromos(), promoObj;
    promoObj = allPromos[1];

    let url = LM_MOBILE_URLS[ENV];

    if (promoObj) {
      url += '?cmpgnde=' + promoObj.promotion_cmpgncde + '&MM_webID=' + promoObj.promotion_webid + '&src=' + promoObj.promotion_src;
    } else {
      url += '?' + GET_A_QUOTE_DEFAULT_URL_PARAMS;
    }
    openURLInDeviceBrowser(url);
  }

  /**
   * A noop if you select a car image. Will be implemented later.
   *
   * @instance
   * @private
   */
  handleSelect () {
    //currently a noop if you select a car image
  }

  /**
   * Tries to request trim details from AppActions if there was an error.
   *
   * @instance
   * @private
   */
  handleRetry () {
    AppActions.getTrimDetails(this.state.id);
  }

  /**
   * Sets the page title
   *
   * @instance
   * @private
   */
  setTitle () {
    // TODO - state properties shouldn't be set like this.
    this.state.pageTitle = this.getPageTitle();
    this.props.setTitle(this.state.pageTitle);
  }

  /**
   * Gets the page title from the trim detail data. Title is made of the model's
   * make and model name (if they exist).
   *
   * @instance
   * @private
   *
   * @returns {String} The page title.
   */
  getPageTitle () {

    //TODO: Always get data from store, (always, or just first attempt?) since we want to use chaced data whenever we land on this page.
    let appState = this.props.getAppState();
    let modelData = RecommendedStore.getModelDataById(parseInt(appState.styleID));


    let pageTitle = '';

    if (!!modelData) {
      if (!!modelData.make) {
        pageTitle = modelData.make;
      }
      if (!!modelData.model_name) {
        pageTitle += ' ' + modelData.model_name;
      }
    }
    return pageTitle;
  }
}

TrimDetailsPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired,
  getAppState: React.PropTypes.func.isRequired
};

export default TrimDetailsPage;
