import React from 'react';
import {ScrollView, Image, TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage} from 'react-native';
import SetContainer from '../SetContainer';
import DifficultySlider from '../DifficultySlider';
import TrackingPanel from '../TrackingPanel';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; 

/*
 * ACTIVITY PAGE
 * individual exercise screen
 * each activity page gets its props from navigation which comes from the Activity component in Activity.js
*/

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class ActivityPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userId:props.navigation.getParam('userId'),
      sliderVal : 0,
      difficulty: "The workout I did was",
      exercise:this.props.navigation.getParam('title', "Workout"),
      oldNotes: props.navigation.getParam('notes', ""),
    }
  }

  fetchExerciseFromArray(title, array){
    for(let i=0; i<array.length; i++){
      if(array[i]['title'] == title){
        return array[i];
      }
    }
  }

  componentDidMount(){
    let exercise = this.fetchExerciseFromArray(this.state.exercise, this.props.exercises);
    console.log("Ex:", exercise);

    let {sets, reps, weight, notes} = exercise;
    console.log(sets, reps, weight, notes);
    this.setState({
      sets,
      reps,
      weight,
      notes
    })
  }

  saveData = async(key, text) =>{
    console.log("saving data:", key, text);
    try {
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.log("Error saving data:", error);
    } 
  }

  finish(){
    const {navigate} = this.props.navigation;
    this.saveData(this.state.exercise+":notes", this.state.notes);
    this.state.updateExercises();
    navigate('Home');
  }

  static navigationOptions = (props) => ({
    title: props.navigation.getParam('title', "Workout")
  });

  render(){
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} enabled>
        <ScrollView>
          <TrackingPanel/>
          {/*--------SETS---------*/}
          <SetContainer
            exercise = {this.state.exercise}
            reps={this.state.reps}
            sets={this.state.sets}
            weight={this.state.weight}
          />
          <View style={{padding: 10}}>
            <DifficultySlider/>
          </View>

          <View style={{alignSelf:'stretch', padding: 10}}>
            <Text style={{fontWeight: 'bold'}}>My notes from last time:</Text>
            <Text style={{color: 'grey'}}>{this.state.oldNotes}</Text>
          </View>
          <View style={{alignSelf:'stretch', padding: 10, marginBottom: 10}}>
            <Text style={{fontWeight: 'bold'}}>Notes:</Text>
            <TextInput multiline={true} numberOfLines={4}
              onChangeText={(text) => this.setState({notes: text})} value={this.state.notes} placeholder="Tap to write"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={this.finish.bind(this)}>
            <Text style={{alignSelf:'center', color: 'white', fontWeight: 'bold'}}>FINISH</Text>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  exercises : state.exercises.exercises
});

export default connect(mapStateToProps)(ActivityPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:0,
  },
  activityContainer: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#ff7675'
  },
  historyButton:{
    backgroundColor: '#FFC4C4',
    alignItems: 'center',
    padding:3
  },
  button:{
    flex: 1,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7675',
    margin: 10,
    borderRadius: 50,
    elevation:2
  },
  overlay:{
    flex: 1,
    position: 'absolute',
    opacity: .95,
    backgroundColor: '#ff7675',
    width: width
  }
});