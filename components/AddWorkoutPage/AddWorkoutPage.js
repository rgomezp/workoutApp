import React from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage} from 'react-native';
import SetContainer from '../SetContainer/SetContainer';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateDataInRedux, updateHistoryInRedux} from './actions';
import WorkoutHelper from '../WorkoutHelper';

/*
 * ADD WORKOUT PAGE
*/

var width = Dimensions.get('window').width; //full width

class ActivityPage extends React.Component{
  static navigationOptions = () => ({
    title: "Add Workout"
  });
  constructor(props){
    super(props);
    this.state={
      title: "",
      notes: "",
      isValid: false,
      unsubListener: this.props.screenProps.store.subscribe(this.reduxListener)
    }
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

    let setsAreSet = Boolean(sets || sets == "0");  
    let repsAreSet = Boolean(reps || reps == "0");  
    let weightIsSet = Boolean(weight || weight == "0");

    this.setState({setsAreSet, repsAreSet, weightIsSet}, () => {
      this.checkIsValid();
    });
  }

  componentWillUnmount() {
    this.state.unsubListener();
  }

  checkIsValid() {
    if(this.state.setsAreSet && this.state.repsAreSet && this.state.weightIsSet && this.state.title) {
      this.setState({isValid: true});
    } else {
      this.setState({isValid: false});
    }
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
  
  titleChange = (text) => {
    this.setState({title: text}, () => {
      this.checkIsValid();
    });
  }

  render(){
    const exercise = {sets:'', weight:'', reps:'', difficulty:''};
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200} enabled>
        <ScrollView>
          <View style={{alignSelf:'stretch', padding: 10}}>
            <TextInput multiline={false} autoCapitalize='characters' style={{fontWeight: 'bold', color:'#4841BB', fontSize:25}}
              onChangeText={this.titleChange} value={this.state.title} placeholder="WORKOUT NAME"
            />
          </View>
          {/*--------SETS---------*/}
          <SetContainer
            exercise={exercise}
          />
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