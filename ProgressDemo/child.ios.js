'use strict';
 
var React = require('react-native');

 
var {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} = React;
  
var ChildNav = React.createClass({
render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
})
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1aaf2d',
    padding: 10
  },
  text: {
    flex: 2,
    fontSize: 18,
    color: '#fff',
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
 
module.exports = ChildNav;