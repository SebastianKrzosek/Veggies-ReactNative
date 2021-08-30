import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import SingleSubstiute from './singleSubstiute';
import SingleVeganSubstiute from './singleVeganSubstiute';
import background from '../../images/zamienniki.png';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
class Example extends Component {
  state = {
    foods: [],
    vegFoods: [],
    query: '',
    token: '',
    id: 0,
    description: '',
  };

  _loadToken = async () => {
    try {
      await AsyncStorage.getItem('@token').then(tok => {
        this.setState({token: tok});
      });
    } catch (e) {
      console.log(e.resposne);
    }
  };

  componentDidMount() {
    this._loadToken;
  }

  _loadData = async text => {
    this.setState({query: text});
    await fetch(
      `https://veggiesapp.herokuapp.com/substitute/nveg/?prefix=${text}`,
    )
      .then(res => res.json())
      .then(json => {
        this.setState({foods: json});
        this.setState({description: json.description});
      })
      .catch(function(error) {
        console.log(error.resposne);
      });
  };

  _loadVegData = async () => {
    await Axios.get(`https://veggiesapp.herokuapp.com/substitute/veg/`)
      .then(res => {
        console.log(res.data);
        const newTemp = res.data.reduce((acc, obj) => {
          let nextLoop = false;

          acc.forEach(savedFood => {
            if (
              obj.id_food_to_substitute.id ===
              savedFood.id_food_to_substitute.id
            ) {
              savedFood.id_vegan.push(obj.id_vegan);
              nextLoop = true;
              return acc;
            }
          });
          if (!nextLoop) {
            acc.push({...obj, id_vegan: [obj.id_vegan]});
          }
          return acc;
        }, []);
        console.log('PPPP');
        console.log(newTemp);

        this.setState({vegFoods: newTemp});
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response);
      });
  };

  findFood(query) {
    if (query.length < 1) {
      return [];
    }
    const {foods} = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return foods.filter(food => food.food_name.search(regex) >= 0);
  }

  render() {
    const {query} = this.state;
    const {vegFoods} = this.state;
    const foods = this.findFood(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase();

    return (
      <ImageBackground source={background} style={styles.container}>
        <Autocomplete
          keyExtractor={(item, index) => index.toString()}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            foods.length === 1 && comp(query, foods[0].food_name) ? [] : foods
          }
          defaultValue={query}
          onChangeText={text => {
            if (text.length > 1) {
              this._loadData(text);
            }
          }}
          placeholder="Znajdz Zamiennik"
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({query: item.food_name});
                  this.setState({id: item.id});
                  this.setState({description: item.description});
                }}>
                <Text style={styles.itemText}>{item.food_name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.descriptionContainer}>
          {foods.length > 0 ? (
            <SingleSubstiute
              style={{position: 'absolute'}}
              name={this.state.query}
              description={this.state.description}
            />
          ) : (
            <Text style={styles.infoText} />
          )}
          <View>
            <TouchableOpacity
              onPress={() => {
                this._loadVegData();
              }}>
              <Text style={{fontSize: 24, color: 'white', marginTop: 5}}>
                Zastąp
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {vegFoods.map(
              item =>
                item.id_food_to_substitute.food_name.includes(query) &&
                item.id_vegan.map(veggie => {
                  return (
                    <View key={veggie.id}>
                      <SingleVeganSubstiute
                        style={{position: 'absolute'}}
                        name={veggie.name}
                        kcal={veggie.kcal}
                        protein={veggie.protein}
                        fat={veggie.fat}
                        carbs={veggie.carbs}
                        cellulose={veggie.cellulose}
                        category={veggie.category}
                      />
                    </View>
                  );
                }),
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 16,
  },
  autocompleteContainer: {
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: '#ffffff00',
    borderWidth: 0,
  },
  descriptionContainer: {
    marginTop: 10,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    fontSize: 24,
  },
});
export default withNavigationFocus(Example);
