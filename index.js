'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var FishkaNavigator = require('./App/Components/fishka_navigator');
AppRegistry.registerComponent('main', () => FishkaNavigator);
