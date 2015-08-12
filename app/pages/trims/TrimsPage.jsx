'use strict';

import './_TrimsPage.scss';
import React from 'react';
import AppActions from '../../actions/AppActions';
import ErrorStore from '../../stores/ErrorStore';
import TrimsStore from '../../stores/TrimsStore';
import RecommendedStore from '../../stores/RecommendedStore';

import ListItem from '../../components/ListItem/ListItem';
import Trim from '../../components/Trim/Trim';

import { TRIMS_GET_ERROR } from '../../constants/AppConstants';
import { ModalConstants } from '../../components/ComponentConstants';

class TrimsPage extends React.Component {

  constructor (...args) {
    super(...args);

    let trims = TrimsStore.getTrimsForModel(this.props.params.id);
    let cloudURL = TrimsStore.getCloudURL();
    let modelData = RecommendedStore.getModelDataById(parseInt(this.props.params.id));

    this.props.getAppState().styleID = this.props.params.id;

    //TODO: once recommended page is implemented set model info accordingly
    this.PAGE_TITLE_SUFFIX = 'Trims';
    this.state = {
      trims: trims,
      cloudURL: cloudURL,
      modelData: modelData,
      id: this.props.params.id
    };

    this.setTitle();
    this.onChange = this.onChange.bind(this);
    this.onErrorChange = this.onErrorChange.bind(this);
    this.setServerDownURL();
  }


  componentDidMount () {
    ErrorStore.addChangeListener(this.onErrorChange);
    TrimsStore.addChangeListener(this.onChange);
    AppActions.getTrims(this.props.params.id);
  }

  componentWillUnmount () {
    ErrorStore.removeChangeListener(this.onErrorChange);
    TrimsStore.removeChangeListener(this.onChange);
  }

// TODO: Look into preventing rendering when we don't need to.
//shouldComponentUpdate(nextProps, nextState) {
//  console.info("TrimsPage#shouldComponentUpdate: FIRED", nextProps, nextState)
//
//  if (!!nextState.trims && !!nextState.modelData) {
//    console.info("TrimsPage#shouldComponentUpdate: UPDATE!!!", this)
//    //this.props.updateTitle(nextState.modelData);
//    this.setTitle(nextState.modelData);
//    return true;
//  } else {
//
//    console.info("TrimsPage#shouldComponentUpdate: DO NOT UPDATE!!!", this.state.trims)
//    console.info("TrimsPage#shouldComponentUpdate: DO NOT UPDATE!!!", this.state.modelData)
//    //this.props.updateTitle({make:"",model:""})
//    return false;
//  }
//  //return true;
//}

//shouldComponentUpdate() {
//  return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
//}


  render () {

    return (
      <div className="TrimsList page">
        {this.state.trims.map(this.renderTrim, this)}
      </div>
    );
  }

  onChange () {
    let trims = TrimsStore.getTrimsForModel(this.props.params.id);
    let cloudURL = TrimsStore.getCloudURL();
    this.setState({
      trims: trims,
      cloudURL: cloudURL
    });
    this.setTitle();
  }

  onErrorChange () {
    let contentObj = {
      data: ErrorStore.getError(TRIMS_GET_ERROR),
      retry: this.handleRetry.bind(this)
    };
    if (contentObj.data) {
      this.props.showModal(ModalConstants.Type.ERROR, contentObj);
    }
  }

  renderTrim (trim) {
    return (
      <ListItem handleSelect={this.handleSelect.bind(this)} key={trim.style_id}>
        <Trim trim={trim} cloudURL={this.state.cloudURL} />
      </ListItem>
    );
  }

  handleSelect (event) {
    let id = this.getId(event.currentTarget.firstChild);
    window.location.hash = 'trimDetails/' + id;
  }

  getId (element) {
    var splitString = element.id.split('_');
    return splitString[splitString.length - 1];
  }

  handleRetry () {
    AppActions.getTrims(this.props.params.id);
  }

  setTitle () {
    let title = this.getPageTitle();
    this.props.setTitle(title);
  }

  setServerDownURL () {
    if (!!this.props.params.testServerDown) {
      this.props.setServerDownURL(true);
    } else {
      this.props.setServerDownURL(false);
    }
  }

  getPageTitle () {
    let modelData = this.state.modelData;


    let pageTitle = '';
    if (!!modelData) {

      if (!!modelData.vast_make) {
        pageTitle = modelData.vast_make;
      }
      if (!!modelData.vast_model) {
        pageTitle += ' ' + modelData.vast_model;
      }
      if (!!pageTitle) {
        pageTitle += ' ' + this.PAGE_TITLE_SUFFIX;

      } else {
        pageTitle = this.PAGE_TITLE_SUFFIX;
      }

    }
    return pageTitle;
  }

}

TrimsPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  setServerDownURL: React.PropTypes.func.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired,
  getAppState: React.PropTypes.func.isRequired
};

export default TrimsPage;
