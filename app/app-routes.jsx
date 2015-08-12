'use strict';

import React from 'react';
import Router from 'react-router';
var Route = Router.Route;

import App from './components/AppController/AppController';

import AboutThisAppPage from './pages/aboutThisApp/AboutThisAppPage';
import AccountPage from './pages/account/AccountPage';
import AttributionsPage from './pages/attributions/AttributionsPage';
import ImageGalleryPage from './pages/imageGallery/ImageGalleryPage';
import InterviewPage from './pages/interview/InterviewPage';
import ListingDetailsPage from './pages/listingDetails/ListingDetailsPage';
import ListingsPage from './pages/listings/ListingsPage';
import LogoutPage from './pages/logout/LogoutPage';
import MyCarZenPage from './pages/myCarZen/MyCarZenPage';
import PrivacyPolicyPage from './pages/privacyPolicy/PrivacyPolicyPage';
import PromotionPage from './pages/promotion/PromotionPage';
import TermsConditionsPage from './pages/termsConditions/TermsConditionsPage';
import TrimDetailsPage from './pages/trimDetails/TrimDetailsPage';
import TrimsPage from './pages/trims/TrimsPage';
import RecommendedPage from './pages/recommended/RecommendedPage';
import AppLinkPage from './pages/appLinks/AppLinksPage';
import VideoGalleryPage from './pages/videoGallery/VideoGalleryPage';

export default (
  <Route name='root' path='/' handler={App}>
    <Route name='aboutThisApp' path='/aboutThisApp' handler={AboutThisAppPage}/>
    <Route name='account' path='/account' handler={AccountPage}/>
    <Route name='attributions' path='/attributions' handler={AttributionsPage}/>
    <Route name='imageGallery' path='/imageGallery/:id' handler={ImageGalleryPage}/>
    <Route name='interview' path='/interview' handler={InterviewPage}/>
    <Route name='interviewIndexPages' path='/interview/:index' handler={InterviewPage}/>
    <Route name='listingDetails' path='/listing/:id' handler={ListingDetailsPage}/>
    <Route name='listings' path='/listings/:id' handler={ListingsPage}/>
    <Route name='logout' path='/logout' handler={LogoutPage}/>
    <Route name='myCarZen' path='/myCarZen' handler={MyCarZenPage}/>
    <Route name='privacyPolicy' path='/privacyPolicy' handler={PrivacyPolicyPage}/>
    <Route name='promotion' path='/promotion' handler={PromotionPage}/>
    <Route name='termsConditions' path='/termsConditions' handler={TermsConditionsPage}/>
    <Route name='trimDetails' path='/trimDetails/:id' handler={TrimDetailsPage}/>
    <Route name='trims' path='/trims/:id' handler={TrimsPage}/>
    <Route name='trims-test-server-down' path='/trims/:id/:testServerDown' handler={TrimsPage}/>
    <Route name='recommended' path='/recommended' handler={RecommendedPage}/>
    <Route name='appLinks' path='/appLinks' handler={AppLinkPage}/>
    <Route name='videoGallery' path='/videoGallery/:id' handler={VideoGalleryPage}/>
  </Route>
);
