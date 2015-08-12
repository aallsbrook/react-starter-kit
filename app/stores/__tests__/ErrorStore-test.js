/*eslint no-undef:0*/

import 'babel-core/polyfill';
import ErrorStore from '../ErrorStore.js';
import { assert } from 'chai';

describe('ErrorStore', () => {

  let errorObj = {
    code: -1,
    message: 'test message'
  };

  let actionKey = 'testKey';

  let onErrorChange;

  beforeEach(() => {
    onErrorChange = sinon.spy();
    ErrorStore.addChangeListener(onErrorChange);
  });

  it('Should initialize succesfully', function () {
    assert.deepEqual(ErrorStore.error, {}, 'ErrorStore.error not correctly initialized with blank object');
    assert.isNull(ErrorStore.action, 'ErrorStore.action not correction initialized to null');
  });

  it('Should set an error successfully', function () {
    ErrorStore.setError(errorObj, actionKey);
    assert.equal(ErrorStore.getError(actionKey), errorObj, 'error object not set correctly');
  });

  it('Should get undefined if incorrect key passed in', function () {
    ErrorStore.setError(errorObj, actionKey);
    assert.isUndefined(ErrorStore.getError('invalidKey'), 'ErrorStore did not return undefined with a non matching action');
  });

  it('Should get the error obj if no key is passed in', function () {
    ErrorStore.setError(errorObj, actionKey);
    assert.deepEqual(ErrorStore.getError(), errorObj, 'ErrorStore did not return error when no action provided');
  });

  it('Should call change listener when error changes', function () {
    ErrorStore.setError(errorObj, actionKey);
    assert.equal(onErrorChange.callCount, 1, 'error change listner not called when error set');
  });

  it('Should remove the change listener', function () {
    ErrorStore.removeChangeListener(onErrorChange);
    ErrorStore.setError(errorObj, actionKey);
    assert.equal(onErrorChange.callCount, 0, 'error change listner not removed successfully');
  });

  afterEach(() => {
    //clear any values added to the store, since error store has no delete/clear method
    ErrorStore.error = {};
    ErrorStore.action = null;
    ErrorStore.removeChangeListener(onErrorChange);
  });

});
