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
                        width: 42,
                        backgroundColor: "transparent",
                        borderColor: "transparent"
                    }}
                    checked={todo.completed}
                    onPress={() => checkTodo(todo.title, !todo.completed)}
                />
                <Text
                    style={{
                        color: todo.completed ? 'grey' : 'black',
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                        marginHorizontal: 10,
                        maxWidth: '70%'
                    }}
                >
                    {todo.title}
                </Text>
                <Icon
                    name={'trash'}
                    type={"feather"}
                    color={"black"}
                    underlayColor={'#FCF8EF'}
                    onPress={() => onDelete(todo.title)}
                />
            </ListItem>
        );
    }
}