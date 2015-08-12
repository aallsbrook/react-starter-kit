import React from 'react/addons';
import Video from '../Video.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('Video', () => {

  it('Should call handleClick function when clicked', () => {
    let handleClick = sinon.spy();
    let videoElement = TestUtils.renderIntoDocument(
      <Video
        sourceUrl={'http://icarsassets-v1.s3.amazonaws.com/WheelsTV/1onONE_MP4/1onONE_2015_Acura_ILX.mp4'}
        handleVideoClick={handleClick} />
    );
    TestUtils.Simulate.click(React.findDOMNode(videoElement));
    assert.equal(handleClick.callCount, 1, 'handleVideoClick function not called when video is clicked');
  });
});
