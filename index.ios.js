'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var Application = require('./App/Components/application');
AppRegistry.registerComponent('fishka', () => Application);
