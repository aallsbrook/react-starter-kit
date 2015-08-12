/*eslint no-unused-expressions:0*/

'use strict';

import 'babel-core/polyfill';
import _BaseStore from '../_BaseStore.js';
import { assert } from 'chai';
import { Map, List } from 'immutable';

const ITEMS_UPDATED = 'ITEMS_UPDATED';

class TestStore extends _BaseStore {
  emitChange () {
    this.emit(ITEMS_UPDATED);
  }

  addChangeListener (callback) {
    this.on(ITEMS_UPDATED, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(ITEMS_UPDATED, callback);
  }
}

describe('_BaseStore', () => {

  it('Should initialize succesfully', function () {
    let store = new TestStore();

    assert.deepEqual(store.data, Map({}), 'store not correctly initialize with blank Map');
  });

  it('Should set, get and remove value', function () {

    let testKey = 'test';

    let store = new TestStore();

    assert.isUndefined(store.get(testKey), 'value returned for an undefined key');

    let item = 'testString';

    store.set(testKey, item);
    assert.deepEqual(store.get(testKey), item, 'value not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'value not removed from store');
  });

  it('Should set, get and remove objects', function () {

    let testKey = 'testObj';

    let store = new TestStore();

    let item = {
      test: 'value'
    };

    store.set(testKey, item);
    assert.deepEqual(store.get(testKey), Map(item), 'object not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'object not removed from store');
  });

  it('Should set, get and remove arrays', function () {

    let testKey = 'testArray';

    let store = new TestStore();

    let array = ['value1', 'value2'];

    store.set(testKey, array, true);
    assert.deepEqual(store.get(testKey), List(array), 'array not set or returned correctly');

    store.remove(testKey);
    assert.isUndefined(store.get(testKey), 'array not removed from store');
  });

  it('Should call the change listener when data changes', () => {

    let store = new TestStore();
    let onChange = sinon.spy();
    store.addChangeListener(onChange);

    store.set('key1', 'string');
    store.set('key2', {
      foo: 'bar'
    });
    store.remove('key2');
    assert.equal(onChange.callCount, 3, 'change listener should have been called 3 times');
  });

  it('Should remove the change listener', () => {

    let store = new TestStore();
    let onChange = sinon.spy();
    store.addChangeListener(onChange);
    store.set({
      foo: 'bar'
    });
    store.removeChangeListener(onChange);
    store.set({
      foo: 'bar'
    });
    assert.equal(onChange.callCount, 1, 'change listener should have only been called once');
  });
});
