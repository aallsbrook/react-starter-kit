# react-starter-kit
A ReactJS/Flux Starter kit for building apps with Node, NPM, ES6, and webpack. As well as optional support for using Cordova to wrap your app in an executable for Android, iOS, etc.

## What you get

* React 0.13
* Compilation of ES6 & JSX to ES5
* webpack module loader with react hot loader (as well as html, css & sass loaders)
* Karma, mocha, chai & sinon for testing
* Basic flux architecture with app actions, stores and example web API usage
* View http://imgur.com/S17tOcp for an example
* React router ([feature/react-router](https://github.com/badsyntax/react-seed/tree/feature/react-router))
* Mock Server
* Hamburger Menu (Main Navigation)

## Demo
http://lmigpiit.github.io/react-starter-kit (Updated often)

### APK
(coming soon)

## Getting started

tl;dr
`npm start`

### Installing with git

```bash
git clone --depth=1 https://github.com/badsyntax/react-seed.git my-project
cd my-project
git checkout feature/material-ui
```

### Installing with yeoman

1. `npm install -g yo`
2. `npm install -g generator-react-seed`
3. Use the generator like so: `yo react-seed`

## npm scripts

* `npm start` - Build and start the app in dev mode at http://localhost:8000
* `npm test` - Run the tests
* `npm run build` - Run a production build

## Examples

### Writing components:

```js
// Filename: Menu.jsx

'use strict';

import './_Menu.scss';

import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

let { PropTypes } = React;

class Menu extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      foo: false
    };
  }

  getMenuItem(item) {
    return (
      <MenuItem item={item} key={'menu-item-' + item.id} />
    );
  }

  render() {
    return (
      <ul className={'menu'}>
        {this.props.items.map(this.getMenuItem, this)}
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array.isRequired
};

export default Menu;
```

###Writing tests:

```js
// Filename: __tests__/Menu-test.js

'use strict';

import React from 'react/addons';
import Menu from '../Menu.jsx';

let { TestUtils } = React.addons;

describe('Menu', () => {

  let menuItems = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ];

  let menu = TestUtils.renderIntoDocument(
    <Menu items={menuItems} />
  );
  let menuElem = React.findDOMNode(menu);

  it('Renders the menu items', () => {
    expect(menuElem.querySelectorAll('li').length).to.equal(2);
  });
});
```

## Sass, CSS & webpack

`import` Sass and CSS files from within your JavaScript component files:

```js
// Filename: app.jsx
import 'normalize.css/normalize.css';
import './scss/app.scss';
```

* Sass include paths can be adjusted in the `webpack/loaders.js` file.
* All CSS (compiled or otherwise) is run through Autoprefixer.
* CSS files are combined in the order in which they are imported in JavaScript, thus
you should always import your CSS/Sass before importing any other JavaScript files.
* Use an approach like [BEM](http://cssguidelin.es/#bem-like-naming) to avoid specificity
issues that might exist due to unpredicatable order of CSS rules.

## HTML files

All required `.html` files are compiled with lodash.template and synced into the `./build` directory:

```js
// Filename: app.jsx
import './index.html';
```

* You can adjust the lodash template data in the `webpack/loaders.js` file.

## Conventions

* Use fat arrows for anonymous functions
* Don't use `var`. Use `let` and `const`.


## Releasing

1. `npm version patch`
2. `git push && git push --tags`
3. `npm login` (Optional)
4. `npm publish`

## Credits

This project was initially forked from [React seed - example](https://github.com/badsyntax/react-seed)

## License

Copyright (c) 2015 Richard Willis

MIT (http://opensource.org/licenses/MIT)
