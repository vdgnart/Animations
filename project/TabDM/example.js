/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const {
  Component,
  Dimensions,
  Text,
  View,
  StyleSheet,
} = React;

const window = Dimensions.get('window');

const Tabbar = require('react-native-tabbar');

const Example = React.createClass({
  getInitialState: function () {
    return {
      selected: 'Test 1'
    };
  },

  onTabItemPress: function (name) {
    console.log(`click on ${name} item`);
    this.setState({
      selected: name
    });
  },

  render: function() {
    const state = this.state;

    return (
       <View style={{backgroundColor:'#1556A5',height:60,justifyContent:'center',alignItems:'center'}}>
        <Tabbar selected={state.selected}
                onTabItemPress={this.onTabItemPress}
                style={{ width:260,height:30,alignItems:'center',borderRadius:20,justifyContent:'center',backgroundColor: '#7896EE' }}
                renderTabComponent={(name, isActive) => (
                  <View style={styles.smtab}>
                      <View
                          style={[
                            {  justifyContent: 'center', alignItems: 'center', width:129, height:29, borderRadius:20, borderColor:'#7896EE', borderWidth:1, },
                            isActive ? { borderColor: '#7896EE',backgroundColor:'blue'} : { borderColor: 'transparent' }
                          ]}>                    
                            <Text style={isActive ? { color: 'white' } : null}>{ name }</Text>
                       </View>     
                  </View>
                )}>
          <Tabbar.Item name="Test 1">
            <TestView color="red"/>
          </Tabbar.Item>
          <Tabbar.Item name="Test 2">
            <TestView color="blue"/>
          </Tabbar.Item>
        </Tabbar>
      </View>
    );
  }
});

var styles= StyleSheet.create({
    bigtab:{
    backgroundColor:'#7896EE', 
    height:50, 
    justifyContent: 'center', 
    alignItems:'center',
  },
  smtab:{
    borderRadius:15,
    backgroundColor:'#7896EE',
    alignItems:'center',
    marginTop:7, 
    marginBottom:7, 
    marginLeft:60, 
    marginRight:60, 
    width:260, 
    height:30, 
    borderColor:'#7896EE'
  },
  sstab:{
    backgroundColor:'blue', width:129, height:29, borderRadius:50, borderColor:'#7896EE', borderWidth:1,

  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 30,
    flexDirection: 'row',

  },
});
class TestView extends Component {
  render() {
    return (
      <View style={{ position: 'absolute', width: window.width,marginTop:60, height: window.height, backgroundColor: this.props.color }}>
      </View>);
  }
}

module.exports = Example;