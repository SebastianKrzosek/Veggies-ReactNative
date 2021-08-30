import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Axios from 'axios';
import {withNavigationFocus} from 'react-navigation';
import SmallRecipe from './SmallRecipe';
import background from '../../images/UserPanelBackground.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');

const RecipeFinder = ({navigation}) => {
  const [prefix, setPrefix] = useState('');
  const [recipes, setRecipes] = useState([]);

  const _findRecipes = async () => {
    try {
      let request = `https://veggiesapp.herokuapp.com/recipes/?prefix=${prefix}&ingredients=`;
      const result = await Axios.get(request);
      console.log(result);
      await setRecipes(result.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <ImageBackground style={styles.bgContainer} source={background}>
      <View>
        <View style={{alignItems: 'flex-end', marginTop: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Substitute')}>
            <Text style={{color: 'white', fontSize: 20}}>Znajdz zamiennik</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textinputContainer}>
          <TextInput
            color="#e8e7e6"
            style={styles.textInput}
            placeholderTextColor="#e8e7e6"
            placeholder="przepis"
            underlineColorAndroid="transparent"
            onChangeText={pref => {
              setPrefix(pref);
            }}
          />
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 5, marginRight: 10}}>
          <TouchableOpacity
            onPress={() => {
              _findRecipes();
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Znajdz przepis</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {recipes &&
            recipes.map(item => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SingleRecipe', {id: item.id});
                    }}>
                    <SmallRecipe
                      title={item.recipe_name}
                      path={item.recipe_foto}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
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
    justifyContent: 'flex-start',
  },
  textinputContainer: {
    alignItems: 'center',
    marginTop: 10,
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

export default withNavigationFocus(RecipeFinder);
