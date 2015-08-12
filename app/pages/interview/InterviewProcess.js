'use strict';

import { ButtonConstants, CardConstants } from '../../components/ComponentConstants';

/**
 * This is an array that defines the interview process. Each element of the array represents a new card in the process.
 * The InterviewPage acts as the controller to the process, and will handle the animation between cards, and storing
 * needed data in the ProfileStore upon completion. Each object in this array is expected to have the following params:
 *
 * title: A string to display at the top of the card
 * text: Instructions for this card to display under the title
 * content: An object representing the content to display for this card (a few different types, trait selection, ordered
 * list, and maybe more to come. (for details on this type see the InterviewCard component
 * button: An object representing the button to dispaly below the content, including type and text
 *
 * @type {*[]}
 */

export const DefaultRankSort = [{
  id: 'price',
  text: 'Price'
}, {
  id: 'safety',
  text: 'Safety'
}, {
  id: 'luxury',
  text: 'Luxury'
}, {
  id: 'performance',
  text: 'Performance'
}, {
  id: 'ecoFriendly',
  text: 'Eco-Friendly'
}, {
  id: 'utility',
  text: 'Utility'
}, {
  id: 'capacity',
  text: 'Capacity'
}];

export const InterviewProcess = [
  {
    title: 'Welcome',
    text: 'Tell us about yourself and our Zen guide will recommend vehicles suited to your profile.',
    content: {
      type: CardConstants.ContentType.WELCOME_PAGE
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Begin'
    }
  },
  {
    title: 'Select',
    text: 'Indicate which of the following apply to you:',
    content: {
      type: CardConstants.ContentType.TRAIT_SELECTION,
      data: [{
        id: 'economical',
        traitText: 'Economical',
        traitImage: 'economical'
      }, {
        id: 'children',
        traitText: 'Children',
        traitImage: 'children'
      }, {
        id: 'blueCollar',
        traitText: 'Blue Collar',
        traitImage: 'blueCollar'
      }, {
        id: 'fearless',
        traitText: 'Fearless',
        traitImage: 'fearless'
      }, {
        id: 'executive',
        traitText: 'Executive',
        traitImage: 'executive'
      }, {
        id: 'ecological',
        traitText: 'Ecological',
        traitImage: 'ecological'
      }, {
        id: 'gearIntensive',
        traitText: 'Gear Intensive',
        traitImage: 'gearIntensive'
      }]
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Next'
    }
  },
  {
    title: 'Select',
    text: 'Indicate which of the following apply to you:',
    content: {
      type: CardConstants.ContentType.TRAIT_SELECTION,
      data: [{
        id: 'frugal',
        traitText: 'Frugal',
        traitImage: 'frugal'
      }, {
        id: 'practical',
        traitText: 'Practical',
        traitImage: 'practical'
      }, {
        id: 'classic',
        traitText: 'Classic',
        traitImage: 'classic'
      }, {
        id: 'aggressive',
        traitText: 'Aggressive',
        traitImage: 'aggressive'
      }, {
        id: 'urban',
        traitText: 'Urban',
        traitImage: 'urban'
      }, {
        id: 'rural',
        traitText: 'Rural',
        traitImage: 'rural'
      }, {
        id: 'traveler',
        traitText: 'Traveler',
        traitImage: 'traveler'
      }]
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Next'
    }
  },
  {
    title: 'Select',
    text: 'Indicate which of the following apply to you:',
    content: {
      type: CardConstants.ContentType.TRAIT_SELECTION,
      data: [{
        id: 'bold',
        traitText: 'Bold',
        traitImage: 'bold'
      }, {
        id: 'earlyAdopter',
        traitText: 'Early Adopter',
        traitImage: 'earlyAdopter'
      }, {
        id: 'hipster',
        traitText: 'Hipster',
        traitImage: 'hipster'
      }, {
        id: 'sporty',
        traitText: 'Sporty',
        traitImage: 'sporty'
      }, {
        id: 'cautious',
        traitText: 'Cautious',
        traitImage: 'cautious'
      }, {
        id: 'rugged',
        traitText: 'Rugged',
        traitImage: 'rugged'
      }, {
        id: 'modest',
        traitText: 'Modest',
        traitImage: 'modest'
      }]
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Next'
    }
  },
  {
    title: 'Rank',
    text: 'Drag and drop the following vehicle attributes from most values to least:',
    content: {
      type: CardConstants.ContentType.RANK_SORT,
      data: DefaultRankSort
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Next'
    }
  },
  {
    title: 'ZIP Code',
    text: 'We\'ll need your ZIP code to provide recommendations:',
    content: {
      type: CardConstants.ContentType.ZIP_CODE
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Submit'
    }
  },
  {
    title: 'Congratulations',
    text: 'You\'re on the path to a new vehicle. Our guide will use your input to generate a list of recommended vehicles.',
    content: {
      type: CardConstants.ContentType.CONGRATULATIONS
    },
    button: {
      type: ButtonConstants.Type.LARGE_SECONDARY,
      text: 'Show Recommendations'
    }
  }
];
