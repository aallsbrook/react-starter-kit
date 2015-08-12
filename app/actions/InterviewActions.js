'use strict';

import { dispatch } from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  INTERVIEW_COMPLETED
} from '../constants/AppConstants';

export default {
  interviewCompleted: function (selectedTraits, rankedAttributes, zipCode) {
    dispatch(INTERVIEW_COMPLETED, {
      selectedTraits: selectedTraits,
      rankedAttributes: rankedAttributes,
      zipCode: zipCode
    });

    WebAPI.saveProfile(selectedTraits, rankedAttributes);
  }
};
