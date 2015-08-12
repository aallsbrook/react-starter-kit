/*eslint camelcase:0 no-undef:0*/

import 'babel-core/polyfill';
import TrimDetailsStore from '../TrimDetailsStore.js';
import { assert } from 'chai';
import { Map } from 'immutable';

describe('TrimDetailsStore', () => {

  let onChange;

  beforeEach(() => {
    onChange = sinon.spy();
    TrimDetailsStore.addChangeListener(onChange);
  });

  it('Should initialize correctly', function () {
    assert.equal(TrimDetailsStore.get('trimDetails'), Map({}), 'trimDetails not initially set to blank ImmutableJS Map');
  });

  it('Should get and set cloudURL', function () {
    let testCloudURL = 'testURL';
    assert.equal(TrimDetailsStore.getCloudURL(), '', 'getCloudURL not returning correct default value');
    TrimDetailsStore.set('cloudURL', testCloudURL);
    assert.equal(TrimDetailsStore.getCloudURL(), testCloudURL, 'getCloudURL not returning the set value');
  });

  it('Should get and set trimdetails', function () {
    let trimDetail = {
      styleid: '123',
      key: 'value'
    };
    assert.deepEqual(TrimDetailsStore.getTrimDetailForStyle('123'), {}, 'getTrimDetailForStyle not returning correct default value');
    TrimDetailsStore.setTrimDetailForStyle(trimDetail.styleid, trimDetail);
    assert.deepEqual(TrimDetailsStore.getTrimDetailForStyle('123'), trimDetail, 'getTrimDetailForStyle not returning the set value');
  });

  it('Should get the model year and style name', function () {
    let trimDetail = {
      styleid: '123',
      style: {
        model_year: 2005,
        style_name: 'Hatchback'
      }
    };
    assert.deepEqual(TrimDetailsStore.getYearAndStyle('123'), {year: undefined, style: undefined}, 'getYearAndStyle not returning correct default value');
    TrimDetailsStore.setTrimDetailForStyle(trimDetail.styleid, trimDetail);
    assert.deepEqual(TrimDetailsStore.getYearAndStyle('123'), {year: trimDetail.style.model_year, style: trimDetail.style.style_name}, 'getYearAndStyle not returning the set value');
  });

  it('Should call change listener when trimDetails changes', function () {
    TrimDetailsStore.set('trimDetails', {});
    assert.equal(onChange.callCount, 1, 'trimDetails change listner not called when recommended set');
  });

  it('Should remove the change listener', function () {
    TrimDetailsStore.removeChangeListener(onChange);
    TrimDetailsStore.set('trimDetails', {});
    assert.equal(onChange.callCount, 0, 'trimDetails change listner not removed successfully');
  });

  afterEach(() => {
    //reset TrimDetailsStore after each test
    TrimDetailsStore.set('trimDetails', {});
    TrimDetailsStore.set('cloudURL');
    TrimDetailsStore.removeChangeListener(onChange);
  });

});
