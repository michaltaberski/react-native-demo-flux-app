'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
} = React;

var Card = require('./card');
var Button = require('./button');

var styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

class Main extends React.Component {

  render() {
    return (
      <View style={styles.main}>
        <Card/>
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
