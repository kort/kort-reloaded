import React from 'react';
import { View,
  Text,
  StyleSheet,
  ScrollView,
  Image } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin,
  GoogleSigninButton } from 'react-native-google-signin';
import UserActions from '../actions/UserActions';
import LoginActions from '../actions/LoginActions';
import loginStore from '../stores/LoginStore';
import Config from '../constants/Config';

const google = Config.GOOGLE;
const googleWebClientId = Config.GOOGLE_WEB_CLIENT_ID;
const googleIosClientId = Config.IOS_GOOGLE_CLIENT_ID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogo: {
    alignItems: 'flex-start',
  },
  containerLoginText: {
    flex: 1,
    justifyContent: 'center',
  },
  containerLoginDescription: {
    borderRadius: 10,
    backgroundColor: '#808080',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  containerLoginButtons: {
    flex: 1,
  },
  kortlogo: {
    alignSelf: 'center',
    marginTop: 7,
    height: 64,
    width: 64,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 7,
  },
  textIntroduction: {
    textAlign: 'left',
    fontSize: 18,
    marginTop: 7,
  },
  textSubTitle: {
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onUserLoggedIn = this.onUserLoggedIn.bind(this);
  }

  componentDidMount() {
    loginStore.addChangeListener(this.onUserLoggedIn);

    this.configureGoogleSignIn();
  }

  componentWillUnmount() {
    loginStore.removeChangeListener(this.onUserLoggedIn);
  }

  onUserLoggedIn() {
    this.goToTabView();
  }

  goToTabView() {
    if (loginStore.isLoggedIn()) Actions.tabbar();
  }

  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
      iosClientId: googleIosClientId,
    });
  }

  signInGoogle() {
    GoogleSignin.signIn()
    .then((user) => LoginActions.verifyUser(google, user.idToken))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {
    const _scrollView = ScrollView;
    return (
      <View style={styles.container}>
        <View style={styles.containerLogin}>
          <View style={styles.containerLogo}>
            <Image style={styles.kortlogo}
              source={require('../assets/img/kort-logo.png')}
            />
          </View>
          <View style={styles.containerLoginText}>
            <View style={styles.containerLoginDescription}>
              <Text style={styles.textIntroduction}> • Complete Missions</Text>
              <Text style={styles.textIntroduction}> • Collect Koins</Text>
              <Text style={styles.textIntroduction}> • Improve OpenStreetMap</Text>
            </View>
            <Text style={styles.textSubTitle}>
              Kort helps to improve the data in OpenStreetMap.
            </Text>
          </View>
          <View style={styles.containerLoginButtons}>
            <Text style={styles.textTitle}>
              Login now to begin your mission!
            </Text>
            <Text style={styles.textSubTitle}>
              Other providers will be added.
            </Text>
            <GoogleSigninButton
              style={{ alignSelf: 'center', width: 120, height: 44, marginTop: 7 }}
              color={GoogleSigninButton.Color.Light}
              size={GoogleSigninButton.Size.Icon}
              onPress={() => { this.signInGoogle(); }}
            />
          </View>
        </View>
      </View>
    );
  }
}
