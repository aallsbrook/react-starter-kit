'use strict';

import './_ListingDetailsPage.scss';

import React from 'react';
import Slider from 'react-slick';
import AppActions from '../../actions/AppActions';
import ListingDetailsStore from '../../stores/ListingDetailsStore';

import Button from '../../components/Button/Button';
import CarImage from '../../components/CarImage/CarImage';
import DetailSection from '../../components/DetailSection/DetailSection';
import Table from '../../components/Table/Table';
import { CarImageConstants, ButtonConstants } from '../../components/ComponentConstants';

// import PhotoSwipe from 'photoswipe';
// import PhotoSwipeUiDefault from '../../../node_modules/photoswipe/dist/photoswipe-ui-default';
// import '../../../node_modules/photoswipe/dist/photoswipe.css';
// import '../../../node_modules/photoswipe/dist/default-skin/default-skin.css';

import { getMPGDisplayStringComplete, valueMissing } from '../../util/Util';

class ListingDetailsPage extends React.Component {

  constructor (...args) {
    super(...args);
    let totalImages = 0;
    let detailObj = ListingDetailsStore.getListingDetails(this.props.params.id);

    if (detailObj.gallery) {
      totalImages = detailObj.gallery.length;
    }

    this.state = {
      listingDetail: detailObj,
      currentImgIndex: 1,
      totalImages: totalImages
    };

    this.props.setTitle(this.state.listingDetail.title);

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    ListingDetailsStore.addChangeListener(this._onChange);
    AppActions.getListingDetails(this.props.params.id);
  }

  componentWillUnmount () {
    ListingDetailsStore.removeChangeListener(this._onChange);
  }

  render () {
    let topSpecs, gallery, locativeComponent, specifications, carFaxReport;

    if (this.state.listingDetail.id) {
      topSpecs = this._renderTopSpecs();

      gallery = this._renderGallery();

      locativeComponent = this._renderLocativeComponent();

      specifications = this._renderSpecifications();

      //carFaxReport = this._renderCarFaxReport();
    }

    return (
      <div className="page ListingDetailsPage">
        {topSpecs}
        <div className="vin-carousel-component">
          <span ref="counter" className="counter"></span>
          {gallery}
        </div>
        {locativeComponent}
        {specifications}
        {carFaxReport}
      </div>
    );
  }

  _onChange () {
    let detailObj = ListingDetailsStore.getListingDetails(this.props.params.id);

    this.setState({
      listingDetail: detailObj,
      totalImages: detailObj.gallery.length
    });

    this._setCounter(1, this.state.totalImages);

    this.props.setTitle(this.state.listingDetail.title);
  }

  _renderTopSpecs () {
    return (
      <div className="top-specs-component">
        <div className="top-specs-price">{this.state.listingDetail.price}</div>
        <div className="top-specs-miles">{this.state.listingDetail.mileage || valueMissing()} miles</div>
      </div>
    );
  }

  _renderGallery () {
    let that = this;
    let galleryContent;
    let settings = {
      dots: false,
      arrows: false,
      infinite: true,
      centerMode: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: function (index) {
        that._setCounter(index + 1, that.state.listingDetail.gallery.length);
      }
    };

    if (this.state.listingDetail.gallery.length === 0) {
      that._setCounter('NA');
      return (
        <div className="CarImage CarImage--border error"><div className="CarImage--placeholder"></div></div>
      );
    } else if (this.state.listingDetail.gallery.length === 1) {
      return (
        <CarImage type={CarImageConstants.Type.BORDER} imageURL={this.state.listingDetail.gallery[0].original_img_url} handleError={this._handleImgError.bind(this)} />
      );
    } else {
      galleryContent = this.state.listingDetail.gallery.map(this._renderGalleryImage, this);
      return (
        <Slider {...settings}>
          {galleryContent}
        </Slider>
      );
    }
  }

  _renderGalleryImage (galleryObj) {
    return (
      <div>
        <CarImage type={CarImageConstants.Type.BORDER} imageURL={galleryObj.original_img_url} handleError={this._handleImgError.bind(this)} />
      </div>
    );
  }

  _handleImgError () {
    this._setCounter('NA');
  }

  _setCounter (currentImgIndex, totalImages) {
    if (currentImgIndex === 'NA') {
      React.findDOMNode(this.refs.counter).innerHTML = 'NA';
    } else {
      React.findDOMNode(this.refs.counter).innerHTML = currentImgIndex + ' of ' + totalImages;
    }
  }

  _renderLocativeComponent () {
    let phoneBtn, emailBtn, singleBtn = false, noBtns = false;

    if (this.state.listingDetail.dealer.phone) {
      phoneBtn = (
        <Button buttonType={ButtonConstants.Type.SMALL_STANDARD}
                buttonText="Call"
                buttonIcon={ButtonConstants.Icon.CALL}
                linkHREF={'tel:' + this.state.listingDetail.dealer.phone}/>
      );
    }

    if (this.state.listingDetail.dealer.email) {
      emailBtn = (
        <Button buttonType={ButtonConstants.Type.SMALL_STANDARD}
                buttonText="Email"
                buttonIcon={ButtonConstants.Icon.EMAIL}
                linkHREF={'mailto:' + this.state.listingDetail.dealer.email}/>
      );
    }

    if ((!!phoneBtn && !emailBtn) || (!phoneBtn && !!emailBtn)) {
      singleBtn = true;
    } else if (!phoneBtn && !emailBtn) {
      noBtns = true;
    }

    return (
      <div className={'locative-component' + (noBtns ? ' no-btns' : '')}>
        <div className="dealer-left">
          <b className="dealer-name">{this.state.listingDetail.dealer.name}</b>
          <div className="adr">
            <div className="street-address">{this.state.listingDetail.location.address}</div>
            {this.state.listingDetail.location.city}, {this.state.listingDetail.location.state} {this.state.listingDetail.location.zip}
          </div>
        </div>
        <div className={'dealer-right' + (singleBtn ? ' single-btn' : '')}>
          {phoneBtn}
          {emailBtn}
        </div>
      </div>
    );
  }

  _renderSpecifications () {
    let tableData = [];

    tableData.push({
      displayKey: 'Engine',
      value: this.state.listingDetail.engine || valueMissing()
    });

    tableData.push({
      displayKey: 'Fuel',
      value: this.state.listingDetail.fuel || valueMissing()
    });

    tableData.push({
      displayKey: 'Ext. Color',
      value: this.state.listingDetail['exterior-color'] || valueMissing()
    });

    tableData.push({
      displayKey: 'Transmission',
      value: this.state.listingDetail.transmission || valueMissing()
    });

    tableData.push({
      displayKey: 'Drive Type',
      value: this.state.listingDetail['drive-type'] || valueMissing()
    });

    tableData.push({
      displayKey: 'MPG',
      value: getMPGDisplayStringComplete(this.state.listingDetail.mpg_city, this.state.listingDetail.mpg_highway, this.state.listingDetail.mpg_combined),
      enableHTML: true
    });

    tableData.push({
      displayKey: 'VIN',
      value: this.state.listingDetail.vin || valueMissing()
    });

    return (
      <DetailSection title="Specifications">
        <Table data={tableData}/>
      </DetailSection>
    );
  }

  _renderCarFaxReport () {
    return (
      <DetailSection title="CARFAX Report Highlights (excerpt)">
        <p>Content Placeholder</p>
      </DetailSection>
    );
  }
}

ListingDetailsPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  setTitle: React.PropTypes.func.isRequired
};

export default ListingDetailsPage;
