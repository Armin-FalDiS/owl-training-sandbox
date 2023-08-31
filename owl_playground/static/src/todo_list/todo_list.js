/** @odoo-module **/

import { Component, useState } from '@odoo/owl';
import { Todo } from '../todo/todo';

export class TodoList extends Component {
    static template = 'owl_playground.todo_list';
    static components = { Todo };

    setup() {
        this.state = useState({ todoList: [], counter: 1 });
    }

    addTodo(event) {
        if (event.target.value && event.keyCode == 13) {
            this.state.todoList = [
                ...this.state.todoList,
                {
                    id: this.state.counter++,
                    description: event.target.value,
                    done: false,
                },
            ];
            event.target.value = null;
        }
    }
}
