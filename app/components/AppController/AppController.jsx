import './_AppController.scss';
import React from 'react';
import { Router, Route, Link } from 'react-router';
import { render } from 'react-dom';

import FlyOutMenu from '../FlyOutMenu/FlyOutMenu';
import Header from '../Header/Header';
import { FlyOutMenuConstants } from '../ComponentConstants';

import { APP_TITLE } from '../../constants/AppConstants';


class AppController extends React.Component {

  constructor (...args) {
    super(...args);

    //bind needed functions to the scope of this component
    this._handleLeftHeaderButtonClick = this._handleLeftHeaderButtonClick.bind(this);
    this._handleRightHeaderButtonClick = this._handleRightHeaderButtonClick.bind(this);
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {

    return (
      <div>

        <Header handleLeftClick={this._handleLeftHeaderButtonClick}
                handleRightClick={this._handleRightHeaderButtonClick}
                title={APP_TITLE}/>

        <FlyOutMenu ref="flyOutLeft" side={FlyOutMenuConstants.Side.LEFT}>
          <h3>Main Nav</h3>
          <nav onTouchTap={this._handleLeftHeaderButtonClick}>
            <a href="#/">Home</a><br></br>
            <a href="#/about">About</a><br></br>
            <a target="_blank" href="https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide">
              Getting Started
            </a><br></br>
          </nav>
        </FlyOutMenu>

        <FlyOutMenu ref="flyOutRight" side={FlyOutMenuConstants.Side.RIGHT}>
          <h3>Main Nav</h3>
          <nav onTouchTap={this._handleRightHeaderButtonClick}>
            <a href="#/">Home</a><br></br>
            <a href="#/about">About</a><br></br>
            <a target="_blank" href="https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide">
              Getting Started
            </a><br></br>
          </nav>
        </FlyOutMenu>

        <div className="AppController-Content">
          {this.props.children}
        </div>

      </div>
    );
  }

  _handleLeftHeaderButtonClick () {
    this.refs.flyOutLeft.toggleShowMenu();
  }

  _handleRightHeaderButtonClick () {
    this.refs.flyOutRight.toggleShowMenu();
  }
}

export default AppController;
