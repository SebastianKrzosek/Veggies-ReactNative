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

const editUserData = ({navigation}) => {
  const [userWeight, setUserWeight] = useState();
  const [userHeight, setUserHeight] = useState();
  const [userAge, setUserAge] = useState();
  const [userActivity, setUserActivity] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    _getLogin();
  }, []);

  const _getLogin = async () => {
    try {
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
          weight: userWeight,
          height: userHeight,
          age: userAge,
          activity: userActivity,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `Token ${token}`,
          },
        },
      );
      console.log(result.response);
      return result;
    };
    fetchData()
      .then(res => {
        if (res) {
          navigation.push('UserManager');
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
            Zmień Dane
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image source={Logo} style={styles.logoContainer} />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Waga"
              onChangeText={weight => {
                setUserWeight(weight);
              }}
              keyboardType={'numeric'}
              placeholderTextColor="#e8e7e6"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Wzrost"
              onChangeText={height => {
                setUserHeight(height);
              }}
              keyboardType={'numeric'}
              placeholderTextColor="#e8e7e6"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Wiek"
              onChangeText={age => {
                setUserAge(age);
              }}
              keyboardType={'numeric'}
              placeholderTextColor="#e8e7e6"
              underlineColorAndroid="transparent"
            />

            <View
              style={{
                width: WIDTH - 105,
                backgroundColor: '#ebebeb55',
                borderRadius: 45,
              }}>
              <Picker
                style={{
                  color: '#e8e7e6',
                }}
                selectedValue={userActivity}
                onValueChange={(itemValue, itemIndex) => {
                  setUserActivity(itemValue);
                }}>
                <Picker.Item label="Brak informacji" value={0} />
                <Picker.Item label="Brak Aktywności Fizycznej" value={1} />
                <Picker.Item label="Sporadyczna Aktywność Fizyczna" value={2} />
                <Picker.Item label="Średnia Aktywność Fizyczna" value={3} />
                <Picker.Item label="Regularna Aktywność Fizyczna" value={4} />
                <Picker.Item label="Sport to moje życie" value={5} />
              </Picker>
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
                onPress={() => {
                  sendNewData();
                }}>
                <Text style={{color: '#e8e7e6', fontSize: 18}}>
                  Zatwierdź Dane
                </Text>
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

export default editUserData;
