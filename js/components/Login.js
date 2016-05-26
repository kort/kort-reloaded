import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import UserActions from '../actions/UserActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '963836018928-tk23jtqent2p7s310ev8vt8q4mo97813.apps.googleusercontent.com',
    });

    GoogleSignin.currentUserAsync().then((user) => {
      console.log('USER', user);
      this.setState({ user: user });
    }).done();
  }

  componentWillUnmount() {
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({ user: user });
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({ user: null });
    })
    .done();
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <GoogleSigninButton style={ { width: 120, height: 44 } }
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Icon}
            onPress={() => { this._signIn(); }}
          />
        </View>
      );
    }
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome {this.state.user.name}
          </Text>
          <Text style={{ marginBottom: 20 }}>Your email is: {this.state.user.email}</Text>

          <Button onPress={() => {this._signOut(); }}>Log out</Button>

          <Text style={{ marginTop: 20 }}>Login page </Text>
          <Button onPress={Actions.tabbar}>Go to TabBar page </Button>
        </View>
      );
    }
  }
}

module.exports = Login;
