'use strict';

import './_Error.scss';

import React from 'react';
import Button from '../Button/Button';

import { ButtonConstants, ErrorConstants } from '../ComponentConstants';

/**
 * This component handles displaying an error page to the user.
 *
 * Currently there are two types (general and internet), with the only differences
 * currently being the image displayed above the error message and the default message
 *
 * The error object used by this component is as follows:
 * {
 *  code: 123
 *  message: "asdf"
*  }
 *
 * This component does expect an object to be provided, but it can be blank if you just
 * want to display the general error with default message, otherwise these values should be
 * included.
 *
 * See comments on internally used functions for how this component handles certain codes/messages.
 */
export default class Error extends React.Component {

  /**
   *  React function that is called as needed to render the Components content
   * @returns {XML}
   */
  render () {
    return (
      <div className='Error-overlay'>
        <div className={'Error-icon Error-icon--' + this.getErrorType()}></div>
        <div className={'Error-text Error-text--' + this.getErrorType()}>
          {this.getErrorMessage()}
        </div>
        <div className='Error-retry-button'>
          <Button buttonType={ButtonConstants.Type.LARGE_STANDARD}
                  buttonIcon={ButtonConstants.Icon.RETRY}
                  buttonText="Try Again"
                  onClick={this.handleRetry.bind(this)}/>
        </div>
      </div>
    );
  }

  /**
   * A function to get the error type (general or internet) to be used. If one was provided
   * via the Components props it takes priority. Otherwise it's based on the provided error objects
   * status code. Currently only a status code of -1 will return internet error, everything else is general
   * @returns {*}
   */
  getErrorType () {

    //if errorType is provided, it takes priority
    if (this.props.errorType) {
      return this.props.errorType;
    }

    //otherwise base it off the status code (if none provided use general error as default)
    var statusCode = this.props.errorObj.code;

    if (statusCode && statusCode === -1) {
      return ErrorConstants.Type.INTERNET;
    } else {
      return ErrorConstants.Type.GENERAL;
    }
  }

  /**
   *  A function to get the error message to display. If the status code of the error object provided
   *  is not 200, then we use the default error message for the error type. For a 200 status code error, we
   *  will attempt to use the provided message from the server, if that doesn't exist, the default error
   *  message will be used
   * @returns {*}
   */
  getErrorMessage () {
    //some weird logic is living here for now, we only want to use the provided
    //error message in certain situations. 404 for example has a message of "Not Found"
    //which isn't user friendly and we don't want to display, same with any non 200 status code
    //TODO: is there a better way to handle this? maybe have this logic defined in webapi so the error component can always assume to use the message provided?
    if (this.props.errorObj.code && this.props.errorObj.code !== 200) {
      return this.getDefaultErrorMessageForType(this.getErrorType());
    } else if (this.props.errorObj.displayMessage) {
      return this.props.errorObj.displayMessage[0];
    } else {
      return this.getDefaultErrorMessageForType(this.getErrorType());
    }
  }

  /**
   *  Helper function to get the default error message based on type.
   * @param type
   * @returns {*}
   */
  getDefaultErrorMessageForType (type) {
    switch (type) {
      case ErrorConstants.Type.GENERAL:
        return ErrorConstants.DefaultMessage.GENERAL;
      case ErrorConstants.Type.INTERNET:
        return ErrorConstants.DefaultMessage.INTERNET;
    }
  }

  /**
   *Links the onClick event of the button to the handleRetry function provided via Component params
   */
  handleRetry () {
    this.props.retryCallback();
  }

}

Error.propTypes = {
  errorType: React.PropTypes.oneOf([ErrorConstants.Type.GENERAL, ErrorConstants.Type.INTERNET]),
  errorObj: React.PropTypes.object.isRequired,
  retryCallback: React.PropTypes.func.isRequired
};
