import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TabNav} from './components/Utils';

export default class App extends React.Component {
  render() {
    return (
      <TabNav/>
    );
  }
}
