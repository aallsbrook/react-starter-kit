/*eslint camelcase:0 no-undef:0*/

import React from 'react/addons';
import TrimsPage from '../TrimsPage.jsx';
import AppActions from '../../../actions/AppActions';
import ErrorStore from '../../../stores/ErrorStore';
import TrimsStore from '../../../stores/TrimsStore';
import RecommendedStore from '../../../stores/RecommendedStore';

import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('TrimsPage', () => {

  let getTrimsForModel, getCloudURL, getModelDataById, getTrims, errorStoreChangeListener, trimsStoreChangeListener, getError;

  let params = {
    id: '5'
  };

  let trims = [
    {
      style_id: 369294,
      msrp: 21395,
      cf_style_name: '4dr Wgn American Value Pkg',
      default_color_code: 'PFS',
      evox_send: 10014,
      engine: 'Regular Unleaded V-6',
      transmission: 'Multi-Speed Automatic w/OD',
      mpg_city: '17',
      mpg_hway: '25',
      drive: 'FWD'
    },
    {
      style_id: 369295,
      msrp: 21395,
      cf_style_name: '4dr Wgn SE',
      default_color_code: 'PRP',
      evox_send: 9052,
      engine: 'Regular Unleaded V-6',
      transmission: 'Multi-Speed Automatic w/OD',
      mpg_city: '17',
      mpg_hway: '25',
      drive: 'FWD'
    }
  ];

  let cloudURL = 'http://icarsassets-v1.s3.amazonaws.com';

  beforeEach(() => {
    getTrimsForModel = sinon.stub(TrimsStore, 'getTrimsForModel').returns([]);
    getCloudURL = sinon.stub(TrimsStore, 'getCloudURL').returns('');
    getModelDataById = sinon.stub(RecommendedStore, 'getModelDataById').returns(null);
    getTrims = sinon.stub(AppActions, 'getTrims');
    errorStoreChangeListener = sinon.stub(ErrorStore, 'addChangeListener');
    trimsStoreChangeListener = sinon.stub(TrimsStore, 'addChangeListener');
    getError = sinon.stub(ErrorStore, 'getError');
  });

  it('Should initialize correctly', () => {

    let expectedState = {
      trims: [],
      cloudURL: '',
      modelData: null,
      id: '5'
    };

    let trimsPage = TestUtils.renderIntoDocument(
      <TrimsPage params={params}
                 setTitle={() => {}}
                 setServerDownURL={() => {}}
                 showModal={() => {}}
                 getAppState={() => {return {styleId: '15170622'}; }}/>
    );

    assert.deepEqual(trimsPage.state, expectedState, 'initial state not set correctly');
    assert.equal(getTrimsForModel.callCount, 1, 'TrimsStore.getTrimsForModel not called on initialization');
    assert.equal(getCloudURL.callCount, 1, 'TrimsStore.getCloudURL not called on initialization');
    assert.equal(getModelDataById.callCount, 1, 'RecommendedStore.getModelDataById not called on initialization');

    assert.equal(errorStoreChangeListener.callCount, 1, 'ErrorStore.addChangeListener not called on componentDidMount');
    assert.equal(trimsStoreChangeListener.callCount, 1, 'TrimsStore.addChangeListener not called on componentDidMount');
    assert.equal(getTrims.callCount, 1, 'AppActions.getTrims not called on componentDidMount');
  });

  it('Should update state correctly when on change is called', () => {

    let trimsPage = TestUtils.renderIntoDocument(
      <TrimsPage params={params}
                 setTitle={() => {}}
                 setServerDownURL={() => {}}
                 showModal={() => {}}
                 getAppState={() => {return {styleId: '15170622'}; }}/>
    );

    getTrimsForModel.returns(trims);
    getCloudURL.returns(cloudURL);

    trimsPage.onChange();

    assert.equal(trimsPage.state.trims, trims, 'this.state.trims not set correctly when onChange called');
    assert.equal(trimsPage.state.cloudURL, cloudURL, 'this.state.cloudURL not set correctly when onChange called');
  });

  it('Should display error modal when onErrorChange is called', () => {

    let showModal = sinon.spy();
    let trimsPage = TestUtils.renderIntoDocument(
      <TrimsPage params={params}
                 setTitle={() => {}}
                 setServerDownURL={() => {}}
                 showModal={showModal}
                 getAppState={() => {return {styleId: '15170622'}; }}/>
    );

    let errorObj = {
      id: -1,
      displayMessage: ['testing']
    };

    getError.returns(errorObj);

    trimsPage.onErrorChange();

    assert.equal(getError.callCount, 1, 'error object never accessed from store when onChangeError called');
    assert.equal(showModal.callCount, 1, 'error modal is never displayed when onChangeError called');
  });

  it('Should render the correct number of trim components', () => {

    let trimsPage = TestUtils.renderIntoDocument(
      <TrimsPage params={params}
                 setTitle={() => {}}
                 setServerDownURL={() => {}}
                 showModal={() => {}}
                 getAppState={() => {return {styleId: '15170622'}; }}/>
    );

    getTrimsForModel.returns(trims);
    getCloudURL.returns(cloudURL);

    trimsPage.onChange();

    let trimElements = TestUtils.scryRenderedDOMComponentsWithClass(trimsPage, 'Trim');

    assert.equal(trimElements.length, 2, 'incorrect number of trim elements rendered');

  });

  it('Should display the correct title', () => {

    let modelData = {
      'vast_make': 'Dodge',
      'vast_model': 'Grand Caravan'
    };

    getModelDataById.returns(modelData);

    let trimsPage = TestUtils.renderIntoDocument(
      <TrimsPage params={params}
                 setTitle={() => {}}
                 setServerDownURL={() => {}}
                 showModal={() => {}}
                 getAppState={() => {return {styleId: '15170622'}; }}/>
    );

    let expectedTitle = modelData.vast_make + ' ' + modelData.vast_model + ' Trims';
    assert.equal(trimsPage.getPageTitle(), expectedTitle, '');


  });

  afterEach(() => {
    getTrimsForModel.restore();
    getCloudURL.restore();
    getModelDataById.restore();
    getTrims.restore();
    errorStoreChangeListener.restore();
    trimsStoreChangeListener.restore();
    getError.restore();
  });

});
