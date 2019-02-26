import React from 'react';
import {Image, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import Prompt from 'react-native-prompt-crossplatform';

export default class SetContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visiblePromptSets   : false,
      visiblePromptWeight : false,
      visiblePromptReps   : false,
      sets    : this.props.sets,
      weight  : this.props.weight,
      reps    : this.props.reps
    }
  }

  render(){
    return(
      <View>

        /* P R O M P T S -------------------------- */
        // "set" prompt
          <Prompt
           inputPlaceholder = ""
           title="Input Sets"
           placeholder="How many sets?"
           isVisible={this.state.visiblePromptSets}
           onChangeText={(text) => {
             if(text.length<=3){
               this.setState({ sets: text });
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

             /* this function updates the set data in the parent component, ready for submission */

             this.props.updateSetFunction(this.state.sets, this.state.reps, this.state.weight);
           }}
        />

        // "reps" prompt
        <Prompt
         inputPlaceholder = ""
         title="Input Repetitions"
         placeholder="How many reps?"
         isVisible={this.state.visiblePromptReps}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ reps: text });
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

         /* this function updates the set data in the parent component, ready for submission */

           this.props.updateSetFunction(this.state.sets, this.state.reps, this.state.weight);
         }}
        />

        // "weight" prompt
        <Prompt
         inputPlaceholder = ""
         title="Input Weight"
         placeholder="How much weight?"
         isVisible={this.state.visiblePromptWeight}
         onChangeText={(text) => {
           if(text.length<=3){
             this.setState({ weight: text });
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

           /* this function updates the set data in the parent component, ready for submission */

           this.props.updateSetFunction(this.state.sets, this.state.reps, this.state.weight);
         }}
      />

      /* E N D  - P R O M P T S -------------------------- */
      /* S E T  - D A T A ---------------------*/
        <View style={styles.setContainer}>
          // "set" input
          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptSets: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>SETS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.sets}</Text>
          </TouchableOpacity>

          // "rep" input
          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptReps: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>REPS</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.reps}</Text>
          </TouchableOpacity>

          // "weight" input
          <TouchableOpacity onPress={()=>(this.setState({
            visiblePromptWeight: true
          }))} style={styles.set}>
            <Text style={{fontSize: 15, color: '#ff7675'}}>WEIGHT</Text>
            <Text style={{fontSize:30, fontWeight: 'bold', color: '#ff7675'}}>{this.state.weight}</Text>
          </TouchableOpacity>
        </View>
        /* S E T  - D A T A ---------------------*/
      </View>
    )
  }
}

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
