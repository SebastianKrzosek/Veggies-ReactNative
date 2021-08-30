import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import background from '../../images/headerBg.jpg';
import profilePicture from '../../images/restaurantProfilePic.jpg';
const Header = () => {
  return (
    <ImageBackground style={styles.headerBackground} source={background}>
      <View style={styles.header}>
        <View style={styles.profilepicWrap}>
          <Image style={styles.profilepic} source={profilePicture}></Image>
        </View>
        <Text style={styles.name}>RESTAURANT NAME</Text>
        <Text style={styles.pos}>- Description -</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  profilepicWrap: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 16,
  },
  profilepic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  name: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  pos: {
    fontSize: 14,
    color: '#0394c0',
    fontWeight: '300',
    fontStyle: 'italic',
  },
});
export default Header;
