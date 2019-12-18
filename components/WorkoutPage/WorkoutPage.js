import React from 'react';
import {ScrollView, Image, TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage, Animated} from 'react-native';
import SetContainer from '../SetContainer/SetContainer';
import DifficultySlider from '../DifficultySlider';
import TrackingPanel from '../TrackingPanel';
import Clock from '../Clock';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateDataInRedux, updateHistoryInRedux} from './actions';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import WorkoutHelper from '../WorkoutHelper';

/*
 * WORKOUT PAGE
 * individual exercise screen
 * each activity page gets its props from navigation which comes from the Activity component in Activity.js
*/

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class ActivityPage extends React.Component{
  static navigationOptions = (props) => ({
    title: props.navigation.getParam('title', "Workout")
  });

  constructor(props){
    super(props);
    this.state={
      userId:props.navigation.getParam('userId'),
      title:this.props.navigation.getParam('title', "Workout"),
      sliderVal : 0,
      notes : "",
      difficultyIsSet: false,
      initialDifficulty: undefined,
      isValid: false,
      unsubListener : this.props.screenProps.store.subscribe(this.reduxListener)
    }
  }

  componentDidMount() {
    let exercise = this.props.exercises[this.state.title];
    let historyArr = this.props.history[this.state.title];     // the exercise's history array
    this.setState({notes: exercise.notes, historyArr});
    activateKeepAwake();
  }

  componentWillUnmount() {
    this.state.unsubListener();
    deactivateKeepAwake();
  }

  saveWorkout() {
    const historyArr = this.state.historyArr || [];
    const payload = {
      holdingArea : this.props.holdingArea,
      navigation : this.props.navigation,
      exercises : this.props.exercises,
      updateHistoryInRedux : this.props.updateHistoryInRedux,
      updateDataInRedux : this.props.updateDataInRedux,
      notes : this.state.notes,
      title : this.state.title,
      historyArr
    };

    WorkoutHelper.saveWorkout(payload);
  }


  reduxListener = () => {
    // Redux listener used to detect whether submission is valid
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
  }

  render(){
    const {exercises} = this.props;
    const exercise = exercises[this.state.title];
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200} enabled>
        <ScrollView>
          <TrackingPanel title={this.state.title}/>
          <Clock/>
          {/*--------SETS---------*/}
          <SetContainer
            exercise={exercise}
          />
          <View style={{padding: 10}}>
            <DifficultySlider startingValue={Number(exercise.difficulty/10) || 0} />
          </View>
          <View style={{alignSelf:'stretch', padding: 10}}>
            <Text style={{fontWeight: 'bold', color:'#4841BB'}}>Notes:</Text>
            <TextInput multiline={true} numberOfLines={3}
              onChangeText={(text) => this.setState({notes: text})} value={this.state.notes} placeholder="Tap to write"
            />
          </View>
          
          <TouchableOpacity onPress={this.state.isValid?this.saveWorkout.bind(this):()=>{}}>
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