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
      exercises:[],
      loggedIn: false,
      loginText: "",
      userId:""
    }
  }

  getExercises(){
    // get data and put it into the state
    fetch("http://localhost:3000/routine/5b6e31ee4bce69a75ba58565").then((response)=>{
      return response.json();
    }).then((json)=>{
      var exercises = [];
      json.forEach((exercise)=>{
        exercises.push(exercise)
      });
      this.setState({exercises:exercises});
    }).catch(err=>{console.error(err);})
  }

  login(){
    // pass credentials to server
    axios.post("http://localhost:3000/login/email", {
      data:this.state.loginText
    }).then(res=>{
      if(res.data.response){
        this.setState({loggedIn: true, userId:res.data._id});
      }
      this.getExercises();
    }).catch(function(err){
      console.log(err);
    })
  }

  render(){
    return(
      <View style={{marginBottom:100}}>
        <Text style={{marginBottom: 30, marginTop: 20, color: 'white', fontSize: 40, fontWeight: 'bold', alignSelf:'center'}}>Workout App</Text>

        {!this.state.loggedIn && <View style={styles.login}>
          <Text style={{color: 'white', fontSize: 20}}>Login</Text>
          <TextInput style={styles.loginInput}
          onChangeText={(text) => this.setState({loginText: text})}
          autoCapitalize="none"
          value={this.state.text}></TextInput>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={()=>this.login()}
            >
            <Text style={{color: '#ff7675', alignSelf: 'center'}}>Login</Text>
          </TouchableOpacity>
        </View>}

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
