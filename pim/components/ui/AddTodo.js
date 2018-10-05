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

    saveNewTodo = async(showNewTodo) => {
        showNewTodo(show = false);
        const todoList = [];
        const todoToBeSaved = {"title": this.state.title, "completed": this.state.completed};
        todoList.push(todoToBeSaved);
        try {
            await AsyncStorage.getItem("TODOS").then((value) => {
                {/*Checks if Asyncstore is null, and add new list if so. Add todoToBeSaved if not null*/}
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
                    name={'trash'}
                    type={"foundation"}
                    color={"blue"}
                    onPress={() => showNewTodo(false)}
                />
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 250,
        height: 40,
        fontSize: 23,
        paddingLeft: 5
    }
});
