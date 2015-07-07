'use strict';

var React = require('react-native');
var _ = require('lodash');

var {
  View,
  Text,
  StyleSheet,
} = React;

var styles = {
  button: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
    flex: 1,
  },
  label: {
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: 'bold',
    fontSize: 20,
  }
};

class Button extends React.Component {

  render() {
    return(
      <View style={_.extend(styles.button, this.props.style)}>
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }

}

module.exports = Button;
