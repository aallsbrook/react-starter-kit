/*eslint camelcase:0*/

import React from 'react/addons';
import Listing from '../Listing.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('Listing', () => {
  it('Should render the correct child elemnts and values', () => {
    let listingObj = {
      image_url: 'testurl',
      price: '$12,345',
      'exterior-color': 'Green',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    };

    let listing = TestUtils.renderIntoDocument(
      <Listing listingObj={listingObj} />
    );

    let msrpElement = TestUtils.findRenderedDOMComponentWithClass(listing, 'Listing-info--msrp').getDOMNode();
    assert.equal(msrpElement.innerHTML, listingObj.price, 'MSRP not set correctly');

    let locationElement = TestUtils.findRenderedDOMComponentWithClass(listing, 'Listing-info--location').getDOMNode();
    assert.equal(locationElement.innerHTML, listingObj.location.city + ', ' + listingObj.location.state, 'Location not set correctly');

    let colorElement = TestUtils.findRenderedDOMComponentWithClass(listing, 'Listing-info--color').getDOMNode();
    assert.equal(colorElement.innerHTML, listingObj['exterior-color'], 'Color not set correctly');
  });

  it('Should build the correct location display string', () => {

    let listingObj = {
      image_url: 'testurl',
      price: '$12,345',
      'exterior-color': 'Green',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    };

    let listing = TestUtils.renderIntoDocument(
      <Listing listingObj={listingObj} />
    );

    let expectedLocationString = listingObj.location.city + ', ' + listingObj.location.state;

    assert.equal(listing._locationObjectToDisplayString(listingObj.location), expectedLocationString, 'Location string not formatted correctly');
  });
});
