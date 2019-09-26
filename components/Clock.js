import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time:"00:00",
      interval:undefined,
      status:"WORK!",
      completedSets: 0
    }
  }

  componentDidMount(){
    this.startInterval();
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  startInterval(){
    let initialTime = Math.floor(Date.now()); // milliseconds
    let interval = setInterval(()=>{
      let currentTime = Math.floor(Date.now());
      let seconds = Math.floor((currentTime - initialTime)/1000);

      let mins = Math.floor(seconds/60);
      let secs = seconds % 60;
      let leadingMinuteZero = mins < 10 ? "0" : "";
      let leadingSecondZero = secs < 10 ? "0" : "";
      let time = leadingMinuteZero+mins+":"+leadingSecondZero+secs;
      this.setState({time});
    },1000)

    this.setState({interval});
  }

  restart(){
    const newStatus = this.state.status === "WORK!" ? "REST" : "WORK!";
    const completedSets = newStatus === "REST" ? this.state.completedSets+1 : this.state.completedSets;
    this.setState({time:"00:00", status: newStatus, completedSets});
    clearInterval(this.state.interval);
    this.startInterval();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.restart.bind(this)}>
        <View style={styles.clockContainer}>
          <View style={styles.leftBox}><Text style={{color: '#4841BB'}}>{this.state.status}</Text></View>
          <View style={styles.clock}><Text style={styles.clockText}>{this.state.time}</Text></View>
          <View style={styles.rightBox}>
            <Text style={{color: '#4841BB'}}>DONE</Text>
            <Text style={{color: '#4841BB'}}>{this.state.completedSets}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  clockContainer: {
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    backgroundColor: 'white',
    height: 70,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#4841BB',
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 20
  },
  clock:{
    justifyContent:'center',
    marginLeft: 25,
    marginRight: 25,
    padding: 5
  },
  clockText:{
    fontSize:35,
    color:'#4841BB',
  },
  leftBox:{
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
  },
  rightBox:{
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
  }
});

export default Clock;