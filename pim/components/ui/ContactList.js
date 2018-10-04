import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, RefreshControl } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';


export default class ContactList extends React.Component {
  constructor() {
    super();

    this.state = {
      list: '',
      refreshing: false
    }
  }

  parseJson = () => {
    this.setState({refreshing: true});
    try {
      AsyncStorage.getItem('contact_key').then((value) => {
        this.setState({
          list: JSON.parse(value),
          refreshing: false
        })
      })
    }
    catch (e)
    {
      console.log(e);
    }
  }

  componentDidMount() {
    this.parseJson();
  }

  _onRefresh = () => {
    this.parseJson();
  }

  onContactPress = () => {
    this.props.navigation.navigate("Details");
  }

  onButtonPress = () => {
    this.props.navigation.navigate("Add");
  }

  pareseData = () => {
    if (this.state.list) {
      return this.state.list.map((item, i) => {
        return (
          <ListItem
            key={i}
            title={item.name}
            leftIcon={{ name: item.icon }}
            subtitle={item.phone}
            onPress={() => this.onContactPress()}
          />
        );
      });
    }
  }

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
          {this.pareseData()}
        </ScrollView>
        <View style={styles.button}>
          <Button raised onPress={() => {this.onButtonPress()}} title='ADD NEW CONTACT' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
