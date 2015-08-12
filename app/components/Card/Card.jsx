'use strict';

import './_Card.scss';

import React from 'react';

import Button from '../Button/Button';
import TraitSelection from '../TraitSelection/TraitSelection';
import SortableList from '../SortableList/SortableList';
import TextInput from '../../components/TextInput/TextInput';

import { CardConstants, TextInputConstants } from '../ComponentConstants';

/**
 * A component that represents a single card/screen of the interview process.
 *
 * Prop requirements are as follows:
 * title: A string to display at the top of the card
 * text: Instructions/information to be displayed under the title
 * content: An object that represents the content for this card, structured as follows:
 *  type: One of the types provided via CardConstants.ContentType
 *  data: An array or object that the content type can consume to display as expected
 * button: An object that represents the button at the bottom of the card, structured as follows:
 *  type: One of the button types provided via ButtonConstants.Type
 *  text: Button display text
 */
export default class Card extends React.Component {

  constructor (...args) {
    super(...args);
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  /**
   * Render the correct components based on the ContentType passed in.
   * @returns {XML}
   */
  render () {

    var content;
    if (this.props.content) {
      if (this.props.content.type === CardConstants.ContentType.WELCOME_PAGE) {
        content = (
          <div>
            <div className='Card-text'>
              {this.props.text}
            </div>
            <div className='Card-button'>
              <Button buttonType={this.props.button.type}
                      buttonText={this.props.button.text}
                      onClick={this.handleComplete.bind(this)}/>
            </div>
          </div>
        );
      } else if (this.props.content.type === CardConstants.ContentType.TRAIT_SELECTION) {
        content = (
          <div>
            <div className='Card-text'>
              {this.props.text}
            </div>
            <div className='Card-content'>
              <TraitSelection ref='traitSelection' traits={this.props.content.data}/>
            </div>
            <div className='Card-button'>
              <Button buttonType={this.props.button.type}
                      buttonText={this.props.button.text}
                      onClick={this.handleComplete.bind(this)}/>
            </div>
          </div>
        );
      } else if (this.props.content.type === CardConstants.ContentType.RANK_SORT) {
        content = (
          <div>
            <div className='Card-text'>
              {this.props.text}
            </div>
            <div className='Card-content'>
              <SortableList ref='sortableList' list={this.props.content.data}/>
            </div>
            <div className='Card-button'>
              <Button buttonType={this.props.button.type}
                      buttonText={this.props.button.text}
                      onClick={this.handleComplete.bind(this)}/>
            </div>
          </div>

        );
      } else if (this.props.content.type === CardConstants.ContentType.ZIP_CODE) {
        content = (
          <div>
            <div className='Card-text'>
              {this.props.text}
            </div>
            <div className='Card-content'>
              <TextInput ref='zipInput'
                         id="zip"
                         type={TextInputConstants.Type.TELEPHONE}
                         placeholder='Enter ZIP code'
                         maxLength={5}
                         cssErrorClass='error'
                         cssErrorArrowClass='arrow-up'/>
            </div>
            <div className="Card-button">
              <Button buttonType={this.props.button.type}
                      buttonText={this.props.button.text}
                      buttonIcon={this.props.button.icon || null}
                      onClick={this.handleComplete.bind(this)}/>
            </div>
          </div>
        );
      } else if (this.props.content.type === CardConstants.ContentType.CONGRATULATIONS) {
        content = (
          <div className="Card-congratulations">
            <div className='Card-content'>
              <div className='Checkmark'></div>
            </div>
            <div className='Card-text'>
              {this.props.text}
            </div>
            <div className="Card-button">
              <Button buttonType={this.props.button.type}
                      buttonText={this.props.button.text}
                      buttonIcon={this.props.button.icon || null}
                      onClick={this.handleComplete.bind(this)}/>
            </div>
          </div>
        );
      }
    } else if (this.props.children) {
      content = this.props.children;
    }


    // Always a good idea to give your root DOM nodes an identifier for styling.
    let cardContainerClassName = 'Card-card ' + this.props.type;

    return (
      <div className={cardContainerClassName} id={this.props.id}>
        <div className='card-container'>
          <div className='card-top-border'>&nbsp;</div>
          <div className='Card-title'>
            {this.props.title}
          </div>
          {content}
        </div>
      </div>
    );
  }

  /**
   * Function called when button is clicked on Card. We will parse the data and call the provided onComplete callback
   * with the expected return data
   */
  handleComplete () {
    //we want to pass back the data that should be saved in the profile for each component. This data will be different for each component type
    var returnData;
    switch (this.props.content.type) {
      case CardConstants.ContentType.TRAIT_SELECTION:
        returnData = this.refs.traitSelection.traits;
        break;
      case CardConstants.ContentType.RANK_SORT:
        returnData = this.refs.sortableList.state.items;
        break;
      case CardConstants.ContentType.ZIP_CODE:
        returnData = this.refs.zipInput.getValue();
        break;
    }
    this.props.onComplete(returnData);
  }

}

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  content: React.PropTypes.object,
  button: React.PropTypes.object,
  onComplete: React.PropTypes.func,
  id: React.PropTypes.string,
  type: React.PropTypes.string,
  children: React.PropTypes.element
};
