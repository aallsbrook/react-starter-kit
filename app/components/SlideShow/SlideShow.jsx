import './_SlideShow.scss';

import React from 'react';
// import { SlideShowConstants } from '../ComponentConstants';
//import { PhotoSwipe, PhotoSwipeUiDefault } from 'photoswipe';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUiDefault from '../../../node_modules/photoswipe/dist/photoswipe-ui-default';
import '../../../node_modules/photoswipe/dist/photoswipe.css';
import '../../../node_modules/photoswipe/dist/default-skin/default-skin.css';

console.info('XXXXXXXXXXXXXXXXXXXXXXXX PhotoSwipe class', PhotoSwipe);
console.info('XXXXXXXXXXXXXXXXXXXXXXXX PhotoSwipeUiDefault class', PhotoSwipeUiDefault);
//let slideShow = new PhotoSwipe();
//console.info("XXXXXXXXXXXXXXXXXXXXXXXX slideShow = new ", slideShow)

export default class SlideShow extends React.Component {

  componentDidMount () {
    let slideShowDomNode = React.findDOMNode(this.refs.slideShow);
    console.info('YYYYYYYYYYYYY SlideShow#componentDidMount: slideShowDomNode', slideShowDomNode);
    //console.info('YYYYYYYYYYYYY SlideShow#componentDidMount: this', this);

    //  let PhotoSwipeUiDefault = new PhotoSwipeUiDefault(slideShowDomNode);

    //  console.info("XXXXXXXXXXXXXXXXXXXXXXXX PhotoSwipeUiDefault", PhotoSwipeUiDefault)

    // build items array
    //var items = [
    //  {
    //    src: 'https://placekitten.com/800/900',
    //    w: 800,
    //    h: 900
    //  },
    //  {
    //    src: 'https://placekitten.com/1200/900',
    //    w: 1200,
    //    h: 900
    //  }
    //];

// define options (if needed)
//    var options = {
//      // optionName: 'option value'
//      // for example:
//      index: 0 // start at first slide
//    };

// Initializes and opens PhotoSwipe
    // var slideShow = new PhotoSwipe(slideShowDomNode, PhotoSwipeUiDefault, items, options);
    // console.info('XXXXXXXXXXXXXXXXXXXXXXXX slideShow', slideShow);

    // slideShow.init();

  }

  showImages (items, index) {
    console.info('YYYYYYYYYYYYY SlideShow#showImages: items', items);
    // build items array
    //var items = [
    //  {
    //    src: 'https://placekitten.com/800/900',
    //    w: 800,
    //    h: 900
    //  },
    //  {
    //    src: 'https://placekitten.com/1200/900',
    //    w: 1200,
    //    h: 900
    //  }
    //];

    let slideShowDomNode = React.findDOMNode(this.refs.slideShow);

// define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: index, // start at first slide
      preload: [1, 3],
      showHideOpacity: true,
      getThumbBoundsFn: false,
      captionEl: false,
      fullscreenEl: false,
      shareEl: false
    };

// Initializes and opens PhotoSwipe
    var slideShow = new PhotoSwipe(slideShowDomNode, PhotoSwipeUiDefault, items, options);
    console.info('XXXXXXXXXXXXXXXXXXXXXXXX slideShow', slideShow);

    let counter = React.findDOMNode(this.refs.counter);

    slideShow.listen('afterChange', function () {
      let currentIndex = slideShow.getCurrentIndex() + 1;
      let totalImages = slideShow.options.getNumItemsFn();
      counter.innerHTML = currentIndex + ' of ' + totalImages;
    });

    slideShow.init();
  }

  render () {


    return (

      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref="slideShow">


        <div className="pswp__bg"></div>

        <div className="pswp__scroll-wrap">


          <div className="pswp__container">
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
            <div className="pswp__item"></div>
          </div>

          <div className="pswp__ui pswp__ui--hidden">

            <div className="pswp__top-bar">


              <div ref="counter" className="pswp__counter"></div>

              <a className="pswp__button pswp__button--close" title="Close (Esc)">Close</a>

              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"></div>
            </div>

            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div className="pswp__caption">
              <div className="pswp__caption__center"></div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

SlideShow.propTypes = {};
