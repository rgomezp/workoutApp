import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Panel = (props) => {
  const {hide, history} = props;
  if(hide) {
    return null;
  }

  let labels = [];
  let weights = [];
  let isEven = 0;

  for(let i=0; i<history.length; i++){
    let {date, weight} = history[i];
    date = date.substr(1, date.length-1);
    if(isEven){
      date = date.substr(5,5).split("-").join("/");
      
      if(date[0]=="0"){
        date = date.substr(1,4);
      }
      
      labels.push(date);
    }else{
      labels.push("");
    }
    isEven = !isEven;
    weights.push(weight);
  }

  return (<View>
    <LineChart
    data={{
      labels,
      datasets: [{
        data: weights
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={170}
    yAxisLabel={'lbs '}
    chartConfig={{
      backgroundColor: 'white',
      backgroundGradientFrom: '#ff7675',
      backgroundGradientTo: '#ff7675',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }}
    style={{
    }}
    bezier
  />
  </View>)
}

export default Panel;