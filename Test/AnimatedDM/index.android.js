/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Loading = require('./Loading');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var AnimatedDM = React.createClass({
  mixins: [Loading.Mixin],
  _clickHandler: function(){
    this.showLoad();
  },
  _clickDismiss: function(){
    this.dismissLoad();
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Loading
        </Text>
        <Loading 
        isVisible={this.state.is_load_visible}
        isDismissible={true}
        width={10} height={10} 
        time={300} backgroundColor={'#fff'}>
        </Loading>
        <TouchableOpacity onPress={this._clickHandler}> 
          <Text style={{width:50,height:20,marginLeft:10,backgroundColor:'red'}}>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._clickDismiss}> 
          <Text style={{width:50,height:20,marginLeft:10,backgroundColor:'red'}}>Dismiss</Text>
        </TouchableOpacity>
      
        
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginRight: 10,
    fontSize: 30,
    color: '#fff',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AnimatedDM', () => AnimatedDM);
