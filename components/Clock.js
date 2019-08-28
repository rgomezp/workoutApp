import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time:"00:00",
      interval:undefined
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
    this.setState({time:"00:00"});
    clearInterval(this.state.interval);
    this.startInterval();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.restart.bind(this)}>
        <View style={styles.clockContainer}>
          <Text style={styles.clock}>{this.state.time}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  clockContainer: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'white',
    height: 70,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#4841BB',
    padding:15,
    margin: 5,
  },
  clock:{
    fontSize:35,
    color:'#4841BB'
  }
});

export default Clock;