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
var AnimatedText = Animated.createAnimatedComponent(Text);
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
        if (gestureState.dy >= 0) {
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
  clickImage: function(){
    _panResponder.panHandlers;
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
  getScalePositionImage: function(){
    var scaleimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],  
      outputRange: [1, 0.6],  
      extrapolate: 'clamp'
    });

    var yimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, -(deviceHeight*2/8)], 
      extrapolate: 'clamp'
    });
    var ximage = this.state.position.x.interpolate({
      inputRange:[0, deviceWidth],
      outputRange:[0, 0],
      extrapolate:'clamp'    });
    return{
      transform: [
        {scale: scaleimage},
        {translateX: ximage},
        {translateY: yimage}
      ]
    }
  },
  getScalePositionUsername: function(){
    var scaleimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],  
      outputRange: [1, 1],  
      extrapolate: 'clamp'
    });

    var yimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, -(deviceHeight*2/9)], 
      extrapolate: 'clamp'
    });
    var ximage = this.state.position.x.interpolate({
      inputRange:[0, deviceWidth],
      outputRange:[0, 0],
      extrapolate:'clamp'    });
    return{
      transform: [
        {scale: scaleimage},
        {translateX: ximage},
        {translateY: yimage}
      ]
    }
  },
   getScalePositionEmail: function(){
    var scaleimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],  
      outputRange: [1, 1],  
      extrapolate: 'clamp'
    });

    var yimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, -(deviceHeight*2/9)], 
      extrapolate: 'clamp'
    });
    var ximage = this.state.position.x.interpolate({
      inputRange:[0, deviceWidth],
      outputRange:[0, 0],
      extrapolate:'clamp'    });
    return{
      transform: [
        {scale: scaleimage},
        {translateX: ximage},
        {translateY: yimage}
      ]
    }
  },
  getScalePositionTeam: function(){
    var scaleimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],  
      outputRange: [1, 1],  
      extrapolate: 'clamp'
    });

    var yimage = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, -(deviceHeight*2/7)], 
      extrapolate: 'clamp'
    });
    var ximage = this.state.position.x.interpolate({
      inputRange:[0, deviceWidth],
      outputRange:[0, 0],
      extrapolate:'clamp'    });
    return{
      transform: [
        {scale: scaleimage},
        {translateX: ximage},
        {translateY: yimage}
      ]
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
      <View style={{flex:0.15,backgroundColor:'blue'}}></View>
      <View style={styles.infoEmployer}>
          <AnimatedImage
     
              {...this._panResponder.panHandlers}
              source={{uri:'http://i.9mobi.vn/cf/images/2015/03/nkk/anh-avatar-dep-16.jpg'}} 
              style={[styles.avatar,this.getScalePositionImage()]}/>
          <AnimatedText style={[styles.userName,this.getScalePositionUsername()]}>
              Haophungds
          </AnimatedText>
          <AnimatedText style={[styles.employEmail,this.getScalePositionEmail()]}>
              Haophungds@appota.com
          </AnimatedText>
          <AnimatedText style={[styles.employTeam,this.getScalePositionTeam()]}>
              Design Team
          </AnimatedText>
      </View>
      <View style={{flex:0.2,backgroundColor:'blue'}}></View>
           
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
  flex: 0.65,
  backgroundColor:'blue',
  alignItems:'center',
  flexDirection: 'column',
 },
 avatar: {
  width: deviceWidth/2,
  height: deviceWidth/2,
  marginBottom: 20,
  padding: 5, 
  borderRadius: deviceWidth/4,
  borderWidth: 2,
  borderColor: '#fff',
 },
 userName: {
  fontSize: 15, 
  color: '#fff',
  marginBottom: 5,
 },
 employEmail: {
  fontSize: 10, 
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 50,
 },
 employTeam: {
  fontSize: 13, 
  color: '#fff',
 
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
