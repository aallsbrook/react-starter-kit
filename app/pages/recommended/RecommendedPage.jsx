'use strict';

import './_RecommendedPage.scss';
import Carousel from '../../components/Carousel/Carousel';
import MomentumScroll from '../../components/MomentumScroll/MomentumScroll';

import React from 'react';

import AppActions from '../../actions/AppActions';

import ErrorStore from '../../stores/ErrorStore';
import ProfileStore from '../../stores/ProfileStore';
import PromotionsStore from '../../stores/PromotionsStore';
import RecommendedStore from '../../stores/RecommendedStore';

import { RECOMMENDED_GET_ERROR } from '../../constants/AppConstants';
import { CarImageConstants, CarouselConstants, ModalConstants } from '../../components/ComponentConstants';

import _ from 'lodash';

/**
 * A page that will display recommended vehichles based on a users profile (interview response)
 *
 *
 */
class RecommendedPage extends React.Component {

  /**
   * Initialize the state with the recommended store data (will be an empty array if app was just
   * launched. Also set the title of the page as needed, and bind change methods to this components
   * scope.
   * @param args
   */
  constructor (...args) {
    super(...args);
    let recommended = RecommendedStore.getRecommended();
    let cloudURL = RecommendedStore.getCloudURL();
    this.state = {
      cloudURL: cloudURL,
      recommended: recommended
    };

    this.props.setTitle('Recommended Results');

    this.onChange = this.onChange.bind(this);
    this.onErrorChange = this.onErrorChange.bind(this);
    this.onPromoChange = this.onPromoChange.bind(this);

  }

  /**
   * Add needed change listeners, and trigger getRecommended API call after component has mounted
   */
  componentDidMount () {
    //First let's see if we have a promo available, if so navigate to that page immediately
    if (PromotionsStore.isPromoAvailable()) {
      window.location.hash = '/promotion';
    }
    this.props.setTitle('Recommended Results');

    ErrorStore.addChangeListener(this.onErrorChange);
    PromotionsStore.addChangeListener(this.onPromoChange);
    RecommendedStore.addChangeListener(this.onChange);
    let profile = ProfileStore.getProfileObject();
    let appStateProfile = this.props.getAppState().profile;

    // Only make API call when appStateProfile != profile
    if (!(_.isEqual(profile, appStateProfile)) || !this.state.recommended.length) {

      // Since profile changed update appStateProfile
      this.props.updateProfileState();

      // Make API call
      AppActions.getRecommended(profile);

    }
  }

  /**
   * Clean up any added change listeners when component unmounts
   */
  componentWillUnmount () {
    ErrorStore.removeChangeListener(this.onErrorChange);
    PromotionsStore.removeChangeListener(this.onPromoChange);
    RecommendedStore.removeChangeListener(this.onChange);
  }

  /**
   * Render the page including needed components
   * @returns {XML}
   */
  render () {
    var content;
    if (this.state.recommended) {
      content = this.state.recommended.map(this.renderCarousel, this);
    }

    return (
      <div className='page recommendedPage'>
        {content}
      </div>
    );
  }

  /**
   * Helper method to render each Carousel component on this page (total of 3). The title
   * of the component is included in the Recommended API response.
   * @param sectionContent
   * @param index
   * @returns {XML}
   */
  renderCarousel (sectionContent, index) {
    var content = {
      type: CarouselConstants.ContentType.CAR_IMAGE,
      imageSize: null,
      cloudURL: this.state.cloudURL,
      data: sectionContent
    };
    if (index === 0) { // top picks
      content.imageSize = CarImageConstants.Size.MEDIUM;
      return (
        <Carousel className={'RecommendedPage-' + sectionContent.name.replace(/[^a-zA-Z0-9]/g, '') + 'Carousel'}
                  headerText={sectionContent.name}
                  content={content}
                  arrows={index === 0 ? true : false}
                  slidesToShow={index === 0 ? 1 : 2.3}
                  slidesToScroll={index === 0 ? 1 : 1.3}
                  centerMode={index === 0 ? true : false}
                  infinite={index === 0 ? true : false}
                  key={index} handleSelect={this.handleSelect.bind(this)}/>
      );
    } else { // additional picks and trending
      content.imageSize = CarImageConstants.Size.SUPER_SMALL;
      return (
        <MomentumScroll className={'RecommendedPage-' + sectionContent.name.replace(/[^a-zA-Z0-9]/g, '') + 'Carousel'}
                        headerText={sectionContent.name}
                        content={content}
                        slidesToShow={index === 0 ? 1 : 2.3}
                        slidesToScroll={index === 0 ? 1 : 1.3}
                        centerMode={index === 0 ? true : false}
                        infinite={index === 0 ? true : false}
                        key={index} handleSelect={this.handleSelect.bind(this)}/>
      );

    }
  }

  /**
   * Callback used when any specific item in a carousel is selected. The model ID will
   * be returned so that we can navigate to the correct trims page
   * @param id
   */
  handleSelect (id) {
    window.location.hash = 'trims/' + id;
  }

  /**
   * Callback function for anytime the stores content changes. Update state accordingly
   */
  onChange () {
    let recommended = RecommendedStore.getRecommended();
    let cloudURL = RecommendedStore.getCloudURL();

    this.setState({
      cloudURL: cloudURL,
      recommended: recommended
    });
    this.props.setTitle('Recommended Results');

  }

  /**
   * Callback for if an error occurred when attempting API call.  If so, show error modal
   */
  onErrorChange () {
    let contentObj = {
      data: ErrorStore.getError(RECOMMENDED_GET_ERROR),
      retry: this.handleRetry.bind(this)
    };
    if (contentObj.data) {
      this.props.showModal(ModalConstants.Type.ERROR, contentObj);
    }
  }

  onPromoChange () {
    if (PromotionsStore.isPromoAvailable()) {
      window.location.hash = '/promotion';
    }
  }

  /**
   * Function to be called when user presses the retry button on error page. Attempt API
   * call again
   */
  handleRetry () {
    AppActions.getRecommended(ProfileStore.getProfileObject());
  }
}

RecommendedPage.propTypes = {
  getAppState: React.PropTypes.func.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired,
  updateProfileState: React.PropTypes.func.isRequired
};

export default RecommendedPage;


