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
   Slider} from 'react-native';

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
    sliderValue: 1
  }

 //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  componentDidMount() {
    this._subscribe();
  }

   //Documented here https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  componentWillUnmount() {
    this._unsubscribe();
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
        this.setState({ pastStepCount: result.steps });
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
        <Slider style={styles.slider}
          value = {0}
          minimumValue = {0}
          step = {500}
          maximumValue = {10000}
          onValueChange = {sliderValue => this.setState({sliderValue})}
          onSlidingComplete = {goalStepCount => this.setState({goalStepCount})}
        />
        <Text>
          sliderValue: {this.state.sliderValue}
        </Text>
        <Text>
          Steps taken in the last 24 hours:
          {this.state.pastStepCount}
        </Text>
        <Text>
          Walk! And watch this go up:
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
        backgroundColor: 'yellow',
      },
      android: {
        backgroundColor: 'yellow'
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
