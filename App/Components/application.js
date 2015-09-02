'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');

var {
  View,
  Text,
} = React;

var CardPage = require('./card_page');
var Menu = require('./menu');

class Application extends React.Component {

  render() {
    return (
      <SideMenu menu={
        <Menu/>
      } >
        <CardPage.Component />
      </SideMenu>
    );
  }

};

module.exports = Application;
