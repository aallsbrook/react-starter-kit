/*eslint no-undef:0*/

import 'babel-core/polyfill';
import TrimsStore from '../TrimsStore.js';
import { assert } from 'chai';
import { Map } from 'immutable';

describe('TrimsStore', () => {

  let onChange;

  beforeEach(() => {
    onChange = sinon.spy();
    TrimsStore.addChangeListener(onChange);
  });

  it('Should initialize correctly', function () {
    assert.equal(TrimsStore.get('trims'), Map({}), 'trimDetails not initially set to blank ImmutableJS Map');
  });

  it('Should get and set cloudURL', function () {
    let testCloudURL = 'testURL';
    assert.equal(TrimsStore.getCloudURL(), '', 'getCloudURL not returning correct default value');
    TrimsStore.set('cloudURL', testCloudURL);
    assert.equal(TrimsStore.getCloudURL(), testCloudURL, 'getCloudURL not returning the set value');
  });

  it('Should get and set trims', function () {
    let trims = [{
      modelid: '123',
      key: 'value'
    }, {
      modelid: '123',
      key: 'second value'
    }];
    assert.deepEqual(TrimsStore.getTrimsForModel('123'), [], 'getTrimsForModel not returning correct default value');
    TrimsStore.setTrimsForModel(trims[0].modelid, trims);
    assert.deepEqual(TrimsStore.getTrimsForModel('123'), trims, 'getTrimsForModel not returning the set value');
  });

  it('Should call change listener when trimDetails changes', function () {
    TrimsStore.set('trims', {});
    assert.equal(onChange.callCount, 1, 'trims change listner not called when recommended set');
  });

  it('Should remove the change listener', function () {
    TrimsStore.removeChangeListener(onChange);
    TrimsStore.set('trims', {});
    assert.equal(onChange.callCount, 0, 'trims change listner not removed successfully');
  });

  afterEach(() => {
    //reset TrimsStore after each test
    TrimsStore.set('trims', {});
    TrimsStore.set('cloudURL');
    TrimsStore.removeChangeListener(onChange);
  });

});
