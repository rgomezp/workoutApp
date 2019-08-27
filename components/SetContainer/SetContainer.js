import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Prompt from 'react-native-prompt-crossplatform';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {holdingArea} from './actions';

class SetContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visiblePromptSets   : false,
      visiblePromptWeight : false,
      visiblePromptReps   : false,
    }
  }
  
  componentDidMount(){
    let exercise = this.props.exercise;
    let {sets, reps, weight, difficulty} = exercise;

    // // initial load: puts into holding area for saving
    this.props.holdingArea({reps});
    this.props.holdingArea({sets});
    this.props.holdingArea({weight});
    this.props.holdingArea({difficulty});
    
    this.setState({
      sets,
      reps,
      weight
    })
  }

  componentWillUnmount(){
    this.props.holdingArea({});
  }

  fetchExerciseFromArray(title, array){
    for(let i=0; i<array.length; i++){
      if(array[i]['title'] == title){
        return array[i];
      }
    }
  }

  render(){
    return(
      <View>
          <Prompt
           primaryColor="#4841BB"
           autoFocus = {true}
           inputPlaceholder = ""
           title="Input Sets"
           onBackButtonPress={()=>{}}
           placeholder="How many sets?"
           keyboardType="number-pad"
           isVisible={this.state.visiblePromptSets}
           onChangeText={(text) => {
             if(text.length<=3){
               this.setState({ tempSets: text });
              }
           }}
           onCancel={() => {
             this.setState({
               visiblePromptSets: false,
             });
           }}
           onSubmit={() => {
             let sets = this.state.tempSets;
             this.props.holdingArea({sets});
             this.setState({sets});
             this.setState({
               visiblePromptSets: false,
             });
           }}
        />

        <Prompt
         primaryColor="#4841BB"
         autoFocus = {true}
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Repetitions"
         onBackButtonPress={()=>{}}
         placeholder="How many reps?"
         isVisible={this.state.visiblePromptReps}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ tempReps: text });
           }
         }}
         onCancel={() => {
           this.setState({
             visiblePromptReps: false,
           });
         }}
         onSubmit={() => {
           let reps = this.state.tempReps;
           this.props.holdingArea({reps});
           this.setState({reps});
           this.setState({
             visiblePromptReps: false,
           });
         }}
        />

        <Prompt
         primaryColor="#4841BB"
         autoFocus = {true}
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Weight"
         onBackButtonPress={()=>{}}
         placeholder="How much weight?"
         isVisible={this.state.visiblePromptWeight}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ tempWeight : text });
           }
         }}
         onCancel={() => {
           this.setState({
             visiblePromptWeight: false,
           });
         }}
         onSubmit={() => {
           let weight = this.state.tempWeight;
           this.props.holdingArea({weight});
           this.setState({weight});
           this.setState({
             visiblePromptWeight: false,
           });
         }}
      />

        <View style={styles.setContainer}>
          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptSets: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#4841BB'}}>SETS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#4841BB'}}>{this.state.sets}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptReps: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#4841BB'}}>REPS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#4841BB'}}>{this.state.reps}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptWeight: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#4841BB'}}>WEIGHT</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#4841BB'}}>{this.state.weight}</Text>
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
    borderColor: '#4841BB',
    flexDirection: 'row',
    padding: 0
  },
  set:{
    flex: 1,
    height: 80,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#4841BB',
    borderWidth: 3,
    margin: 10,
    borderRadius: 6
  }
});
