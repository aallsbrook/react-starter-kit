'use strict';

import './_TraitSelection.scss';

import React from 'react';

import Trait from '../Trait/Trait';

/**
 * A wrapper Component for multiple traits. This component will keep track of the checked state of each trait passed in
 */
export default class TraitSelection extends React.Component {

  /**
   * Initilize variables used. Since props should be treated as inmutable, we create a traits variable. We will add the
   * checked property as needed here
   * @param args
   */
  constructor (...args) {
    super(...args);
    this.traits = this.props.traits;
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  /**
   * Render each trait
   * @returns {XML}
   */
  render () {
    return (
      <div className="TraitSelection">
        {this.props.traits.map(this.renderTrait, this)}
      </div>
    );
  }

  /**
   * Helper method to render reach trait passed in on the traits prop array.
   * @param trait
   * @returns {XML}
   */
  renderTrait (trait) {
    return (
      <Trait trait={trait} key={trait.id} traitChanged={this.handleTraitChange.bind(this)}/>
    );
  }

  /**
   * Callback function for when any trait is clicked. Will set the checked value on the traits object accordingly
   * @param traitID
   * @param newValue
   */
  handleTraitChange (traitID, newValue) {
    for (var x = 0; x < this.traits.length; x++) {
      if (this.traits[x].id === traitID) {
        this.traits[x].checked = newValue;
      }
    }
  }

}

TraitSelection.propTypes = {
  traits: React.PropTypes.array.isRequired
};
