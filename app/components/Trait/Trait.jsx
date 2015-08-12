'use strict';

import './_Trait.scss';

import React from 'react';

/**
 * A custom extension of the Material-UI Checkbox to be used for trait selection in the Interview process
 *
 * http://material-ui.com/#/components/switches
 */
export default class Trait extends React.Component {

  constructor (...args) {
    super(...args);
    this.state = {
      checked: false
    };
  }

  componentDidMount () {
    if (this.props.trait.checked) {
      this.setState({
        checked: true
      });
    }
  }

  componentWillUnmount () {

  }

  /**
   * Wrap the Checkbox in a div so we can add any custom styling as needed, and pass the needed params to Checkbox component.
   * Once we begin to implement correct styling on this page, we should leverage the checkedIcon and unCheckIcon params.
   * These will except an element, and you can access the needed name via this.props.trait.traitImage
   * @returns {XML}
   */
  render () {
    return (
      <div className="Trait">
        <input id={this.props.trait.id} type="checkbox" name={this.props.trait.id}
               onChange={this.handleCheck.bind(this)} checked={this.state.checked}/>
        <label htmlFor={this.props.trait.id} className={'Label-item-' + this.props.trait.id}></label>
        {this.props.trait.traitText}
      </div>
    );
  }

  /**
   * Helper function for handling checked state of trait. If the state is different than before than trigger traitChanged
   * callback
   * @param event
   * @param checked
   */
  handleCheck (event) {
    let checked = event.target.checked;
    if (this.state.checked !== checked) {
      this.setState({
        checked: checked
      });
      this.props.traitChanged(event.target.name, checked);
    }
  }


}

Trait.propTypes = {
  trait: React.PropTypes.object.isRequired,
  traitChanged: React.PropTypes.func.isRequired
};
