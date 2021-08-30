import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Profil extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 40, color: 'white'}}>Po zalogowaniu</Text>
        <TouchableOpacity onPress={this.logout}>
          <Text style={{fontSize: 20}}>Wyloguj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('editUserData')}>
          <Text style={{fontSize: 30, color: '#fff'}}>Skrót</Text>
        </TouchableOpacity>
      </View>
    );
  }

  logout = async () => {
    try {
      AsyncStorage.removeItem('@user');
      this.props.navigation.navigate('Login');
    } catch (e) {
      console.log(e.response);
    }
  };
}

export default Profil;
