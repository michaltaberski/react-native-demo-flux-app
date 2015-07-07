'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;
var Main = require('./App/Components/main')

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
        initialRoute={{
          component: Main,
          title: "Fishka",
        }}
      />
    );
  }
};

AppRegistry.registerComponent('fishka', () => FishkaNavigator);
