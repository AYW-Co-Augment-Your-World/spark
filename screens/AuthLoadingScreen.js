import React from 'react';
import  { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';


export default class AuthLoadingScreen extends React.Component {

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      // console.log('user', user)
      this.props.navigation.navigate(user ? "Main" : "Auth")
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <Text>The App will momentarially load.</Text>
        <ActivityIndicator size='large' />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
