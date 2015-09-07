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
        <View style={{width: 180}}>
          <Text style={{color: '#fff'}}>Menu</Text>
        </View>
      </View>
    );
  }

};

var styles = StyleSheet.create({
  menu: {
    backgroundColor: '#343C4A',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // full height
  }
});

module.exports = Menu;
