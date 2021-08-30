import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import background from '../../images/UserPanelBackground.png';

const {width: WIDTH} = Dimensions.get('window');

const Contact = ({navigation}) => {
  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 30,
            color: '#e8e7e6',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          Informacje Kontaktowe
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={{
            fontSize: 26,
            color: '#e8e7e6',
            fontWeight: '700',
          }}>
          E-mail:
        </Text>
        <Text style={{fontSize: 26, color: '#e8e7e6', paddingBottom: 3}}>
          veggies.support@gmail.com
        </Text>
        <Text style={{fontSize: 26, color: '#e8e7e6', fontWeight: '700'}}>
          Telefon:
        </Text>
        <Text style={{fontSize: 22, color: '#e8e7e6', paddingBottom: 3}}>
          663-900-531
        </Text>
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
            navigation.goBack();
          }}>
          <Text style={{color: '#e8e7e6', fontSize: 22}}>Wróć</Text>
        </TouchableOpacity>
      </View>
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
    padding: 50,
  },
  titleContainer: {
    padding: 10,
    height: 70,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 30,
    margin: 20,
    backgroundColor: '#ebebeb55',
    borderRadius: 55,
    paddingRight: 15,
    paddingLeft: 15,
  },
  infoContainer: {
    marginTop: 50,
    marginBottom: 15,
    width: WIDTH - 30,
    backgroundColor: '#ebebeb55',
    borderRadius: 15,
    padding: 15,
  },
});

export default Contact;
