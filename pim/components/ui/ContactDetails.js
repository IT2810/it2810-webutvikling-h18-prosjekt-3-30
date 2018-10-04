import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class ContactDetails extends React.Component {
  onPress = () => {
    this.props.navigation.navigate("List");
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name='ios-arrow-back' type='ionicon' size={26} color={'lightgray'} onPress={() => {this.onPress()}}/>
        <View style={styles.details}>
          <Text>Details!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  details: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
