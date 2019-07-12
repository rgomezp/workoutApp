import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivitySelector from './components/WorkoutSelector/ActivitySelector';
import ActivityPage from './components/ActivityPage/ActivityPage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import {whyDidYouUpdate} from 'why-did-you-update';

// console.disableYellowBox = true;
// whyDidYouUpdate(React, {exclude: /^YellowBox/ });

// create redux store
const store = createStore(rootReducer, {});

const RootStack = createStackNavigator({
  Home:{
    screen: ActivitySelector
  },
  Activity: {
    screen: ActivityPage
  },
});

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

// RESOURCES
/*
 Ejecting from Expo: https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729
 https://itnext.io/react-component-class-vs-stateless-component-e3797c7d23ab
 https://medium.com/wix-engineering/two-mistakes-in-react-js-we-keep-doing-over-and-over-again-b1aea20fb3f0
 https://facebook.github.io/react-native/docs/flatlist
 https://medium.com/reactbrasil/being-free-from-expo-in-react-native-apps-310034a3729
 https://github.com/stoffern/react-native-optimized-flatlist
 */