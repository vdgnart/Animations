/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
var videoWidth = deviceWidth,
    videoHeight = Math.round((deviceWidth/16)*9);
var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Animated, 
  PanResponder,
  ScrollView
} = React;
var AnimatedImage = Animated.createAnimatedComponent(Image);
var AnimatedView = Animated.createAnimatedComponent(View);
var AnimatedTexr = Animated.createAnimatedComponent(Text);
var AnimationDemo = React.createClass({
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
      }
    });
    this._scale = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],  //kieu kieu phong to thu nho
      outputRange: [1, 0.6],  //ty le vao ra
      extrapolate: 'clamp'
    });
    this._translateY = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, -(deviceHeight*2/5)], //vi tri luc vao, luc ra
      extrapolate: 'clamp'
    });
    this._translateX = this.state.position.x.interpolate({
      inputRange:[0, deviceWidth],
      outputRange:[0, 0],
      extrapolate:'clamp'
    });
    this.state.position.y.addListener((value) => {
      this._y = value.value;
      var scaleValue = this._scale.__getAnimatedValue();
      var currentVideoWidth = scaleValue * videoWidth;
      var buffer = ((videoWidth - currentVideoWidth)/2);
      this.state.position.x.setValue(buffer);
    });
    this._opacity = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight ],
      outputRange: [1, .1]
    });
  },
  getScalePosition: function() {
    return {
      transform: [
        {scale: this._scale},
        {translateX: this._translateX},
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
  render: function() {
    return (
      <View style={styles.container}>
           <AnimatedImage 
                  {...this._panResponder.panHandlers}
                  resizeMode={this.state.resizeMode}
                  source={{uri: 'http://i0.wp.com/thegioigame.vn/wp-content/uploads/2014/11/nhung-nu-game-thu-xinh-nhu-hot-girl-cua-lang-game-viet-28p229-2848-5-avatar.jpg?resize=350%2C200'}}
                  style={[styles.imageSize,this.getScalePosition()]} />  
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    backgroundColor:'blue',
    flex: 1
  },
  infoEmployer: {
  flex: 1,
  backgroundColor:'green',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
 },
 avatar: {
  width: 100,
  height: 100,
  marginBottom: 20,
  padding: 5, 
  borderRadius: 50,
  borderWidth: 2,
  borderColor: '#fff',
 },
 userName: {
  fontSize: 15, 
  color: '#fff',
  marginBottom: 10,
 },
 employEmail: {
  fontSize: 13, 
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 60,
 },
 employTeam: {
  fontSize: 13, 
  color: '#fff',
  marginBottom: 20,
 },
  imageSize: {
    width: videoWidth,
    height:150
  },
  videoSizing: {
    width: videoWidth,
    height: videoHeight
  },
  comment: {
    height: 100
  }
});

AppRegistry.registerComponent('AnimationDemo', () => AnimationDemo);
