var React = require('react-native');

const {
  View,
  Text,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  block: {
    width: 200,
    height: 200,
    backgroundColor: 'orange',
    top: 80,
    alignSelf: 'center',
  },

});

class Box {
  render() {
    return (
      <View style={styles.block}>
        <Text>This is just a block.</Text>
      </View>
    );
  }
}

class Demo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      transform: [],
    };
  }

  onPan({ absoluteChangeX, absoluteChangeY }) {
    this.setState({
      transform: [
        {translateX: absoluteChangeX},
        {translateY: absoluteChangeY}
      ]
    });
  }

  render() {
    return(
      <Box
        onPan={this.onPan.bind(this)}
      />
    );
  }

}

module.exports = {
  component: Demo,
  title: 'Demo page',
};
