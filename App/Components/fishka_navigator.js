var React = require('react-native');

const {
  View,
  Text,
  Navigator,
  PixelRatio,
  StyleSheet,
  TouchableHighlight,
} = React;

var CardPage = require('./card_page');
var DemoPage = require('./demo_page');
var ConfApp = require('./ReactConfDemo/ConfApp');

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class HomeScene extends React.Component {

  render() {
    return (
      <View style={{
        padding: 10,
      }}>
        <NavButton
          onPress={() => {
            this.props.navigator.push({id: 'demo'});
          }}
          text="Demo Squares"
        />

        <NavButton
          onPress={() => {
            this.props.navigator.push({id: 'fishka'});
          }}
          text="Fishka Game"
        />

        <NavButton
          onPress={() => {
            this.props.navigator.push({id: 'conf_app'});
          }}
          text="ConfApp"
        />

      </View>
    );
  }

}

class FishkaNavigator extends React.Component {

  renderScene(route = {}, nav) {
    switch (route.id) {
      case 'demo':
        return <DemoPage.Component navigator={nav} />
      case 'fishka':
        return <CardPage.Component navigator={nav} />
      case 'conf_app':
        return <ConfApp navigator={nav} />
      default:
        return <HomeScene navigator={nav} />
    };

  }

  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
      />
    );
  }

};

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  }
});

module.exports = FishkaNavigator;
