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
var engine = require('../Lib/engine');

class CardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      card: engine.getNextCard()
    };
  }

  getNextCard() {
    this.setState({
      card: engine.getNextCard()
    });
  }

  onPressNo() {
    engine.regressCurrentCard();
    this.getNextCard();
  }

  onPressYes() {
    engine.progressCurrentCard();
    this.getNextCard();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFCA7'}}>
        <Card {...this.state.card} />
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
