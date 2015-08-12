/**
 * This function is used as the call back for receiving appsflyerid
 * from the AppsFlyer plugin.
 * @param appsflyerid AppsFlyerID
 */
var getUserIdCallbackFn = function fireAppsFlyerIdEvent (appsflyerid) {
  var event;
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent('AppsFlyerIDReceived', true, true);
  } else {
    event = document.createEventObject();
    event.eventType = 'AppsFlyerIDReceived';
  }

  event.eventName = 'AppsFlyerIDReceived';
  event.appsflyerid = appsflyerid;

  if (document.createEvent) {
    document.dispatchEvent(event);
  } else {
    document.fireEvent('on' + event.eventType, event);
  }
};

/**
 * Utility function that can be used to fire an event that doesn't have
 * any data payload.
 * @param eventName The name to use for this event
 */
function fireNamedEvent (eventName) {
  var event;
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
  }

  event.eventName = eventName;

  if (document.createEvent) {
    document.dispatchEvent(event);
  } else {
    document.fireEvent('on' + event.eventType, event);
  }
}

/**
 * This will be called from MainActivity.java when the back key press is detected in the native code
 * and we are at the beginning of navigation history.
 */
function onBackKeyDownWhenAtStartOfHistory () { //eslint-disable-line no-unused-vars
  if (window.App.state.leftNavOpen === false) {
    navigator.app.exitApp();
  }
  // No need for the else action - this will be handled in onBackKeyDown()
}

/**
 * This function implements the custom behavior of the back button.  Notice that
 * onBackKeyDownWhenAtStartOfHistory may also be called when the back button is
 * pressed to handle exiting from the app when at the beginning of navigation of
 * history.  However, this function will also be called to perform actions when
 * we are at the beginning of history but don't want to exit.
 */
function onBackKeyDown () {
  if (window.location.hash === '#/promotion') {
    // Do nothing - neither trigger BackButtonPressed event nor navigator.app.backHistory nor exit app.
  }
  else if ((window.location.hash === '#/' && window.App.state.leftNavOpen === true)) {
    fireNamedEvent('BackButtonPressed');
  }
  else {
    navigator.app.backHistory();
  }
}

/**
 * Adding a listener for cordova's deviceready event.  This is the mechanism
 * cordova uses to communicate to the rest of the code when its initialization
 * is complete.  Currently we are using this to initialize AppsFlyer SDK, request
 * AppsFlyer id (will be returned to getUserIdCallbackFn), and also to register
 * a custom handler for the back button.
 */
document.addEventListener('deviceready', function () {
  ZipCode.getZipCode(); //eslint-disable-line no-undef
  var args = [];
  var devKey = 'NnXzv7wsNuo3afGj8c5ENG';   // AppsFlyer devKey
  args.push(devKey);
//  var userAgent = window.navigator.userAgent.toLowerCase();
//    if (/iphone|ipad|ipod/.test( userAgent )) {
//        var appId = "123456789";            // your ios app id in app store
//        args.push(appId);
//    }
  window.plugins.appsFlyer.initSdk(args);
  window.plugins.appsFlyer.getAppsFlyerUID(getUserIdCallbackFn);
  document.addEventListener('backbutton', onBackKeyDown, false);
}, false);
