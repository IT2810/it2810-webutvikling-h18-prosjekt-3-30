import React from 'react';
import {Icon, CheckBox, ListItem, Button} from 'native-base';
import {TextInput} from 'react-native';

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
    }


    render() {
        const {completed} = this.state;
        const {saveTodo, onCancel} = this.props;
        return (
            <ListItem>
                <CheckBox
                    checked={completed}
                    onPress={() => this.setStateUtil("completed", !completed)}
                />
                <TextInput
                    style={{width: 200, height: 40, fontSize: 23, paddingLeft: 5}}
                    clearTextOnFocus={true}
                    placeholder={"What needs to be done?"}
                    onChangeText={(text) => this.setStateUtil("title", text)}
                    onSubmitEditing={() => saveTodo(this.state)}
                />
                <Button
                    transparent
                    onPress={() => onCancel(false)}
                >
                    <Icon name={'trash'}/>
                </Button>
            </ListItem>
        );
    }
}