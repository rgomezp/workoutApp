import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import FilterButton from './FilterButton/FilterButton';

class FilterBar extends Component {
  render() {
    return (
      <View style={styles.bar}>
        <FilterButton text="Upper"/>
        <FilterButton text="Legs"/>
        <FilterButton text="Core"/>
        <FilterButton text="Cardio"/>
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

export default FilterBar;