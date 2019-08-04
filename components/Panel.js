import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

const Panel = (props) => {
  const {hide} = props;
  if(hide) {
    return null;
  }
  return (<View>
    <Text>Hello</Text>
  </View>)
}

export default Panel;