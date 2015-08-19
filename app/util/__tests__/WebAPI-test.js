import WebAPI from '../WebAPI.js';
import { assert } from 'chai';

describe('WebAPI', () => {

  it('Should call getTodoItems successfully', function (done) {

    //once we have the mock server setup this should be removed, and be replaced with mocking out what the
    //_getURL function returns
    let mockedTodoResponse = [{
      id: 0,
      description: 'Item 1'
    }, {
      id: 1,
      description: 'Item 2'
    }, {
      id: 2,
      description: 'Item 3'
    }];

    WebAPI.getTodoItems().then(function (response) {
      assert.deepEqual(response, mockedTodoResponse, 'did not receive expected mock server response');
      done();
    }, function (error) {
      done(error);
    })
  });

  it('Should handle getTodoItems errors', function () {
    //need the mock server setup so that in WebAPI.getTodoItems we can leverage the _getURL function
    //once we have that it can be stubbed out to force an error, and verify that WebAPI.getTodoItems throws
    //the same error as expected
  });

});
