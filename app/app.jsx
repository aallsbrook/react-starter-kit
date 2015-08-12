'use strict';

import './favicon.ico';
import './assets/images/favicons/apple-touch-icon-114x114-precomposed.png';
import './assets/images/favicons/apple-touch-icon-57x57-precomposed.png';
import './assets/images/favicons/apple-touch-icon-72x72-precomposed.png';

import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Router from 'react-router';
import AppRoutes from './app-routes.jsx';

injectTapEventPlugin();

Router
  // Runs the router, similiar to the Router.run method. You can think of it as an
  // initializer/constructor method.
  .create({
    routes: AppRoutes,
    scrollBehavior: Router.ScrollToTopBehavior
  })
  // This is our callback function, whenever the url changes it will be called again.
  // Handler: The ReactComponent class that will be rendered
  .run(function (Handler) {
    let appController = document.defaultView.App;
    if (appController) {
      // console.info("NAVIGATE", appController)
      if (!appController.state.leftNavOpen) {
        //console.info("leftNav is NOT open", appController)
        React.render(<Handler/>, document.getElementById('app'));
      } else {
        //console.info("leftNav is open", appController)
        // This is called after the leftNav opens/closes, must set here to be effective.
        window.history.forward();
      }
    } else {
      // console.info("leftNav is unknown")
      React.render(<Handler/>, document.getElementById('app'));
    }
  });

