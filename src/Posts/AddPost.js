import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import background from './../../images/UserPanelBackground.png';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
const {width: WIDTH} = Dimensions.get('window');

const AddPost = ({navigation}) => {
  const [postPhoto, setPostPhoto] = useState('');
  const [token, setToken] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    _getLogin();
  }, []);

  const _getLogin = async () => {
    try {
      await AsyncStorage.getItem('@token').then(tok => {
        console.log(tok);
        setToken(tok);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const controlSendPost = () => {
    if (title.length < 2) {
      alert('Wpisz Tytuł');
    } else {
      if (desc.length < 2) {
        alert('Uzupelnij Opis');
      } else {
        sendPost();
      }
    }
  };

  const sendPost = async () => {
    const data = new FormData();
    data.append('title', title);
    data.append('description', desc);
    data.append('foto', {
      uri: postPhoto.uri,
      type: postPhoto.type,
      name: postPhoto.fileName,
    });

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: `Token ${token}`,
      },
      body: data,
    };
    fetch('http://veggiesapp.herokuapp.com/posts/', config)
      .then(res => {
        if (res.status && res.status === 200) {
          navigation.push('MainPosts');
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const addPostPhoto = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Wybierz zdjęcie do komentarza',
        takePhotoButtonTitle: 'Zrób zdjęcie',
        chooseFromLibraryButtonTitle: 'Wybierz zdjęcie z biblioteki',
      },
      response => {
        if (response.didCancel) {
          console.log('anulowano');
        } else if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.uri);
          setPostPhoto(response);
        }
      },
    );
  };

  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 24, color: 'white', fontStyle: 'italic'}}>
          Publikacja Postów
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <View style={styles.textinputContainer}>
          <TextInput
            autoCorrect={false}
            multiline={true}
            color="#e8e7e6"
            style={styles.textInput}
            placeholderTextColor="#e8e7e6"
            placeholder="Temat"
            underlineColorAndroid="transparent"
            onChangeText={tit => {
              setTitle(tit);
            }}
          />
        </View>
        <View style={styles.textinputContainer2}>
          <TextInput
            autoCorrect={false}
            multiline={true}
            color="#e8e7e6"
            style={styles.textInput}
            placeholderTextColor="#e8e7e6"
            placeholder="Tresc"
            underlineColorAndroid="transparent"
            onChangeText={des => {
              setDesc(des);
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              addPostPhoto();
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Dodaj Zdjecie</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: WIDTH - 80,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {postPhoto != '' && (
            <Image
              style={{
                width: WIDTH - 100,
                height: 250,
                borderRadius: 15,
                margin: 10,
              }}
              source={{uri: postPhoto.uri}}
            />
          )}
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => {
              controlSendPost();
            }}>
            <Text style={styles.textButton}>Opublikuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
  },
  textinputContainer: {
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#ebebeb80',
    width: WIDTH - 50,
    borderRadius: 15,
  },
  textinputContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#ebebeb80',
    height: 110,
    width: WIDTH - 50,
    borderRadius: 15,
  },
  textInput: {
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#e8e7e6',
    fontSize: 18,
  },
  postButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 155,
    height: 33,
    backgroundColor: '#d1d1d199',
    borderRadius: 30,
    marginTop: 10,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#e8e7e6',
  },
});

export default AddPost;
