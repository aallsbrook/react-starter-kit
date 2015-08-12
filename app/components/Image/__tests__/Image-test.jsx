import React from 'react/addons';
import Image from '../Image.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('Image', () => {

  let id = '1';
  let validImageUrl = 'http://icarsassets-shared-dev.s3.amazonaws.com/9765/9765_320x180_032_G7U.png';
  let invalidImageUrl = 'http://badimageurl.com/no-image-here.png';

  it('Should render an HTML img element with correct attributes and CSS class', () => {

    let image = TestUtils.renderIntoDocument(
      <Image id={id}
             index={id}
             src={validImageUrl}/>
    );

    let imgElement = React.findDOMNode(image);

    assert.equal(imgElement.id, id, 'img element id not set as expected');
    assert.equal(imgElement.getAttribute('data-index'), id, 'img element data-index not set as expected');
    assert.equal(imgElement.src, validImageUrl, 'img element src not set as expected');
    assert.equal(imgElement.className, 'Image-img', 'img element class not set as expected');

  });

  it('Should call loadHandler on successful image load', (done) => {

    let loadHandler = sinon.spy();

    TestUtils.renderIntoDocument(
      <Image id={id}
             index={id}
             src={validImageUrl}
             loadHandler={loadHandler}/>
    );

    setTimeout(() => {
      assert.equal(loadHandler.callCount, 1, 'image loadHandler not called as expected');
      done();
    }, 1500);

  });

  it('Should call error handler when bad url present', (done) => {

    let errorHandler = sinon.spy();

    TestUtils.renderIntoDocument(
      <Image id={id}
             index={id}
             src={invalidImageUrl}
             errorHandler={errorHandler}/>
    );

    setTimeout(() => {
      assert.equal(errorHandler.callCount, 1, 'image errorHandler not called as expected');
      done();
    }, 1500);

  });

  it('Should call click handler when clicked', () => {
    let clickHandler = sinon.spy();

    let image = TestUtils.renderIntoDocument(
      <Image id={id}
             index={id}
             src={invalidImageUrl}
             clickHandler={clickHandler}/>
    );

    let imgElement = React.findDOMNode(image);

    TestUtils.Simulate.click(imgElement);

    assert.equal(clickHandler.callCount, 1, 'image clickHandler not called as expected');
  });
});
