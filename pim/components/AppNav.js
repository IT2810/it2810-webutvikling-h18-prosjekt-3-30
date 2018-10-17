import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';

// Imports the different ui screens for tab navigation
import StepCounter from './ui/steps/StepCounter';
import Todo from './ui/TODOs/Todo';
import Contacts from './ui/Contacts/Contacts';

export const TabNav = createMaterialTopTabNavigator(
  { // RouteConfigs (set names and routes for TabNav):
    Steps: StepCounter,
    TODOs: Todo,
    Contacts: Contacts
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
