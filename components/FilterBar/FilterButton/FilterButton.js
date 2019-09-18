
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

class FilterButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterOn: false
    }
  }

  buttonPressed(){
    this.setState({filterOn: !this.state.filterOn})
  }

  render() {
    if(this.state.filterOn){
      return (
        <TouchableOpacity style={styles.buttonOn} onPress={this.buttonPressed.bind(this)}>
          <Text style={{color: '#4841BB'}}>{this.props.text}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={this.buttonPressed.bind(this)}>
          <Text style={{color: 'white'}}>{this.props.text}</Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  button:{
    flex: 1,
    justifyContent:'center',
    height: 30,
    alignItems: 'center',
    backgroundColor: '#4841BB',
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 6
  },
  buttonOn:{
    flex: 1,
    justifyContent:'center',
    height: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    borderRadius: 6
  }
})

export default FilterButton;