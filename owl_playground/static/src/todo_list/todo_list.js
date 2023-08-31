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
        const task = this.state.todoList[id - 1];
        task.done = !task.done;
    }
}
