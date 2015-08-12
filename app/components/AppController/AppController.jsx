/*eslint no-unused-vars:0*/
'use strict';

// PreLoad Images
import GreenLoadingSpinner from '../../assets/images/loading-spinner-large-green.svg';

import './_AppController.scss';
import React from 'react';
import Router from 'react-router';
import { register } from '../../dispatcher/AppDispatcher';
import { AppBar, AppCanvas } from 'material-ui';
import Modal from '../Modal/Modal';
import LeftNav from '../LeftNav/LeftNav';
import PromotionsActions from '../../actions/PromotionsActions';
import ProfileStore from '../../stores/ProfileStore';

import {
  APP_TITLE,
  RECOMMENDED_GET_REQUEST,
  RECOMMENDED_GET_SUCCESS,
  TRIMS_GET_REQUEST,
  TRIMS_GET_SUCCESS,
  TRIM_DETAILS_GET_REQUEST,
  TRIM_DETAILS_GET_SUCCESS,
  LISTING_DETAILS_GET_REQUEST,
  LISTING_DETAILS_GET_SUCCESS,
  PROFILE_UPDATED,
  INITIAL_DEFAULT_ROUTE,
  DEFAULT_ROUTE
} from '../../constants/AppConstants';

import { ModalConstants } from '../../components/ComponentConstants';

import { openURLInDeviceBrowser } from '../../util/Util';

var RouteHandler = Router.RouteHandler;

class AppController extends React.Component {

  constructor (...args) {
    super(...args);
    this.setInitialState();
    this.setDefaultRoute();
    this.onChange = this.onChange.bind(this);
    let that = this;

    // Listen to the ProfileStore for changes. Update the showMenuIconButton.
    ProfileStore.on(PROFILE_UPDATED, function () {
      that.onProfileUpdated(that);
    });

    if (!!that.state.showMenuIconButton) {
      document.getElementById('BodyElement').classList.remove('hide-hamburger-icon');
    } else {
      document.getElementById('BodyElement').classList.add('hide-hamburger-icon');
    }

    // add our app to this global var - often useful for debugging, and getting state in event closures.
    window.App = this;

    // handle back button event from cordova when on homepage and leftNav is open.
    window.document.addEventListener('BackButtonPressed', function () {
      that.onCordovaBackButtonPressedOnHomeScreen();
    }, false);


    window.document.addEventListener('AppsFlyerIDReceived', function (event) {
      that.onReceiveAppsFlyerID(event.appsflyerid);
    }, false);

    //we want to override all clicks on <a> tags and open with window.open outside of the app if the href contains http or https
    window.document.addEventListener('click', function (event) {
      if (event.srcElement.tagName === 'A') {
        let url = event.srcElement.getAttribute('href');
        if (url && (url.indexOf('http://') > -1 || url.indexOf('https://') > -1)) {
          event.preventDefault();
          openURLInDeviceBrowser(url);
        }
      }
    });

    // Listen for Get actions to optimistically show/hide loading modal.
    register(function (action) {
      // TODO: Does this need to be so explicit? Maybe use a regular expression for all *GET_REQUEST and *GET_SUCCESS||*GET_ERROR
      switch (true) {
        case (action.type === RECOMMENDED_GET_REQUEST || action.type === TRIMS_GET_REQUEST || action.type === TRIM_DETAILS_GET_REQUEST || action.type === LISTING_DETAILS_GET_REQUEST):
          that.showModal(ModalConstants.Type.LOADING);
          break;
        case (action.type === RECOMMENDED_GET_SUCCESS || action.type === TRIMS_GET_SUCCESS || action.type === TRIM_DETAILS_GET_SUCCESS || action.type === LISTING_DETAILS_GET_SUCCESS):
          that.hideModal();
          break;
      }
    });

  }


  setInitialState () {
    let profile = ProfileStore.getProfileObject();
    this.state = {
      title: APP_TITLE,
      showModal: false,
      modalContent: {},
      leftNavOpen: false,
      useServerDownUrl: false,
      showMenuIconButton: !!ProfileStore.getTraits() && !!ProfileStore.getAttributesRank(),
      profile: profile,
      styleID: null
    };
  }

  // TODO: we can use this method to determine if it makes sense to render again. ReactJS calls render methods like crazy. Would make sense to use in conjunction with react addon pureRenderMixin and immutableJS (I already included it in our NPM package file.
  //shouldComponentUpdate() {
  //  return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  //}

  getState () {
    return this.state;
  }

  componentDidMount () {
    // Wait a second before revealing to allow app time to get in it's proper starting state; left nav closing.
    setTimeout(function () {
      document.getElementById('BodyElement').classList.remove('app-is-loading');
      document.getElementById('BodyElement').classList.add('app-loaded');
    }, 2000);

  }

  componentWillUnmount () {
  }

  onChange () {
    this.setState(this.getState());
  }

  onMenuIconButtonTouchTap () {
    this.refs.leftNav.toggle();
  }


  render () {
    var modal;
    if (this.state.showModal) {
      modal = (
        <Modal contentType={this.state.modalType} content={this.state.modalContent}
               onClose={this.hideModal.bind(this)}/>
      );
    }

    return (
      <AppCanvas>
        <AppBar
          onMenuIconButtonTouchTap={this.onMenuIconButtonTouchTap.bind(this)}
          title={this.state.title}
          zDepth={0}
          showMenuIconButton={this.state.showMenuIconButton}/>
        <LeftNav getLeftNavState={this.getLeftNavState.bind(this)}
                 setLeftNavState={this.setLeftNavState.bind(this)}
                 closeModal={this.hideModal.bind(this)}
                 ref={'leftNav'}/>
        {modal}
        <RouteHandler setServerDownURL={this.setServerDownURL.bind(this)} setTitle={this.setTitle.bind(this)}
                      updateProfileState={this.updateProfileState.bind(this)} getAppState={this.getAppState.bind(this)}
                      showModal={this.showModal.bind(this)} hideModal={this.hideModal.bind(this)}/>

      </AppCanvas>
    );
  }

  setServerDownURL (serverDown) {
    this.state.useServerDownUrl = serverDown;
  }

  setLeftNavState (isLeftNavOpen) {
    this.state.leftNavOpen = isLeftNavOpen;
  }

  getLeftNavState () {
    return this.state.leftNavOpen;
  }

  setTitle (title) {
    if (!!this.state.title !== title) {
      let state = this.getState();
      state.title = title;

      this.setState(state);
    }

  }

  /**
   *  This function is passed down through the RouteHandler to all child pages of this component
   *  (see app-routes.jsx to see child pages.
   *
   *  It accepts an error object and a retry callback (both required).
   *
   *  The error object should be structured as such:
   *  {
   *    code: 123,
   *    message: "Message string"
 *    }
   *
   *  To find out more info about the error object see the Error component
   *
   *  The retryCallback is a function that will be called when the Try Again button is pressed
   *  on the error page.
   * @param error
   * @param retryCallback
   */
  showError (error, retryCallback) {
    let state = this.getState();
    state.showError = true;
    state.errorObj = error;
    state.handleErrorRetry = retryCallback;
    this.setState(state);
  }

  getAppState () {
    return this.getState();
  }

  updateProfileState () {
    this.state.profile = ProfileStore.getProfileObject();
  }

  updateAppState (state, value) {
    if (!!state) {
      this.state[state] = value;
    }
  }

  showModal (type, content) {
    //TODO: Something to prevent flashing of modal, either a delay on displaying, or a minimum amount of time to display modal
    window.document.body.className = window.document.body.className.replace('hide-page', '');
    window.document.body.className += ' hide-page';
    let state = this.getState();
    state.showModal = true;
    state.modalContent = content;
    state.modalType = type;
    this.setState(state);
  }

  hideModal () {
    window.document.body.className = window.document.body.className.replace('hide-page', '');

    this.setState({
      showModal: false,
      modalContent: {}
    });
  }

  onCordovaBackButtonPressedOnHomeScreen () {
    if (this.getLeftNavState()) {
      this.refs.leftNav.toggle();
    }
  }

  onReceiveAppsFlyerID (appsflyerid) {
    PromotionsActions.getPromotions(appsflyerid);
  }

  onProfileUpdated (that) {
    that.state.showMenuIconButton = !!ProfileStore.getTraits() && !!ProfileStore.getAttributesRank();
    if (!!that.state.showMenuIconButton) {
      document.getElementById('BodyElement').classList.remove('hide-hamburger-icon');

    } else {
      document.getElementById('BodyElement').classList.add('hide-hamburger-icon');
    }
  }

  setDefaultRoute () {
    let url = location;

    if (url.hash === '#/') {
      if (!ProfileStore.getAttributesRank()) {
        url += INITIAL_DEFAULT_ROUTE;
      } else {
        url += DEFAULT_ROUTE;
      }
      location.replace(url);
    }
  }
}


export default AppController;
