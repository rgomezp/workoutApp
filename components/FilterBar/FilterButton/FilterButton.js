import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {filterButtonPressed} from './actions';

class FilterButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterOn: false
    }
  }

  buttonPressed = () => {
    const nextState = !this.state.filterOn;
    this.setState({filterOn: nextState})
    this.props.filterButtonPressed({[this.props.text] : nextState});
  }

  render() {
    if(this.state.filterOn){
      return (
        <TouchableOpacity style={styles.buttonOn} onPress={this.buttonPressed}>
          <Text style={{color: '#4841BB'}}>{this.props.text}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={this.buttonPressed}>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  filterButtonPressed
}, dispatch);

export default connect(null, mapDispatchToProps)(FilterButton);