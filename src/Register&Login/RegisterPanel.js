import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import background from '../../images/Panelrejestracji.png';
import Logo from '../../images/PanelLogNazwa.png';
import Axios from 'axios';
const {width: WIDTH} = Dimensions.get('window');

class RegisterPanel extends Component {
  state = {login: '', haslo1: '', haslo2: '', email: ''};
  render() {
    return (
      <ImageBackground source={background} style={styles.bgContainer}>
        <KeyboardAvoidingView>
          <View style={{flex: 1, marginTop: 35, alignItems: 'center'}}>
            <View>
              <Image source={Logo} style={styles.logoContainer}></Image>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                autoCompleteType="username"
                style={styles.textInput}
                placeholder="Login"
                onChangeText={username => this.setState({login: username})}
                placeholderTextColor="#e8e7e6"
                underlineColorAndroid="transparent"></TextInput>
            </View>
            <View>
              <TextInput
                autoCompleteType="email"
                style={styles.textInput}
                placeholder="E-Mail"
                onChangeText={mail => this.setState({email: mail})}
                placeholderTextColor="#e8e7e6"
                underlineColorAndroid="transparent"></TextInput>
            </View>
            <View>
              <TextInput
                autoCompleteType="password"
                style={styles.textInput}
                placeholder="Haslo"
                onChangeText={password1 => this.setState({haslo1: password1})}
                placeholderTextColor="#e8e7e6"
                underlineColorAndroid="transparent"
                secureTextEntry={true}></TextInput>
            </View>
            <View>
              <TextInput
                autoCompleteType="password"
                style={styles.textInput}
                placeholder="Powtórz Haslo"
                onChangeText={password2 => this.setState({haslo2: password2})}
                placeholderTextColor="#e8e7e6"
                underlineColorAndroid="transparent"
                secureTextEntry={true}></TextInput>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: WIDTH - 185,
                  height: 33,
                  backgroundColor: '#d1d1d199',
                  borderRadius: 30,
                  marginTop: 10,
                }}
                onPress={this.register}>
                <Text style={{color: '#e8e7e6', fontSize: 18}}>
                  Zarejestruj się
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, color: '#e8e7e6', marginTop: 5}}>
                Masz już konto?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{fontSize: 18, color: '#e8e7e6'}}>
                  Zaloguj się
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }

  register = () => {
    if (this.state.login == '' || this.state.login.length < 3) {
      alert('Wybierz inny login');
    } else {
      if (!this.validateEmail(this.state.email)) {
        alert('E-mail nie jest poprawny');
      } else {
        if (
          this.state.haslo1 === this.state.haslo2 &&
          this.state.haslo1 != '' &&
          this.state.haslo1.length > 4
        ) {
          this.registrationMethod();
        } else {
          alert('Hasła się różnią lub są zbyt krótkie');
        }
      }
    }
  };

  registrationMethod = async () => {
    const fetchData = async () => {
      result = await Axios.post(
        'http://veggiesapp.herokuapp.com/users/',
        {
          username: this.state.login,
          email: this.state.email,
          password: this.state.haslo1,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      );
      return result;
    };
    await fetchData()
      .then(res => {
        if (res) {
          alert('Konto założone! Zaloguj się!');
          this.props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: WIDTH - 105,
    padding: 8,
    marginBottom: 12,
    alignSelf: 'stretch',
    color: '#e8e7e6',
    backgroundColor: '#ebebeb55',
    fontSize: 20,
    marginHorizontal: 10,
    borderRadius: 45,
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 185,
    height: 33,
    backgroundColor: '#d1d1d199',
    borderRadius: 30,
    marginTop: 15,
  },
  logoContainer: {
    margin: 25,
    position: 'relative',
    resizeMode: 'cover',
    width: 320,
    height: 110,
  },
});

export default RegisterPanel;
