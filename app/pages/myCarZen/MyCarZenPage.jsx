'use strict';

import './_MyCarZenPage.scss';
import React from 'react';

class MyCarZenPage extends React.Component {

  constructor (...args) {
    super(...args);
    this.props.setTitle('My CarZen');
  }

  render () {
    return (
      <div className={'my-car-zen-page page'}>
        <h1>My Car Zen Page</h1>

        <p>This is an example My Car Zen page, powered by React, ES6 &amp; webpack.</p>

      </div>
    );
  }
}

MyCarZenPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired
};

export default MyCarZenPage;


