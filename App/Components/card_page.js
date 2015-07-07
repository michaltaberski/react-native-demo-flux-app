'use strict';

var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  AlertIOS,
} = React;

var Card = require('./card');
var Button = require('./button');
var SearchPage = require('./search_page');

var fixtures = require('../fixtures');

class CardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentCardId: 0};
  }

  onPressNo() {

  }

  onPressYes() {
    var newCardId = this.state.currentCardId + 1;
    if (fixtures.length > newCardId) this.setState({currentCardId: newCardId});
  }

  render() {
    var {question, answer} = fixtures[this.state.currentCardId];
    return (
      <View style={{flex: 1, backgroundColor: '#FFFCA7'}}>
        <Card {...{question, answer}} />
        <View style={{
          flexDirection:'row',
        }}>
          <Button label='No' style={{
              marginLeft: 30,
              marginRight: 30,
              backgroundColor: 'red',
            }}
            onPress={this.onPressNo.bind(this)}
          />
          <Button label='Yes' style={{
              marginRight: 30,
              backgroundColor: '#7ED321',
            }}
            onPress={this.onPressYes.bind(this)}
          />
        </View>
      </View>
    );
  }

}

module.exports = {
  component: CardPage,
  title: 'Fishka!',
};
