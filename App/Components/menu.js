'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
} = React;

class Menu extends React.Component {

  render() {
    return (
      <View style={styles.menu}>
        <Text>Menu</Text>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  menu: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    flex: 1, // full height
  }
});

module.exports = Menu;
