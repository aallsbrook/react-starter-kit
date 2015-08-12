'use strict';

import './_AppLinksPage.scss';
import React from 'react';
import Router from 'react-router';

import SlideShow from '../../components/SlideShow/SlideShow';

var Link = Router.Link;

class AppLinksPage extends React.Component {

  constructor (...args) {
    super(...args);
    this.state = {trimID: '15173612'};

    this.props.setTitle('App Links');
  }

  handleChange (event) {
    this.setState({trimID: event.target.value});
  }

  handleButtonClick () {
    window.location.hash = 'trims/' + this.state.trimID;
  }


  render () {
    //        <CarImage cloudURL="http://icarsassets-shared-dev.s3.amazonaws.com"

    return (
      <div className={'app-links-page page'}>
        <h1>App Links</h1>

        <h2>Direct links</h2>

        <ol>
          <li><Link to='/recommended'>Go to recommended Page</Link></li>

          <li><Link to='/interview'>Go to interview process</Link></li>

          <li><Link to='/promotion'>Go to Promotion / App Flyer</Link></li>
        </ol>
        <hr />

        <h2>Trims</h2>

        <p>Test Server Down Error Handling:</p>

        <p><Link to='/trims/15170112/serverdown'>Fetch trims without a server</Link></p>

        <hr />

        <p>Enter an ID to view a trim page:</p>

        <p><input type="text" defaultValue={this.state.trimID} onChange={this.handleChange.bind(this)}/></p>

        <p>
          <button onClick={this.handleButtonClick.bind(this)}>Navigate to Trim Page</button>
        </p>
        <p>Here are some more temporary links to trims for testing:</p>

        <p><Link to='/trims/15170112'>15170112</Link></p>

        <p><Link to='/trims/15170115'>15170115</Link></p>

        <p><Link to='/trims/15191103'>15191103</Link></p>


        <h2>SlideShow</h2>
        <SlideShow />

        <h1>HTML Ipsum Presents</h1>

        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis
          egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
          amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque
          sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo
            vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum
          rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar
          facilisis. Ut felis.</p>

        <h2>Header Level 2</h2>
        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>
        <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis
          aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis
          mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>
        </blockquote>
        <h3>Header Level 3</h3>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>
      </div>
    );
  }
}

AppLinksPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired

};

export default AppLinksPage;
