import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import Workout from '../Workout/Workout';
import {AsyncStorage} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadDataIntoRedux, loadHistoryIntoRedux} from './actions';
import FilterBar from '../FilterBar/FilterBar';

/*
 * WORKOUT SELECTOR (HOME PAGE)
 * includes login page
 * handles axios fetch of exercises
 * displays exercises
 * passes state into the Workout component found on Workout.js (including userId)
*/

class WorkoutSelector extends React.Component{
  static navigationOptions = () => ({
    title: "Gym Buddy"
  });
  
  constructor(props){
    super(props);
  
    this.state = {
      unsubListener : this.props.screenProps.store.subscribe(this.reduxListener),
      activeFilters: {},
      exercises:{
        "Benchpress":{
          title:"Benchpress",
          group:"Upper"
        },
        "9,8 Curls":{
          title:"9,8 Curls",
          group:"Upper"
        },
        "Barbell Curls":{
          title:"Barbell Curls",
          group:"Upper"
        },
        "Seated Shoulder Press":{
          title:"Seated Shoulder Press",
          group:"Upper"
        },
        "Hardgainer Shoulder":{
          title:"Hardgainer Shoulder",
          group:"Upper"
        },
        "Calve Press":{
          title: "Calve Press",
          group:"Legs"
        },
        "Dumbell Bench Press":{
          title:"Dumbell Bench Press",
          group:"Upper"
        },
        "Back Squats":{
          title:"Back Squats",
          group:"Legs"
        },
        "Front Squats":{
          title:"Front Squats",
          group:"Legs"
        },
        "Standing Squat Machine":{
          title:"Standing Squat Machine",
          group:"Legs"
        },
        "Sumo Dead Lifts":{
          title:"Sumo Dead Lifts",
          group:"Legs"
        },
        "Tricep Pulldowns":{
          title:"Tricep Pulldowns",
          group:"Upper"
        },
        "Overhead Tricep Extensions":{
          title:"Overhead Tricep Extensions",
          group:"Upper"
        },
        "Chest Flys":{
          title:"Chest Flys",
          group:"Upper"
        },
        "Incline Bench Press":{
          title:"Incline Bench Press",
          group:"Upper"
        },
        "Drag Curls":{
          title:"Drag Curls",
          group:"Upper"
        },
        "Cable Ab Pulldowns":{
          title:"Cable Ab Pulldowns",
          group:"Upper"
        },
        "Test":{
          title:"Test",
          group:"Upper"
        },
        "Test 2":{
          title:"Test 2",
          group:"Legs"
        },
        "Overhead Lat Pulldown":{
          title:"Overhead Lat Pulldown",
          group:"Upper"
        },
        "Battle Ropes":{
          title:"Battle Ropes",
          group:"Upper"
        },
        "Seated Leg Curl":{
          title:"Seated Leg Curl",
          group:"Legs"
        },
        "Other 3":{
          title:"Other 3",
          group:"Upper"
        },
        "Other 1":{
          title:"Other 1",
          group:"Upper"
        },
        "Other 2":{
          title:"Other 2",
          group:"Upper"
        },
        "Dips":{
          title:"Dips",
          group:"Upper"
        },
        "Glute Extensions":{
          title:"Glute Extensions",
          group:"Legs"
        },
        "Test":{
          title:"Test",
          group:"Upper"
        },
        "Glute Curls":{
          title:"Glute Curls",
          group:"Legs"
        },
        "Scott's Back 1":{
          title:"Scott's Back 1",
          group:"Upper"
        },
        "Scott's Back 2":{
          title:"Scott's Back 2",
          group:"Upper"
          
        },
        "Scott's Back 3":{
          title:"Scott's Back 3",
          group:"Upper"
          
        },
        "Scott's Triceps 1":{ 
          title:"Scott's Triceps 1",
          group:"Upper"
          
        },
        "Scott's Triceps 2":{ 
          title:"Scott's Triceps 2",
          group:"Upper"
          
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1",
          group:"Upper"
          
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2",
          group:"Upper"
          
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1",
          group:"Upper"
          
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2",
          group:"Upper"
          
        },
        "Scott's Shoulder 1":{ 
          title:"Scott's Shoulder 1",
          group:"Upper"
          
        },
        "Scott's Shoulder 2":{ 
          title:"Scott's Shoulder 2",
          group:"Upper"
          
        }
      }
    }
    this.updateExercises = this.updateExercises.bind(this);
  }

  reduxListener = () => {
    // Redux listener used to detect whether submission is valid
    function select(state, prop){
      return state.workoutFilters[prop];
    }
    
    const {store} = this.props.screenProps;
    const state = store.getState();
    const upper = select(state, 'upper');
    const legs  = select(state, 'legs');
    const core = select(state, 'core');
    const cardio = select(state, 'cardio');
    const activeFilters = {upper, legs, core, cardio};

    this.setState({activeFilters});
  }

  componentDidMount(){
    this.updateExercises();
  }

  componentWillUnmount(){
    this.state.unsubListener();
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

    // load into redux
    this.props.loadDataIntoRedux(exercises);
    this.props.loadHistoryIntoRedux(allHistory);
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
    return (<Workout navigation={this.props.navigation} exercise={iter.item} updateExercises={this.updateExercises}/>)
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
