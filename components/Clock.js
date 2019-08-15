import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time:"00:00",
      seconds:0,
      interval:undefined
    }
  }

  componentDidMount(){
    let interval = setInterval(()=>{
      let {seconds} = this.state;
      seconds+=1;
      let mins = Math.floor(seconds/60);
      let secs = seconds % 60;
      let leadingMinuteZero = mins < 10 ? "0" : "";
      let leadingSecondZero = secs < 10 ? "0" : "";
      let time = leadingMinuteZero+mins+":"+leadingSecondZero+secs;
      this.setState({time, seconds});
    },1000)

    this.setState({interval});
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <View style={styles.clockContainer}>
        <Text style={styles.clock}>{this.state.time}</Text>
      </View>
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