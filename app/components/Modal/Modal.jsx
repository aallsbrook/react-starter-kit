'use strict';

import './_Modal.scss';

import React from 'react';

import Error from '../Error/Error';

import { ModalConstants } from '../ComponentConstants';

export default class Modal extends React.Component {

  constructor (...args) {
    super(...args);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
    var content;
    if (this.props.contentType === ModalConstants.Type.ERROR) {
      content = (
        <div className="Modal-error">
          <Error errorType={this.props.content.type}
                 errorObj={this.props.content.data}
                 retryCallback={this.handleClose.bind(this)}/>
        </div>
      );
    } else if (this.props.contentType === ModalConstants.Type.LOADING) {
      content = (
        <div className="Modal-loading">
          <div className="Modal-loading--icon"></div>
        </div>
      );
    }
    return (
      <div className="Modal">
        {content}
      </div>
    );
  }

  handleClose () {
    //close the modal before attempting to retry when error type
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (this.props.contentType === ModalConstants.Type.ERROR && this.props.content && this.props.content.retry) {
      this.props.content.retry();
    }
  }

}

Modal.propTypes = {
  contentType: React.PropTypes.oneOf([ModalConstants.Type.ERROR, ModalConstants.Type.LOADING]).isRequired,
  content: React.PropTypes.object,
  onClose: React.PropTypes.func
};
