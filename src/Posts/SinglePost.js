import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PostComment from './PostComment';
import background from '../../images/UserPanelBackground.png';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const {width: WIDTH} = Dimensions.get('window');

const SinglePost = ({navigation}) => {
  const [post, setPost] = useState({});
  const [comm, setComm] = useState('');
  const [commPhoto, setCommPhoto] = useState();
  const [token, setToken] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    setId(navigation.state.params.id);
    const _loadPost = async () => {
      try {
        let request = `https://veggiesapp.herokuapp.com/posts/${
          navigation.state.params.id
        }/`;
        const result = await Axios.get(request);
        console.log(result);
        await setPost(result);
      } catch (e) {
        console.log(e.response);
      }
    };
    _loadPost();
    _getLogin();
  }, []);

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
          setCommPhoto(response);
        }
      },
    );
  };

  const _getLogin = async () => {
    try {
      await AsyncStorage.getItem('@token').then(tok => {
        setToken(tok);
      });
    } catch (e) {
      console.log(e.response);
    }
  };

  const controlSendComm = () => {
    if (comm.length < 2) {
      alert('Wpisz Komentarz');
    } else {
      sendComm();
    }
  };

  const sendComm = async () => {
    const data = new FormData();
    data.append('description', comm);
    data.append('title', null);
    data.append('foto', {
      uri: commPhoto.uri,
      type: commPhoto.type,
      name: commPhoto.fileName,
    });

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: `Token ${token}`,
      },
      body: data,
    };
    fetch(
      `http://veggiesapp.herokuapp.com/posts/${navigation.state.params.id}/`,
      config,
    )
      .then(res => {
        console.log(res);
        navigation.push('SinglePost', {id});
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  if (post.data) {
    return (
      <ImageBackground source={background} style={styles.bgContainer}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text
              style={{
                fontSize: 24,
                alignItems: 'flex-start',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              {post.data[0].title}
            </Text>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>
              {post.data[0].author.username}
            </Text>
          </View>
          <View style={styles.TextContainer}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontStyle: 'italic',
                alignSelf: 'center',
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}>
              {post.data[0].description}
            </Text>
            <View>
              {post.data[0].foto !== null && (
                <Image
                  style={{
                    width: 250,
                    height: 220,
                    borderRadius: 15,
                    margin: 10,
                  }}
                  source={{uri: post.data[0].foto}}
                />
              )}
            </View>
          </View>

          <View>
            <View style={styles.textinputContainer}>
              <TextInput
                color="#e8e7e6"
                style={styles.textInput}
                placeholderTextColor="#e8e7e6"
                placeholder="Komentarz"
                underlineColorAndroid="transparent"
                onChangeText={pref => {
                  setComm(pref);
                }}
              />
            </View>

            <ScrollView>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => controlSendComm()}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Skomentuj
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    addPostPhoto();
                  }}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Dodaj Zdjecie
                  </Text>
                </TouchableOpacity>
              </View>
              {post.data[1] &&
                post.data[1].map(item => {
                  return (
                    <View key={item.id}>
                      <PostComment
                        author={item.author.username}
                        text={item.description}
                        imagePath={item.foto}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 70,
    margin: 5,
    backgroundColor: '#ebebeb80',
    borderRadius: 55,
    paddingRight: 15,
    paddingLeft: 15,
  },
  TextContainer: {
    alignItems: 'center',
    width: WIDTH - 45,
    backgroundColor: '#ebebeb80',
    borderRadius: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 20,
    margin: 5,
  },
  textInput: {
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#e8e7e6',
    fontSize: 18,
  },
  textinputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#ebebeb80',
    width: WIDTH - 50,
    borderRadius: 15,
  },
});

export default SinglePost;
