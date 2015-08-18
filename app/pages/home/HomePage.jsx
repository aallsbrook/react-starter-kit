import './_HomePage.scss';
import React from 'react';
import Router from 'react-router';

class HomePage extends React.Component {

  constructor (...args) {
    super(...args);
  }

  render () {
    return (
      <div className="page HomePage">
        <br></br>

        <h1>Home Page</h1>

        <p>This is an example home page, powered by React, ES6 &amp; webpack.</p>
      </div>
    );
  }

}

HomePage.propTypes = {};

export default HomePage;
