import React from "react";
import renderer from "react-test-renderer";
import TodoItem from "../components/ui/TODOs/TodoItem";
import AddTodo from "../components/ui/TODOs/AddTodo";
import Todo from "../components/ui/TODOs/Todo";

describe("Testing Todo", () => {
    test('Todo renders correctly', () => {
        const todo = renderer.create(<Todo/>);
        const tree = todo.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Todo state-values when adding, updating and removing todo", () => {
        let todoInstance = renderer.create(<Todo/>).getInstance();

        expect(todoInstance.state.todo_list).toEqual([]);
        expect(todoInstance.state.show_new_todo).toEqual(false);

        todoInstance.saveTodo("Lage pannekaker", false);
        expect(todoInstance.state.todo_list).toEqual([{title:"Lage pannekaker", completed: false}]);

        todoInstance.updateTodo("Lage pannekaker", true);
        expect(todoInstance.state.todo_list).toEqual([{title:"Lage pannekaker", completed: true}]);

        todoInstance.deleteTodo("Lage pannekaker");
        expect(todoInstance.state.todo_list).toEqual([]);
    });
});

describe("Testing TodoItem", () => {
    test('TodoItem renders correctly', () => {
        const todoItem = renderer.create(<TodoItem todo={{todo:"Render component-TEST", completed:true}}/>);
        const tree = todoItem.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Testing AddTodo", () => {
    test('AddTodo renders correctly', () => {
        const addTodo = renderer.create(<AddTodo/>);
        const tree = addTodo.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("AddTodo setState method", () => {
        let addTodo = renderer.create(<AddTodo/>).getInstance();

        //Default values
        expect(addTodo.state.title).toEqual("");
        expect(addTodo.state.completed).toEqual(false);

        //Set state values with method
        addTodo.setStateUtil("title", "Lage pannekaker");
        addTodo.setStateUtil("completed", true);

        //Check if correct values
        expect(addTodo.state.title).toEqual("Lage pannekaker");
        expect(addTodo.state.completed).toEqual(true);
    });
});


