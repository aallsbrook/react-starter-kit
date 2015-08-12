/*eslint no-undef:0*/

import 'babel-core/polyfill';
import _LocalStorageBaseStore from '../_LocalStorageBaseStore.js';
import { assert } from 'chai';

const ITEMS_UPDATED = 'ITEMS_UPDATED';

class TestStore extends _LocalStorageBaseStore {
  emitChange () {
    this.emit(ITEMS_UPDATED);
  }
}

describe('_LocalStorageBaseStore', () => {

  const testKey = 'testKey';

  let localStorageGetMock, localStorageSetMock, localStorageRemoveMock;

  beforeEach(() => {
    localStorageGetMock = sinon.stub(localStorage, 'getItem');
    localStorageSetMock = sinon.stub(localStorage, 'setItem');
    localStorageRemoveMock = sinon.stub(localStorage, 'removeItem');
  });

  it('Should get undefined for non existent key', function () {
    let store = new TestStore();
    let getValue = store.get(testKey);

    assert.isUndefined(getValue, 'getting a non existent value did not return undefined as expected');
    assert.equal(localStorageGetMock.callCount, 1, 'localStorage.getItem not called');
  });

  it('Should successfully set a key', function () {
    let store = new TestStore();
    let testValue = 'testValue';

    store.set(testKey, testValue);

    assert.equal(localStorageSetMock.callCount, 1, 'localStorage.setItem not called');
  });

  it('Should successfully retrieve a set key', function () {
    let store = new TestStore();
    let testValue = 'testValue';

    localStorageGetMock.withArgs(testKey).returns(testValue);

    store.set(testKey, testValue);

    assert.equal(store.get(testKey), testValue, 'value retrieved not as expected');
  });

  it('Should successfully call localStorage.removeItem when remove is called', function () {
    let store = new TestStore();
    let testValue = 'testValue';

    store.set(testKey, testValue);

    store.remove(testKey);

    assert.equal(localStorageRemoveMock.callCount, 1, 'localStorage.removeItem not called');
    assert(localStorageRemoveMock.calledWith(testKey), 'localStorage.removeItem not called with expected key');
  });

  afterEach(() => {
    localStorageGetMock.restore();
    localStorageSetMock.restore();
    localStorageRemoveMock.restore();
  });

});
