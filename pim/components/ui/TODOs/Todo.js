import React from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import {Button, Icon} from "react-native-elements";


export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo_list: [],
            show_new_todo: false,
            refreshing: false
        };
    }

    // Updates state with data from asyncStorage
    parseJson = async () => {
        try {
            await AsyncStorage.getItem("TODOS").then((value => {
                this.setState({
                    todo_list: JSON.parse(value),
                    refreshing: false
                })
            }));
        } catch (error) {
            console.log("Error loading from localStorage")
        }
    };

    syncStorageFromState = async () => {
        const {todo_list} = this.state;
        try {
            await AsyncStorage.setItem("TODOS", JSON.stringify(todo_list));
        } catch (error) {
            console.log("Error saving to localStorage")
        }
    };

    updateTodo = (todo, completed) => {
        this.state.todo_list.map((t) => {
            if (t.title === todo) {
                t.completed = completed;
            }
        });
        this.syncStorageFromState();
    };

    deleteTodo = (todo) => {
        const temp = this.state.todo_list.filter(t => t.title !== todo);
        this.state.todo_list = temp;
        this.syncStorageFromState();
    };

    showNewTodo = (show) => {
        this.setState({
            show_new_todo: show
        })
    };

    // Creates TodoItems from state.todo_list
    parseData = () => {
        this.parseJson();
        const {todo_list} = this.state;
        if (todo_list) {
            return todo_list.map((item, i) => {
                return (
                    <TodoItem
                        key={i}
                        todo={item}
                        onDelete={this.deleteTodo}
                        checkTodo={this.updateTodo}
                    />
                );
            });
        }
    }

    render() {
        const {show_new_todo} = this.state;

        return (
            <View style={styles.container}>
                {this.parseData()}
                <View style={styles.addTodo}>
                    {/* Uses the state-value 'show_new_todo' to determine if the "AddTodo"-component should show*/}
                    {show_new_todo &&
                    <AddTodo
                        showNewTodo={this.showNewTodo}
                    />
                    }
                    {/* Used the same value to hide "AddButton" when "AddTodo" is showing */}
                    {!show_new_todo &&
                    <Button
                        raised
                        backgroundColor={"#34495e"}
                        title={"ADD NEW TODO"}
                        onPress={() => this.showNewTodo(show = true)}>
                        <Icon name='add'/>
                    </Button>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    addTodo: {
        marginVertical: 10,
        flex: 1
    }
});
