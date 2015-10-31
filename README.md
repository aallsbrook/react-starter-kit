# react-starter-kit

A Responsive, ReactJS/Flux Starter kit for building apps with Node, NPM, ES6, and webpack. As well as optional support for using Cordova to wrap your app in an executable for Android, iOS, etc.

## What you get

* React 0.14
* Responsive
* Compilation of ES6 & JSX to ES5
* webpack module loader with react hot loader (as well as html, css & sass loaders)
* Karma, mocha, chai & sinon for testing
* Basic flux architecture with app actions, stores and example web API usage
* View http://imgur.com/S17tOcp for an example
* react-router
* Mock Server
* FlyOutMenu (left or right side)
* Header (sticky on top of page, with left and right buttons and a title)

### Getting Started Guide
A detailed getting started guide has been created as a wiki, and can be found [here](https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide).

## Demo
http://lmigpiit.github.io/react-starter-kit

### APK
(coming soon)

## Getting started

tl;dr
`npm start`

### Installing with git

```bash
git clone --depth=1 --branch=master https://github.com/lmigpiit/react-starter-kit.git project_name
rm -rf !$/.git
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


## Credits

This project was initially forked from [React seed - example](https://github.com/badsyntax/react-seed)

## License

Copyright (c) 2015 Liberty Mutual

MIT (http://opensource.org/licenses/MIT)
