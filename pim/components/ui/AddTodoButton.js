import React from 'react';
import {Container, Icon, Text, Button} from 'native-base';

export default class AddTodoButton extends React.Component{
    render(){
        const {onAddNewTodo} = this.props;
        return(
            <Container>
                <Button
                    onPress ={() => onAddNewTodo(show = true)}>
                    <Icon name='add' />
                    <Text>Add TODOs</Text>
                </Button>
            </Container>
        );
    }
}