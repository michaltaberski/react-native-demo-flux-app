'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Animated,
  TouchableHighlight,
} = React;

var Card = require('./Card');
var Button = require('./Button');
var engine = require('../Lib/Engine');
var fixtures = require('../fixtures');

var CardActions = require('../Actions/CardActions');
var CardStore = require('../Stores/CardStore');

class CardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = CardStore.getState();
  }

  componentDidMount(cardState) {
    CardStore.listen(this.cardChange.bind(this));
  }

  componentWillUnmount() {
    CardStore.unlisten(this.cardChange.bind(this));
  }

  showResult() {
    CardActions.showCurrentCardResult();
  }

  cardChange(cardStoreState) {
    this.setState(cardStoreState);
  }

  onPressNo() {
    CardActions.regressCurrentCard();
    CardActions.shuffleNextCard();
  }

  onPressYes() {
    CardActions.progressCurrentCard();
    CardActions.shuffleNextCard();
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
              backgroundColor: '#4CD764',
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
            onPress={this.showResult.bind(this)}
          />
        </View>
      );
    }
  }

  getStatisticsBlock(show = true) {
    if (show) {
      return (
        <View style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}>
          {this.state.cards.map((card) => {
            return (
              <View key={card.id} style={{flexDirection: 'row', margin: 1}}>
                <Text style={{color: '#666', flex: 1}}>Q: {card.question} </Text>
                <Text style={{color: '#999', flex: 1}}>Score: {card.score}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{
          flex: 1,
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: {
            height: 10,
            width: 0
          },
        }}>
        <Card
          {...this.state.currentCard}
          showResult={this.state.showResult}
          onPress={this.showResult.bind(this)}
          onMovedRight={this.onPressYes.bind(this)}
          onMovedLeft={this.onPressNo.bind(this)}
          ref='currentCard'
        />
        {this.getButtonsBar()}

        {this.getStatisticsBlock(false)}

      </View>
    );
  }

}

module.exports.Component = CardPage;
module.exports.title = 'Fishka';
