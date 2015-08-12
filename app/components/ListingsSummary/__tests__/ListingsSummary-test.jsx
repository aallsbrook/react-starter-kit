/*eslint no-undef:0*/

import React from 'react/addons';
import ListingsSummary from '../ListingsSummary.jsx';
import AppActions from '../../../actions/AppActions';
import StyleListingsStore from '../../../stores/StyleListingsStore';
import ProfileStore from '../../../stores/ProfileStore';
import ErrorStore from '../../../stores/ErrorStore';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('ListingsSummary', () => {

  let styleListingsStoreChangeListener, getFirstStyleImage, getListingsCount, getStyleListings, getZipCode, errorStoreChangeListener, getError;

  let trimId = '1234';
  let firstImage = 'http://img.vast.com/59x44/6777498407803114482';

  beforeEach(() => {
    styleListingsStoreChangeListener = sinon.stub(StyleListingsStore, 'addChangeListener');
    getFirstStyleImage = sinon.stub(StyleListingsStore, 'getFirstStyleImage');
    getListingsCount = sinon.stub(StyleListingsStore, 'getListingsCount');
    getStyleListings = sinon.stub(AppActions, 'getStyleListings');
    getZipCode = sinon.stub(ProfileStore, 'getZipCode').returns(90210);
    errorStoreChangeListener = sinon.stub(ErrorStore, 'addChangeListener');
    getError = sinon.stub(ErrorStore, 'getError');
  });

  it('Should initialize correctly', () => {
    let listingsSummary = TestUtils.renderIntoDocument(
      <ListingsSummary trimId={trimId} />
    );

    let expectedState = {
      serverError: false,
      zipCode: 90210
    };

    assert.deepEqual(listingsSummary.state, expectedState, 'initial state not set correctly');

    assert.equal(styleListingsStoreChangeListener.callCount, 1, 'StyleListingsStore.addChangeListener not called on initialization');
    assert.equal(errorStoreChangeListener.callCount, 1, 'ErrorStore.addChangeListener not called on initialization');
    assert.equal(getStyleListings.callCount, 1, 'AppActions.getTrimsForModel not called on initialization');
  });

  it('Should update state correctly when onChange is called', () => {
    let listingsCount = 42;
    let listingsSummary = TestUtils.renderIntoDocument(
      <ListingsSummary trimId={trimId} />
    );

    getFirstStyleImage.returns(firstImage);
    getListingsCount.returns(listingsCount);

    listingsSummary.onChange();

    assert.equal(listingsSummary.state.firstImage, firstImage, 'this.state.firstImage not set correctly when onChange called');
    assert.equal(listingsSummary.state.totalListings, listingsCount, 'this.state.totalListings not set correctly when onChange called');
  });

  it('Should display an appropriate message based on number of listings returned.', () => {
    let listingsSummaryInfo, listingsSummaryError;

    let listingsSummary = TestUtils.renderIntoDocument(
      <ListingsSummary trimId={trimId} />
    );

    listingsSummaryInfo = TestUtils.findRenderedDOMComponentWithClass(listingsSummary, 'ListingsSummary--info');
    assert.equal(listingsSummaryInfo.getDOMNode().innerHTML, 'Searching for listings');

    getListingsCount.returns(0);
    listingsSummary.onChange();
    listingsSummaryError = TestUtils.findRenderedDOMComponentWithClass(listingsSummary, 'ListingsSummary--error');
    assert.equal(listingsSummaryError.getDOMNode().innerHTML, 'No Listings found for this vehicle');

    getListingsCount.returns(1);
    listingsSummary.onChange();
    listingsSummaryInfo = TestUtils.findRenderedDOMComponentWithClass(listingsSummary, 'ListingsSummary--info');
    assert.equal(listingsSummaryInfo.getDOMNode().innerHTML, '1 matching vehicle within 50 miles of 90210');

    getListingsCount.returns(5);
    listingsSummary.onChange();
    listingsSummaryInfo = TestUtils.findRenderedDOMComponentWithClass(listingsSummary, 'ListingsSummary--info');
    assert.equal(listingsSummaryInfo.getDOMNode().innerHTML, '5 matching vehicles within 50 miles of 90210');
  });

  it('Should display a server error message if a STYLE_LISTINGS_GET_ERROR occurs.', () => {
    let listingsSummary = TestUtils.renderIntoDocument(
      <ListingsSummary trimId={trimId} />
    );

    getError.returns({
      code: -1,
      message: 'test message'
    });

    listingsSummary.onErrorChange();

    let listingsSummaryError = TestUtils.findRenderedDOMComponentWithClass(listingsSummary, 'ListingsSummary--error');

    assert.equal(listingsSummaryError.getDOMNode().innerHTML, 'There was a problem retrieving listings');
  });

  afterEach(() => {
    styleListingsStoreChangeListener.restore();
    getFirstStyleImage.restore();
    getListingsCount.restore();
    getStyleListings.restore();
    getZipCode.restore();
    errorStoreChangeListener.restore();
    getError.restore();
  });
});
