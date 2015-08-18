import './_FlyOutMenu.scss';
import React from 'react';
import Router from 'react-router';

class FlyOutMenu extends React.Component {

  constructor (...args) {
    super(...args);
    //set initial component state
    this.state = {
      isMenuShown: false
    };
  }

  render () {
    return (
      <div className={'FlyOutMenu FlyOutMenu-' + this.props.type + ' FlyOutMenu--' + this.props.side}>
        {/*flyout menu content goes here*/}
      </div>
    );
  }

  toggleShowMenu () {
    this.state.isMenuShown ? this._hideMenu() : this._showMenu();
  }

  _hideMenu () {
    let rootElement = React.findDOMNode(this);
    //add/remove needed classes here
    this.setState({
      isMenuShown: false
    });
  }

  _showMenu () {
    let rootElement = React.findDOMNode(this);
    rootElement.classList.add('FlyOutMenu--display');
    //add/remove needed classes here
    this.setState({
      isMenuShown: true
    });
  }

}

FlyOutMenu.propTypes = {
  side: React.PropTypes.oneOf(['left', 'right']).isRequired,
  type: React.PropTypes.oneOf(['overlay', 'push'])
};

export default FlyOutMenu;
