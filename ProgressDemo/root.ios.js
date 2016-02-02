'use strict';
 
var React = require('react-native');
var Child = require('./child.ios');
var ProgressHUD = require('react-native-progress-hud');
var TimerMixin = require('react-timer-mixin');
 
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} = React;

var RootNav = React.createClass({
  mixins: [ProgressHUD.Mixin],
  goDerper: function() {
    this.props.navigator.push({
               title: 'The child title',
               component: Child,
               passProps: {myElement: 'this could be your value!'}
           });
  },
  clickHandler: function() {
    this.showProgressHUD();
  },

  render: function() {
    return (
      <View style={styles.container}>
         <TouchableHighlight
          style={styles.button}
          onPress={() => this.clickHandler()}
          underlayColor='red'>
          <Text style={styles.btnText}>Red</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => this.goDerper()}
          underlayColor='#bbbbbb'>
          <Text style={styles.btnText}>Green</Text>
        </TouchableHighlight>
        <ProgressHUD
          isVisible={this.state.is_hud_visible}
          isDismissible={true}
          overlayColor="rgba(0, 0, 0, 0.11)"
        />

      </View>
    );
  }
})
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5151f4',
    padding: 10
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#123456',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  }
});
 
module.exports = RootNav;