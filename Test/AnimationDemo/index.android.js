/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated, 
  PanResponder,
  ScrollView
} = React;
var rebound = require('rebound');

var AnimationDemo = React.createClass({
  // First we initialize the spring and add a listener, which calls
  // setState whenever it updates
  componentWillMount() {
    // Initialize the spring that will drive animations
    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = 230;
    springConfig.friction = 10;

    this._scrollSpring.addListener({
      onSpringUpdate: () => {
        this.setState({scale: this._scrollSpring.getCurrentValue()});
      },
    });

    // Initialize the spring value at 1
    this._scrollSpring.setCurrentValue(1);
  },

  _onPressIn() {
    this._scrollSpring.setEndValue(0.5);
  },

  _onPressOut() {
    this._scrollSpring.setEndValue(1);
  },

  render: function() {
    var imageStyle = {
      width: 250,
      height: 200,
      transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}],
    };

    var imageUri = "https://facebook.github.io/react-native/img/ReboundExample.png";

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPressIn={this._onPressIn}
                                  onPressOut={this._onPressOut}>
          <Image source={{uri: imageUri}} style={imageStyle} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
});
var styles=StyleSheet.create({
  container:{
    flex:1
  }
})

AppRegistry.registerComponent('AnimationDemo', () => AnimationDemo);
