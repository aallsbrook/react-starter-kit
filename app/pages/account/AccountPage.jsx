'use strict';

import './_AccountPage.scss';
import React from 'react';

class AccountPage extends React.Component {

  constructor (...args) {
    super(...args);
    this.props.setTitle('My Account');
  }

  render () {
    return (
      <div className={'account-page page'}>
        <h1>Account Page</h1>

        <p>This is an example account page, powered by React, ES6 &amp; webpack.</p>

      </div>
    );
  }
}

AccountPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired
};

export default AccountPage;


