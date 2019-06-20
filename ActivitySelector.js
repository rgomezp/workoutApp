import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import Activity from './Activity';
import axios from 'axios';

/*
 * ACTIVITY SELECTOR (HOME PAGE)
 * includes login page
 * handles axios fetch of exercises
 * displays exercises
 * passes state into the Activity component found on Activity.js (including userId)
*/

class ActivitySelector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      exercises:[
        {
          title:"Benchpress",
        },
        {
          title:"Benchpress"
        },
        {
          title:"Benchpress"
        },
      ],
    }
  }

  render(){
    return(
      <View style={{marginBottom:100}}>
        <FlatList data={this.state.exercises}
          renderItem={({item})=><Activity navigation={this.props.navigation} userId={this.state.userId} exercise={item}
        />}
        keyExtractor={(item, index)=>index.toString()}
        ></FlatList>
      </View>
    )
  }
}

styles = {
  login:{
    alignItems: 'center'
  },
  loginInput: {height: 40, borderColor: 'white', borderWidth: 2, alignSelf: 'stretch', color: 'white', borderRadius: 50, marginTop: 10, padding: 10, marginLeft: 50, marginRight: 50},
  loginButton:{
    height: 40, backgroundColor: 'white', alignSelf: 'stretch', borderRadius: 50, marginTop: 10, padding: 10, marginLeft: 80, marginRight: 80
  }
}

export default ActivitySelector;
