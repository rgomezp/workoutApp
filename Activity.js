import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import ActivityPage from './ActivityPage';

class Activity extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableOpacity style={styles.activityContainer} onPress={() => this.props.navigation.navigate('Activity', {
        title : this.props.exercise.title,
        sets  : this.props.exercise.sets,
        reps  : this.props.exercise.reps,
        weight: this.props.exercise.weight,
        notes : this.props.exercise.notes,
        userId: this.props.userId
      })}>
        <Text style={{color:'#ff7675', fontWeight:'bold'}}>{this.props.exercise.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    margin: 40
  },
});

export default Activity;
