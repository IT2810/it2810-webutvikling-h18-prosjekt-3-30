import React from "react";
import {Text} from "react-native";
import {CheckBox, Icon} from "react-native-elements";
import {ListItem} from "native-base";

export default class TodoItem extends React.Component {

    render() {
        const {todo, onDelete, checkTodo} = this.props;

        return (
            <ListItem>
                <CheckBox
                    containerStyle={{
                        width:'25%'
                    }}
                    checked = {todo.completed}
                    onPress = {() => checkTodo(todo.title, !todo.completed)}
                />
                <Text
                    style={{
                        color: todo.completed ? 'grey' : 'black',
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                        marginHorizontal: 10,
                        fontSize: 18,
                    }}
                >
                    {todo.title}
                </Text>
                <Icon
                    name={'trash'}
                    type={"feather"}
                    color={"#2980b9"}
                    onPress = {() => onDelete(todo.title)}
                />
            </ListItem>
        );
    }
}