import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import background from '../../images/UserPanelBackground.png';
import Axios from 'axios';

const {width: WIDTH} = Dimensions.get('window');

const userPanel = ({navigation}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let user = {};
    user.login = 'Użytkownik';
    user.token;
    user.email = 'E-mail';
    user.weight;
    user.height;
    user.age;
    user.activity;
    user.activity2;

    const _loadLogin = async () => {
      try {
        await AsyncStorage.getItem('@user').then(log => {
          user.login = log;
        });
        await AsyncStorage.getItem('@token').then(tok => {
          user.token = tok;
        });
      } catch (e) {
        console.log(e.response);
      }
      let request = 'https://veggiesapp.herokuapp.com/me/';
      const fetchData = async () => {
        const result = await Axios.get(request, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `Token ${user.token}`,
          },
        });
        user.email = result.data.email;
        user.age = result.data.age;
        user.weight = result.data.weight;
        user.height = result.data.height;
        user.activity = result.data.activity;
        if (user.activity == 0) {
          user.activity2 = 'Brak Informacji';
        } else if (user.activity == 1) {
          user.activity2 = 'Brak Aktywności Fizycznej';
        } else if (user.activity == 2) {
          user.activity2 = 'Sporadyczna Aktywność Fizycznej';
        } else if (user.activity == 3) {
          user.activity2 = 'Średnia Aktywność Fizyczna';
        } else if (user.activity == 4) {
          user.activity2 = 'Regularna Aktywność Fizyczna';
        } else if (user.activity == 5) {
          user.activity2 = 'Sport to moje życie';
        }

        setUserData({...user});
      };
      fetchData();
    };
    _loadLogin();
  }, []);

  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.titleContainer}>
            <Text style={{fontSize: 32, color: '#e8e7e6', fontStyle: 'italic'}}>
              Panel Użytkownika
            </Text>
          </View>
          <View style={styles.loginContainer}>
            <Text style={{fontSize: 28, color: '#e8e7e6', fontWeight: '700'}}>
              {userData.login}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text
              style={{
                color: '#e8e7e6',
                fontSize: 26,
                fontStyle: 'italic',
                fontWeight: '700',
              }}>
              Informacje:
            </Text>
            <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 3}}>
              E-mail: {userData.email}
            </Text>
            <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 3}}>
              Wiek: {userData.age || 'Nie podano'}
            </Text>
            <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 3}}>
              Wzrost: {userData.height || 'Nie podano'}
            </Text>
            <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 3}}>
              Waga: {userData.weight || 'Nie podano'}
            </Text>
            <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 5}}>
              Aktywność: {userData.activity2 || 'Nie podano'}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            position: 'relative',
            marginRight: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('editUserData');
            }}>
            <Text style={{fontSize: 20, color: '#e8e7e6'}}>Edytuj dane!</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 20, color: '#e8e7e6'}}>
              Sprawdź postęp!
            </Text>
          </TouchableOpacity>
          {/* posty */}
          <View style={styles.infoContainer}>
            <Text
              style={{
                color: '#e8e7e6',
                fontSize: 26,
                fontStyle: 'italic',
                fontWeight: '700',
              }}>
              Posty:
            </Text>
          </View>
        </View>
        {/* posty */}
      </ScrollView>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          position: 'relative',
          marginRight: 20,
        }}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  loginContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 155,
    margin: 5,
    backgroundColor: '#ebebeb55',
    borderRadius: 55,
    paddingRight: 15,
    paddingLeft: 15,
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
  infoContainer: {
    width: WIDTH - 45,
    backgroundColor: '#ebebeb55',
    borderRadius: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 20,
    margin: 5,
  },
});

export default withNavigationFocus(userPanel);
