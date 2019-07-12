import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Activity extends React.Component{
  constructor(props){
    super(props);
  }

  navigate(){
    this.props.navigation.navigate('Activity');
  }

  render(){
    return(
      <TouchableOpacity style={styles.activityContainer} onPress={this.navigate}>
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

const mapStateToProps = (state) => ({
  navigation: state.navigation.navigation
});

export default connect(mapStateToProps)(Activity);
