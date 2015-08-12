/*eslint camelcase:0 no-undef:0*/

import 'babel-core/polyfill';
import RecommendedStore from '../RecommendedStore.js';
import { assert } from 'chai';
import { Map } from 'immutable';

describe('RecommendedStore', () => {

  let onChange;

  beforeEach(() => {
    onChange = sinon.spy();
    RecommendedStore.addChangeListener(onChange);
  });

  it('Should initialize correctly', function () {
    assert.equal(RecommendedStore.get('recommended'), Map({}), 'RecommendedStore not initially set to blank ImmutableJS Map');
  });

  it('Should get and set cloudURL', function () {
    let testCloudURL = 'testURL';
    assert.equal(RecommendedStore.getCloudURL(), '', 'getCloudURL not returning correct default value');
    RecommendedStore.set('cloudURL', testCloudURL);
    assert.equal(RecommendedStore.getCloudURL(), testCloudURL, 'getCloudURL not returning the set value');
  });

  it('Should get and set recommended', function () {
    let recommendedArray = [{
      name: 'test section',
      models: [{
        key: 'value'
      }]
    }];
    assert.deepEqual(RecommendedStore.getRecommended(), [], 'getRecommended not returning correct default value');
    RecommendedStore.set('recommended', recommendedArray, true);
    assert.deepEqual(RecommendedStore.getRecommended(), recommendedArray, 'getRecommended not returning the set value');
  });

  it('Should get model info by id', function () {
    let recommendedArray = [{
      name: 'test section',
      models: [{
        id: 1,
        key: 'value'
      }]
    },
    {
      name: 'second test section',
      models: [{
        id: 5,
        key: 'second value'
      }]
    }];
    assert.isNull(RecommendedStore.getModelDataById(1), 'getModelDataById did not return null for nonexistent id');
    RecommendedStore.set('recommended', recommendedArray, true);
    assert.deepEqual(RecommendedStore.getModelDataById(1), recommendedArray[0].models[0], 'getModelDataById did not return expected model object for valid id');
  });

  it('Should call change listener when recommended changes', function () {
    RecommendedStore.set('recommended', {});
    assert.equal(onChange.callCount, 1, 'recommended change listner not called when recommended set');
  });

  it('Should remove the change listener', function () {
    RecommendedStore.removeChangeListener(onChange);
    RecommendedStore.set('recommended', {});
    assert.equal(onChange.callCount, 0, 'recommended change listner not removed successfully');
  });

  afterEach(() => {
    //reset RecommendedStore after each test
    RecommendedStore.set('recommended', {});
    RecommendedStore.set('cloudURL');
    RecommendedStore.removeChangeListener(onChange);
  });


});
