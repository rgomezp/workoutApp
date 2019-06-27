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
 https://itnext.io/react-component-class-vs-stateless-component-e3797c7d23ab
 https://medium.com/wix-engineering/two-mistakes-in-react-js-we-keep-doing-over-and-over-again-b1aea20fb3f0
 https://facebook.github.io/react-native/docs/flatlist
 https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729
 https://github.com/stoffern/react-native-optimized-flatlist
 */