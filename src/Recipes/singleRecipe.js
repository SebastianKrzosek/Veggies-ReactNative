import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  Picker,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigationFocus} from 'react-navigation';
const {width: WIDTH} = Dimensions.get('window');
import Comments from './comments';

const SingleRecipe = ({navigation, id}) => {
  const [token, setToken] = useState();
  const [recipe, setRecipe] = useState({});
  const [ratingDesc, setRatingDesc] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {
    const _loadToken = async () => {
      try {
        const itemId = navigation.state.params.id;
        let request = `https://veggiesapp.herokuapp.com/recipes/${itemId}`;
        const result = await Axios.get(request);
        await setRecipe(result);
      } catch (e) {
        console.log(e.response);
      }
    };
    _loadToken();
  }, []);

  const sendRating = async () => {
    try {
      await AsyncStorage.getItem('@token').then(tok => {
        setToken(tok);
      });
    } catch (e) {
      console.log(e.response);
    }
    const sendData = async () => {
      const itemId = navigation.state.params.id;
      let req = `https://veggiesapp.herokuapp.com/recipes/rating/${itemId}`;
      const result = await Axios.patch(
        req,
        {
          user_comment: ratingDesc,
          rating: rating,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: `Token ${token}`,
          },
        },
      );
      sendData();
    };
  };

  if (recipe.data) {
    console.log(recipe);
    console.log(recipe.data);
    return (
      <ImageBackground
        style={styles.backgroundContainer}
        source={{
          uri: recipe.data.recipe.recipe_foto,
        }}>
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.titleContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                }}>
                {recipe.data.recipe.recipe_name || 'Przepis'}
              </Text>
            </View>
            <View style={styles.ingredientsContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                }}>
                Skladniki
              </Text>
            </View>
            <ScrollView>
              {recipe.data.recipe.ingredients.map(item => {
                return (
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                );
              })}
            </ScrollView>

            <View style={styles.ingredientsContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                }}>
                Sposob przygotowania
              </Text>
            </View>
            <View style={{width: WIDTH - 60}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>
                {recipe.data.recipe.recipe_decription ||
                  'Jak krok po kroku przygotować tę potrawę'}
              </Text>
            </View>
            <View>
              <View
                style={{
                  height: 45,
                  width: WIDTH - 95,
                  backgroundColor: '#ebebeb55',
                  borderRadius: 45,
                  marginBottom: 7,
                }}>
                <Picker
                  style={{
                    color: '#e8e7e6',
                  }}
                  selectedValue={rating}
                  onValueChange={(itemValue, itemIndex) => {
                    setRating(itemValue);
                  }}>
                  <Picker.Item label="Bardzo słaby przepis" value={1} />
                  <Picker.Item label="Bez szału" value={2} />
                  <Picker.Item label="Był Ok" value={3} />
                  <Picker.Item label="Smakowało mi" value={4} />
                  <Picker.Item label="Rewelacja, polecam wszystkim" value={5} />
                </Picker>
              </View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  multiline={true}
                  style={styles.textInput}
                  placeholder="Skomentuj"
                  placeholderTextColor="#e8e7e6"
                  underlineColorAndroid="transparent"
                  onChangeText={rating => setRatingDesc(rating)}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (ratingDesc.length > 3 && rating != 0) {
                      sendRating();
                    }
                  }}>
                  <Text style={{fontSize: 24, color: 'white'}}>Wyślij</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView>
            {/* {recipe.data.rating.map(item => (
              <Comments
                name={item.id}
                comment={item.user_comment}
                rating={item.rating}
              />
            ))} */}
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  backgroundContainer: {
    width: null,
    height: null,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 70,
    margin: 5,
    backgroundColor: '#ebebeb55',
    borderRadius: 55,
    paddingRight: 15,
    paddingLeft: 15,
  },
  ingredientsContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH - 120,
    margin: 5,
    backgroundColor: '#ebebeb55',
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  textInput: {
    height: 100,
    textAlign: 'center',
    width: WIDTH - 95,
    color: '#e8e7e6',
    backgroundColor: '#ebebeb55',
    borderRadius: 15,
    fontSize: 18,
  },
});

export default withNavigationFocus(SingleRecipe);
