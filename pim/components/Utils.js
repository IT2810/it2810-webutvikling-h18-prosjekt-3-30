import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';

// Imports the different ui screens for tab navigation
import Home from './ui/Home';
import Todo from './ui/TODOs/Todo';
import Contacts from './ui/Contacts/Contacts';

// Imports the contact ui's
import ContactDetails from './ui/Contacts/ContactDetails';
import ContactList from './ui/Contacts/ContactList';
import AddNew from './ui/Contacts/AddNew';

// Sets up stack navigation for the contact page
export const ScreenNav = createStackNavigator({
  List: {
    screen: ContactList,
    navigationOptions: {
     header: null
   }
  },
  Details: {
    screen: ContactDetails,
    navigationOptions: {
      header: null
   }
 },
 Add: {
   screen: AddNew,
   navigationOptions: {
     header: null
  }
}
});

export const TabNav = createMaterialTopTabNavigator(
  { // RouteConfigs (set names and routes for TabNav):
    Home: Home,
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
