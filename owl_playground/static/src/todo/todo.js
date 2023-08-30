/** @odoo-module **/

import { Component } from '@odoo/owl';

export class ToDo extends Component {
    static template = 'owl_playground.todo';

    setup() {
        this.todo = { id: 3, description: 'buy milk', done: false };
    }
}
