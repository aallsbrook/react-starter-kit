'use strict';

import './_DetailSection.scss';

import React from 'react';

export default class DetailSection extends React.Component {

  render () {
    return (
      <div>
        <div className='DetailSection-title'>
          {this.props.title}
        </div>
        <div className='DetailSection-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

DetailSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
};
