import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import TypeButton from './TypeButton/TypeButton';

class TypePicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      active : "",
      unsubListener : this.props.screenProps.store.subscribe(this.reduxListener)
    }
  }

  reduxListener = () => {
    // Redux listener used to detect whether submission is valid
    function select(state, prop){
      return state.addWorkoutTypePicker[prop];
    }
    
    const {store} = this.props.screenProps;
    let type = select(store.getState(), 'workoutType');
    this.setState({active : type});
  }

  render() {
    return (
      <View style={styles.bar}>
        <TypeButton text="Upper" active={this.state.active}/>
        <TypeButton text="Legs" active={this.state.active}/>
        <TypeButton text="Core" active={this.state.active}/>
        <TypeButton text="Cardio" active={this.state.active}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar:{
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: "#4841BB",
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
    elevation: 3
  }
})

export default TypePicker;