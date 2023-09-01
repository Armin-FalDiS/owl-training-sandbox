/** @odoo-module **/

import { Component, useState, useSubEnv } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';
import { Domain } from '@web/core/domain';
import { PieChart } from './pie_chart';

class AwesomeDashboard extends Component {
    static template = 'awesome_tshirt.clientaction';
    static components = { Layout, PieChart };

    setup() {
        useSubEnv({ config: { ...getDefaultConfig(), ...this.env.config } });
        this.action = useService('action');

        const service = useService('tShirtService');
        this.stats = useState(service.stats);
        this.statTitles = {
            average_quantity: 'Average amount of t-shirt by order this month',
            average_time:
                'Average time for an order to go from "new" to "sent" or "cancelled"',
            nb_cancelled_orders: 'Number of cancelled orders this month',
            nb_new_orders: 'Number of new orders this month',
            total_amount: 'Total amount of new orders this month',
        };
    }

    openCustomers() {
        this.action.doAction('base.action_partner_form');
    }

    openOrders(name, domainStr) {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name,
            res_model: 'awesome_tshirt.order',
            domain: new Domain(domainStr).toList(),
            views: [
                [false, 'kanban'],
                [false, 'form'],
            ],
        });
    }

    openRecentOrders() {
        this.openOrders(
            'Recent Orders',
            `[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]`,
        );
    }

    openRecentCancelledOrders() {
        this.openOrders(
            'Recent Orders',
            `[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state', '=', 'cancelled')]`,
        );
    }
}

registry.category('actions').add('awesome_tshirt.dashboard', AwesomeDashboard);
