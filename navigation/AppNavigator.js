import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import MainTabNavigator from './MainTabNavigator';

import * as firebase from 'firebase';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';

import  { FIREBASE_KEY } from 'react-native-dotenv'

//put in the config stuff here

//Dominique Settings

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "spark-ayw.firebaseapp.com",
  databaseURL: "https://spark-ayw.firebaseio.com",
  projectId: "spark-ayw",
  storageBucket: "spark-ayw.appspot.com",
  messagingSenderId: "84494988286",
  appId: "1:84494988286:web:ebc6b8b3630399bfc486af",
  measurementId: "G-R1V75EYLTS"
};


//dom's  Settings 2
// var firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: "ayw-spark.firebaseapp.com",
//   databaseURL: "https://ayw-spark.firebaseio.com",
//   projectId: "ayw-spark",
//   storageBucket: "ayw-spark.appspot.com",
//   messagingSenderId: "795889190662",
//   appId: "1:795889190662:web:22d03de6896db2ca52c087",
//   measurementId: "G-LGB8F603HW"
// };



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AuthStacK = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Auth: AuthStacK,
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);


// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );
