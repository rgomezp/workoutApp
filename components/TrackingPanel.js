import React, { Component } from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Panel from './Panel';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class TrackingPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      panelHeight : 0,
      hide:1
    }
  }

  showPanel = () => {
    let hide = !this.state.hide;

    if(this.state.panelHeight == 180){
      this.setState({panelHeight: 0, hide})
    }else{
      this.setState({panelHeight: 180, hide});
    }
  }

  render() {
    const data = {
      labels: [],
      datasets: [{
        data: [],
        strokeWidth: 2 // optional
      }]
    }

    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2 // optional, default 3
    }
    return (
      <View>
        <View>
          <Image
            style={{alignSelf: 'stretch', height: 180}}
            source={{uri:'https://cdn2.coachmag.co.uk/sites/coachmag/files/2017/05/bench-press_0.jpg'}}
            />
            <View style={[styles.overlay, {height: this.state.panelHeight},]}>
              <Panel hide={this.state.hide}/>
            </View>
        </View>
        <View>
          <TouchableOpacity style={styles.historyButton} onPress={this.showPanel}>
            <Text style={styles.textColor}>TRACKING</Text>
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
    color : '#ff7675',
    fontWeight: 'bold'
  }
});

export default TrackingPanel;