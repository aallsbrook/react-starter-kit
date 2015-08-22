import './_FlyOutMenu.scss';

import React from 'react';

import { FlyOutMenuConstants } from '../ComponentConstants';

/**
 * The FlyOutMenu is a reusable component that provides a flyout/hamburger/etc menu to your application.
 * It currently accepts two possible properties:
 *
 * side: Which side of the screen the menu should appear from (left and right only currently)
 * type: How the menu interacts with the main content of the app. Overlay will cause the flyout menu to be
 *  displayed on top of the main content of the app. Push will cause the main content of the app to shift
 *  partially off the screen to make room for the menu.
 *
 */
class FlyOutMenu extends React.Component {

  constructor (...args) {
    super(...args);
    //set initial component state
    this.state = {
      isMenuShown: false
    };
  }

  componentDidMount () {
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.onclick = function overlayClicked() {
      //alert("overlay clicked");

      body.classList.remove("show-menu");

    }
  }

  render () {
    return (
      <div className={'FlyOutMenu FlyOutMenu-' + this.props.type + ' FlyOutMenu--' + this.props.side}>
        {/*flyout menu content goes here*/}
      </div>
    );
  }

  /**
   *
   */
  toggleShowMenu () {
    this.state.isMenuShown ? this._hideMenu() : this._showMenu();
  }

  _hideMenu () {
    let rootElement = React.findDOMNode(this);
    let body = document.getElementsByTagName("body")[0];

    body.classList.remove("show-menu");

    //add/remove needed classes here
    this.setState({
      isMenuShown: false
    });
  }

  _showMenu () {
    let rootElement = React.findDOMNode(this);
    rootElement.classList.add('FlyOutMenu--display');


    let body = document.getElementsByTagName("body")[0];
    body.className = body.className + " show-menu";

    //add/remove needed classes here
    this.setState({
      isMenuShown: true
    });
  }

}

FlyOutMenu.propTypes = {
  side: React.PropTypes.oneOf([FlyOutMenuConstants.Side.LEFT, FlyOutMenuConstants.Side.RIGHT]).isRequired,
  type: React.PropTypes.oneOf([FlyOutMenuConstants.Type.OVERLAY, FlyOutMenuConstants.Type.PUSH])
};

export default FlyOutMenu;
