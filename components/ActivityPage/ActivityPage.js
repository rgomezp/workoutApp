import React from 'react';
import {ScrollView, Image, TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage, Animated} from 'react-native';
import SetContainer from '../SetContainer/SetContainer';
import DifficultySlider from '../DifficultySlider';
import TrackingPanel from '../TrackingPanel';
import Clock from '../Clock';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateDataInRedux, updateHistoryInRedux} from './actions';
import { storeUrl } from 'expo/build/StoreReview/StoreReview';

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
      buttonAnim: new Animated.Value(0.5),
      userId:props.navigation.getParam('userId'),
      sliderVal : 0,
      title:this.props.navigation.getParam('title', "Workout"),
      notes : "",
      difficultyIsSet: false,
      initialDifficulty: undefined,
      isValid: false,
      unsubListener : this.props.screenProps.store.subscribe(function(){
        // Redux listener

        function select(state, prop){
          return state.holdingArea[prop];
        }
        
        const {store} = this.props.screenProps;
        let sets = select(store.getState(), 'sets');
        let reps = select(store.getState(), 'reps');
        let weight = select(store.getState(), 'weight');
        let difficulty = select(store.getState(), 'difficulty');
        
        if (difficulty && !this.state.difficultyIsSet) {
          this.setState({initialDifficulty: difficulty, difficultyIsSet: true});
        } else if (this.state.difficultyIsSet && difficulty !== this.state.initialDifficulty) {
          var difficultyChanged = true;
        }

        let setsAreSet = Boolean(sets || sets == "0");  
        let repsAreSet = Boolean(reps || reps == "0");  
        let weightIsSet = Boolean(weight || weight == "0");  

        if(setsAreSet && repsAreSet && weightIsSet && difficultyChanged){
          this.setState({isValid: true});
        }
      }.bind(this))
    }
  }

  componentDidMount() {
    let exercise = this.props.exercises[this.state.title];
    let historyArr = this.props.history[this.state.title];     // the exercise's history array
    this.setState({notes: exercise.notes, historyArr});
  }

  componentWillUnmount() {
    this.state.unsubListener();
  }
  
  saveData = async(key, text) =>{
    try {
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.log("Error saving data:", error);
    } 
  }

  finish() {
    const {navigate} = this.props.navigation;
    const {reps} = this.props.holdingArea;
    const {sets} = this.props.holdingArea;
    const {weight} = this.props.holdingArea;
    const notes = this.state.notes;

    this.saveData(this.state.title+":notes", notes);
    
    // save to history
    let date = new Date();
    let difficulty = this.props.holdingArea.difficulty;
    let history = {sets, reps, weight, difficulty, date: JSON.stringify(date)};
    let historyArr = this.state.historyArr;

    if (historyArr.length = 14) {
      historyArr = this.state.historyArr.slice(1);
    }
    historyArr.push(history);

    // TO DO: only save/update if on a new workout/day (figure out later) 
    this.saveData(this.state.title+":history", JSON.stringify(historyArr));
    this.props.updateHistoryInRedux({[this.state.title]:historyArr});

    let exercises = this.props.exercises;
    let title = this.state.title;
    let exercise = {title, notes, reps, sets, weight, difficulty};
    exercises[title] = exercise;

    this.props.updateDataInRedux(exercises);
    navigate('Home');
  }

  static navigationOptions = (props) => ({
    title: props.navigation.getParam('title', "Workout")
  });

  render(){
    const {exercises} = this.props;
    const exercise = exercises[this.state.title];
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200} enabled>
        <ScrollView>
          <TrackingPanel title={this.state.title}/>
          {/*--------SETS---------*/}
          <SetContainer
            exercise={exercise}
          />
          <Clock/>
          <View style={{padding: 10}}>
            <DifficultySlider startingValue={Number(exercise.difficulty/10) || 0} />
          </View>
          <View style={{alignSelf:'stretch', padding: 10}}>
            <Text style={{fontWeight: 'bold', color:'#4841BB'}}>Notes:</Text>
            <TextInput multiline={true} numberOfLines={3}
              onChangeText={(text) => this.setState({notes: text})} value={this.state.notes} placeholder="Tap to write"
            />
          </View>
          
          <TouchableOpacity onPress={this.state.isValid?this.finish.bind(this):()=>{}}>
            <View style={this.state.isValid?styles.button:styles.opaqueButton}>
              <Text style={{alignSelf:'center', color: 'white', fontWeight: 'bold'}}>SAVE</Text>
            </View>
          </TouchableOpacity>
          
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  exercises : state.exercises,
  holdingArea : state.holdingArea,
  history : state.history
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateDataInRedux,
  updateHistoryInRedux
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage);

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
    borderBottomColor: '#4841BB'
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
    backgroundColor: '#4841BB',
    margin: 10,
    borderRadius: 50,
    elevation:2
  },
  opaqueButton:{
    opacity:0.5,
    flex: 1,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4841BB',
    margin: 10,
    borderRadius: 50,
    elevation:2
  },
  overlay:{
    flex: 1,
    position: 'absolute',
    opacity: .95,
    backgroundColor: '#4841BB',
    width: width
  }
});