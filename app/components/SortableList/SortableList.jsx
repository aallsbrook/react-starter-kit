'use strict';

import './_SortableList.scss';

import React from 'react';

import SortableMixin from 'sortablejs/react-sortable-mixin';

/**
 * SortableList component that leverages sortablejs for drag and drop functionality. Library viewable here:
 * https://github.com/RubaXa/Sortable
 *
 * Currently there is only one prop, and it's required:
 *
 * list: An array of objects (with below structure) of data to be used with the list)
 *
 * If passing in an object the expected structure is (the object isn't limited to the below
 * keys, but these are the only keys this component requires:
 * {
 *  id: (unique way to identify each item in array)
 *  text: (Display text)
 * }
 *
 * *Note that this component is not using an ES6 Class, but is instead using the React.createClass
 * function. This is because to leverage the sortablejs library in React you must use their provided
 * mixin. Currently React doesn't support Mixins on ES6 class components.
 */
var SortableList = React.createClass({
  mixins: [SortableMixin],

  sortableOptions: {
    delay: 100
  },

  /**
   * Map the array prop passed in to the internal state of this component
   * @returns {{items: *}}
   */
  getInitialState: function () {
    return {
      items: this.props.list
    };
  },

  /**
   * A place to do any custom handling anytime the order of the array is changed
   * @param evt
   */
  handleSort: function () {

  },

  /**
   * Render the list of items
   * @returns {XML}
   */
  render: function () {
    return (
      <ul className="SortableList-list">{
        this.state.items.map(function (item) {
          return (
            <li className={'SortableList-item SortableList-item-' + item.id} key={item.id}>
              <span className="SortableList-item--label">
                {item.text}
              </span>
            </li>
          );
        }, this)
      }</ul>
    );
  },

  propTypes: {
    list: React.PropTypes.array.isRequired
  }
});

export default SortableList;
