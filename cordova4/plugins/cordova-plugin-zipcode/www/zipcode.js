var exec = require('cordova/exec'); //eslint-disable-line no-unused-vars

/**
 * This represents the zip code information and interface.
 * @constructor
 */
function ZipCode () {
  this.mostRecentZipCode = undefined;
  this.error = undefined;
}

var me = new ZipCode();

/**
 * This function fires ZipCodeLookedUp event.  This is one of the
 * mechanisms for communicating results back to the web side.
 * The other being reading the mostRecentZipCode and error values
 * directly.
 * @param zipcode this is the value of the valid zipcode that
 * was obtained.  If there was an error, this should be undefined.
 * @param error the error that occurred while trying to get zip code.
 * If zipcode has a valid value then error should be undefined.
 */
function fireZipCodeEvent (zipcode, error) {
  var event; // The custom event that will be created
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent('ZipCodeLookedUp', true, true);
  } else {
    event = document.createEventObject();
    event.eventType = 'ZipCodeLookedUp';
  }

  event.eventName = 'ZipCodeLookedUp';
  if (typeof error === 'undefined') {// This is success
    event.zipcode = zipcode;
  }
  else {// This is failure
    event.error = error;
  }

  if (document.createEvent) {
    document.dispatchEvent(event);
  } else {
    document.fireEvent('on' + event.eventType, event);
  }
}

/**
 * This is what gets called by cordova when zip code is successfully retrieved
 * @param zipcode the zip code that was successfully retrieved.
 */
function zipCodeSuccess (zipcode) {
  me.mostRecentZipCode = zipcode;
  me.error = undefined;
  fireZipCodeEvent(zipcode);
}

/**
 * This is what gets called by cordova when there is an error retrieving zip code.
 * Note that we DON'T overwrite the previously successfully retrieved zip code if
 * we get an error
 * @param error the error that resulted in the failure to retrieve zip code.
 */
function zipCodeError (error) {
  if(typeof me.mostRecentZipCode === 'undefined') {
    me.mostRecentZipCode = undefined;
    me.error = error;
  }
  fireZipCodeEvent('', error);
}

/**
 * This is the function to call to get the zip code from latitude/longitude.
 * Register the listener for ZipCodeLookedUp on document to receive results.
 * @param lat latitude of the location for which we want to get the zip code.
 * @param lng longitude of the location for which we want to get the zip code.
 *
var getzipcode = function (lat, lng) {
  cordova.exec(zipCodeSuccess, zipCodeError, 'ZipCode', 'getZipCodeFromLocation', [lat, lng]);
};
*/
ZipCode.prototype.getZipCode = function (lat, lng) {
  cordova.exec(zipCodeSuccess, zipCodeError, 'ZipCode', 'getZipCodeFromLocation', [lat, lng]);
};

module.exports = me;
