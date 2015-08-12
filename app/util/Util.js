/**
 * Utility functions to be used throughout the app.
 */

var utils = {
  /**
   }
   * Helper function for finding an object containing the provided key/value pair within an
   * array of objects
   * @param arrayOfObjects
   * @param propertyName
   * @param propertyValue
   * @returns {number}
   */
  getIndexBy: function (arrayOfObjects, propertyName, propertyValue) {
    let arrayOfObjectsLength = arrayOfObjects.length;
    for (let i = 0; i < arrayOfObjectsLength; i++) {
      if (arrayOfObjects[i][propertyName] === propertyValue) {
        return i;
      }
    }
  },
  /**
   * Function for parsing a given url string into an object. Should not be used for any URL's we don't build
   * as this implementation is bare bones (no error checking, or proper handling of special characters, but
   * this isn't need for where it's being used currently)
   *
   * @param urlString
   */
  getQueryStringAsObject: function (urlString) {
    let queryString = urlString.split('?')[1];
    let queryParams = queryString.split('&');
    let queryObj = {};
    for (let x = 0; x < queryParams.length; x++) {
      let split = queryParams[x].split('=');
      queryObj[split[0]] = split[1];
    }
    return queryObj;
  },
  /**
   * Function to get the value of a specific key in a query string. Same as above, should only be used on
   * when you know the URL will not have any strange structure or special characters, as you will see unexpected behavior
   *
   * @param urlString
   * @param key
   */
  getQueryStringValueOfKey: function (urlString, key) {
    var queryObj = this.getQueryStringAsObject(urlString);
    return queryObj[key];
  },

  generateRandom: function () {
    return Math.random();
  },
  sum: function (a, b) {
    return a + b;
  },

  numberToCurrencyString: function (num) {
    return '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
  getMPGDisplayString: function (city, highway) {
    let displayString = '';
    if (city) {
      displayString += city;
    } else {
      displayString += this.valueMissing();
    }
    displayString += ' City / ';
    if (highway) {
      displayString += highway;
    } else {
      displayString += this.valueMissing();
    }
    displayString += ' Hwy';
    return displayString;
  },
  getMPGDisplayStringComplete: function (city, highway, combined) {
    let displayString = 'city: ';
    if (city) {
      displayString += city;
    } else {
      displayString += this.valueMissing();
    }
    displayString += '<br>';

    displayString += 'highway: ';
    if (highway) {
      displayString += highway;
    } else {
      displayString += this.valueMissing();
    }
    displayString += '<br>';

    displayString += 'combined: ';
    if (combined) {
      displayString += combined;
    } else {
      displayString += this.valueMissing();
    }

    return displayString;
  },
  valueMissing: function () {
    return String.fromCharCode(8211) + String.fromCharCode(8211);
  },
  openURLInDeviceBrowser: function (url) {
    window.open(url, '_system');
  }
};

export default utils;
