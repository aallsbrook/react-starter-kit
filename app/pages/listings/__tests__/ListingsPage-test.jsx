/*eslint camelcase:0 no-undef:0*/

import React from 'react/addons';
import ListingsPage from '../ListingsPage.jsx';
import AppActions from '../../../actions/AppActions';
import ErrorStore from '../../../stores/ErrorStore';
import ProfileStore from '../../../stores/ProfileStore';
import StyleListingsStore from '../../../stores/StyleListingsStore';
import TrimDetailsStore from '../../../stores/TrimDetailsStore';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('ListingsPage', () => {

  let getStyleListings, getListingsCount, getZipCode, errorAddChangeListener, errorRemoveChangeListener,
    styleListingsAddChangeListener, styleListingsRemoveChangeListener, getTrimDetailForStyle, getError,
    actionsGetStyleListings;

  let params = {
    id: '123'
  };

  let zipCode = '12345';

  let listings = [
    {
      id: '123',
      image_url: 'http://img.vast.com/128x96/-7450255887688286739',
      price: '$12,345',
      'exterior-color': 'Green',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    }, {
      id: '234',
      image_url: 'http://img.vast.com/128x96/-7450255887688286739',
      price: '$13,431',
      'exterior-color': 'Yellow',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    }, {
      id: '345',
      image_url: 'http://img.vast.com/128x96/-7450255887688286739',
      price: '$34,234',
      'exterior-color': 'Blue',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    }
  ];

  let errorObj = {
    code: 10,
    displayMessage: ['Error message']
  };

  beforeEach(() => {
    getStyleListings = sinon.stub(StyleListingsStore, 'getStyleListings').returns(listings);
    getListingsCount = sinon.stub(StyleListingsStore, 'getListingsCount').returns(listings.length);
    getZipCode = sinon.stub(ProfileStore, 'getZipCode').returns(zipCode);
    errorAddChangeListener = sinon.stub(ErrorStore, 'addChangeListener');
    errorRemoveChangeListener = sinon.stub(ErrorStore, 'removeChangeListener');
    styleListingsAddChangeListener = sinon.stub(StyleListingsStore, 'addChangeListener');
    styleListingsRemoveChangeListener = sinon.stub(StyleListingsStore, 'removeChangeListener');
    getTrimDetailForStyle = sinon.stub(TrimDetailsStore, 'getTrimDetailForStyle').returns({});
    getError = sinon.stub(ErrorStore, 'getError').returns(errorObj);
    actionsGetStyleListings = sinon.stub(AppActions, 'getStyleListings');
  });

  it('Should initialize correctly', () => {

    let expectedState = {
      listings: listings,
      detailSectionTitle: '3 matching vehicles within 50 miles of 12345',
      totalListings: listings.length,
      pagesDisplayed: 1,
      zipCode: zipCode,
      loading: false
    };

    let listingsPage = TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                 setTitle={() => {}} />
    );

    assert.deepEqual(listingsPage.state, expectedState, 'initial state not set correctly');

    assert.equal(getStyleListings.callCount, 1, 'StyleListingsStore.getStyleListings not called on initialization');
    assert.equal(getListingsCount.callCount, 1, 'StyleListingsStore.getListingsCount not called on initialization');
    assert.equal(getZipCode.callCount, 1, 'ProfileStore.getZipCode not called on initialization');

    assert.equal(errorAddChangeListener.callCount, 1, 'ErrorStore.addChangeListener not called on component mount');
    assert.equal(styleListingsAddChangeListener.callCount, 1, 'StyleListingsStore.addChangeListener not called on component mount');
  });

  it('Should display the correct title', () => {

    let modelData = {
      model: {
        'make': 'Dodge',
        'model_name': 'Grand Caravan'
      }
    };

    getTrimDetailForStyle.returns(modelData);

    let setTitle = sinon.spy();

    TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                 setTitle={setTitle}/>
    );

    let expectedTitle = modelData.model.make + ' ' + modelData.model.model_name + ' Listings';
    assert(setTitle.calledWith(expectedTitle), 'setTitle not called with expected param');
  });

  it('Should render the correct number of listing components', () => {

    let listingsPage = TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                    setTitle={() => {}}/>
    );

    let listingElements = TestUtils.scryRenderedDOMComponentsWithClass(listingsPage, 'Listing');

    assert.equal(listingElements.length, listings.length, 'incorrect number of listing components rendered');
  });

  it('Should handle style listings change', () => {

    let listingsPage = TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                    setTitle={() => {}}/>
    );

    let additionalListings = [{
      id: '567',
      image_url: 'http://img.vast.com/128x96/-7450255887688286739',
      price: '$12,439',
      'exterior-color': 'Red',
      location: {
        city: 'Austin',
        state: 'TX'
      }
    }];

    getStyleListings.returns(additionalListings);

    listingsPage.onStyleListingsChange();

    assert.deepEqual(listingsPage.state.listings, listings.concat(additionalListings), 'listings not updated as expected');
  });

  it('Should handle error change', () => {

    let listingsPage = TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                    setTitle={() => {}}/>
    );

    listingsPage.onErrorChange();

    assert.deepEqual(listingsPage.state.errorObj, errorObj, 'errorObj not set correctly on page state');
    assert.equal(listingsPage.state.loading, false, 'loading not set correctly on page state');
  });

  it('Should handle loading more listings', () => {

    getListingsCount.returns(5);

    let listingsPage = TestUtils.renderIntoDocument(
      <ListingsPage params={params}
                    setTitle={() => {}}/>
    );

    let loadMoreElement = TestUtils.findRenderedDOMComponentWithClass(listingsPage, 'ListingsPage-loadmore').getDOMNode();

    TestUtils.Simulate.click(loadMoreElement);

    assert.equal(actionsGetStyleListings.callCount, 1, 'AppActions.getStyleListings not called when load more clicked');
    assert(listingsPage.state.loading, 'loading not set correctly on page state');
  });

  afterEach(() => {
    getStyleListings.restore();
    getListingsCount.restore();
    getZipCode.restore();
    errorAddChangeListener.restore();
    errorRemoveChangeListener.restore();
    styleListingsAddChangeListener.restore();
    styleListingsRemoveChangeListener.restore();
    getTrimDetailForStyle.restore();
    getError.restore();
    actionsGetStyleListings.restore();
  });

});
