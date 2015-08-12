'use strict';

import './_AboutThisAppPage.scss';
import React from 'react';

class AboutThisAppPage extends React.Component {

  constructor (...args) {
    super(...args);
    this.props.setTitle('About this App');
  }


  render () {
    return (
      <div className={'about-page content-page page'}>

        <h1>CarZen is <br />Auto-Enlightenment</h1>

        <div className="aboutBackground">
          <div className="wrapper">

            <p className="pushThisDown">Powered by Liberty Mutual, CarZen is an efficient and powerful car shopping app.
              Utilizing an innovative design, high-res photo galleries and in-depth information about every new car
              model on the market, CarZen is your one-stop shop for everything car-related, right at your
              fingertips.</p>


            <p> CarZen utilizes continually-updated information on newer car models. This allows you to conveniently
              research any type of vehicle with just a few taps and learn as much as possible before moving forward with
              any car-related decisions</p>


            <h2>The features of CarZen include:</h2>

            <ul>
              <li><span><span className="subHeader">Simple and Powerful Recommendation Engine:</span> Provide CarZen with just a little information about yourself and CarZen will find cars that best match your needs.</span>
              </li>

              <li><span><span className="subHeader">Highly Visual Experience:</span> CarZen utilizes a high resolution full-screen photo gallery of every new car on the market</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

AboutThisAppPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired
};

export default AboutThisAppPage;


