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

  for(let i=0; i<14; i++){
    if (history[i] && history[i].date){
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
    }else{
      labels.push('-/-');
      weights.push(0);
    }
  }
  console.log(labels, weights);

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
      backgroundGradientFrom: '#4841BB',
      backgroundGradientTo: '#4841BB',
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