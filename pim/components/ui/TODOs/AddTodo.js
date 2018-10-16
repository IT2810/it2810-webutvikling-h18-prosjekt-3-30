import React from 'react';
import {TextInput, AsyncStorage, StyleSheet} from 'react-native';
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

    saveNewTodo = async (showNewTodo) => {
        const todoList = [];
        if (this.state.title) {
            showNewTodo(show = false);
            const todoToBeSaved = {"title": this.state.title, "completed": this.state.completed};
            todoList.push(todoToBeSaved);
            try {
                await AsyncStorage.getItem("TODOS").then((value) => {
                    {/*Checks if Asyncstore is null, and add new list if so. Add todoToBeSaved if not null*/
                    }
                    if (value !== null) {
                        const d = JSON.parse(value);
                        d.push(todoToBeSaved);
                        AsyncStorage.setItem("TODOS", JSON.stringify(d));
                    }
                    else {
                        AsyncStorage.setItem("TODOS", JSON.stringify(todoList));
                    }
                });
            } catch (error) {
                console.log("Unable to save todo")
            }
        }
    };


    // Sets newTodo-values in state, with properties: title, completed
    setStateUtil = (property, value) => {
        this.setState({
            [property]: value,
        });
    };


    render() {
        const {completed} = this.state;
        const {showNewTodo} = this.props;
        return (
            <ListItem>
                <CheckBox
                    containerStyle={{
                        width: 42
                    }}
                    checked={completed}
                    onPress={() => this.setStateUtil("completed", !completed)}
                />
                <TextInput
                    style={styles.textInput}
                    clearTextOnFocus={true}
                    placeholder={"What needs to be done?"}
                    onChangeText={(text) => this.setStateUtil("title", text)}
                    onSubmitEditing={() => this.saveNewTodo(showNewTodo)}
                />
                <Icon
                    name={'x'}
                    type={"feather"}
                    color={"#c0392b"}
                    onPress={() => showNewTodo(false)}
                />
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: '65%',
        height: 40,
        fontSize: 20,
        marginHorizontal: 5
    }
});
