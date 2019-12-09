import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'

export default class ProfileScreen extends React.Component {

  state = {
    email:'',
    name:'',
    bio:'',
    jobTitle:''
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
  render(){
    // this.getUser();
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> My Profile </Text>
        {/* <Text>
          Here is some text until i can figure out the console.log stuff
        </Text> */}
        <View>
          <Text>Photo:</Text>
          <Text>Coming Soon ...</Text>

        </View>
        <View>
          <Text>Name:</Text>
          <Text>{this.state.name} </Text>

        </View>
        <View>
          <Text>Email:</Text>
          <Text>{this.state.email}</Text>
        </View>
        <View>
          <Text>Bio:</Text>
          <Text>{this.state.bio}</Text>

        </View>
        <View>
          <Text>Job Title:</Text>
          <Text> {this.state.jobTitle}</Text>
        </View>
        <View>
          <Text>Interests:</Text>
          <FlatList
            data={this.state.interests}
            renderItem={({item}) => <Text>{item}</Text>}
          />

        </View>
        <View>
          <Text>Skills:</Text>
          <FlatList
            data={this.state.skills}
            renderItem={({item}) => <Text>{item}</Text>}
          />

        </View>
        <View>
          <Text>Location:</Text>
          <Text> {this.state.location}</Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> this.props.navigation.navigate("EditProfile")}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
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
  }
});
