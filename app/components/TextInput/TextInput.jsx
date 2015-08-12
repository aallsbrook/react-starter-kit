'use strict';

import './_TextInput.scss';

import React from 'react';

import { TextInputConstants } from '../ComponentConstants';

export default class TextInput extends React.Component {

  constructor (...args) {
    super(...args);
    this.state = {
      showError: false,
      errorText: '',
      value: '',
      previousValue: ''
    };
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount () {
    if (this.props.maxLength) {
      let domNode = React.findDOMNode(this.refs.input);
      domNode.addEventListener('input', this.onInput);
    }
  }

  componentWillUnmount () {
    if (this.props.maxLength) {
      let domNode = React.findDOMNode(this.refs.input);
      domNode.removeEventListener('input', this.onInput);
    }
  }

  render () {

    var error;
    if (this.state.showError) {
      error = (
        <div className="TextSpacer">
          <div className="TextInput-error {this.props.cssErrorArrowClass || ''} ">
            <div className="Warning-icon"></div>
            {this.state.errorText}
          </div>
        </div>
      );
    }
    return (
      <div className={'TextInput-input TextInput-input--' + this.props.type}>
        <input id={this.props.id}
               ref="input"
               type={this.props.type}
               value={this.state.value}
               placeholder={this.props.placeholder || ''}
               onChange={this.handleChange.bind(this)}/>
        <span ref="clear"
              className='TextInput-clear hidden'
              onClick={this.clearField.bind(this)}><span className="visuallyhidden">Clear</span><span
          className="icon"></span></span>
        {error}
      </div>
    );
  }

  clearField () {
    React.findDOMNode(this.refs.input).value = '';
    React.findDOMNode(this.refs.input).focus();
    React.findDOMNode(this.refs.clear).classList.add('hidden');
    this.setState({
      value: ''
    });
  }

  handleChange (event) {
    if (event.target.value !== '') {
      React.findDOMNode(this.refs.clear).classList.remove('hidden');
    }
    this.setState({
      value: event.target.value
    });
  }

  onInput (event) {
    if (event.target.value.length > this.props.maxLength) {
      this.setState({
        value: this.state.previousValue
      });
    }
    this.state.previousValue = event.target.value;
  }

  showError (text) {
    this.setState({
      showError: true,
      errorText: text
    });
    let errorClass = this.props.cssErrorClass || '';
    React.getDOMNode(this.refs.input).classList.add(errorClass);
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({
      value: value
    });
    React.findDOMNode(this.refs.clear).classList.remove('hidden');
  }

}

TextInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([TextInputConstants.Type.EMAIL, TextInputConstants.Type.NUMBER, TextInputConstants.TELEPHONE]).isRequired,
  placeholder: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  cssErrorClass: React.PropTypes.string,
  cssErrorArrowClass: React.PropTypes.string
};
