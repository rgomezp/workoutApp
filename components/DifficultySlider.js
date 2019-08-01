import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {Slider} from 'react-native-elements';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {holdingArea} from './SetContainer/actions';

class DifficultySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty : "The workout I did was",
      sliderVal  : 0,
    }
  }
  
  /* check difficulty
   * used to check the slider value and update the difficulty description
   */
  checkDifficulty = (value) => {
    let difficulty = Math.floor(value*10)+"";
    this.props.holdingArea({difficulty});

    if(value <= .2){
      this.setState({difficulty: difficulty+": Pshhh. Piece of cake", sliderVal: value})
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

  render() {
    return (
      <View>
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
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  holdingArea,
}, dispatch);

export default connect(null, mapDispatchToProps)(DifficultySlider);