import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import MainTabNavigator from './MainTabNavigator';

import * as firebase from 'firebase';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';

import  { FIREBASE_API_KEY } from 'react-native-dotenv'

//put in the config stuff here

//Dominique Settings

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "spark-ayw.firebaseapp.com",
  databaseURL: "https://spark-ayw.firebaseio.com",
  projectId: "spark-ayw",
  storageBucket: "spark-ayw.appspot.com",
  messagingSenderId: "84494988286",
  appId: "1:84494988286:web:ebc6b8b3630399bfc486af",
  measurementId: "G-R1V75EYLTS"
};


//Rob Settings
// const firebaseConfig = {
//   apiKey: "AIzaSyClsa65AFI6N6usb5Oq_BS41RmHq4ICXQE",
//   authDomain: "aywspark.firebaseapp.com",
//   databaseURL: "https://aywspark.firebaseio.com",
//   projectId: "aywspark",
//   storageBucket: "aywspark.appspot.com",
//   messagingSenderId: "949736465328",
//   appId: "1:949736465328:web:3a0a2c76f73763b571ac75",
//   measurementId: "G-JLPJ32MJWJ"
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
