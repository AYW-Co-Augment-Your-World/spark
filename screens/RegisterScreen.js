import React from 'react';
import  { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import '@firebase/firestore'



export default class RegisterScreen extends React.Component {
  state={
    name: '',
    email: '',
    password: '',
    errorMessage: null
  }

  handleRegister = () => {
    const { email, password, name } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: name
        })
      })
      .catch(error => this.setState({ errorMessage: error.message}))

    firebase.firestore().collection("users").doc(email).set({
      name: name,
      email: email
    })
    .then(function(){
      console.log("Document created!")
    })
    .catch(function(error){
      console.error("error writing document: ", error)
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Welcome to SparkUpYourLife!</Text>
        <Text>Lets Register to get started!</Text>
        <View>
          {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        </View>
        <View style={styles.forms}>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={ name => this.setState({ name })}
              value={ this.state.name }
            ></TextInput>
          </View>
          <View style={{marginTop: 30}}>
             <Text style={styles.inputTitle}>Email Address</Text>
             <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={ email => this.setState({ email })}
              value={ this.state.email }
             ></TextInput>
          </View>
          <View style={{marginTop: 30}}>
             <Text style={styles.inputTitle}>Password</Text>
             <TextInput
             style={styles.input}
             autoCapitalize='none'
             secureTextEntry
             onChangeText={ password => this.setState({ password })}
             value={ this.state.password }
             ></TextInput>
           </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleRegister}
        >
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=> this.props.navigation.navigate("Login")}
        >
          <Text>
            Already a Part of SparkUpYourLife? <Text style={{fontWeight: '500'}}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  inputTitle:{
    color:'gray',
    fontSize: 10
  },
  form:{
    marginBottom: 48,
    marginHorizontal: 30
  },
  input:{
    borderBottomColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: 'black'
  },
  button: {
    backgroundColor: 'dodgerblue',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
