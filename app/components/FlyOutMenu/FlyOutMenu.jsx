import './_FlyOutMenu.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

import { FlyOutMenuConstants } from '../ComponentConstants';

/**
 * The FlyOutMenu is a reusable component that provides a flyout/hamburger/etc menu to your application.
 * It currently accepts two possible properties:
 *
 * side: Which side of the screen the menu should appear from (left or right)
 *
 */
class FlyOutMenu extends React.Component {

  constructor (...args) {
    super(...args);
    //set initial component state
    this.state = {
      isMenuShown: false
    };

    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className={'FlyOutMenu FlyOutMenu-' + this.props.side}>
        <div className="FlyOutMenu-content">
          {this.props.children}
        </div>
        <div ref="overlay" className={'FlyOutMenu-overlay FlyOutMenu-overlay--' + this.props.side} onTouchTap={this._handleOverlayClick}></div>
      </div>
    );
  }

  _handleOverlayClick () {
    this._hideMenu();
  }

  _hideMenu () {
    let rootElement = ReactDOM.findDOMNode(this);
    rootElement.classList.remove('FlyOutMenu-display');
    this.setState({
      isMenuShown: false
    });
  }

  _showMenu () {
    let rootElement = ReactDOM.findDOMNode(this);
    rootElement.classList.add('FlyOutMenu-display');
    this.setState({
      isMenuShown: true
    });
  }

  isMenuShown () {
    return this.state.isMenuShown;
  }

  toggleShowMenu () {
    this.isMenuShown() ? this._hideMenu() : this._showMenu();
  }

}

FlyOutMenu.propTypes = {
  side: React.PropTypes.oneOf([FlyOutMenuConstants.Side.LEFT, FlyOutMenuConstants.Side.RIGHT]).isRequired,
  children: React.PropTypes.node.isRequired
};

export default FlyOutMenu;
