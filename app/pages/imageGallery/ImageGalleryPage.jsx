'use strict';

import './_ImageGalleryPage.scss';

import React from 'react';

import AppActions from '../../actions/AppActions';
import TrimDetailsStore from '../../stores/TrimDetailsStore';
import RecommendedStore from '../../stores/RecommendedStore';
import SlideShow from '../../components/SlideShow/SlideShow';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import { Tab, Tabs } from 'material-ui';
import { ImageGridConstants } from '../../components/ComponentConstants';

class ImageGalleryPage extends React.Component {

  constructor (...args) {
    super(...args);

    let images = TrimDetailsStore.getImagesForStyle(this.props.params.id);

    this.state = {
      images: images
    };

    this._setTitle();

    this._handleTrimDetailsChange = this._handleTrimDetailsChange.bind(this);
  }

  _setTitle () {
    let title = '';
    let yearAndStyle = TrimDetailsStore.getYearAndStyle(this.props.params.id);
    let appState = this.props.getAppState();
    let modelData = RecommendedStore.getModelDataById(parseInt(appState.styleID));

    if (yearAndStyle.year) {
      title += yearAndStyle.year;
    }
    if (!!modelData) {
      if (!!modelData.make) {
        title += ' ' + modelData.make;
      }
      if (!!modelData.model_name) {
        title += ' ' + modelData.model_name;
      }
    }
    if (yearAndStyle.style) {
      title += ' ' + yearAndStyle.style;
    }

    this.props.setTitle(title);
  }

  componentDidMount () {
    // Hide the leftnav menu button
    document.querySelector('.mui-app-bar-navigation-icon-button').classList.add('hidden');
    document.getElementById('BodyElement').classList.add('hide-hamburger-icon');

    TrimDetailsStore.addChangeListener(this._handleTrimDetailsChange);

    //this is mainly for when developing locally, if images weren't loaded, try getting trim details
    AppActions.getTrimDetails(this.props.params.id);
    if (!!screen.unlockOrientation) {
      screen.unlockOrientation();
    }

  }

  componentWillUnmount () {
    TrimDetailsStore.removeChangeListener(this._handleTrimDetailsChange);
    if (!!screen.lockOrientation) {
      screen.lockOrientation('portrait');
    }
  }

  render () {

    let interiorGrid, exteriorGrid, tabs;

    if (this.state.images) {
      if (this.state.images.interior) {
        interiorGrid = (
          <div className="ImageGalleryPage-ImageGrid ImageGalleryPage-ImageGrid--interior">
            <ImageGrid id="interior"
                       images={this.state.images.interior}
                       clickHandler={this._handleImageClick.bind(this)}
                       type={ImageGridConstants.Type.PHOTOS}/>
          </div>
        );
      }
      if (this.state.images.exterior) {
        exteriorGrid = (
          <div className="ImageGalleryPage-ImageGrid ImageGalleryPage-ImageGrid--exterior">
            <ImageGrid id="exterior"
                       images={this.state.images.exterior}
                       clickHandler={this._handleImageClick.bind(this)}
                       type={ImageGridConstants.Type.PHOTOS}/>
          </div>
        );
      }
    }

    if (interiorGrid && !exteriorGrid) {
      tabs = (
        <div className="oneTab">
          <Tabs tabWidth="100%">
            <Tab label="Interior">
              {interiorGrid}
            </Tab>
          </Tabs>
        </div>
      );
    } else if (!interiorGrid && exteriorGrid) {
      tabs = (
        <div className="oneTab">
          <Tabs tabWidth="100%">
            <Tab label="Exterior">
              {exteriorGrid}
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      tabs = (
        <Tabs tabWidth="50%">
          <Tab label="Interior">
            {interiorGrid}
          </Tab>
          <Tab label="Exterior">
            {exteriorGrid}
          </Tab>
        </Tabs>
      );
    }

    return (
      <div className="page ImageGalleryPage">
        {tabs}
        <div className="slideshow">
          <SlideShow items={this.state.items} ref='SlideShow'/>
        </div>
      </div>
    );
  }

  _handleTrimDetailsChange () {
    let images = TrimDetailsStore.getImagesForStyle(this.props.params.id);

    this.setState({
      images: images
    });
  }

  _handleImageClick (imageGridId, imgId, event) {
    // this.props.handleSelect(this.getIdFromParent(event.target));
    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: event target', event.target);

    let startImageIndex = event.target.getAttribute('data-index');

    let images = this.state.images[imageGridId];
    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: this.props.images', images);

    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: this', this);


    let image = null;
    let fullImagePaths = [];
    let items = [];

    for (image of images) {

      let imageDimensions = this._getImageDimensionsFromUrl(image.full);
      //console.info('xxxxxxxxxxxxx ImageGrid#handleClick: imageDimensions', imageDimensions);
      fullImagePaths.push(image);
      items.push({
        src: image.full,
        h: imageDimensions.height,
        w: imageDimensions.width,
        initialZoomLevel: 1,
        showHideOpacity: true,
        getThumbBoundsFn: false
      });
      //console.log(image);
    }

    // console.info('xxxxxxxxxxxxx ImageGrid#handleClick: fullImagePaths', fullImagePaths);
    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: items', items);

    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: startImageIndex', startImageIndex);
    //console.info('xxxxxxxxxxxxx ImageGrid#handleClick: args()', arguments);

    //this.setState({
    //  items: items
    //});


    this.state.items = items;

    console.info('xxxxxxxxxxxxx ImageGrid#handleClick: this.state', this.state);
    //this.render();
    // this.forceUpdate();
    this.refs.SlideShow.showImages(items, Number(startImageIndex));

  }

  _getImageDimensionsFromUrl (url) {

    let dimensions = {width: null, height: null};
    console.info('xxxxxxxxxxxxx ImageGrid#getImageDimensionsFromUrl: url', url);

    let urlParts = url.split('/');
    console.info('xxxxxxxxxxxxx ImageGrid#getImageDimensionsFromUrl: urlParts', urlParts);

    let imageNameParts = urlParts[urlParts.length - 1].split('_');
    console.info('xxxxxxxxxxxxx ImageGrid#getImageDimensionsFromUrl: imageNameParts', imageNameParts);

    let imageSizes = imageNameParts[1].split('x');
    console.info('xxxxxxxxxxxxx ImageGrid#getImageDimensionsFromUrl: imageSizes', imageSizes);

    dimensions.width = imageSizes[0];
    dimensions.height = imageSizes[1];

    return dimensions;
  }
}

ImageGalleryPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  getAppState: React.PropTypes.func.isRequired
};

export default ImageGalleryPage;
