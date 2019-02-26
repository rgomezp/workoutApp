import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitySelector from './ActivitySelector';
import ActivityPage from './ActivityPage';
import Activity from './Activity';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class App extends React.Component {
  static navigationOptions = (props) => ({
    title: "Your Personalized Workout"
  });

  render() {
    return (
      <View style={styles.container}>
        <ActivitySelector navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7675',
    padding:10,
  },
});

const RootStack = createStackNavigator({
  Home:{
    screen: App
  },
  Activity: {
    screen: ActivityPage
  },
});


export default createAppContainer(RootStack);
