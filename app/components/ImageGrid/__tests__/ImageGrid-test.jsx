import React from 'react/addons';
import ImageGrid from '../ImageGrid.jsx';
import { ImageGridConstants } from '../../ComponentConstants';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('ImageGrid', () => {

  let images = [{
    thumbnail: 'http://icarsassets-shared-dev.s3.amazonaws.com/9765/9765_320x180_032_G7U.png',
    full: 'http://icarsassets-shared-dev.s3.amazonaws.com/9765/9765_320x180_032_G7U.png'
  }, {
    thumbnail: 'http://icarsassets-shared-dev.s3.amazonaws.com/9765/9765_320x180_032_G7U.png',
    full: 'http://icarsassets-shared-dev.s3.amazonaws.com/9765/9765_320x180_032_G7U.png'
  }];

  it('Should initialize correctly', () => {

    let imageGrid = TestUtils.renderIntoDocument(
      <ImageGrid images={images} type={ImageGridConstants.Type.PHOTOS}/>
    );

    let expectedState = {
      images: images
    };

    assert.deepEqual(imageGrid.state, expectedState, 'initial state not set as expected');

  });

  it('Should render the correct number of images', () => {

    let imageGrid = TestUtils.renderIntoDocument(
      <ImageGrid images={images} type={ImageGridConstants.Type.PHOTOS}/>
    );

    let imageElements = TestUtils.scryRenderedDOMComponentsWithClass(imageGrid, 'ImageGrid-Image');

    assert.equal(imageElements.length, images.length, 'incorrect number of images rendered');
  });

  it('Should remove an image if it fails to load', (done) => {

    images.push({
      thumbnail: 'http://badurl.com/no-image-here.png',
      full: 'http://badurl.com/no-image-here.png'
    });

    let imageGrid = TestUtils.renderIntoDocument(
      <ImageGrid images={images} type={ImageGridConstants.Type.PHOTOS}/>
    );

    setTimeout(function () {
      assert.equal(imageGrid.state.images.length, 2, 'image not removed from the state when it failed to load');
      done();
    }, 1500);

  });

  it('Should display Error component if all images fail', (done) => {

    let badImages = [{
      thumbnail: 'http://badurl.com/no-image-here.png',
      full: 'http://badurl.com/no-image-here.png'
    }];

    let imageGrid = TestUtils.renderIntoDocument(
      <ImageGrid images={badImages} type={ImageGridConstants.Type.PHOTOS}/>
    );

    setTimeout(function () {
      let errorElement = TestUtils.findRenderedDOMComponentWithClass(imageGrid, 'Error-overlay');
      assert(errorElement, 'Error component not found');
      done();
    }, 1500);

  });

  it('Should call clickHandler with correct params when an image is selected', () => {

    let clickHandler = sinon.spy();

    let imageGrid = TestUtils.renderIntoDocument(
      <ImageGrid images={images} type={ImageGridConstants.Type.PHOTOS} clickHandler={clickHandler}/>
    );

    let imgElements = TestUtils.scryRenderedDOMComponentsWithClass(imageGrid, 'Image-img');

    TestUtils.Simulate.click(imgElements[0]);

    assert.equal(clickHandler.callCount, 1, 'clickHandler not called as expected');

  });
});
