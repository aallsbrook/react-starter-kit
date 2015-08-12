'use strict';

import './_LogoutPage.scss';
import React from 'react';

class LogoutPage extends React.Component {

  constructor (...args) {
    super(...args);
    this.props.setTitle('Logout');
  }

  render () {
    return (
      <div className={'log-out-page page'}>
        <h1>Logout Page</h1>

        <p>This is an example logout page, powered by React, ES6 &amp; webpack.</p>

      </div>
    );
  }
}

LogoutPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired
};

export default LogoutPage;


