import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid
} from 'react-native'

import Expo from 'expo'

export default class ProgressBar extends React.Component{
  state = {
    pastStepCount: this.props.pastStepCount,
    goalStepCount: this.props.goalStepCount
  }

  componentDidUpdate(prevProps) {
    if (this.props.pastStepCount !== prevProps.pastStepCount) {
      this.setState({pastStepCount: this.props.pastStepCount})
    }
    if (this.props.goalStepCount !== prevProps.goalStepCount){
      this.setState({goalStepCount: this.props.goalStepCount})
    }
  }

  render() {
    return (
      <View>
        <ProgressBarAndroid style={styles.progressBar}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.state.pastStepCount/this.state.goalStepCount}
          color="#2196F3"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressBar: {
    width:400,
    height: 30
  }
})
