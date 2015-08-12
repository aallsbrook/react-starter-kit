import React from 'react/addons';
import ListItem from '../ListItem.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('ListItem', () => {
  it('Should have the correct css classes', () => {
    let className = 'extra-class1 extra-class2';
    let expectedClassName = 'ListItem extra-class1 extra-class2';
    let handleSelect = () => {};
    let listItem = TestUtils.renderIntoDocument(
      <ListItem classes={className}
              handleSelect={handleSelect}/>
    );
    let listItemElement = React.findDOMNode(listItem);
    assert.equal(listItemElement.className, expectedClassName, 'css classes not correctly added to element');
  });

  it('Should have the correct icon', () => {
    let handleSelect = () => {};
    let listItem = TestUtils.renderIntoDocument(
      <ListItem handleSelect={handleSelect}/>
    );
    let iconElement = TestUtils.findRenderedDOMComponentWithClass(listItem, 'ListItem--right-arrow');
    assert.isDefined(iconElement);
  });

  it('Should call handleSelect function when clicked', () => {
    let handleSelect = sinon.spy();
    let listItemElement = TestUtils.renderIntoDocument(
      <ListItem handleSelect={handleSelect} />
    );
    TestUtils.Simulate.click(React.findDOMNode(listItemElement));
    assert.equal(handleSelect.callCount, 1, 'handleSelect function not called when list item is clicked');
  });
});
