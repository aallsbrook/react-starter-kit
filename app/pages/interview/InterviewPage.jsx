'use strict';

import './_InterviewPage.scss';

import React from 'react';

import Card from '../../components/Card/Card';
import { DefaultRankSort, InterviewProcess } from './InterviewProcess';
import AppActions from '../../actions/AppActions';
import InterviewActions from '../../actions/InterviewActions';
import { register } from '../../dispatcher/AppDispatcher';

import ErrorStore from '../../stores/ErrorStore';
import ProfileStore from '../../stores/ProfileStore';

import { VALIDATE_ZIPCODE_ERROR, VALIDATE_ZIPCODE_SUCCESS } from '../../constants/AppConstants';
import { ButtonConstants, CardConstants, ModalConstants } from '../../components/ComponentConstants';

import _ from 'lodash';

/**
 * A component that is used as the controller for the Interview Process. Because this is an all or nothing process (we
 * don't need to store current state so user can return to same spot if they leave) we will not store the users response
 * until reaching the end in the ProfileStore
 *
 * This also handles the animation between Interview Cards. When this page loads it creates all needed cards for the process
 * and applies the needed styles to animate between them when the next button is clicked
 *
 * Upon reaching the final page and clicking that button, we will save the profile info, and for now navigate to the home page
 * This is likely to change as we finish implementing more pages
 */
class InterviewPage extends React.Component {

  /**
   * Constructor function that initializes default value for variables used on this page. Selected traits store all selected
   * traits by the user, and we store the current index on the state of this component for tracking interview process progress
   * @param args
   */
  constructor (...args) {
    super(...args);
    this.props.setTitle('CarZen');

    let traits = ProfileStore.getTraits() || [];
    let attributes = ProfileStore.getAttributesRank() || DefaultRankSort;

    let defaultInterview = _.cloneDeep(InterviewProcess);
    let interviewProcess = this.mergePreviousResponses(defaultInterview, traits, attributes);

    this.state = {
      currentIndex: 0,
      interviewProcess: interviewProcess,
      selectedTraits: traits,
      rankedAttributes: attributes,
      zipCode: ProfileStore.getZipCode() || ''
    };

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);

    register(this.eventHandler.bind(this));

  }

  /**
   * All InterviewCards are hidden by default. Once this component has mounted, we can unhide the first card
   */
  componentDidMount () {
    this.handleBackForwardButtonPress();
    ErrorStore.addChangeListener(this.handleErrorChange);
    ProfileStore.addChangeListener(this.handleProfileChange);
    window.addEventListener('hashchange', this.onHashChange.bind(this));

    let interviewPage = document.querySelector('.interviewPage');
    if (!!interviewPage) {
      interviewPage.classList.remove('hidden');
      interviewPage.classList.add('visible');
    }

    /*
     * When returning to InterviewPage from another page, populate the zipCode field
     * from the ProfileStore (localStorage)
     */
    let profileZipCode = ProfileStore.getZipCode();
    if (profileZipCode) {
      this.refs[this.state.interviewProcess.length - 2].refs.zipInput.setValue(profileZipCode);
    }

  }

  componentWillUnmount () {
    ErrorStore.removeChangeListener(this.handleErrorChange);
    ProfileStore.removeChangeListener(this.handleProfileChange);
    window.removeEventListener('hashchange', this.onHashChange.bind(this));
  }

  /**
   * Render this page/component content (multiple interview cards for each step of the process)
   * @returns {XML}
   */
  render () {
    return (
      <div className="page interviewPage">
        {this.state.interviewProcess.map(this.renderCard, this)}
      </div>
    );
  }

  /**
   * Helper function to render each step of the interview process. We parse the JSON found in InterviewProcess.js and
   * pass into each InterviewCard the needed data for displaying
   * @param cardData
   * @param index
   * @returns {XML}
   */
  renderCard (cardData, index) {
    return (
      <Card key={index}
            ref={index}
            id={'interviewcard_' + index}
            type={this.state.interviewProcess[index].content.type}
            title={cardData.title}
            text={cardData.text}
            content={cardData.content}
            button={cardData.button}
            onComplete={this.handleCardButtonClicked.bind(this)}/>
    );
  }

  mergePreviousResponses (interviewProcess, traits, attributes) {
    //TODO: A better/more efficient way to do this?
    for (var x = 0; x < interviewProcess.length; x++) {
      if (interviewProcess[x].content.type === CardConstants.ContentType.TRAIT_SELECTION) {
        for (var y = 0; y < interviewProcess[x].content.data.length; y++) {
          for (var z = 0; z < traits.length; z++) {
            if (traits[z].id === interviewProcess[x].content.data[y].id) {
              interviewProcess[x].content.data[y].checked = true;
            }
          }
        }
      }
      if (interviewProcess[x].content.type === CardConstants.ContentType.RANK_SORT) {
        if (attributes.length > 0) {
          interviewProcess[x].content.data = attributes;
        }
      }
    }
    return interviewProcess;
  }

  handleBackForwardButtonPress () {

    let newIndex = null;
    if (!!this.props.params.index) {
      newIndex = parseInt(this.props.params.index);
    } else {
      newIndex = 0;
    }

    let interviewPage = document.querySelector('.interviewPage');

    if (newIndex > 0) {
      if (interviewPage && interviewPage.classList) {
        interviewPage.classList.add('position' + newIndex);
        interviewPage.classList.remove('position' + this.state.currentIndex);
      }
    } else {
      if (interviewPage && interviewPage.classList) {
        interviewPage.classList.remove('position' + this.state.currentIndex);
      }
    }

    this.setState({
      currentIndex: newIndex
    });

  }

  /**
   * Callback function for when the user clicks the next/done button on each Interview card. Each interview card content
   * type will have returnedData structured a bit differently, so we handle each individually and store what is needed on
   * the components scope.
   *
   * If this is the final card to be displayed we trigger the the saving of profile info, and then navigate to the next
   * page
   *
   * Finally, if this is not the final card we need to animate the transition. This is done by applying/removing
   * the required classes. Finally we increment the current index by one
   * @param returnedData
   */
  handleCardButtonClicked (returnedData) {
    // Setup any data that needs to be changed
    if (this.state.interviewProcess[this.state.currentIndex].content.type === CardConstants.ContentType.TRAIT_SELECTION) {
      // Determine what was added and removed. Omit unchecked selections as the remaining traits.
      let [addedTraits, removedTraits] = _.partition(returnedData, 'checked');
      let removedById = _.groupBy(removedTraits, 'id');
      let remainingTraits = _.reject(this.state.selectedTraits, function (trait) {
        return removedById[trait.id];
      });

      // Combine the remaining traits and any newly added traits. Make sure the results are unique.
      this.state.selectedTraits = _.uniq(_.union(remainingTraits, addedTraits), 'id');
    } else if (this.state.interviewProcess[this.state.currentIndex].content.type === CardConstants.ContentType.RANK_SORT) {
      this.state.rankedAttributes = returnedData;
    } else if (this.state.interviewProcess[this.state.currentIndex].content.type === CardConstants.ContentType.ZIP_CODE) {
      let zipInputRef = this.refs[this.state.currentIndex].refs.zipInput;
      //check if user inputted a 5 digit number
      if (zipInputRef.getValue().length === 0) {
        this.showZipError('Please enter a ZIP code');
      } else if (/\b\d{5}\b/.test(zipInputRef.getValue())) {
        //verify valid zip against server
        AppActions.validateZip(zipInputRef.getValue());
      } else {
        this.showZipError('Not a valid ZIP code');
      }
      this.state.zipCode = returnedData;
      if (!!ProfileStore.getTraits() && !!ProfileStore.getAttributesRank()) {
        return;
      }
    } else if (this.state.interviewProcess[this.state.currentIndex].content.type === CardConstants.ContentType.CONGRATULATIONS) {
      InterviewActions.interviewCompleted(this.state.selectedTraits, this.state.rankedAttributes, this.state.zipCode);
    }

    //if not the last page animate to next card
    if (this.state.currentIndex !== this.state.interviewProcess.length - 1) {

      if (this.state.interviewProcess[this.state.currentIndex + 1].content.type === CardConstants.ContentType.ZIP_CODE) {
        //prepopulate the zip field if possible
        let zipInput = this.refs[this.state.interviewProcess.length - 2].refs.zipInput;
        if (ProfileStore.getZipCode()) {
          zipInput.setValue(ProfileStore.getZipCode());
        } else if (typeof ZipCode !== 'undefined' && ZipCode.mostRecentZipCode) {
          zipInput.setValue(ZipCode.mostRecentZipCode);
        }
      }

      let newIndex = this.state.currentIndex + 1;
      let interviewPage = document.querySelector('.interviewPage');

      if (newIndex !== 0) {
        interviewPage.classList.add('visible');
      }

      interviewPage.classList.add('position' + newIndex);
      interviewPage.classList.remove('position' + this.state.currentIndex);

      // Scroll back to the top of the page
      window.scrollTo(0, 0);
      this.setState({
        currentIndex: newIndex
      });

      // handle back/forward button clicks by updating the hash
      if (newIndex !== this.state.currentIndex) {
        let newHash = '/interview/' + newIndex;
        window.location.hash = newHash;
      }

    }
  }

  handleErrorChange () {
    let errorObj = ErrorStore.getError(VALIDATE_ZIPCODE_ERROR);
    if (errorObj && errorObj.code && errorObj.code === 200) {
      this.showZipError('Not a valid ZIP code');
    } else if (errorObj) {
      let modalContent = {
        data: errorObj,
        retry: this.handleRetry.bind(this)
      };
      this.props.showModal(ModalConstants.Type.ERROR, modalContent);
    }
  }

  handleProfileChange () {
    this.completeInterviewProcess();
  }

  handleRetry () {
    AppActions.validateZip(this.state.zipCode);
  }

  eventHandler (action) {
    if (action.type === VALIDATE_ZIPCODE_SUCCESS) {
      if (!!ProfileStore.getTraits() && !!ProfileStore.getAttributesRank()) {
        let that = this;
        // The dispatcher we are using doesn't allow for 2 events to be fired alongside each other, so to avoid an error
        // being thrown, we use a setTimeout (with no timeout length specificed) to force the next action to be called on
        // the next tick, after the current event (VALIDATE_ZIPCODE_SUCCESS) has finished it's lifecycle.
        setTimeout(function () {
          InterviewActions.interviewCompleted(that.state.selectedTraits, that.state.rankedAttributes, that.state.zipCode);
        });
      }
    }
  }

  showZipError (errorText) {
    let interviewProcess = this.state.interviewProcess;
    interviewProcess[this.state.currentIndex].button.text = 'Try Again';
    interviewProcess[this.state.currentIndex].button.icon = ButtonConstants.Icon.RETRY;
    this.setState({
      interviewProcess: interviewProcess
    });
    this.refs[this.state.currentIndex].refs.zipInput.showError(errorText);
  }

  completeInterviewProcess () {
    window.location.hash = '/recommended';
  }

  onHashChange (hash) {
    let currentIndex = this.state.currentIndex;
    let newURLarray = hash.newURL.split('/');
    let hashIndex = 0;

    // If not at interview home
    if (newURLarray[newURLarray.length - 1] !== 'interview') {
      hashIndex = parseInt(newURLarray[newURLarray.length - 1]);
    }

    // If not on same page move forward/backward
    if (hashIndex !== currentIndex) {
      this.handleBackForwardButtonPress();
    }
  }
}

InterviewPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired
};

export default InterviewPage;
