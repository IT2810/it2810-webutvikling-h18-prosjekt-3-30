import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   AppRegistry,
   ProgressBarAndroid,
   ProgressViewIOS,
   Platform,
   TextInput,
   AsyncStorage} from 'react-native';

   import {Button, FormInput} from 'react-native-elements';

import Expo from "expo";
import {Pedometer} from "expo";

//const progBar = require('./progressBar')

import ProgressBar from './progressBar'

export default class Home extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    goalStepCount: 0,
    inputText: '10000'
  }

  //Updates the goal when "Set Goal" button is pressed, and stores async
  handleGoalChange = () => {
    if (this.state.inputText !== '') {
      this.setState({goalStepCount: parseInt(this.state.inputText)})
      this._storeData();
    }

  }

  //Stores goal async
  _storeData() {
    if (this.state.inputText !== '') {
      console.log("Storing ...");
      AsyncStorage.setItem('goal', this.state.inputText)
      console.log("Goal data stored");
      console.log(this.state.inputText);
    }

  }

  //Retrieves data async
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('goal');
      console.log("Data retrieved");
      console.log(value);
      if (parseInt(value)>0) {
        this.setState({goalStepCount: parseInt(value)})
        this.setState({inputText: value})
      }

    } catch (error) {
      console.error(error);
    }
  }

 //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  componentDidMount() {
    this._subscribe();
    this._retrieveData();
  }

   //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  componentWillUnmount() {
    this._unsubscribe();
    this._storeData();
  }

   //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() -1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        if ((result !== null) && (result !== NaN)) {
          this.setState({ pastStepCount: result.steps });
        }


      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

   //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };


//TODO The slider can be made a component – not sure if necessary
  render() {
    return (
      <View style={styles.container}>
        <FormInput
          keyboardType = 'numeric'
          onChangeText = {(inputText) => this.setState({inputText})}
          value = {this.state.inputText}
          maxLength={6}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Button
          onPress={() => {this.handleGoalChange()}}
          title="Set Goal"
        />
        <Text>
          Steps taken in the last 24 hours:
          {this.state.pastStepCount}
        </Text>
        <Text>
          Steps taken current session:
          {this.state.currentStepCount}
        </Text>
        <Text>
          Your target is : {this.state.goalStepCount}
        </Text>
        <ProgressBar
          pastStepCount = {this.state.pastStepCount}
          goalStepCount = {this.state.goalStepCount}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    ... Platform.select({
      ios: {
        backgroundColor: '#FFD275',
      },
      android: {
        backgroundColor: '#FFD275'
      }
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    backgroundColor: 'red',
    width: 200,
    height: 30,
  },
  },
);
