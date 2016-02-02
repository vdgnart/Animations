//add library
var React = require('react-native');
var Dimensions = require('Dimensions');
var {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
var Video = require('react-native-video');
var videoWidth = deviceWidth,
    videoHeight = Math.round((deviceWidth/16)*9);
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Animated, 
  PanResponder,
  ScrollView
} = React;
var AnimatedVideo = Animated.createAnimatedComponent(Video);
var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
//basic component
var YoutubeVideoSlide = React.createClass({
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
    //setup repansource
    //khởi tạo hàm xử lý khi chạm vào màn hình
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,  
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: function() {
        this.state.position.y.setOffset(this._y)  //setOffset trả về tọa độ bù đắp của các phần tử đầu tiên xuất hiện
      }.bind(this),              //bind là tạo ra 1 chức năng mới ,đối số đầu tiền của bind không thế bị ghi đè? 
      // khi pr di chuyển gán dy
      onPanResponderMove: Animated.event([
          null, 
          {
              dy: this.state.position.y
          }
      ]),
      //khi nhả pr
      onPanResponderRelease: (e, gestureState) => {
        this.state.position.flattenOffset();
        // nếu dy >=100 thì trong 0.2s đưa y về chiều cao ban đầu
        if (gestureState.dy >= 100) {
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: deviceHeight
          }).start();
        } else {
        // ngược lại đua dy về giá trị 0
          Animated.timing(this.state.position.y, {
            duration: 200,
            toValue: 0
          }).start();
        }
      }.bind(this)
    });
    //interpolete and animation
    //set thu nhỏ
    this._scale = this.state.position.y.interpolate({
      // kích cỡ với đầu vào 
      inputRange: [0, deviceHeight ],
      outputRange: [1, .71],
      extrapolate: 'clamp'
    });
    //set _translateY bien dịch y
    this._translateY = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight],
      outputRange: [0, deviceHeight],
      extrapolate: 'clamp'
    });
    // add  vị trí của y?
    this.state.position.y.addListener((value) => {
      this._y = value.value;
      var scaleValue = this._scale.__getAnimatedValue();
      var currentVideoWidth = scaleValue * videoWidth;
      var buffer = ((videoWidth - currentVideoWidth)/2);
      this.state.position.x.setValue(buffer);
    }.bind(this));
    // độ trong
    this._opacity = this.state.position.y.interpolate({
      inputRange: [0, deviceHeight ],
      outputRange: [1, .1]
    });
  },
  //set up styling
  // set vị trí thu với 
  getScalePosition: function() {
    return {
      transform: [
        {scale: this._scale},   //scale ở trên
        {translateX: this.state.position.x},  // vi tri x
        {translateY: this._translateY}   // vu tri y lấy ở trên
      ]
    }
  },
  // get scroll
  getScrollOffset: function() {
    return {
      transform: [
        {translateY: this._translateY}, // translateY đã cài đặt ở trên
      ],
      opacity: this._opacity   // độ trong ở trên
    }
  },
  //basic component
  render: function() {
    return (
      <View style={styles.container}>
      <View style={{width:200,height:200, backgroundColor:'red'}}>
      </View>
      <View style={{width:200,height:200,backgroundColor:'red'}}>
      </View>
              
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoSizing: {
    width: videoWidth,
    height: videoHeight
  },
  comment: {
    height: 100
  }
});
