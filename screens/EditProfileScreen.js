import React from 'react';
import  { ScrollView, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import '@firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';

import FingerPrint from '../components/FingerPrint'

export default class EditProfileScreen extends React.Component {
  state = {
    saved: '',
    name: '',
    email: '',
    bio: ' ',
    jobTitle: ' ',
    interests: [],
    currentInterest:'',
    skills: [],
    currentSkill: '',
    location: ' ',
    photo: ' ',
    user: {}
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      // console.log('user', user)
      // this.setState({email: user.email})

      const profile = firebase.firestore().collection('users').doc(user.email)

      profile.onSnapshot(doc => {
          if (doc && doc.exists) {
              console.log("Document data:", doc.data());
              const user = doc.data()
              this.setState({name: user.name})
              this.setState({email: user.email})
              this.setState({ bio: user.bio})
              this.setState({ jobTitle: user.jobTitle})
              this.setState({ location: user.location})
              this.setState({ skills: user.skills})
              this.setState({ interests: user.interests})
              this.setState({ user: user})
          } else {
              console.log("No such document!");
          }
        })
        .catch(function(error) {
        console.log("Error getting document:", error);
        });
    })
  }
  saveProfileInfo = () => {
    firebase.firestore().collection("users").doc(this.state.email).update({
      "name": this.state.name,
      "bio": this.state.bio,
      "jobTitle": this.state.jobTitle,
      "location": this.state.location,
      "photo": this.state.photo,
      "interests": this.state.interests,
      "skills": this.state.skills
    })
    console.log('Saved!')
    this.props.navigation.navigate("Profile")
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Edit My Profile </Text>
        <View>
          <Text>Photo:</Text>
          <Text>Functionaliy coming soon ...</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Name:</Text>
          <TextInput
            autoCapitalize='none'
            placeholder={this.state.name}
            onChangeText={ name => this.setState({name})}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.subTitle}>Bio:</Text>
          <TextInput
            autoCapitalize='none'
            placeholder={this.state.bio}
            onChangeText={ bio => this.setState({bio})}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.subTitle}>Location:</Text>
          <TextInput
            autoCapitalize='none'
            placeholder={this.state.location}
            onChangeText={ location => this.setState({location})}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.subTitle}>Job Title:</Text>
          <TextInput
            autoCapitalize='none'
            placeholder={this.state.jobTitle}
            onChangeText={ jobTitle => this.setState({jobTitle})}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.subTitle}>Interests:</Text>
          <FlatList
            data={this.state.interests}
            renderItem={({item}) =>
              <View>
                <Text>{item}</Text>
                <TouchableOpacity
                  onPress={()=> {
                    console.log('item', item)
                    this.setState({ interests: this.state.interests.filter( interest => interest !== item)})
                  }}
                >
                  <Text style={{color:'red'}}>Remove Interest</Text>
                </TouchableOpacity>
              </View>}
          />
          <TextInput
            autoCapitalize='none'
            placeholder='Add Interest...'
            value={this.state.currentInterest}
            onChangeText={ interest => this.setState({currentInterest: interest})}
          ></TextInput>
          <Button
            title='Add interest '
            onPress={()=> {
              this.state.interests.push(this.state.currentInterest)
              this.setState({currentInterest: ''})
            }}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Skills:</Text>
          <FlatList
            data={this.state.skills}
            renderItem={({item}) =>
              <View>
                <Text>{item}</Text>
                <TouchableOpacity
                  onPress={()=> {
                    console.log('item', item)
                    this.setState({ skills: this.state.skills.filter( skill => skill !== item)})
                  }}
                >
                  <Text style={{color:'red'}}>Remove Skill</Text>
                </TouchableOpacity>

              </View>}
          />
          <TextInput
            autoCapitalize='none'
            placeholder='Add Skill...'
            value={this.state.currentSkill}
            onChangeText={ skill => this.setState({ currentSkill: skill})}
          ></TextInput>
          <Button
            title='Add Skill'
            onPress={()=> {
              this.state.skills.push(this.state.currentSkill)
              this.setState({ currentSkill: ''})
            }}
          />
        </View>
        <View>
          <FingerPrint />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> {
            this.saveProfileInfo()
            this.setState({saved:'Saved!'})
          }}
        >
          <Text>Save Profile Changes</Text>
        </TouchableOpacity>
        <View>
          <Text>{this.state.saved}</Text>
          <Text>{this.state.saved ? `:${this.state.name}:` : ''}</Text>
          <Text>{this.state.saved ? this.state.email : ''}</Text>
          <Text>{this.state.saved ? this.state.bio : ''}</Text>
          <Text>{this.state.saved ? this.state.interests : ''}</Text>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  button: {
    backgroundColor: 'dodgerblue',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    color: 'dodgerblue',
    fontSize: 30,
    textAlign: 'center'
  },
  subTitle:{
    color: 'dodgerblue',
    fontSize: 25
  }
})
