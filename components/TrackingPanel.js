import React, { Component } from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class TrackingPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      panelHeight : 0,
    }
  }

  showPanel = () => {
    if(this.state.panelHeight == 180){
      this.setState({panelHeight: 0})
    }else{
      this.setState({panelHeight: 180});
    }
  }

  render() {
    return (
      <View>
        <View>
          <Image
            style={{alignSelf: 'stretch', height: 180}}
            />
            <View style={[styles.overlay, {height: this.state.panelHeight}]}>
              {/* TRACKING INFO WILL GO HERE */}
            </View>
        </View>
        <View>
          <TouchableOpacity style={styles.historyButton} onPress={this.showPanel}>
            <Text style={styles.textColor}>Tracking</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  historyButton:{
    backgroundColor: '#FFC4C4',
    alignItems: 'center',
    padding:3
  },
  overlay:{
    flex: 1,
    position: 'absolute',
    opacity: .95,
    backgroundColor: '#ff7675',
    width: width
  },
  textColor : {
    color : 'white'
  }
});

export default TrackingPanel;