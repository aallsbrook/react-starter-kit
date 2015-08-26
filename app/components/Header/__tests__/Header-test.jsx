import React from 'react/addons';
import Header from '../Header.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

//we need to import and initialize this plugin so that we have access to TestUtils.Simulate.touchTap available
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('Header', () => {

  it('Should have the correct css class', () => {

    let header = TestUtils.renderIntoDocument(
      <Header title="Testing"/>
    );
    let headerElement = React.findDOMNode(header);
    assert.equal(headerElement.className, 'Header', 'Header class not applied to element');

  });

  it('Should call click handlers', () => {

    let leftClickHandler = sinon.spy();
    let rightClickHandler = sinon.spy();
    let titleClickHandler = sinon.spy();

    let header = TestUtils.renderIntoDocument(
      <Header title="Testing"
              handleLeftClick={leftClickHandler}
              handleRightClick={rightClickHandler}
              handleTitleClick={titleClickHandler}/>
    );

    let leftButtonElement = TestUtils.findRenderedDOMComponentWithClass(header, 'Header-button--left');
    TestUtils.Simulate.touchTap(leftButtonElement);
    assert.equal(leftClickHandler.callCount, 1, 'left button click handler not called as expected');

    let rightButtonElement = TestUtils.findRenderedDOMComponentWithClass(header, 'Header-button--right');
    TestUtils.Simulate.touchTap(rightButtonElement);
    assert.equal(rightClickHandler.callCount, 1, 'right button click handler not called as expected');

    let titleElement = TestUtils.findRenderedDOMComponentWithClass(header, 'Header-title');
    TestUtils.Simulate.touchTap(titleElement);
    assert.equal(titleClickHandler.callCount, 1, 'title click handler not called as expected');
  });


});
