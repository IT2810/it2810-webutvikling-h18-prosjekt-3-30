import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements';

import ContactList from './ContactList';

export default class ContactDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      phone: '',
      icon: 'account-circle'
    }
  }

  // Sets up AsyncStorage for a list 
  createNewContact() {
    const dataList = []
    if (this.state.name && this.state.phone && this.state.icon) {
      const data = {
        name: this.state.name,
        phone: this.state.phone,
        icon: this.state.icon,
      }
      dataList.push(data)
      try {
        AsyncStorage.getItem('contact_key').then((value) => {
          if (value !== null) {
            const d = JSON.parse(value);
            d.push(data);
            AsyncStorage.setItem('contact_key', JSON.stringify(d)).then(() => {
              this.props.navigation.navigate("List");
            });
          }
          else
          {
            AsyncStorage.setItem('contact_key', JSON.stringify(dataList)).then(() => {
              this.props.navigation.navigate("List");
            });
          }
        })
      }
      catch (e)
      {
        console.log(e);
      }
    }
  };

  onArrowPress = () => {
    this.props.navigation.navigate("List");
  }

  onChangeName(name) {
    this.setState({name});
  }

  onChangePhone(phone) {
    this.setState({phone});
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name='ios-arrow-back' type='ionicon' size={26} color={'lightgray'} onPress={() => {this.onArrowPress()}}/>
        <View style={styles.details}>
          <FormLabel>Full name</FormLabel>
          <FormInput onChangeText={(name) => {this.onChangeName(name)}}/>
          <FormLabel>Phone</FormLabel>
          <FormInput onChangeText={(phone) => {this.onChangePhone(phone)}}/>
          <View style={styles.button}>
            <Button raised icon={{name: 'plus', type: 'feather'}} onPress={() => {this.createNewContact()}} title='ADD NEW' />
          </View>
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
    marginTop: 30
  },
  button: {
    marginTop: 20
  }
});
