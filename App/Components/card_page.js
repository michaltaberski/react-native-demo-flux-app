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
var fixtures = require('../fixtures');

class CardPage extends React.Component {

  constructor(props) {
    super(props);

    // for now just static fixtures loading
    engine.loadData(fixtures);

    this.state = {
      card: engine.shuffleNextCard(),
      showResult: false,
    };
  }

  shuffleNextCard() {
    this.setState({
      card: engine.shuffleNextCard(),
      showResult: false,
    });
  }

  onPressShowResult() {
    this.state.showResult = true;
    this.setState(this.state);
  }

  onPressNo() {
    engine.regressCurrentCard();
    this.shuffleNextCard();
  }

  onPressYes() {
    engine.progressCurrentCard();
    this.shuffleNextCard();
  }

  getButtonsBar() {

    var barStyles = {
      flexDirection:'row',
      marginLeft: 30,
      marginRight: 30,
    };

    if (this.state.showResult) {
      return (
        <View style={barStyles}>
          <Button label='No' style={{
              marginRight: 30,
              backgroundColor: 'red',
            }}
            onPress={this.onPressNo.bind(this)}
          />
          <Button label='Yes' style={{
              backgroundColor: '#7ED321',
            }}
            onPress={this.onPressYes.bind(this)}
          />
        </View>
      );
    } else {
      return (
        <View style={barStyles}>
          <Button label='Show' style={{
              backgroundColor: '#282C34',
            }}
            onPress={this.onPressShowResult.bind(this)}
          />
        </View>
      );
    }
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#FFFCA7'}}>
        <Card {...this.state.card} showResult={this.state.showResult} />
        {this.getButtonsBar()}
      </View>
    );
  }

}

module.exports = {
  component: CardPage,
  title: 'Fishka!',
};
