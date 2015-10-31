import './_Header.scss';
import React from 'react';
import { render } from 'react-dom';

class Header extends React.Component {

  constructor (...args) {
    super(...args);

    this._handleLeftButtonClick = this._handleLeftButtonClick.bind(this);
    this._handleRightButtonClick = this._handleRightButtonClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  render () {
    return (
      <div className="Header">
        <div className="Header-button Header-button--left" onTouchTap={this._handleLeftButtonClick}></div>
        <div className="Header-title" onTouchTap={this._handleTitleClick}>
          <h1 className="Header-title--text">{
            this.props.title || ''}
          </h1>
        </div>
        <div className="Header-button Header-button--right" onTouchTap={this._handleRightButtonClick}></div>
      </div>
    );
  }

  _handleLeftButtonClick (event) {
    if (this.props.handleLeftClick) {
      this.props.handleLeftClick(event);
    }
  }

  _handleRightButtonClick (event) {
    if (this.props.handleRightClick) {
      this.props.handleRightClick(event);
    }
  }

  _handleTitleClick (event) {
    if (this.props.handleTitleClick) {
      this.props.handleTitleClick(event);
    }
  }

}

Header.propTypes = {
  handleLeftClick: React.PropTypes.func,
  handleRightClick: React.PropTypes.func,
  handleTitleClick: React.PropTypes.func,
  title: React.PropTypes.string
};

export default Header;
