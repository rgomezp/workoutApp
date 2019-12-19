import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {typeButtonPressed} from './actions';

class TypeButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.text //e.g: "Cardio"
    }
  }

  buttonPressed = () => {
    this.props.typeButtonPressed({type: this.props.text});
  }

  render() {
    if(this.state.type === this.props.active){
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
  typeButtonPressed
}, dispatch);

export default connect(null, mapDispatchToProps)(TypeButton);