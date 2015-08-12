import React from 'react/addons';
import Button from '../Button.jsx';
import { ButtonConstants } from '../../ComponentConstants.js';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('Button', () => {
  it('Should have the correct css class', () => {
    let buttonText = 'Button';
    let buttonType = ButtonConstants.Type.LARGE_STANDARD;
    let handleClick = () => {};
    let button = TestUtils.renderIntoDocument(
      <Button buttonType={buttonType}
              buttonText={buttonText}
              onClick={handleClick}/>
    );
    let buttonElement = React.findDOMNode(button);
    let expectedClass = 'Button Button-' + buttonType;
    assert.equal(buttonElement.className, expectedClass, 'button type not correctly added to css classes');

  });

  it('Should have correct text', () => {
    let buttonText = 'Test Button Text';
    let buttonType = ButtonConstants.Type.LARGE_STANDARD;
    let handleClick = () => {};
    let button = TestUtils.renderIntoDocument(
      <Button buttonType={buttonType}
              buttonText={buttonText}
              onClick={handleClick}/>
    );
    let labelElement = TestUtils.findRenderedDOMComponentWithTag(button, 'span');
    assert.equal(labelElement.getDOMNode().innerHTML, buttonText, 'button text not set correctly');

  });

  it('Should have correct icon', () => {
    let buttonText = 'Test Button Text';
    let buttonType = ButtonConstants.Type.LARGE_STANDARD;
    let buttonIcon = ButtonConstants.Icon.PHONE;
    let handleClick = () => {};
    let button = TestUtils.renderIntoDocument(
      <Button buttonType={buttonType}
              buttonText={buttonText}
              buttonIcon={buttonIcon}
              onClick={handleClick} />
    );
    let iconElement = TestUtils.findRenderedDOMComponentWithClass(button, 'Button-icon');
    let expectedClass = 'Button-icon Button-icon--' + buttonIcon;
    assert.equal(iconElement.getDOMNode().className, expectedClass, 'button icon not correctly added');
  });

  it('Should call onClick function', () => {
    let buttonText = 'Test Button Text';
    let buttonType = ButtonConstants.Type.LARGE_STANDARD;
    let handleClick = sinon.spy();
    let button = TestUtils.renderIntoDocument(
      <Button buttonType={buttonType}
              buttonText={buttonText}
              onClick={handleClick} />
    );
    let buttonElement = React.findDOMNode(button);
    TestUtils.Simulate.click(buttonElement);
    assert.equal(handleClick.callCount, 1, 'on click function not called when button is clicked');
  });
});
