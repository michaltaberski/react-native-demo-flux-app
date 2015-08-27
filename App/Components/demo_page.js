var React = require('react-native');

var Button = require('./button');
var _ = require('lodash');

const {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} = React;

const SQUARE_DIMENSION = 100;
const SWIPE_THRESHOLD = 120;

var styles = StyleSheet.create({
  square: {
    width: SQUARE_DIMENSION,
    height: SQUARE_DIMENSION,
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class Square extends React.Component {

  constructor() {
    super();
    // SIMPLE BLOG POST
    // http://browniefed.com/blog/2015/08/15/react-native-animated-api-with-panresponder/
    // A BIT MORE ADVANCED CODE REPO
    // https://github.com/brentvatne/react-native-animated-demo-tinder
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
    }

  }

  componentDidMount() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 4 }
    ).start();
  }

  componentWillMount() {
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
      onPanResponderRelease: (e, {vx, vy}) => {
        // it prevents problem if you swiple twice while
        // it still has a friction effect
        this.state.pan.flattenOffset();

        var xMovedVal = this.state.pan.x._value;
        if (Math.abs(xMovedVal) > 120) {

          if (xMovedVal > 120) {
            console.log('moved to the right');
          } else if (xMovedVal < -120) {
            console.log('moved to the left');
          }

          Animated.decay(this.state.pan.x, {
            velocity: vx,
            deceleration: 0.98,
          }).start()

          Animated.decay(this.state.pan.y, {
            velocity: vy,
            deceleration: 0.985,
          }).start()

        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
            friction: 4,
          }).start();
        }

      }
    });

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
            scale: this.state.enter
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
      <Animated.View
        style={[this.getStyle(), this.props.style]}
        {...this._panResponder.panHandlers}
      >
        <Text>Test</Text>
      </Animated.View>
    );
  }
}


class Demo extends React.Component {

  constructor() {
    super();

    this.state = {
      squareCount: 1
    };

  }

  addSquare() {
    this.setState({
      squareCount: this.state.squareCount + 1,
    });
  }

  render() {
    return(
      <View style={styles.container} >
        {
          _.times(this.state.squareCount, () => {
            return (
              <Square style={{backgroundColor: 'blue'}}/>
            );
          })
        }
        <View>
          <Button onPress={this.addSquare.bind(this)} label='Add Square' style={{backgroundColor: 'red'}}/>
        </View>
      </View>
    );
  }

}

module.exports = {
  component: Demo,
  title: 'Demo page',
};
