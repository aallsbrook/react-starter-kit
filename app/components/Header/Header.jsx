import './_Header.scss';
import React from 'react';
import Router from 'react-router';

class Header extends React.Component {

  constructor (...args) {
    super(...args);
  }

  render () {
    return (
      <div className="Header">
        <h1 className="Header-title">{this.props.title || ''}</h1>
      </div>
    );
  }

}

Header.propTypes = {
  title: React.PropTypes.string
};

export default Header;
