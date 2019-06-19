import React from 'react';
import {ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native';
import Activity from './Activity';
import SetContainer from './SetContainer';
import { Slider } from 'react-native-elements'
import axios from 'axios';

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
      sets: null,
      reps: null,
      weight: null,
      notes: "",
      oldNotes: props.navigation.getParam('notes', ""),
      panelHeight: 0
    }
    this.updateSet = this.updateSet.bind(this);
  }

  static navigationOptions = (props) => ({
    title: props.navigation.getParam('title', "Workout")
  });

  /* -------------------------------
   U P D A T E - S E T:
     called from child Set component in order to set the state of the Activity Page component
   */
  updateSet(sets, reps, weight){
    this.setState({
      sets  : sets,
      reps  : reps,
      weight: weight
    });
  }
  // --------------------------------

  /* C H E C K - D I F F I C U L T Y
  * used to check the slider value and update the difficulty description
  */
  checkDifficulty(value){
    if(value <= .2){
      this.setState({difficulty:(Math.floor(value*10))+": Pshh. Piece of cake", sliderVal: value})
      return;
    }
    if(value > .2 && value < .5){
      this.setState({difficulty: (Math.floor(value*10))+": If I'm honest, that probably won't help my gains", sliderVal: value});
      return;
    }
    if(value > .99){
      this.setState({difficulty:(Math.floor(value*10))+": I'm injured :(", sliderVal: value});
      return;
    }
    if(value > .8){
      this.setState({difficulty:(Math.floor(value*10))+": That was too hard. I dont want an injury", sliderVal: value});
      return;
    }
    if(value > .70){
      this.setState({difficulty:(Math.floor(value*10))+": Gains sweet spot!", sliderVal: value});
      return;
    }
    if(value > .50){
      this.setState({difficulty:(Math.floor(value*10))+": Gains", sliderVal: value});
      return;
    }
  }
  // --------------------------------

  showPanel(){
    if(this.state.panelHeight == 250){
      this.setState({panelHeight: 0})
    }else{
      this.setState({panelHeight: 250});
    }
  }

  finishExercise(){
    axios.post('http://localhost:3000/finishExercise',{
      userId: this.state.userId,
      sets: this.state.sets,
      reps: this.state.reps,
      weight: this.state.weight,
      notes: this.state.notes,
      difficulty: Math.floor(this.state.sliderVal*10)
    }).then((response)=>{
      //console.log(response);
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} enabled>
        <ScrollView>
          <View>
            <Image
              style={{alignSelf: 'stretch', height: 250}}
              source={{uri: 'https://www.zestfitness.com/wp-content/uploads/2016/01/flat-bench-press-500x335.jpg'}}/>
              <View style={[styles.overlay, {height: this.state.panelHeight}]}>
                {/* TRACKING INFO WILL GO HERE */}
              </View>
          </View>
          <View>
            <TouchableOpacity style={styles.historyButton} onPress={()=>this.showPanel()}>
              <Text style={{color: 'white'}}>Tracking</Text>
            </TouchableOpacity>
          </View>

          {/*--------SETS---------*/}
          <SetContainer
            updateSetFunction = {this.updateSet}
            reps={this.props.navigation.getParam('reps', "1")}
            sets={this.props.navigation.getParam('sets', "5")}
            weight={this.props.navigation.getParam('weight', "0")}
          />
          <View style={{padding: 10}}>
            <Text style={{fontWeight:'bold'}}>{this.state.difficulty}</Text>
            <Slider
              value={this.state.sliderVal}
              onSlidingComplete={(value) =>{
                this.checkDifficulty(value);
              }}
              thumbTintColor='#ff7675'
              trackStyle={{opacity:0.25, backgroundColor:'#ff7675'}}
            />
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
          <TouchableOpacity style={styles.button} onPress={()=>this.finishExercise()}>
            <Text style={{alignSelf:'center', color: 'white', fontWeight: 'bold'}}>FINISH</Text>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

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

export default ActivityPage;
