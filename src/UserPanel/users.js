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

const userPanel = ({navigation, id}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let user = {};
    user.login = 'Użytkownik';
    user.token;

    const _loadLogin = async () => {
      try {
        await AsyncStorage.getItem('@token').then(tok => {
          user.token = tok;
        });
      } catch (e) {
        console.log(e.response);
      }
      let request = `https://veggiesapp.herokuapp.com/users/${id}`;
      const fetchData = async () => {
        const result = await Axios.get(request, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `Token ${user.token}`,
          },
        });
        setUserData(result.data);
      };
      fetchData();
    };
    _loadLogin();
  }, []);

  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <View style={styles.loginContainer}>
        <Text style={{fontSize: 28, color: '#e8e7e6', fontWeight: '700'}}>
          {userData.username}
        </Text>
      </View>
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
      {/* posty */}
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
