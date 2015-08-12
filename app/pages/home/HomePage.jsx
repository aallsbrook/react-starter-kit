'use strict';

import './_HomePage.scss';
import React from 'react';
import Router from 'react-router';

import Button from '../../components/Button/Button';

import { ButtonConstants } from '../../components/ComponentConstants';

var Link = Router.Link;

class HomePage extends React.Component {

  constructor () {
    super();
    this.state = {trimID: '15170112'};
  }

  handleChange (event) {
    this.setState({trimID: event.target.value});
  }

  handleButtonClick () {
    window.location.hash = 'trims/' + this.state.trimID;
  }

  render () {
    return (
      <div className={'home-page page'}>
        <br></br>

        <h1>Home Page</h1>

        <p>This is an example home page, powered by React, ES6 &amp; webpack.</p>

        <p>Test Server Down Error Handling:</p>

        <p><Link to='/trims/15170112/serverdown'>Fetch trims without a server</Link></p>

        <p><Link to='/recommended'>Go to recommended Page</Link></p>

        <p><Link to='/interview'>Go to interview process</Link></p>

        <p><Link to='/promotion'>Go to promotion process</Link></p>

        <p>Enter an ID to view a trim page:</p>
        <input type="text" defaultValue={this.state.trimID} onChange={this.handleChange.bind(this)}/>
        <br></br>
        <Button buttonType={ButtonConstants.Type.LARGE_SECONDARY}
                buttonText="Navigate to Trim Page"
                onClick={this.handleButtonClick.bind(this)}/>

      </div>
    );
  }

}

HomePage.propTypes = {};

export default HomePage;
