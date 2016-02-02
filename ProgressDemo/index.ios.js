'use strict';
 
var React = require('react-native');
var RootNav = require('./root.ios');
 
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;
 
var ProgressDemo = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
                 style={styles.container}
                 initialRoute={{
             title: 'My Root',
             component: RootNav
         }}/>
    );
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
 


AppRegistry.registerComponent('ProgressDemo', () => ProgressDemo);
