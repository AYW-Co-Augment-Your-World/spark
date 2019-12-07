import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import MainTabNavigator from './MainTabNavigator';

import * as firebase from 'firebase';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';



//put in the config stuff here

//Dominique Settings

const firebaseConfig = {
  apiKey: "AIzaSyBDgO4-__VMSSLUM_61o-f1evii7u-df9s",
  authDomain: "spark-charlie.firebaseapp.com",
  databaseURL: "https://spark-charlie.firebaseio.com",
  projectId: "spark-charlie",
  storageBucket: "spark-charlie.appspot.com",
  messagingSenderId: "293828812888",
  appId: "1:293828812888:web:03565edf697b4695496a2d",
  measurementId: "G-ETD6MYYBKW"
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
