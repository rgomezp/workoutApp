import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutSelector from './components/WorkoutSelector/WorkoutSelector';
import WorkoutPage from './components/WorkoutPage/WorkoutPage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'remote-redux-devtools';
//import { composeWithDevTools } from 'redux-devtools-extension';
import {whyDidYouUpdate} from 'why-did-you-update';
import logger from 'redux-logger';

// console.disableYellowBox = true;
// whyDidYouUpdate(React, {exclude: /^YellowBox/ });

// create redux store
const store = createStore(rootReducer, applyMiddleware());

const RootStack = createStackNavigator({
  Home:{
    screen: WorkoutSelector
  },
  Workout: {
    screen: WorkoutPage
  },
});

let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation screenProps={{store}}/>
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
