import React from 'react';
import  { ScrollView, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import '@firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';



export default class EditProfileScreen extends React.Component {
  state = {
    saved: '',
    name: '',
    email: '',
    bio: ' ',
    jobTitle: ' ',
    interests: ['flying'],
    currentInterest:' ',
    skills: ['JavaScript'],
    currentSkill: ' ',
    location: ' ',
    photo: ' ',
    user: {}
  }

  componentDidMount(){
    //need to first get auth user from firebase
    //then get that specific user from firestore based off the email form firebase auth
    //then mount that info into the state so it can be edited
    // if a field is mempty then it can use the firebase info for that field when updating
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
              // doc.data() will be undefined in this case
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
    this.setState({currentInterest: ''})
    this.setState({currentSkill: ''})
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
        {/* <View>
          <Text>Email:</Text>
          <TextInput
            autoCapitalize='none'
            placeholder={this.state.email}
            onChangeText={ email => this.setState({email})}
          ></TextInput>
        </View> */}
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
              <Button
              onPress={()=> {
                console.log('item', item)
              }}
              title='Remove Interest'/>

              </View>}
          />
          <TextInput
            autoCapitalize='none'
            onChangeText={ interest => this.setState({currentInterest: interest})}
          ></TextInput>
          <Button
            title='Add interest '
            placeholder='Add Interest'
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
              <Button
              onPress={()=> {
                console.log('item', item)
              }}
              title='Remove Skill'/>

              </View>}
          />
          <TextInput
            autoCapitalize='none'
            placeholder='Add Skill...'
            onChangeText={ skill => this.setState({ currentSkill: skill})}
          ></TextInput>
          <Button
            title='Add Skill'
            onPress={()=> this.state.skills.push(this.state.currentSkill)}
          />
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
