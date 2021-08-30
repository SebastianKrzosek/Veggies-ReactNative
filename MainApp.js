import React from 'react';
import {SafeAreaView, ScrollView, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import LoginPanel from './src/Register&Login/LoginPanel';
import Logout from './src/Register&Login/logout';
import Contact from './src/Register&Login/contact';
import Profil from './src/Profil';
import RegisterPanel from './src/Register&Login/RegisterPanel';
import UserManager from './src/UserPanel/userPanel';
import editUserData from './src/UserPanel/editUserData';
import ChangePassword from './src/UserPanel/changePass';
import AutoComplete from './src/Substiute/example';
// Restaurant
import RestaurantProfile from './src/Restaurants/restaurantProfile';
// Recipes
import SingleRecipe from './src/Recipes/singleRecipe';
import RecipeFinder from './src/Recipes/RecipeFinder';
// Posts
import SinglePost from './src/Posts/SinglePost';
import AddPost from './src/Posts/AddPost';
import MainPosts from './src/Posts/MainPosts';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer, withNavigationFocus} from 'react-navigation';
import Logo from './images/PanelLogNazwa.png';
import LinearGradient from 'react-native-linear-gradient';

const CustomDrawerComponent = props => (
  <LinearGradient
    style={{flex: 1}}
    locations={[0, 1.0]}
    colors={['#faffd1', '#a1ffce']}>
    <SafeAreaView>
      <View
        style={{
          height: 115,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Image source={Logo} style={{height: 95, width: 210}} />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View
        style={{
          marginTop: 290,
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'relative',
          bottom: 0,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            fontFamily: 'monospace',
            fontStyle: 'italic',
          }}>
          Copyright © Veggies
        </Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);
const UserManagerFocus = withNavigationFocus(UserManager);
const EditUserDataFocus = withNavigationFocus(editUserData);

const UserManagers = createStackNavigator(
  {
    UserManager: {screen: UserManagerFocus},
    editUserData: {screen: EditUserDataFocus},
  },
  {
    headerMode: 'none',
  },
);

const RecipeFinderFocus = withNavigationFocus(RecipeFinder);
const AutoCompleteFocus = withNavigationFocus(AutoComplete);
const SingleRecipeFocus = withNavigationFocus(SingleRecipe);

const RecipeStack = createStackNavigator(
  {
    RecipeFinder: {screen: RecipeFinderFocus},
    Substitute: {screen: AutoCompleteFocus},
    SingleRecipe: {screen: SingleRecipeFocus},
  },
  {
    headerMode: 'none',
  },
);

const MainPostsFocus = withNavigationFocus(MainPosts);
const SinglePostFocus = withNavigationFocus(SinglePost);

const PostsStack = createStackNavigator(
  {
    MainPosts: {screen: MainPostsFocus},
    AddPost: {screen: AddPost},
    SinglePost: {screen: SinglePostFocus},
  },
  {
    headerMode: 'none',
  },
);

const UserManagerTabNavigator = createBottomTabNavigator(
  {
    Posts: {
      screen: PostsStack,
      navigationOptions: {
        title: 'Wpisy',
        tabBarIcon: ({tintColor}) => {
          return (
            <Iconss name="local-post-office" size={28} color={tintColor} />
          );
        },
      },
    },
    Maps: {
      screen: RestaurantProfile,
      navigationOptions: {
        title: 'Lokalizacja',
        tabBarIcon: ({tintColor}) => {
          return <Icons name="map-marked" size={26} color={tintColor} />;
        },
      },
    },
    Recipies: {
      screen: RecipeStack,
      navigationOptions: {
        title: 'Przepisy',
        tabBarIcon: ({tintColor}) => {
          return <Icon name="food-fork-drink" size={32} color={tintColor} />;
        },
      },
    },
  },
  {
    initialRouteName: 'Posts',
    tabBarOptions: {
      style: {
        backgroundColor: '#333333',
        paddingTop: 25,
      },
      labelStyle: {
        paddingTop: 9,
        fontSize: 16,
      },
      activeTintColor: 'white',
      inactiveTintColor: '#898c8b',
    },
  },
);

const UserManagerDrawerFocus = withNavigationFocus(UserManagers);

const UserManagerDrawerNavigator = createDrawerNavigator(
  {
    MyPanel: {
      screen: UserManagerDrawerFocus,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Panel Użytkownika',
        drawerIcon: () => <Icons name="user-tie" size={25} color="black" />,
      }),
    },
    Posts: {
      screen: UserManagerTabNavigator,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Społeczność',
        drawerIcon: () => <Icon name="home-city-outline" size={24} />,
      }),
    },

    ChangePass: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Zmień Hasło',
        drawerIcon: () => <Iconss name="lock" size={30} color="black" />,
      }),
    },

    Contact: {
      screen: Contact,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Kontakt',
        drawerIcon: () => <Iconss name="email" size={30} color="black" />,
      }),
    },

    Logout: {
      screen: Logout,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Wyloguj się',
        drawerIcon: () => (
          <Icon style={{margin: 0}} name="logout" size={30} color="black" />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Posts',
    contentComponent: CustomDrawerComponent,
    drawerWidth: 225,
    drawerType: 'back',
    activeTintColor: '#ffffff',
  },
);

const LoginStackNavigator = createStackNavigator(
  {
    Login: {screen: LoginPanel},
    Register: {screen: RegisterPanel},
  },
  {
    headerMode: 'none',
  },
);

const appNavigator = createStackNavigator(
  {
    Login: LoginStackNavigator,
    UserPanel: UserManagerDrawerNavigator,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(appNavigator);
