import './_LeftNav.scss';

import React from 'react';
import { LeftNav as MuiLeftNav, MenuItem } from 'material-ui';

let menuItems = [
  {type: MenuItem.Types.SUBHEADER, text: 'My CarZen'},
  {route: '/recommended', text: 'Recommendations'},
  {route: '/interview', text: 'Profile'},
  //{route: '/trims/15170112/serverdown', text: 'Trims Down'}, // TODO: TESTING YANK!!!
  {type: MenuItem.Types.SUBHEADER, text: 'About'},
  {route: '/aboutThisApp', text: 'About this App'},
  {route: '/privacyPolicy', text: 'Privacy Policy'},
  {route: '/termsConditions', text: 'Terms & Conditions'},
  {route: '/attributions', text: 'Attributions'},
  {route: '/appLinks', text: 'App Links'}

];

class LeftNav extends React.Component {

  constructor (...args) {
    super(...args);
    this.state = {
      selectedIndex: null
    };
  }

  componentDidMount () {
    let that = this;
    window.addEventListener('popstate', function () {
      that._closeLeftNavOnNavigation(that);
    });
  }

  componentWillUnmount () {
    let that = this;
    window.removeEventListener('popstate', function () {
      that._closeLeftNavOnNavigation(that);
    });
  }

  toggle () {
    // console.log("Menu toggle")

    if (!this.refs.leftNav.state.open) {
      this.open();
    } else {
      this.close();
    }
    this.refs.leftNav.toggle();
  }

  open () {
    // console.log("Menu is Opening")
    document.getElementById('BodyElement').classList.add('modal');
    // Accessible by the app router to prevent navigation on back when the menu is open. Note do not set in this close method, as this component executes before the router, and the router needs to know if the menu was open, when the back button is hit. This state will be set to false in the router.
    this.props.setLeftNavState(true);
  }

  close () {
    // console.log("Menu is Closing")
    let that = this;
    setTimeout(function () {
      //where we can also call foo
      that.props.setLeftNavState(false);
    }, 500);

    document.getElementById('BodyElement').classList.remove('modal');
  }

  getSelectedIndex () {
    return 0;
  }

  onHeaderClick () {
    this.refs.leftNav.close();
  }

  onLeftNavChange (e, key, payload) {
    // console.info("onLeftNavChange getLeftNavState",this.props.getLeftNavState())
    window.location.hash = payload.route;
    // must set before router fires so we navigate.
    this.props.setLeftNavState(false);
  }


  render () {
    /* -- See below, commenting out to satisfy eslint while this is not in use
     var header = (
     <div className={'logo'} onClick={this.onHeaderClick.bind(this)}>
     {' '}
     </div>
     );
     */

    // console.info("LeftNav#render", this.props)
    return (
      <div className='left-nav-container'>
        <MuiLeftNav
          className={'left-nav'}
          docked={false}
          // header={header} // TODO need real solution - click sends two click events on older android.
          isInitiallyOpen={false}
          menuItems={menuItems}
          onChange={this.onLeftNavChange.bind(this)}
          onNavOpen={this.open.bind(this)}
          onNavClose={this.close.bind(this)}
          ref={'leftNav'}
          selectedIndex={this.getSelectedIndex()}
          style={{
    width: '50%',
    margin: '0 auto'
  }}
          />

      </div>
    );
  }

  _closeLeftNavOnNavigation (that) {
    // console.log("Menu _closeLeftNavOnNavigation")
    if (that.refs.leftNav.state.open) {
      that.refs.leftNav.close();
      that.props.closeModal();
    }
  }

}

LeftNav.propTypes = {
  getLeftNavState: React.PropTypes.func.isRequired,
  setLeftNavState: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired
};

export default LeftNav;
