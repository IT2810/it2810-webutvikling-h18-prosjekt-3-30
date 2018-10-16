import React from 'react';
import {createStackNavigator} from 'react-navigation';

// Imports the contact ui's
import ContactDetails from './ui/contacts/ContactDetails';
import ContactList from './ui/contacts/ContactList';
import AddNew from './ui/contacts/AddNew';

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
