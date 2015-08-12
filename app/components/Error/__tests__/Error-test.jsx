import React from 'react/addons';
import Error from '../Error.jsx';
import { assert } from 'chai';
import { ErrorConstants } from '../../../components/ComponentConstants';

let { TestUtils } = React.addons;

describe('Error', () => {
  it('Should get the correct error type', () => {
    let errorObj = {
      code: -1,
      displayMessage: ['Test Message']
    };
    let error = TestUtils.renderIntoDocument(
      <Error errorType={ErrorConstants.Type.GENERAL}
             errorObj={errorObj}
             retryCallback={() => {}}/>
    );
    assert.equal(error.getErrorType(), ErrorConstants.Type.GENERAL, 'error type passed in as prop not returned as expected');

    error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorType(), ErrorConstants.Type.INTERNET, 'error code of -1 not given correct default type of internet');

    errorObj.code = 200;

    error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorType(), ErrorConstants.Type.GENERAL, 'error code of 200 not given correct default type of general');
  });

  it('Should get the correct error message', () => {
    let errorObj = {
      code: -1,
      displayMessage: ['Test Message']
    };
    let error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorMessage(), ErrorConstants.DefaultMessage.INTERNET, 'incorrect error message displayed for internet down');

    errorObj.code = 500;
    error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorMessage(), ErrorConstants.DefaultMessage.GENERAL, 'incorrect error message for non 200 status code');

    errorObj.code = 200;
    error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorMessage(), errorObj.displayMessage, 'incorrect error message displayed for 200 status code w/ a displayMessage value');

    errorObj.code = 200;
    delete errorObj.displayMessage;
    error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={() => {}} />
    );
    assert.equal(error.getErrorMessage(), ErrorConstants.DefaultMessage.GENERAL, 'incorrect error message displayed when 200 status code without a displayMessage value');
  });

  it('Should call retry callback when button is clicked', () => {
    let errorObj = {
      code: -1
    };
    let retryCallback = sinon.spy();
    let error = TestUtils.renderIntoDocument(
      <Error errorObj={errorObj}
             retryCallback={retryCallback} />
    );
    let button = TestUtils.findRenderedDOMComponentWithClass(error, 'Button');
    TestUtils.Simulate.click(React.findDOMNode(button));
    assert.equal(retryCallback.callCount, 1, 'onclick event not correctly linked to retryCallback passed into error');
  });
});
