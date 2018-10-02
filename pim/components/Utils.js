import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Imports the different ui screens
import Home from './ui/Home';
import ScreenOne from './ui/ScreenOne';
import ScreenTwo from './ui/ScreenTwo';

export const TabNav = createMaterialTopTabNavigator(
  { // RouteConfigs (set names and routes for TabNav):
    Home: Home,
    Screen_1: ScreenOne,
    Screen_2: ScreenTwo
  },
  { // TabNavigatorConfig:
    //
    // The default options for screens
    // navigationOptions: () => ({
    // }),
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#2c3e50',
      inactiveTintColor: '#2c3e50',
      indicatorStyle: {
        backgroundColor: '#2c3e50', // Border bottom color
      },
      labelStyle: {
        color: '#2c3e50',
        fontSize: 14,
      },
      tabStyle: {
        marginTop: 30,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
      },
      style: {
        backgroundColor: '#ecf0f1',
      },
    },
  },
);
