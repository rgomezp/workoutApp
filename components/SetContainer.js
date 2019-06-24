import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, AsyncStorage} from 'react-native';
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
           inputPlaceholder = ""
           title="Input Sets"
           onBackButtonPress={()=>{}}
           placeholder="How many sets?"
           keyboardType="number-pad"
           isVisible={this.state.visiblePromptSets}
           onChangeText={(text) => {
             if(text.length<=3){
               this.saveData(this.props.exercise+":sets", text);
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
           }}
        />

        <Prompt
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Repetitions"
         onBackButtonPress={()=>{}}
         placeholder="How many reps?"
         isVisible={this.state.visiblePromptReps}
         onChangeText={(text) => {
           if(text.length<=3){
             this.saveData(this.props.exercise+":reps", text);
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
         }}
        />

        <Prompt
         inputPlaceholder = ""
         keyboardType="number-pad"
         title="Input Weight"
         onBackButtonPress={()=>{}}
         placeholder="How much weight?"
         isVisible={this.state.visiblePromptWeight}
         onChangeText={(text) => {
           if(text.length<=3){
             this.saveData(this.props.exercise+":weight", text);
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
