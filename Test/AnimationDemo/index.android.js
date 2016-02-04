  /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Animated,
  Text,
  View
} from 'react-native';
var {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
var videoWidth = deviceWidth,
    videoHeight = Math.round((deviceWidth/16)*9);

var AnimatedVideo = Animated.createAnimatedComponent(View);

class AnimationDemo extends Component {
  getInitialState: function() {
    return {
      rate: 1,
      volume: 1,
      muted: true,
      resizeMode: 'stretch',
      duration: 0.0,
      currentTime: 0.0,
      scale: new Animated.Value(1),
      position: new Animated.ValueXY(),
    };
  },
  _y: 0,
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: function() {
        this.state.position.y.setOffset(this._y)
      }.bind(this),
      onPanResponderMove: Animated.event([
          null, 
          {
              dy: this.state.position.y
          }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.state.position.flattenOffset();
        if (gestureState.dy >= 100) {
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: deviceHeight
          }).start();
        } else {
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: 0
          }).start();
        }
      }.bind(this)
    });
    this._scale = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight ],
      outputRange: [1, .71],
      extrapolate: 'clamp'
    });
    this._translateY = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, deviceHeight],
      extrapolate: 'clamp'
    });
    this.state.position.y.addListener((value) => {
      this._y = value.value;
      var scaleValue = this._scale.__getAnimatedValue();
      var currentVideoWidth = scaleValue * videoWidth;
      var buffer = ((videoWidth - currentVideoWidth)/2);
      this.state.position.x.setValue(buffer);
    }.bind(this));
    this._opacity = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight ],
      outputRange: [1, .1]
    });
  },
  getScalePosition: function() {
    return {
      transform: [
        {scale: this._scale},
        {translateX: this.state.position.x},
        {translateY: this._translateY}
      ]
    }
  },
  getScrollOffset: function() {
    return {
      transform: [
        {translateY: this._translateY},
      ],
      opacity: this._opacity
    }
  },
  render:function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          WAY OF THE LIFE
        </Text>
        <Text style={styles.instructions}>
          clclclclclcl
        </Text>
        <Text style={styles.instructions}>
          Du ngay mai co doi lan cach xa
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('AnimationDemo', () => AnimationDemo);
