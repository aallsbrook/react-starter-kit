/*eslint no-undef:0*/

import React from 'react/addons';
import InterviewPage from '../InterviewPage.jsx';
import { DefaultRankSort, InterviewProcess } from '../InterviewProcess';
import { CardConstants } from '../../../components/ComponentConstants';
import ErrorStore from '../../../stores/ErrorStore';
import ProfileStore from '../../../stores/ProfileStore';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('InterviewPage', () => {

  let getTraits, getAttributesRank, getZipCode, profileStoreChangeListener, errorStoreChangeListener;

  beforeEach(() => {
    getTraits = sinon.stub(ProfileStore, 'getTraits').returns();
    getAttributesRank = sinon.stub(ProfileStore, 'getAttributesRank').returns();
    getZipCode = sinon.stub(ProfileStore, 'getZipCode').returns();
    profileStoreChangeListener = sinon.stub(ProfileStore, 'addChangeListener');
    errorStoreChangeListener = sinon.stub(ErrorStore, 'addChangeListener');
  });

  it('Should initialize correctly with no past interview response', () => {

    let expectedState = {
      currentIndex: 0,
      interviewProcess: InterviewProcess,
      selectedTraits: [],
      rankedAttributes: DefaultRankSort,
      zipCode: ''
    };

    let interviewPage = TestUtils.renderIntoDocument(
      <InterviewPage params={{}}
                     setTitle={() => {}}/>
    );

    assert.deepEqual(interviewPage.state, expectedState, 'initial state not set correctly');
    assert.equal(getTraits.callCount, 1, 'ProfileStore.getTraits not called on initialization');
    assert.equal(getAttributesRank.callCount, 1, 'ProfileStore.getAttributesRank not called on initialization');
    assert.equal(getZipCode.callCount, 2, 'ProfileStore.getZipCode not called on initialization and on componentDidMount');

    assert.equal(profileStoreChangeListener.callCount, 1, 'ProfileStore.addChangeListener not called on componentDidMount');
    assert.equal(errorStoreChangeListener.callCount, 1, 'ErrorStore.addChangeListener not call on componentDidMount');
  });

  it('Should initialize correct with past interview response', () => {

    let selectedTraits = [
      {
        id: 'economical',
        traitText: 'Economical',
        traitImage: 'economical',
        checked: true
      },
      {
        id: 'fearless',
        traitText: 'Fearless',
        traitImage: 'fearless',
        checked: true
      }
    ];

    let rankedAttributes = [
      {
        id: 'capacity',
        text: 'Capacity'
      },
      {
        id: 'price',
        text: 'Price'
      },
      {
        id: 'ecoFriendly',
        text: 'Eco-Friendly'
      },
      {
        id: 'safety',
        text: 'Safety'
      },
      {
        id: 'luxury',
        text: 'Luxury'
      },
      {
        id: 'performance',
        text: 'Performance'
      },
      {
        id: 'utility',
        text: 'Utility'
      }
    ];

    let zipCode = '12345';

    getTraits.returns(selectedTraits);
    getAttributesRank.returns(rankedAttributes);
    getZipCode.returns(zipCode);

    let interviewPage = TestUtils.renderIntoDocument(
      <InterviewPage params={{}}
                     setTitle={() => {}}/>
    );

    //rather than check the entire state object I'm only verifying the relevant values, this is mainly because
    //to test the entire state object I'd also be testing mergePreviousResponse, and I want to do that in it's own test
    assert.deepEqual(interviewPage.state.selectedTraits, selectedTraits, 'initial selectedTraits not set correctly');
    assert.deepEqual(interviewPage.state.rankedAttributes, rankedAttributes, 'initial rankedAttributes not set correctly');
    assert.equal(interviewPage.state.zipCode, zipCode, 'initial zipCode not set correctly');

  });

  it('Should render the correct number of Cards', () => {

    let interviewPage = TestUtils.renderIntoDocument(
      <InterviewPage params={{}} setTitle={() => {}}/>
    );

    let cardElements = TestUtils.scryRenderedDOMComponentsWithClass(interviewPage, 'Card-card');

    assert.equal(cardElements.length, InterviewProcess.length, 'incorrect number of interview card elements rendered');

  });

  it('Should merge previous responses correctly into the interview process', () => {

    let defaultInterviewProcess = [
      {
        content: {
          type: CardConstants.ContentType.TRAIT_SELECTION,
          data: [
            {
              id: 'test1'
            }, {
              id: 'test2'
            }
          ]
        }
      },
      {
        content: {
          type: CardConstants.ContentType.RANK_SORT,
          data: ['attribute1', 'attribute2']
        }
      }
    ];

    let selectedTraits = [
      {
        id: 'test1'
      }
    ];

    let rankedAttributes = ['attribute2', 'attribute1'];

    let interviewPage = TestUtils.renderIntoDocument(
      <InterviewPage params={{}} setTitle={() => {}}/>
    );

    let expectedInterviewProcess = defaultInterviewProcess;

    expectedInterviewProcess[0].content.data[0].checked = true;
    expectedInterviewProcess[1].content.data = rankedAttributes;

    let actualInterviewProcess = interviewPage.mergePreviousResponses(defaultInterviewProcess, selectedTraits, rankedAttributes);

    assert.deepEqual(actualInterviewProcess, expectedInterviewProcess, 'mergePreviousResponses did not merge as expected');

  });

  afterEach(() => {
    getTraits.restore();
    getAttributesRank.restore();
    getZipCode.restore();
    profileStoreChangeListener.restore();
    errorStoreChangeListener.restore();
  });

});
