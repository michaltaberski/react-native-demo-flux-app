'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var Application = require('./App/Components/Application');
AppRegistry.registerComponent('main', () => Application);
