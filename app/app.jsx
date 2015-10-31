import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import AppController from './components/AppController/AppController';
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home/HomePage';

render((
  <Router>
    <Route path="/" component={AppController}>
      <IndexRoute component={HomePage}/>
      <Route path="about" component={AboutPage}/>
    </Route>
  </Router>
), document.getElementById('app'));


