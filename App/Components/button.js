'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
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
      <TouchableHighlight style={[styles.button, this.props.style]} onPress={this.props.onPress} >
        <Text style={styles.label}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }

}

module.exports = Button;
