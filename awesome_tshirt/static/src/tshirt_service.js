/** @odoo-module **/

import { reactive } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { memoize } from '@web/core/utils/functions';
import { session } from '@web/session';

export const tShirtService = {
    dependencies: ['rpc'],
    async start(env, { rpc }) {
        const stats = reactive({});

        if (session.tshirt_statistics) {
            Object.assign(stats, session.tshirt_statistics);
        } else {
            Object.assign(stats, await rpc('/awesome_tshirt/statistics'));
        }

        setInterval(async () => {
            Object.assign(stats, await rpc('/awesome_tshirt/statistics'));
        }, 60000);

        return {
            stats,
        };
    },
};

registry.category('services').add('tShirtService', tShirtService);
