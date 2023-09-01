/** @odoo-module **/

import { Component, useSubEnv } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';
import { Domain } from '@web/core/domain';

class AwesomeDashboard extends Component {
    static template = 'awesome_tshirt.clientaction';
    static components = { Layout };

    setup() {
        useSubEnv({ config: { ...getDefaultConfig(), ...this.env.config } });

        this.action = useService('action');
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
