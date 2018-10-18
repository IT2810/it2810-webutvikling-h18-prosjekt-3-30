import React from "react";
import renderer from "react-test-renderer";
import Todo from "../components/ui/TODOs/Todo";
import TodoItem from "../components/ui/TODOs/TodoItem";
import AddTodo from "../components/ui/TODOs/AddTodo";

/*
test('Todo renders correctly', () => {
    const todo = renderer.create(<Todo/>);
    const tree = todo.toJSON();
    expect(tree).toMatchSnapshot();
});
*/

test('TodoItem renders correctly', () => {
    const todoItem = renderer.create(<TodoItem todo={{todo:"Render component-TEST", completed:true}}/>);
    const tree = todoItem.toJSON();
    expect(tree).toMatchSnapshot();
});

test('AddTodo renders correctly', () => {
    const addTodo = renderer.create(<AddTodo/>);
    const tree = addTodo.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Todo state-values", () => {
    let todoInstance = renderer.create(<Todo/>).getInstance();

    expect(todoInstance.state.todo_list).toEqual([]);
    expect(todoInstance.state.show_new_todo).toEqual(false);
});
