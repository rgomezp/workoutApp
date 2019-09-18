import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import Activity from '../Activity';
import {AsyncStorage} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadDataIntoRedux, loadHistoryIntoRedux} from './actions';
import FilterBar from '../FilterBar/FilterBar';

/*
 * ACTIVITY SELECTOR (HOME PAGE)
 * includes login page
 * handles axios fetch of exercises
 * displays exercises
 * passes state into the Activity component found on Activity.js (including userId)
*/

class WorkoutSelector extends React.Component{
  static navigationOptions = (props) => ({
    title: "Gym Buddy"
  });
  
  constructor(props){
    super(props);
    this.state = {
      exercises:{
        "Benchpress":{
          title:"Benchpress",
        },
        "9,8 Curls":{
          title:"9,8 Curls",
        },
        "Barbell Curls":{
          title:"Barbell Curls",
        },
        "Seated Shoulder Press":{
          title:"Seated Shoulder Press"
        },
        "Hardgainer Shoulder":{
          title:"Hardgainer Shoulder"
        },
        "Calve Press":{
          title: "Calve Press"
        },
        "Dumbell Bench Press":{
          title:"Dumbell Bench Press"
        },
        "Back Squats":{
        title:"Back Squats"
        },
        "Front Squats":{
          title:"Front Squats"
        },
        "Standing Squat Machine":{
          title:"Standing Squat Machine"
        },
        "Sumo Dead Lifts":{
          title:"Sumo Dead Lifts"
        },
        "Tricep Pulldowns":{
          title:"Tricep Pulldowns"
        },
        "Overhead Tricep Extensions":{
          title:"Overhead Tricep Extensions"
        },
        "Chest Flys":{
          title:"Chest Flys"
        },
        "Incline Bench Press":{
          title:"Incline Bench Press"
        },
        "Drag Curls":{
          title:"Drag Curls"
        },
        "Cable Ab Pulldowns":{
          title:"Cable Ab Pulldowns"
        },
        "Test":{
          title:"Test"
        },
        "Test 2":{
          title:"Test 2"
        },
        "Overhead Lat Pulldown":{
          title:"Overhead Lat Pulldown"
        },
        "Battle Ropes":{
          title:"Battle Ropes"
        },
        "Seated Leg Curl":{
          title:"Seated Leg Curl"
        },
        "Other 3":{
          title:"Other 3"
        },
        "Other 1":{
          title:"Other 1"
        },
        "Other 2":{
          title:"Other 2"
        },
        "Dips":{
          title:"Dips"
        },
        "Glute Extensions":{
          title:"Glute Extensions"
        },
        "Test":{
          title:"Test"
        },
        "Glute Curls":{
          title:"Glute Curls"
        },
        "Scott's Back 1":{
          title:"Scott's Back 1"
        },
        "Scott's Back 2":{
          title:"Scott's Back 2"
        },
        "Scott's Back 3":{
          title:"Scott's Back 3"
        },
        "Scott's Triceps 1":{ 
          title:"Scott's Triceps 1"
        },
        "Scott's Triceps 2":{ 
          title:"Scott's Triceps 2"
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1"
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2"
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1"
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2"
        },
        "Scott's Shoulder 1":{ 
          title:"Scott's Shoulder 1"
        },
        "Scott's Shoulder 2":{ 
          title:"Scott's Shoulder 2"
        },
        
      
      }
    }
    this.updateExercises = this.updateExercises.bind(this);
  }
  
  saveData = async(key, text) =>{
    try {
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.log("Error saving data:", error);
    } 
  }

  async getNotes(title){
    let notes = await this._retrieveData(title+":notes");
    return new Promise(resolve => {resolve(notes)});
  }

  async getExerciseHistory(exercise){
    let {title} = exercise;
    let history = await this._retrieveData(title+":history");
    let parsedHistory = JSON.parse(history);

    return new Promise((resolve,reject) => {
      if(parsedHistory && Array.isArray(parsedHistory)) {
        resolve(parsedHistory)
      } else {
        // populate history
        history = [{sets:"", reps: "", weight:"", date:""}];
        this.saveData(title+":history", JSON.stringify(history));
        resolve(history);
      };
    });
  }

  async updateExercises(){
    let exerciseArr = Object.values(this.state.exercises);
    let exercises = {};
    let allHistory = {};

    for(let i=0; i<exerciseArr.length; i++){
      let exercise = exerciseArr[i];
      let {title} = exercise;
      let history = {};
      
      try {
        history = await this.getExerciseHistory(exercise);
        allHistory[exercise.title] = history;
        exercises[title] = history[history.length-1];
        exercises[title].notes = await this.getNotes(title);
      } catch(error) {
        console.log(error);
      }

    }
    //this.setState({exercises, allHistory});

    // load into redux
    this.props.loadDataIntoRedux(exercises);
    this.props.loadHistoryIntoRedux(allHistory);
  }

  componentDidMount(){
    this.updateExercises();
  }

  _retrieveData = async (key) => {
    var collect;
    try {
      await AsyncStorage.getItem(key).then((values) => {
        collect = values;
      });
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
    return collect;
  }

  // https://facebook.github.io/react-native/docs/flatlist.html#getitemlayout to optimize the FlatList

  buildList = (iter) => {
    return (<Activity navigation={this.props.navigation} exercise={iter.item} updateExercises={this.updateExercises}/>)
  }

  _keyExtractor = (item, index) => item.title;

  render(){
    return(
      <View style={styles.container}>
        <FilterBar/>
        <OptimizedFlatList data={Object.values(this.state.exercises).sort(function(a,b){
            if(a.title>b.title)return 1;
            else if(b.title>a.title)return -1;
            else return 0;
          })}
          renderItem={this.buildList}
        keyExtractor={this._keyExtractor}
        ></OptimizedFlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  login:{
    alignItems: 'center'
  },
  loginInput: {height: 40, borderColor: 'white', borderWidth: 2, alignSelf: 'stretch', color: 'white', borderRadius: 50, marginTop: 10, padding: 10, marginLeft: 50, marginRight: 50},
  loginButton:{
    height: 40, backgroundColor: 'white', alignSelf: 'stretch', borderRadius: 50, marginTop: 10, padding: 10, marginLeft: 80, marginRight: 80
  }
});

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadDataIntoRedux,
  loadHistoryIntoRedux
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSelector);
