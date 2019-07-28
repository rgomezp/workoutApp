import React from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import Activity from '../Activity';
import {AsyncStorage} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadDataIntoRedux, loadHistoryIntoRedux} from './actions';

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
        "Curls":{
          title:"Curls",
        },
        "Crunches":{
          title:"Crunches",
        },
      }
    }
    this.updateExercises = this.updateExercises.bind(this);
  }

  async getExerciseData(title){
    let sets = await this._retrieveData(title+":sets");
    let reps = await this._retrieveData(title+":reps");
    let weight = await this._retrieveData(title+":weight");
    let notes = await this._retrieveData(title+":notes");
    
    await Promise.all([sets, reps, weight]).then((values) => {
      return values;
    }).then((values)=>{
      sets = values[0];
      reps = values[1];
      weight = values[2];
    });
    let exercise = {title};
    exercise.sets = sets;
    exercise.reps = reps;
    exercise.weight = weight;
    exercise.notes = notes;
    return new Promise(resolve => {resolve(exercise)});
  }

  async getExerciseHistory(exercise){
    let {title} = exercise;
    let history = await this._retrieveData(title+":history");
    let parsedHistory = JSON.parse(history);

    return new Promise((resolve,reject) => {
      if(parsedHistory) {
        resolve(parsedHistory[title])
      } else {
        // populate history
        history = [{sets:"", reps: "", weight:"", date:""}];
        this.saveData(title+":history", JSON.stringify(history));
        reject("Populating history data");
      };
    });
  }
  
  saveData = async(key, text) =>{
    try {
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.log("Error saving data:", error);
    } 
  }

  async updateExercises(){
    let exerciseArr = Object.values(this.state.exercises);
    let exercises = {};
    let allHistory = {};
    for(let i=0; i<exerciseArr.length; i++){
      let title = exerciseArr[i].title;
      let exercise = exerciseArr[i];
      let exerciseData = await this.getExerciseData(title);
      exercises[title] = exerciseData;
     
      try {
        let history = await this.getExerciseHistory(exercise);
        allHistory[exercise.title] = history;
      } catch(error) {
        console.log(error);
      }
    }
    this.setState({exercises, allHistory});

    // load into redux
    this.props.loadDataIntoRedux(this.state.exercises);
    this.props.loadHistoryIntoRedux(this.state.allHistory);
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
        <OptimizedFlatList data={Object.values(this.state.exercises)}
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
    backgroundColor: '#ff7675',
    padding:10,
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
