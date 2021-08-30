import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import background from './../../images/UserPanelBackground.png';
import SmallPost from './SmallPost';
import Axios from 'axios';
import {NavigationActions} from 'react-navigation';

const {width: WIDTH} = Dimensions.get('window');

const MainPosts = ({navigation}) => {
  const [pref, setPref] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const _loadPosts = async () => {
      try {
        let request = `https://veggiesapp.herokuapp.com/posts/`;
        const result = await Axios.get(request);
        console.log(result);
        await setPosts(result);
      } catch (e) {
        console.log(e.response);
      }
    };
    _loadPosts();
  }, []);

  return (
    <ImageBackground source={background} style={styles.bgContainer}>
      <ScrollView>
        <View style={styles.textinputContainer}>
          <TextInput
            color="#e8e7e6"
            style={styles.textInput}
            placeholderTextColor="#e8e7e6"
            placeholder="Wpisz co chcesz znaleźć"
            underlineColorAndroid="transparent"
            onChangeText={pref => {
              setPref(pref);
            }}
          />
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 5, marginRight: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddPost');
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Dodaj Post</Text>
          </TouchableOpacity>
        </View>

        <View>
          {posts.data &&
            posts.data.map(item => {
              if (item.title.includes(pref)) {
                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SinglePost', {id: item.id});
                      }}>
                      <SmallPost title={item.title} imagePath={item.foto} />
                    </TouchableOpacity>
                  </View>
                );
              }
            })}
        </View>
      </ScrollView>
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
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ebebeb80',
    width: WIDTH - 50,
    borderRadius: 15,
  },
  textInput: {
    textAlign: 'center',
    alignSelf: 'stretch',
    color: '#e8e7e6',
    fontSize: 18,
  },
});

export default MainPosts;
