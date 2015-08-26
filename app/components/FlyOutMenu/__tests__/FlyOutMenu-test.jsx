import React from 'react/addons';
import FlyOutMenu from '../FlyOutMenu.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

//we need to import and initialize this plugin so that we have access to TestUtils.Simulate.touchTap available
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('FlyOutMenu', () => {

  it('Should have the correct css class', () => {

    let flyOutMenuLeft = TestUtils.renderIntoDocument(
      <FlyOutMenu side="left">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuRight = TestUtils.renderIntoDocument(
      <FlyOutMenu side="right">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuLeftElement = React.findDOMNode(flyOutMenuLeft);
    let flyOutMenuRightElement = React.findDOMNode(flyOutMenuRight);

    assert.equal(flyOutMenuLeftElement.className, 'FlyOutMenu FlyOutMenu-left', 'FlyOutMenu left class not applied to FlyOutMenu element');
    assert.equal(flyOutMenuRightElement.className, 'FlyOutMenu FlyOutMenu-right', 'FlyOutMenu right class not applied to FlyOutMenu element');
  });

  it('Should toggle to shown if currently hidden', () => {

    let flyOutMenuLeft = TestUtils.renderIntoDocument(
      <FlyOutMenu side="left">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuRight = TestUtils.renderIntoDocument(
      <FlyOutMenu side="right">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuLeftElement = React.findDOMNode(flyOutMenuLeft);
    let flyOutMenuRightElement = React.findDOMNode(flyOutMenuRight);

    flyOutMenuLeft.toggleShowMenu();
    flyOutMenuRight.toggleShowMenu();

    assert.deepEqual(flyOutMenuLeft.state, {isMenuShown: true}, 'State not updated as expected when showing left FlyOutMenu');
    assert.equal(flyOutMenuLeftElement.className, 'FlyOutMenu FlyOutMenu-left FlyOutMenu-display', 'FlyOutMenu display class not added correctly to left FlyOutMenu');

    assert.deepEqual(flyOutMenuRight.state, {isMenuShown: true}, 'State not updated as expected when showing left FlyOutMenu');
    assert.equal(flyOutMenuRightElement.className, 'FlyOutMenu FlyOutMenu-right FlyOutMenu-display', 'FlyOutMenu display class not added correctly to right FlyOutMenu');
  });

  it('Should toggle to hidden if currently shown', () => {

    let flyOutMenuLeft = TestUtils.renderIntoDocument(
      <FlyOutMenu side="left">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuRight = TestUtils.renderIntoDocument(
      <FlyOutMenu side="right">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuLeftElement = React.findDOMNode(flyOutMenuLeft);
    let flyOutMenuRightElement = React.findDOMNode(flyOutMenuRight);

    //show elements
    flyOutMenuLeft.toggleShowMenu();
    flyOutMenuRight.toggleShowMenu();

    //now hide them
    flyOutMenuLeft.toggleShowMenu();
    flyOutMenuRight.toggleShowMenu();

    assert.deepEqual(flyOutMenuLeft.state, {isMenuShown: false}, 'State not updated as expected when hiding left FlyOutMenu');
    assert.equal(flyOutMenuLeftElement.className, 'FlyOutMenu FlyOutMenu-left', 'FlyOutMenu display class not removed correctly to left FlyOutMenu');

    assert.deepEqual(flyOutMenuRight.state, {isMenuShown: false}, 'State not updated as expected when hiding left FlyOutMenu');
    assert.equal(flyOutMenuRightElement.className, 'FlyOutMenu FlyOutMenu-right', 'FlyOutMenu display class not removed correctly to right FlyOutMenu');

  });

  it('Should be hidden if overlay is clicked', () => {

    let flyOutMenuLeft = TestUtils.renderIntoDocument(
      <FlyOutMenu side="left">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let flyOutMenuRight = TestUtils.renderIntoDocument(
      <FlyOutMenu side="right">
        <div>Testing</div>
      </FlyOutMenu>
    );

    let hideMenuLeft = sinon.spy(flyOutMenuLeft, '_hideMenu');
    let hideMenuRight = sinon.spy(flyOutMenuRight, '_hideMenu');

    let flyOutMenuLeftOverlayElement = React.findDOMNode(flyOutMenuLeft.refs.overlay);
    let flyOutMenuRightOverlayElement = React.findDOMNode(flyOutMenuRight.refs.overlay);

    //show elements
    flyOutMenuLeft.toggleShowMenu();
    flyOutMenuRight.toggleShowMenu();

    TestUtils.Simulate.touchTap(flyOutMenuLeftOverlayElement);
    assert.equal(hideMenuLeft.callCount, 1, '_hideMenu not called as expected on left FlyOutMenu');

    TestUtils.Simulate.touchTap(flyOutMenuRightOverlayElement);
    assert.equal(hideMenuRight.callCount, 1, '_hideMenu not called as expected on right FlyOutMenu');
  });

});
