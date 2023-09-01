/** @odoo-module **/

import { Component, useSubEnv } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';

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

    openNewOrders() {
        this.action.doAction()
    }
}

registry.category('actions').add('awesome_tshirt.dashboard', AwesomeDashboard);
