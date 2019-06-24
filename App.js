import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitySelector from './components/ActivitySelector';
import ActivityPage from './components/ActivityPage/ActivityPage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {whyDidYouUpdate} from 'why-did-you-update';

// console.disableYellowBox = true;
// whyDidYouUpdate(React, {exclude: /^YellowBox/ });

class App extends React.Component {
  static navigationOptions = (props) => ({
    title: "Gym Buddy"
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



// RESOURCES
/*
 Ejecting from Expo: https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729
*/