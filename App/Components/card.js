'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} = React;

class Card extends React.Component {

  constructor() {
    super()
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x.getAnimatedValue(),
          y: this.state.pan.y.getAnimatedValue()
        });
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

          var cb = () => {
            if (xMovedVal > 120) {
              this.props.onMovedRight()
            } else if (xMovedVal < -120) {
              this.props.onMovedLeft()
            }
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
          ]).start(() => {

            cb();

            Animated.spring(this.state.pan, {
              toValue: 0,
              friction: 4,
            }).start();
          });

        } else {
          Animated.spring(this.state.pan, {
            toValue: 0,
            friction: 4,
          }).start();
        }

      },
    });
  }

  render() {
    var panStyles = {
      transform: [
        {
          translateX: this.state.pan.x,
        },
        {
          translateY: this.state.pan.y,
        },
        {
          rotate: this.state.pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-30deg', '0deg', '30deg'],
          })

        },
      ],
    };

    var answerPlaceholder;
    if (this.props.showResult) {
      answerPlaceholder = <Text style={styles.answer}>{this.props.answer}</Text>
    } else {
      answerPlaceholder = <Text style={[styles.answer, {
          color: '#ccc',
          fontSize: 15,
        }]}>Tap to see answer</Text>
    }

    return (
      <Animated.View {...this._panResponder.panHandlers} style={panStyles} >
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.card} >
            <Text style={styles.keyword}>{this.props.question}</Text>
            {answerPlaceholder}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  card: {
    margin: 30,
    marginTop: 20,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 3,
    shadowColor: "#000",
    backgroundColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    justifyContent: 'center',

  },
  keyword: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answer: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    paddingTop: 20,
  },
});

module.exports = Card;
