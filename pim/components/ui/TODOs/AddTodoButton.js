import React from 'react';
import {Icon, Button} from 'react-native-elements';

export default class AddTodoButton extends React.Component {
    render() {
        const {onAddNewTodo} = this.props;
        return (
            <Button
                containerViewStyle={{
                    marginTop: '5%',
                    marginBottom: '1%'
                }}
                backgroundColor={"#3498db"}
                title={"Add todo"}
                fontSize={18}
                onPress={() => onAddNewTodo(show = true)}>
                <Icon name='add'/>
            </Button>
        );
    }
}