/*eslint no-undef:0*/

import 'babel-core/polyfill';
import StyleListingsStore from '../StyleListingsStore.js';
import { assert } from 'chai';
import { Map } from 'immutable';

describe('StyleListingsStore', () => {

  let mockImage = 'http://img.vast.com/59x44/5775134761919339704';
  let mockStyleListings = [
    {
      'id': '1234567890',
      'hasimage': 'no'
    },
    {
      'id': '0987654321',
      'hasimage': 'yes',
      'tiny_image_url': mockImage
    },
    {
      'id': '1357924680',
      'hasimage': 'no'
    }
  ];

  let onChange;

  beforeEach(() => {
    onChange = sinon.spy();
    StyleListingsStore.addChangeListener(onChange);
  });

  it('Should initialize correctly', function () {
    assert.equal(StyleListingsStore.get('styleListingsCount'), Map({}), 'RecommendedStore styleListingsCount property not initially set to blank ImmutableJS map');
    assert.equal(StyleListingsStore.get('styleListings'), Map({}), 'RecommendedStore styleListings property not initially set to blank ImmutableJS Map');
  });

  it('Should get and set styleListingsCount', function () {
    assert.equal(StyleListingsStore.getListingsCount('123'), 0, 'getListingsCount not returning correct default value');
    StyleListingsStore.setStyleListingsCount('123', 42);
    assert.equal(StyleListingsStore.getListingsCount('123'), 42, 'getListingsCount not returning the set value');
  });

  it('Should get and set styleListings', function () {
    assert.deepEqual(StyleListingsStore.getStyleListings('123', 1), [], 'getStyleListings not returning correct default value');
    StyleListingsStore.setStyleListings('123', mockStyleListings);
    assert.deepEqual(StyleListingsStore.getStyleListings('123', 1), mockStyleListings, 'getStyleListings not returning the set value');
  });

  it('Should get and set the first style image', function () {
    assert.equal(StyleListingsStore.getFirstStyleImage('123'), 'noimage', 'getFirstStyleImage not returning correct default value');
    StyleListingsStore.setStyleListings('123', mockStyleListings);
    assert.equal(StyleListingsStore.getFirstStyleImage('123'), mockImage, 'getFirstStyleImage not returning the set value');
  });

  it('Should call change listener when styleListingsCount or styleListings changes', function () {
    StyleListingsStore.setStyleListingsCount('123', 42);
    assert.equal(onChange.callCount, 1, 'style listings change listner not called when styleListingsCount set');
    StyleListingsStore.setStyleListings('123', mockStyleListings);
    assert.equal(onChange.callCount, 2, 'style listings change listner not called when styleListings set');
  });

  it('Should remove the change listener', function () {
    StyleListingsStore.removeChangeListener(onChange);
    StyleListingsStore.set('styleListingsCount', 42);
    assert.equal(onChange.callCount, 0, 'style listings change listner not removed successfully');
  });

  afterEach(() => {
    StyleListingsStore.set('styleListingsCount', {});
    StyleListingsStore.set('styleListings', {});
    StyleListingsStore.removeChangeListener(onChange);
  });


});
