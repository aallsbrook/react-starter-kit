import React from 'react/addons';
import FlyOutMenu from '../FlyOutMenu.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('FlyOutMenu', () => {
    it('Should have the correct css class', () => {

        let flyOutMenu = TestUtils.renderIntoDocument(
            <FlyOutMenu title="Testing"/>
        );
        let flyOutMenuElement = React.findDOMNode(flyOutMenu);
        assert.equal(flyOutMenuElement.className, 'FlyOutMenu', 'FlyOutMenu class not applied to element');

    });

});
