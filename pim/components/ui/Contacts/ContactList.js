import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, RefreshControl } from 'react-native';
import { ListItem, Button } from 'react-native-elements';


export default class ContactList extends React.Component {
  constructor() {
    super();

    this.state = {
      list: '',
      refreshing: false
    };
  }

  // Gets the item/list from AsyncStorage and update the states
  parseJson = async () => {
    this.setState({refreshing: true});
    try {
       await AsyncStorage.getItem('contact_key').then((value) => {
        this.setState({
          list: JSON.parse(value),
          refreshing: false
        });
      });
    }
    catch (e)
    {
      console.log(e);
    }
  }

  componentDidMount() {
    this.parseJson();
  }

  // Is called when refreshing the contact screen
  _onRefresh = () => {
    this.parseJson();
  }

  // Get triggered when press on contact
  // Leads to details page
  onContactPress = (key, name, ico, phone) => {
    this.props.navigation.navigate("Details", {key: key, name: name, ico: ico, phone: phone});
  }

  onButtonPress = () => {
    this.props.navigation.navigate("Add");
  }

  // Sets up the list items from the state list
  parseData = () => {
    if (this.state.list) {
      return this.state.list.map((item, i) => {
        return (
          <ListItem
            key={i}
            title={item.name}
            leftIcon={{ name: item.icon }}
            subtitle={item.phone}
            onPress={() => this.onContactPress(i, item.name, item.icon, item.phone)}
          />
        );
      });
    }
  }

  // Render the contacts ui
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper} refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.parseData()}
        </ScrollView>
        <View style={styles.button}>
          <Button raised onPress={() => {this.onButtonPress()}} title='ADD NEW CONTACT' backgroundColor={'#34495e'} color={"#FCF8EF"}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8EF',
    padding: 10,
  },
  wrapper: {
    marginBottom: 10,
    flex: 1,
  },
  button: {
    marginBottom: 10
  }
});
