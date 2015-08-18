import './_AppController.scss';
import React from 'react';
import Router from 'react-router';

import Header from '../Header/Header';

import { APP_TITLE } from '../../constants/AppConstants';

var RouteHandler = Router.RouteHandler;

class AppController extends React.Component {

  constructor (...args) {
    super(...args);

  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div>
        <Header title={APP_TITLE}/>
        <RouteHandler />
      </div>
    );
  }

}

export default AppController;
