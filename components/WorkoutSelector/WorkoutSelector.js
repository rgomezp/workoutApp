import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import Workout from '../Workout/Workout';
import {AsyncStorage} from 'react-native';
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
          group:"Upper",
          key:'0'
        },
        "9,8 Curls":{
          title:"9,8 Curls",
          group:"Upper",
          key:'1'
        },
        "Barbell Curls":{
          title:"Barbell Curls",
          group:"Upper",
          key:'2'
        },
        "Seated Shoulder Press":{
          title:"Seated Shoulder Press",
          group:"Upper",
          key:'3'
        },
        "Hardgainer Shoulder":{
          title:"Hardgainer Shoulder",
          group:"Upper",
          key:'4'
        },
        "Calve Press":{
          title: "Calve Press",
          group:"Legs",
          key:'5'
        },
        "Dumbell Bench Press":{
          title:"Dumbell Bench Press",
          group:"Upper",
          key:'6'
        },
        "Back Squats":{
          title:"Back Squats",
          group:"Legs",
          key:'7'
        },
        "Front Squats":{
          title:"Front Squats",
          group:"Legs",
          key:'8'
        },
        "Standing Squat Machine":{
          title:"Standing Squat Machine",
          group:"Legs",
          key:'9'
        },
        "Sumo Dead Lifts":{
          title:"Sumo Dead Lifts",
          group:"Legs",
          key:'10'
        },
        "Tricep Pulldowns":{
          title:"Tricep Pulldowns",
          group:"Upper",
          key:'11'
        },
        "Overhead Tricep Extensions":{
          title:"Overhead Tricep Extensions",
          group:"Upper",
          key:'12'
        },
        "Chest Flys":{
          title:"Chest Flys",
          group:"Upper",
          key:'13'
        },
        "Incline Bench Press":{
          title:"Incline Bench Press",
          group:"Upper",
          key:'14'
        },
        "Drag Curls":{
          title:"Drag Curls",
          group:"Upper",
          key:'15'
        },
        "Cable Ab Pulldowns":{
          title:"Cable Ab Pulldowns",
          group:"Upper",
          key:'16'
        },
        "Test":{
          title:"Test",
          group:"Upper",
          key:'17'
        },
        "Test 2":{
          title:"Test 2",
          group:"Legs",
          key:'18'
        },
        "Overhead Lat Pulldown":{
          title:"Overhead Lat Pulldown",
          group:"Upper",
          key:'19'
        },
        "Battle Ropes":{
          title:"Battle Ropes",
          group:"Upper",
          key:'20'
        },
        "Seated Leg Curl":{
          title:"Seated Leg Curl",
          group:"Legs",
          key:'21'
        },
        "Other 4":{
          title:"Other 4",
          group:"Upper",
          key:'256'
        },
        "Other 5":{
          title:"Other 5",
          group:"Upper",
          key:'257'
        },
        "Other 6":{
          title:"Other 6",
          group:"Upper",
          key:'258'
        },
        "Dips":{
          title:"Dips",
          group:"Upper",
          key:'25'
        },
        "Glute Extensions":{
          title:"Glute Extensions",
          group:"Legs",
          key:'26'
        },
        "Test":{
          title:"Test",
          group:"Upper",
          key:'27'
        },
        "Glute Curls":{
          title:"Glute Curls",
          group:"Legs",
          key:'28'
        },
        "Scott's Back 1":{
          title:"Scott's Back 1",
          group:"Upper",
          key:'29'
        },
        "Scott's Back 2":{
          title:"Scott's Back 2",
          group:"Upper",
          key:'30'
          
        },
        "Scott's Back 3":{
          title:"Scott's Back 3",
          group:"Upper",
          key:'31'
          
        },
        "Scott's Triceps 1":{ 
          title:"Scott's Triceps 1",
          group:"Upper",
          key:'32'
          
        },
        "Scott's Triceps 2":{ 
          title:"Scott's Triceps 2",
          group:"Upper",
          key:'33'
          
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1",
          group:"Upper",
          key:'34'
          
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2",
          group:"Upper",
          key:'35'
          
        },
        "Scott's Biceps 1":{ 
          title:"Scott's Biceps 1",
          group:"Upper",
          key:'36'
          
        },
        "Scott's Biceps 2":{ 
          title:"Scott's Biceps 2",
          group:"Upper",
          key:'37'
          
        },
        "Scott's Shoulder 1":{ 
          title:"Scott's Shoulder 1",
          group:"Upper",
          key:'38'
          
        },
        "Scott's Shoulder 2":{ 
          title:"Scott's Shoulder 2",
          group:"Upper",
          key:'39'
        }
      },
      filteredExercises: {}
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
    const filteredExercises = this.sortExercises(this.filterExercises(activeFilters));
    this.setState({filteredExercises});
  }

  componentDidMount(){
    this.updateExercises();
  }

  shouldComponentUpdate(nextProps, nextState){
    const shouldUpdate = JSON.stringify(this.state.filteredExercises) !== JSON.stringify(nextState.filteredExercises);

    if ( !shouldUpdate ) {
      return false;
    }
    else return true;
  }

  componentWillUnmount(){
    this.state.unsubListener();
  }

  sortExercises (exercises) {
    return Object.values(exercises).sort(function(a,b){
      if(a.title>b.title)return 1;
      else if(b.title>a.title)return -1;
      else return 0;
    })
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

  filterExercises(filters) {
    const filteredExercises = {};

    Object.keys(this.state.exercises).forEach((title) => {
      const exercise = this.state.exercises[title];
      const group = exercise.group.toLowerCase();

      if (filters[group]) {
        filteredExercises[title] = exercise;
      }
    });

    return filteredExercises;
  }

  async updateExercises() {
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

  _keyExtractor = (item, index) => item.key;

  render(){
    return(
      <View style={styles.container}>
        <FilterBar/>
        <FlatList removeClippedSubviews={false} data={Object.values(this.state.filteredExercises)}
          renderItem={this.buildList}
        keyExtractor={this._keyExtractor}
        ></FlatList>
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

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadDataIntoRedux,
  loadHistoryIntoRedux
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSelector);
