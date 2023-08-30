/** @odoo-module **/

import { Component } from '@odoo/owl';
import { Todo } from '../todo/todo';

export class TodoList extends Component {
    static template = 'owl_playground.todo_list';
    static components = { Todo };
    static props = {
        todoList: {
            type: Array,
            element: Todo.props.todo,
        },
    };
}
