import React, { Component } from 'react';
import {Image, TouchableOpacity, Text, View, StyleSheet, Dimensions} from 'react-native';
import Panel from './Panel';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class TrackingPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      panelHeight : 0,
      hide:1,
    }
  }

  showPanel = () => {
    let hide = !this.state.hide;

    if(this.state.panelHeight == 180){
      this.setState({panelHeight: 0, hide})
    }else{
      this.setState({panelHeight: 180, hide});
    }
  }

  render() {
    return (
      <View>
        <View>
          <Image
            style={{alignSelf: 'stretch', height: 180}}
            source={{uri:'https://cdn2.coachmag.co.uk/sites/coachmag/files/2017/05/bench-press_0.jpg'}}
            />
            <View style={[styles.overlay, {height: this.state.panelHeight},]}>
              <Panel hide={this.state.hide} history={this.props.history[this.props.title]}/>
            </View>
        </View>
        <View>
          <TouchableOpacity style={styles.historyButton} onPress={this.showPanel}>
            <Text style={styles.textColor}>TRACKING</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  historyButton:{
    backgroundColor: '#FFC4C4',
    alignItems: 'center',
    padding:3
  },
  overlay:{
    flex: 1,
    position: 'absolute',
    backgroundColor: '#ff7675',
    width: width
  },
  textColor : {
    color : '#ff7675',
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({
  history : state.history
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPanel);