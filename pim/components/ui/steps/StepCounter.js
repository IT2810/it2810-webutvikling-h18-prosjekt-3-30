import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    AsyncStorage
} from 'react-native';

import {Button, FormInput} from 'react-native-elements';

import {Pedometer} from "expo";

import ProgressBar from './progressBar';

export default class StepCounter extends React.Component {
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
            AsyncStorage.setItem('goal', this.state.inputText)
        }
    }

    //Retrieves data async
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('goal');
            if (parseInt(value) > 0) {
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
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                if ((result !== null) && (result !== NaN)) {
                    this.setState({pastStepCount: result.steps});
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


    render() {
        let goalTextColor = "#FCF8EF";
        if ((this.state.pastStepCount/this.state.goalStepCount) >= 1){
            goalTextColor = "#000000";
        }
        return (
            <View style={styles.container}>
                <View style={styles.stepgoal}>
                    <FormInput
                        keyboardType='numeric'
                        onChangeText={(inputText) => this.setState({inputText})}
                        value={this.state.inputText}
                        maxLength={6}
                        containerStyle={{
                            width: 100,
                            height: 40
                        }}
                        underlineColorAndroid={"#34495e"}
                    />
                    <Button
                        backgroundColor={"#34495e"}
                        onPress={() => {
                            this.handleGoalChange()
                        }}
                        title="SET GOAL"
                    />
                </View>
                <View style={styles.stepprogress}>
                    <Text style={{fontSize: 50}}>
                        {this.state.pastStepCount}
                        <Text style={{fontSize: 12}}>
                            Steps last 24h
                        </Text>
                    </Text>
                    <ProgressBar
                        pastStepCount={this.state.pastStepCount}
                        goalStepCount={this.state.goalStepCount}/>
                    <Text
                        style={{fontSize: 12, color:goalTextColor}}>
                        Well done, you reached your goal!
                    </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignContent: "space-between",
            padding: 10,
            //Useless as of now. Kept as example for later
            ... Platform.select({
                ios: {
                    backgroundColor: '#FCF8EF',
                },
                android: {
                    backgroundColor: '#FCF8EF'
                }
            }),
        },
        stepprogress: {
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "center"

        },
        stepgoal: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 10
        }
    },
);
