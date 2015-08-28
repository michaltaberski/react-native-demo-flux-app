'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Animated,
} = React;

var Card = require('./card');
var Button = require('./button');
var DemoPage = require('./demo_page');
var engine = require('../Lib/engine');
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
            onPress={this.showResult.bind(this)}
          />
        </View>
      );
    }
  }

  getAnimatedStyles() {
    if (this.refs.currentCard) {
      return {
        transform: [
          {
            rotate: this.refs.currentCard.state.pan.x.interpolate({
             inputRange: [-200, 0, 200],
             outputRange: ['90deg', '0deg', '-30deg'],
           })
          },
          {
            scale: this.refs.currentCard.state.pan.y.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: [2, 1, 2],              
            }),
          }
        ],
      }
    } else {
      return {}
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFCA7'}}>
        <Card
          {...this.state.currentCard}
          showResult={this.state.showResult}
          onPress={this.showResult.bind(this)}
          onMovedRight={this.onPressYes.bind(this)}
          onMovedLeft={this.onPressNo.bind(this)}
          ref='currentCard'
        />
        {this.getButtonsBar()}
        <View style={{
          flexDirection:'row',
          marginLeft: 30,
          marginRight: 30,
        }}>

        <Animated.View style={[{
            backgroundColor: '#ff0',
            padding: 10,
          }, this.getAnimatedStyles()]}>
          <Text>Test</Text>
        </Animated.View>

        </View>

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
      </View>
    );
  }

}

module.exports.Component = CardPage;
module.exports.title = 'Fishka';
