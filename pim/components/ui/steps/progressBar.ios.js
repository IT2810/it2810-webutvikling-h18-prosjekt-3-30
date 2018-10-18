import React from 'react';
import {
    StyleSheet,
    View,
    ProgressViewIOS
} from 'react-native'

export default class ProgressBar extends React.Component {
    state = {
        pastStepCount: this.props.pastStepCount,
        goalStepCount: this.props.goalStepCount
    }

    componentDidUpdate(prevProps) {
        if (this.props.pastStepCount !== prevProps.pastStepCount) {
            this.setState({pastStepCount: this.props.pastStepCount})
        }
        if (this.props.goalStepCount !== prevProps.goalStepCount) {
            this.setState({goalStepCount: this.props.goalStepCount})
        }
    }

    render() {
        return (
            <View>
                <ProgressViewIOS
                    style={styles.progressBar}
                    progress={this.state.pastStepCount / this.state.goalStepCount}
                    progressTintColor={"#34495e"}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progressBar: {
        width: 200,
        height: 30
    }
})
