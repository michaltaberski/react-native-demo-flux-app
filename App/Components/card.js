'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  card: {
    margin: 30,
    marginTop: 90,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 3,
    shadowColor: "#000000",
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    justifyContent: 'center',

  },
  keyword: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answer: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
  },
});

class Card extends React.Component {
  render() {
    return(
      <View style={styles.card}>
        <Text style={styles.keyword}>{this.props.question}</Text>
        <Text style={styles.answer}>{this.props.answer}</Text>
        <Text style={styles.answer}>{this.props.id}</Text>
      </View>
    )
  }
}

module.exports = Card;
