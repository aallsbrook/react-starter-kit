// Adding this call again in case the prior call fired too soon.
// However, since this may fire before AppsFlyer initialization is
// complete, checking for existance of all the objects
// Either or both of these calls will succeed in notifying the rest of the app
// about the AppsFlyer ID.  The listener should not assume that it
// will be called only once.
if (typeof window.plugins !== 'undefined') {
  if (typeof window.plugins.appsFlyer !== 'undefined') {
    if (typeof window.plugins.appsFlyer.getAppsFlyerUID !== 'undefined') {
      window.plugins.appsFlyer.getAppsFlyerUID(getUserIdCallbackFn); //eslint-disable-line no-undef
    }
  }
}
