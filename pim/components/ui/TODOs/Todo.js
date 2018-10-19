import React from 'react';
import {StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import {Button, Icon} from "react-native-elements";


export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo_list: [],
            show_new_todo: false
        };
    }

    // Updates state with data from asyncStorage
    parseJson = async () => {
        try {
            await AsyncStorage.getItem("TODOS").then((value => {
                this.setState({
                    todo_list: JSON.parse(value)
                })
            }));
        } catch (error) {
            console.log("Error loading from localStorage")
        }
    };

    saveState = async () => {
        const {todo_list} = this.state;
        try {
            await AsyncStorage.setItem("TODOS", JSON.stringify(todo_list));
        } catch (error) {
            console.log("Error saving to localStorage")
        }
    };

    saveTodo = (title, completed) => {
        let todoList = this.state.todo_list;
        if (todoList === null){
            todoList = [];
        }
        if (title) {
            this.showNewTodo(show = false);
            const todoToBeSaved = {"title": title, "completed": completed};
            todoList.push(todoToBeSaved);
            this.setState({
                todo_list:todoList
            });
            this.saveState();
        }
    };

    updateTodo = (todo, completed) => {
        let todo_list = this.state.todo_list;
        todo_list.map(t => {
            if (t.title === todo) {
                t.completed = completed;
            }
        });
        this.setState({
            todo_list:todo_list
        });
        this.saveState();
    };

    deleteTodo = (todo) => {
        const temp = this.state.todo_list.filter(t => t.title !== todo);
        this.setState  ({
            todo_list:temp
        });
        this.saveState();
    };

    showNewTodo = (show) => {
        this.setState({
            show_new_todo: show
        })
    };

    componentDidMount() {
        this.parseJson();
    };

    // Creates TodoItems from state.todo_list
    parseData = () => {
        //this.parseJson();
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
    };

    render() {
        const {show_new_todo} = this.state;

        return (
            <View style={styles.container}>
                {/* Uses the state-value 'show_new_todo' to determine if the "AddTodo"-component should show*/}
                {show_new_todo &&
                <AddTodo
                    saveTodo={this.saveTodo} showNewTodo={this.showNewTodo}
                />
                }
                <ScrollView style={styles.todoItems}>
                    {this.parseData()}
                </ScrollView>
                <View style={styles.addTodo}>
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
        backgroundColor: '#FCF8EF',
        justifyContent: 'center',
        padding: 10,
        height: "100%"
    },
    todoItems: {
        flex: 1,
        marginBottom: 5
    },
    addTodo: {
        marginBottom: 10
    }
});
