import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import FingerPrint from '../components/FingerPrint';
import * as firebase from 'firebase';

import * as Facebook from 'expo-facebook';

import * as Google from 'expo-google-app-auth';

//ROB - RELATED TO CHANGE IN MODULES BELOW
/*
import { AppAuth } from 'expo-app-auth';

// This value should contain your REVERSE_CLIENT_ID
const { URLSchemes } = AppAuth;

import * as GoogleSignIn from 'expo-google-sign-in';

*/

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
    //Rob - Change in modules code below
    //user: null
  };

  //ROB - RELATES TO CHANGE IN EXPO MODULES CODE BELOW
  /*
  componentDidMount() {
    this.initAsync();
  }



  initAsync = async () => {
    await GoogleSignIn.initAsync({
     behavior: 'web',
      clientId: 'SECRET',
    });
    this._syncUserWithStateAsync();
  };


  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  loginWithGoogle = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

*/

  //ROB NOTE - THE BELOW SIGN IN WORKS BETTER THAN THE CHANGES I TRIED TO MAKE TO GOOGLE LOGIN BUT IS DEPRECATED AND GIVES WARNINGS
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: 'SECRET',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  loginWithFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync('443898396314593', {
        permissions: ['email', 'public_profile']
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

        //*****ROB NOTE - NEED TO FIX THE BELOW TO LOGIN OR REGISTER
        //NEED TO LOGIN OR REGISTER
        //auth.signInWithCrediential(response)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to SparkUpYourLife!</Text>
        <Text>Login Screen</Text>
        <View>
          {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        </View>
        <View style={styles.forms}>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text>
            New to SparkUpYourLife?{' '}
            <Text style={{ fontWeight: '500' }}>Register</Text>
          </Text>
        </TouchableOpacity>

        <View>
          <Text> --------- </Text>
          <Text> Login using Facebook below:</Text>
          <TouchableOpacity
            onPress={() => this.loginWithFacebook()}
            style={{ backgroundColor: 'blue', padding: 10 }}
          >
            <Text style={{ color: 'white' }}> Login With Facebook </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.signInWithGoogleAsync()}
            style={{ backgroundColor: 'white', padding: 10 }}
          >
            <Text style={{ color: 'blue' }}> Sign In With Google </Text>
          </TouchableOpacity>
          <View>
            <FingerPrint />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputTitle: {
    color: 'gray',
    fontSize: 10
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  input: {
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
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20
  }
});
