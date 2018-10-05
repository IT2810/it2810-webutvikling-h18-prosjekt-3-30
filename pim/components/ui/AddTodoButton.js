import React from 'react';
import {Icon, Button} from 'react-native-elements';

export default class AddTodoButton extends React.Component{
    render(){
        const {onAddNewTodo} = this.props;
        return(
            <Button
                title={"Add todo"}
                onPress ={() => onAddNewTodo(show = true)}>
                <Icon name='add' />
            </Button>
        );
    }
}