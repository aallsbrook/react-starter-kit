import React from 'react/addons';
import Card from '../Card.jsx';
import { assert } from 'chai';
import { ButtonConstants, CardConstants } from '../../ComponentConstants';
import TraitSelection from '../../TraitSelection/TraitSelection';
import SortableList from '../../SortableList/SortableList';
import TextInput from '../../TextInput/TextInput';

let { TestUtils } = React.addons;

describe('Card', () => {
  let button = {
    type: ButtonConstants.Type.LARGE_SECONDARY,
    text: 'Button'
  };

  it('Should set the title correctly', () => {
    let cardTitle = 'Card Title';
    let card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} />
    );
    let renderedCardTitle = TestUtils.findRenderedDOMComponentWithClass(card, 'Card-title');
    assert.equal(renderedCardTitle.getDOMNode().innerHTML, cardTitle, 'card title not set correctly');
  });

  it('Should create content that matches the content.type property', () => {
    let cardTitle = 'Card Title';
    let content = {
      type: CardConstants.ContentType.TRAIT_SELECTION,
      data: [{
        id: 'economical',
        traitText: 'Economical',
        traitImage: 'economical'
      }, {
        id: 'children',
        traitText: 'Children',
        traitImage: 'children'
      }]
    };

    let card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} content={content} button={button} />
    );
    let isTraitSelection = TestUtils.isCompositeComponentWithType(card.refs.traitSelection, TraitSelection);
    assert.isTrue(isTraitSelection, 'TraitSelection element was not created');


    content = {
      type: CardConstants.ContentType.RANK_SORT,
      data: [{
        id: 'price',
        text: 'Price'
      }, {
        id: 'safety',
        text: 'Safety'
      }]
    };

    card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} content={content} button={button} />
    );
    let isSortableList = TestUtils.isCompositeComponentWithType(card.refs.sortableList, SortableList);
    assert.isTrue(isSortableList, 'SortableList element was not created');


    content = {
      type: CardConstants.ContentType.ZIP_CODE
    };

    card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} content={content} button={button} />
    );
    let isTextInput = TestUtils.isCompositeComponentWithType(card.refs.zipInput, TextInput);
    assert.isTrue(isTextInput, 'TextInput element was not created');
  });

  it('Should create a button using the button object property', () => {
    let cardTitle = 'Card Title';
    let content = {
      type: CardConstants.ContentType.WELCOME_PAGE
    };
    let card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} content={content} button={button} />
    );
    let renderedButton = TestUtils.findRenderedDOMComponentWithTag(card, 'button');
    assert.isTrue(TestUtils.isDOMComponent(renderedButton), 'onComplete not called when button is pressed');
  });

  it('Should call handleComplete when button is pressed', () => {
    let cardTitle = 'Card Title';
    let onComplete = sinon.spy();
    let content = {
      type: CardConstants.ContentType.WELCOME_PAGE
    };
    let card = TestUtils.renderIntoDocument(
      <Card title={cardTitle} onComplete={onComplete} content={content} button={button} />
    );
    let renderedButton = TestUtils.findRenderedDOMComponentWithTag(card, 'button');
    TestUtils.Simulate.click(renderedButton);
    assert.equal(onComplete.callCount, 1, 'onComplete not called when button is pressed');
  });
});
