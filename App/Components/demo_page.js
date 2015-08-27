var React = require('react-native');

var Button = require('./button');
var _ = require('lodash');

const {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutAnimation,
} = React;

const SQUARE_DIMENSION = 100;
const SWIPE_THRESHOLD = 120;
const SQUARE_COLORS = ['blue', 'orange', 'red', 'purple'];

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
      scale: new Animated.Value(0.5),
    }

  }

  componentDidMount() {
    Animated.spring(
      this.state.scale,
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

          Animated.parallel([
            Animated.decay(this.state.pan.x, {
              velocity: vx,
              deceleration: 0.98,
            }),
            Animated.decay(this.state.pan.y, {
              velocity: vy,
              deceleration: 0.985,
            }),
            Animated.timing(this.state.scale, {
              toValue: 0,
            }),
          ]).start();

          this.props.onMovedAway(this.props.index);

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
            scale: this.state.scale
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
        <Text>INDEX {this.props.index}</Text>
      </Animated.View>
    );
  }
}


class Demo extends React.Component {

  constructor() {
    super();

    this.state = {
      squares: ['green'],
    };

  }

  componentWillMount() {
    // Animate creation
    LayoutAnimation.spring();
  }

  addSquare() {
    LayoutAnimation.spring();

    this.state.squares.push(_.sample(SQUARE_COLORS));
    this.setState({
      squares: this.state.squares,
    });

  }

  removeSqure(index) {
    LayoutAnimation.spring();

    this.state.squares.splice(index, 1);
    this.setState({
      squareCount: this.state.squares,
    });
  }

  render() {
    return(
      <View style={styles.container} >
        {_.map(this.state.squares, (color, key) => {
          return (
            <Square key={key} index={key} style={{backgroundColor: color}} onMovedAway={this.removeSqure.bind(this)}/>
          );
        })}
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
