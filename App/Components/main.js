'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
} = React;

var _ = require('lodash');
var Card = require('./card');
var Button = require('./button');

var fixtures = require('../fixtures');

var styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

class Main extends React.Component {

  render() {
    console.log(fixtures);
    var cards = _.map(fixtures, (cardData) => <Card {...cardData} />);

    return (
      <View style={styles.main}>
        {cards}
        <View style={{
          flexDirection:'row',
        }}>
          <Button label='No' style={{
            marginLeft: 30,
            backgroundColor: 'red',
          }}
          />
          <Button label='Yes' style={{
            marginRight: 30,
            backgroundColor: '#7ED321',
          }}/>
        </View>
      </View>
    );
  }

}

module.exports = Main;
