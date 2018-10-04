import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ContactDetails from './ContactDetails';
import ContactList from './ContactList';
import AddNew from './AddNew';

export default class Contacts extends React.Component {
  render() {
    return (
      <ScreenNav/>
    );
  }
}

const ScreenNav = createStackNavigator({
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
