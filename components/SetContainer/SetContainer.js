import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Prompt from 'react-native-prompt-crossplatform';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {holdingArea} from '../actions';

class SetContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visiblePromptSets   : false,
      visiblePromptWeight : false,
      visiblePromptReps   : false,
      sets    : "",
      weight  : "",
      reps    : ""
    }
  }
  
  componentDidMount(){
    let exercise = this.fetchExerciseFromArray(this.props.title, this.props.exerciseData);
    let {sets, reps, weight, notes} = exercise;

    this.setState({
      sets,
      reps,
      weight,
      notes
    })
  }

  fetchExerciseFromArray(title, array){
    for(let i=0; i<array.length; i++){
      if(array[i]['title'] == title){
        return array[i];
      }
    }
  }

  saveData = async(key, text) =>{
    try {
      await AsyncStorage.setItem(key, text);
    } catch (error) {
      console.log("Error saving data:", error);
    } 
  }

  render(){
    return(
      <View>
          <Prompt
         autoFocus = {true}
           inputPlaceholder = ""
           title="Input Sets"
           onBackButtonPress={()=>{}}
           placeholder="How many sets?"
           keyboardType="number-pad"
           isVisible={this.state.visiblePromptSets}
           onChangeText={(text) => {
             if(text.length<=3){
               this.setState({ sets: text });
               this.props.holdingArea({sets: text});
              }
           }}
           onCancel={() => {
             this.setState({
               visiblePromptSets: false,
             });
           }}
           onSubmit={() => {
             this.setState({
               visiblePromptSets: false,
             });
           }}
        />

        <Prompt
         autoFocus = {true}
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Repetitions"
         onBackButtonPress={()=>{}}
         placeholder="How many reps?"
         isVisible={this.state.visiblePromptReps}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ reps: text });
             this.props.holdingArea({reps: text});
           }
         }}
         onCancel={() => {
           this.setState({
             visiblePromptReps: false,
           });
         }}
         onSubmit={() => {
           this.setState({
             visiblePromptReps: false,
           });
         }}
        />

        <Prompt
         autoFocus = {true}
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Weight"
         onBackButtonPress={()=>{}}
         placeholder="How much weight?"
         isVisible={this.state.visiblePromptWeight}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ weight: text });
             this.props.holdingArea({weight: text});
           }
         }}
         onCancel={() => {
           this.setState({
             visiblePromptWeight: false,
           });
         }}
         onSubmit={() => {
           this.setState({
             visiblePromptWeight: false,
           });
         }}
      />

        <View style={styles.setContainer}>
          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptSets: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>SETS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.sets}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptReps: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>REPS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.reps}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptWeight: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>WEIGHT</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.weight}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  holdingArea
}, dispatch);

export default connect(null, mapDispatchToProps)(SetContainer);

const styles = StyleSheet.create({
  setContainer:{
    borderTopWidth: 3,
    borderColor: '#ff7675',
    flexDirection: 'row',
    padding: 0
  },
  set:{
    flex: 1,
    height: 80,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#ff7675',
    borderWidth: 2,
    margin: 10,
    borderRadius: 6
  }
});
