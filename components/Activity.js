import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class Activity extends React.Component{
  constructor(props){
    super(props);
  }

  navigate(){
    this.props.navigation.navigate('Activity', {title: this.props.exercise.title});
  }

  render(){
    return(
      <View>
        <TouchableOpacity style={styles.activityContainer} onPress={this.navigate.bind(this)}>
          <View style={{flex:3}}>
            <Text style={{color:'#4841BB', fontWeight:'bold', fontSize:20}}>{this.props.exercise.title}</Text>
          </View>
          <View style={{flex:2}}></View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection:'row',
    backgroundColor: 'white',
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    padding:15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
    elevation: 2
  },
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Activity);
