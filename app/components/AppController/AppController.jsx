import './_AppController.scss';
import React from 'react';
import Router from 'react-router';

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
        <RouteHandler />
      </div>
    );
  }

}


export default AppController;
