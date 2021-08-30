import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Picker,
  TouchableOpacity,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import background from '../../images/UserPanelBackground.png';
import Logo from '../../images/PanelLogNazwa.png';
import Axios from 'axios';

const {width: WIDTH} = Dimensions.get('window');

const ChangePassword = ({navigation}) => {
  const [userPass1, setUserPass1] = useState();
  const [userPass2, setUserPass2] = useState();
  const [token, setToken] = useState();
  const [login, setLogin] = useState();

  useEffect(() => {
    _getLogin();
  }, []);

  const _getLogin = async () => {
    try {
      await AsyncStorage.getItem('@login').then(log => {
        setLogin(log);
      });
      await AsyncStorage.getItem('@token').then(tok => {
        setToken(tok);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const sendNewData = async () => {
    const fetchData = async () => {
      result = await Axios.put(
        'http://veggiesapp.herokuapp.com/me/',
        {
          login: login,
          password: userPass1,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `Token ${token}`,
          },
        },
      );
      console.log(result);
      return result;
    };
    await fetchData()
      .then(res => {
        console.log(res);
        if (res) {
          navigation.navigate('UserManager');
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={{fontSize: 32, color: '#e8e7e6', fontStyle: 'italic'}}>
            Zmiena Hasła
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image source={Logo} style={styles.logoContainer}></Image>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Hasło"
              onChangeText={pass1 => {
                setUserPass1(pass1);
              }}
              placeholderTextColor="#e8e7e6"
              underlineColorAndroid="transparent"></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="Powtórz Hasło"
              onChangeText={pass2 => {
                setUserPass2(pass2);
              }}
              placeholderTextColor="#e8e7e6"
              underlineColorAndroid="transparent"></TextInput>

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
                onPress={() => {
                  sendNewData();
                }}>
                <Text style={{color: '#e8e7e6', fontSize: 18}}>Zmień</Text>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: WIDTH - 285,
                  height: 33,
                  backgroundColor: '#d1d1d199',
                  borderRadius: 30,
                  marginTop: 10,
                }}
                onPress={() => {
                  navigation.navigate('UserManager');
                }}>
                <Text style={{color: '#e8e7e6', fontSize: 18}}>Wróć</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 70,
    margin: 5,
    backgroundColor: '#ebebeb55',
    borderRadius: 55,
    paddingRight: 15,
    paddingLeft: 15,
  },
  logoContainer: {
    margin: 25,
    position: 'relative',
    resizeMode: 'cover',
    width: 250,
    height: 80,
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
});

export default ChangePassword;
