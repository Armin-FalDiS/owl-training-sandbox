/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { Todo } from '../todo/todo';
import { useAutofocus } from '../utils';

export class TodoList extends Component {
    static template = 'owl_playground.todo_list';
    static components = { Todo };

    setup() {
        this.state = useState({ todoList: [], counter: 1 });
        useAutofocus('todoInput');
    }

    addTodo(event) {
        if (event.target.value && event.keyCode == 13) {
            this.state.todoList.push({
                id: this.state.counter++,
                description: event.target.value,
                done: false,
            });
            event.target.value = null;
        }
    }

    toggleDone(id) {
        const task = this.state.todoList.find((x) => x.id == id);
        if (task) {
            task.done = !task.done;
        }
    }

    removeTodo(id) {
        const taskIndex = this.state.todoList.findIndex((x) => x.id == id);
        if (taskIndex != -1) {
            this.state.todoList.splice(taskIndex, 1);
        }
    }
}
