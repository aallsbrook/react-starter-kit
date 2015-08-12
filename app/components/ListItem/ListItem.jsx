'use strict';

import './_ListItem.scss';

import React from 'react';

export default class ListItem extends React.Component {

  /**
   * Renders the List Item
   *
   * @instance
   * @public
   * @returns {JSX} Returns the List Item HTML
   */
  render () {
    return (
      <div className={'ListItem ' + (this.props.classes ? this.props.classes : '')} onClick={this.handleClick.bind(this)}>
        {this.props.children}
        <div className="ListItem--right-arrow"></div>
      </div>
    );
  }

  /**
   * Handles a click event on the List Item
   *
   * @instance
   * @private
   * @param {Event}
   *            Recieves the synthetic click event from React and passes it to the handleSelect property.
   */
  handleClick (event) {
    this.props.handleSelect(event);
  }
}

ListItem.propTypes = {
  children: React.PropTypes.element,
  classes: React.PropTypes.string,
  handleSelect: React.PropTypes.func.isRequired
};
