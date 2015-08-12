'use strict';

import './_Button.scss';

import React from 'react';
import { ButtonConstants } from '../ComponentConstants';

export default class Button extends React.Component {

  render () {

    var icon;
    if (this.props.buttonIcon) {
      icon = (
        <span className={'Button-icon Button-icon--' + this.props.buttonIcon}></span>
      );
    }

    let content = (
      <div className='Button-content'>
        {icon}
        <span className='Button-label'>{this.props.buttonText}</span>
      </div>
    );

    if (this.props.linkHREF) {
      return (
        <a className={'Button Button-' + this.props.buttonType} href={this.props.linkHREF}>
          {{content}}
        </a>
      );
    } else {
      return (
        <button className={'Button Button-' + this.props.buttonType} onClick={this.props.onClick}>
          {{content}}
        </button>
      );
    }
  }
}

Button.propTypes = {
  buttonType: React.PropTypes.oneOf([ButtonConstants.Type.LARGE_PRIMARY_LIGHT, ButtonConstants.Type.SMALL_STANDARD, ButtonConstants.Type.LARGE_STANDARD, ButtonConstants.Type.SMALL_SECONDARY, ButtonConstants.Type.MEDIUM_SECONDARY, ButtonConstants.Type.LARGE_SECONDARY, ButtonConstants.Type.LARGE_DONE]).isRequired,
  buttonText: React.PropTypes.string.isRequired,
  buttonIcon: React.PropTypes.oneOf([ButtonConstants.Icon.PHONE, ButtonConstants.Icon.SPINNER, ButtonConstants.Icon.RETRY, ButtonConstants.Icon.CALL, ButtonConstants.Icon.EMAIL]),
  onClick: React.PropTypes.func,
  linkHREF: React.PropTypes.string
};
