'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;
var CardPage = require('./App/Components/card_page')

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

class FishkaNavigator extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={CardPage}
      />
    );
  }
};

AppRegistry.registerComponent('fishka', () => FishkaNavigator);
