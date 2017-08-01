import Expo, { Notifications } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import registerForNotifications from './services/push_notifications';
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import CameraScreen from './screens/CameraScreen';
import ListScreen from './screens/ListScreen';
import ShopScreen from './screens/ShopScreen';
import LikedScreen from './screens/LikedScreen';
import SettingsScreen from './screens/SettingsScreen';


export default class App extends React.Component {
  componentDidMount() {
    const config = {
    apiKey: "AIzaSyBOejQEHUQChsyEdPqGHMfJVAI5kWx6yvE",
    authDomain: "prizr-751db.firebaseapp.com",
    databaseURL: "https://prizr-751db.firebaseio.com",
    projectId: "prizr-751db",
    storageBucket: "prizr-751db.appspot.com",
    messagingSenderId: "534641093228"
    };
  firebase.initializeApp(config);
  registerForNotifications();
  Notifications.addListener((notification) => {
    const { data: { text }, origin } = notification
    
    if (origin === 'received' &&  text)
    Alert.alert(
      'New Push Notifcation',
      text,
      [{ text: 'Ok.'}]
      );
    });
  }


  render() {
    const MainNavigator = TabNavigator ({
      welcome: { screen: WelcomeScreen},
      auth: { screen: AuthScreen},
      main: {
        screen: TabNavigator({
          camera: {screen: CameraScreen},
        storeflow: {
          screen: StackNavigator({ 
          list: {screen: ListScreen},
          shop: {screen: ShopScreen, navigationOptions: {
                  tabBarVisible: false }}
        })
        },
        liked: {
          screen: StackNavigator({ 
          liked: {screen: LikedScreen},
          settings: {screen: SettingsScreen, navigationOptions: {
                  tabBarVisible: false }}
        })
        },  
      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }), 
    }
  }, {
    navigationOptions: {
      tabBarVisible: false 
    },
    lazy: true
  });

    return (
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);