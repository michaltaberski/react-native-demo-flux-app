var React = require('react-native');

const {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} = React;

const SQUARE_DIMENSIONS = 200;


var styles = StyleSheet.create({
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

let AnimatedView = Animated.View;

class Square {

  constructor() {

    this.state = {}
    this.state.pan = new Animated.ValueXY();

  }

  componentWillMount() {
    // http://browniefed.com/blog/2015/08/15/react-native-animated-api-with-panresponder/

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x.getAnimatedValue(), y: this.state.pan.y.getAnimatedValue()});
        this.state.pan.setValue({x: 0, y: 0}); //Initial value
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        }
      ]),
      onPanResponderRelease: () => {
        // this.state.pan.flattenOffset();
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start();
      }
    });

    console.log('pan handlers', this._panResponder.panHandlers);

  }

  getStyle() {
    return [
      styles.square,
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            translateY: this.state.pan.y
          },
          {
            rotate: this.state.pan.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: ['-30deg', '0deg', '30deg'],
            })
          },
        ],
      },
      {
        opacity: this.state.pan.x.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: [0.3, 1, 0.3],
        }),
      }
    ];
  }
  render() {
    return (
      <AnimatedView
        style={[this.getStyle(), this.props.style]}
        {...this._panResponder.panHandlers}
      >
        <Text>This is just a block.</Text>
      </AnimatedView>
    );
  }
}


class Demo extends React.Component {
  render() {
    return(
      <View style={styles.container} >
        <Square />
        <Square style={{backgroundColor: 'blue'}}/>
      </View>
    );
  }
}

module.exports = {
  component: Demo,
  title: 'Demo page',
};
