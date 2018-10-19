import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import {ListItem} from "native-base";

export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        const title = "";
        const completed = false;

        this.state = {
            title,
            completed
        };
    }

    // Sets newTodo-values in state, with properties: title, completed
    setStateUtil = (property, value) => {
        this.setState({
            [property]: value,
        });
    };

    render() {
        const {completed, title} = this.state;
        const {saveTodo, showNewTodo} = this.props;

        return (
            <ListItem>
                <CheckBox
                    containerStyle={{
                        width: 42,
                        backgroundColor: "transparent",
                        borderColor: "transparent"
                    }}
                    checked={completed}
                    onPress={() => this.setStateUtil("completed", !completed)}
                />
                <TextInput
                    style={styles.textInput}
                    clearTextOnFocus={true}
                    placeholder={"What needs to be done?"}
                    onChangeText={(text) => this.setStateUtil("title", text)}
                    onSubmitEditing={() => saveTodo(title, completed)}
                    underlineColorAndroid={"#34495e"}
                />
                <Icon
                    name={'x'}
                    type={"feather"}
                    color={"#c0392b"}
                    underlayColor={'#FCF8EF'}
                    onPress={() => showNewTodo(false)}
                />
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '65%',
        marginHorizontal: 5,
        height: 40
    }
});
