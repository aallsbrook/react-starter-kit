import 'babel-core/polyfill';

let context = require.context('.', true, /-test\.jsx?$/);
context.keys().forEach(context);

// POC for running specific unit test - need to talk through this with Tom
//require('./components/Header/__tests__/Header-test');
