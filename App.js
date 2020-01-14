import React, { Component } from 'react'
import { Text , AsyncStorage} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import FeedScreen from "./screens/feed/FeedScreen";
import PostScreen from "./screens/post/PostScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import ProfileEditScreen from "./screens/profile/ProfileEditScreen";
import ProfileInviteScreen from "./screens/profile/ProfileInviteScreen";
import VideoScreen from "./screens/post/VideoScreen";

import EntypoIcon from "react-native-vector-icons/Entypo";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

//Disable warning
console.disableYellowBox = true;

//Authentication stack. Login & Registration
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Registration: RegistrationScreen,
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0 // Set the animation duration time as 0 !!
      }
    })
  }
);

//Feed stack. 
const FeedStack = createStackNavigator(
  {
    FeedHome: FeedScreen,
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0 // Set the animation duration time as 0 !!
      }
    })
  }
);


//Post stack. 
const PostStack = createStackNavigator(
  {
    PostHome: PostScreen,
    Video : VideoScreen,
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0 // Set the animation duration time as 0 !!
      }
    }),
    navigationOptions: {
      tabBarVisible: false,
    },
  }
);

//Profile stack. 
const ProfileStack = createStackNavigator(
  {
    ProfileHome: ProfileScreen,
    ProfileEdit: ProfileEditScreen,
    ProfileInvite: ProfileInviteScreen
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0 // Set the animation duration time as 0 !!
      }
    })
  }
);


//App Stack
const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Feed: { screen: FeedStack },
    Post: { screen: PostStack },
    Notification: { screen: NotificationScreen },
    Profile: { screen: ProfileStack },
  },
  // {
  //   initialRouteName: "Profile"
  // },
  {
    defaultNavigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
          return <EntypoIcon name={iconName} size={moderateScale(30)} color={tintColor} />;
        } else if (routeName === 'Feed') {
          iconName = 'md-flash';
          return <Ionicon name={iconName} size={moderateScale(30)} color={tintColor} />;
        } else if (routeName === 'Post') {
          iconName = 'squared-plus';
          return <EntypoIcon name={iconName} size={moderateScale(30)} color={'#159c00'} />;
        } else if (routeName === 'Notification') {
          iconName = 'ios-notifications';
          return <Ionicon name={iconName} size={moderateScale(30)} color={tintColor} />;
        } else if (routeName === 'Profile') {
          iconName = 'account-circle';
          return <MaterialIcon name={iconName} size={moderateScale(30)} color={tintColor} />;
        }

      }
    }),
    tabBarOptions: {
      activeTintColor: '#FCFCFC',
      inactiveTintColor: '#666666',
      activeBackgroundColor: '#262626',
      inactiveBackgroundColor: '#262626',
      showLabel: false
    },

  }
);

//Main Navigations
const MainNavigator = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    Login: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(MainNavigator);


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
