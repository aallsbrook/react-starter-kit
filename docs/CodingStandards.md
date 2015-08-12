# CarZen Client Coding Standards

All standards outlined below should be followed - violators will be prosecuted.

## Folders
- All folders should be lowercase and not camel case.
- If a folder should be made up of two words then use underscore to separate the words.
- All folders should be singular (e.g. "lib" instead of "libs").

## Class Filenames
- Base classes which should only be extended or mixed-in should have a name starting with an underscore (e.g.: _MyBaseClass.js).
- Classes which DO NOT need to instantiated should always start with a lower case letter (e.g.: doNotInstantiateMe.js).
- Classes which DO need to be instantiated should always start with an UPPER CASE letter (e.g.: InstantiateMe.js).

## Class Variables and Functions
- All private/protected variable names and function names should be be prefixed with an underscore.
- All functions should include JSDoc.
- All public functions should be at the top of a module
- All protected function should be in-between public and private functions within a module
- All private functions should be at the bottom of a component

## Importing Components
- All variables defined in import should be named to match their module name exactly.  Do NOT prefix or shorten any of the variables.
- All components imported should be sorted alphabetically.

**Examples:**

```javascript
import ProfileStore from '../../stores/ProfileStore';
import PromotionsActions from '../../actions/PromotionsActions';
import PromotionsStore from '../../stores/PromotionsStore';
```

## JSDoc
- All functions should begin with a short description and include the @instance annotation.
- All functions should define whether they are public, private, or protected by using the proper JSDoc annotation: @private, @public, @protected.
- All constructors should be defined as public using the @public JSDoc annotation.
- All parameters of a function should be defined using the '@param' annotation and in the correct format. (e.g.: @param {String} paramName - description of param).
- All *OPTIONAL* parameters should be communicated through the JSDoc notation which is to place brackets around the parameter name.  (e.g.: @param {String} [paramName] - description of param). Additionally, you may indicate a default value for the optional parameter (e.g.: @param {String} [paramName=foobar] - description of param; defaults to 'foobar' if not provided).
- Do *NOT* place comments alongside parameters of a function to define the parameter type.  Instead use @params function comment annotation.
- All functions that return something should define the '@returns' annotation in the correct format. (e.g.: @returns {Object} the object you wanted me to return). _**NOTE: do NOT include dashes.**_
- All comments included in the JSDoc should follow proper grammatical syntax.
- All overridden methods should include the @override annotation.

**Examples:**

```javascript
/**
 * My function description.
 *
 * @instance
 * @public
 * @param {String}
 *            param1 - the first parameter
 * @param {Boolean}
 *            param2 - the second parameter
 * @param {Object}
 *            [param3] - the optional third parameter
 * @param {Boolean}
 *            [param4=true] - the optional fourth parameter; defaults to true if not provided
 * @returns {Object} the thing you were expecting
 */
```

## Quotations
- JavaScript should be written using single-quotes.
- HTML should be written using double-quotes.
- JSON should be written using double-quotes.

## HTML
- All IDs and classes should follow a hyphenated format (e.g. "customer-first-name") over camel case (e.g. "customerFirstName")

## Unit Tests
- All unit test files should be named using the name of the component + "Tests.js" (e.g.: MyClassTests.js).
- All unit tests should adhere to the template located at ./tests/templates/unitTestTemplate.js.
- Please understand what you're trying to test and do not write endless amount of useless tests that assert things unnecessarily.
- Useful Links:
  - [Unit Testing Fundamentals](https://wiki.lmig.com/display/PIInternet/Testing+101+-+Unit+Testing+Fundamentals)
  - [Sinon.JS API](http://sinonjs.org/docs/) - *used for mocking, stubbing, and spying*
  - [Chai Assert API](http://chaijs.com/api/assert/) - *used for assertions within unit tests*

## Functional Tests
- Useful Links:
  - [Intern - Writing a Functional Test](https://theintern.github.io/intern/#writing-functional-test)
  - [Leadfoot](https://theintern.github.io/leadfoot/Command.html)

## Error Handling
- Tier or module that identifies an error is responsible for handling the error.  Consumer just needs to know if an error occurred through deferred rejection. For example, XhrService will identify errors produced within its module and communicate the error to the application error handler.  The module calling into XhrService will receive a rejected deferred and it would only be expected to clean up it's deferred (reject it) based on XhrService failing.  The caller should NOT communicate the error as well.
- All errors should be reported to and handled by **errorHandler**. An instance of **ESalesError** containing information about the error should be provided to errorHandler. At the very minimum, you should always define **type** and **message** on ESalesError.

## Logging
- Console statements are fine during development and debugging, but **DO NOT** leave them in as your final deliverable code.

## Promises
- All promises should be resolved or rejected.
- When chaining promises be sure to handle errors for each promise and halt the chain from continuing when errors in any link occur.
- Every rejected promise should not provide parameters to the rejected function to ensure consistent expectations.

## Components
- Always set a CSS ClassName at the root DOM node that has the same name as the component but hyphenated.

