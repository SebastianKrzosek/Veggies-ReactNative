import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import background from '../../images/UserPanelBackground.png';
const Logout = ({navigation}) => {
  useEffect(() => {
    logoutMethod();
  });

  const logoutMethod = async () => {
    try {
      AsyncStorage.removeItem('@user');
      AsyncStorage.removeItem('@token');
      navigation.navigate('Login');
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <ImageBackground
      source={background}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}></ImageBackground>
  );
};
export default Logout;
