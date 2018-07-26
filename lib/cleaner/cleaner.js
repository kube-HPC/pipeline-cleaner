const storeManager = require('../store/store-manager');
const apiServer = require('../api-server-client');
const moment = require('moment');

class Cleaner {
    init(config) {
        this._config = config;
    }

    async clean() {
        const pipelines = await storeManager.getPipelines();
        Object.entries(pipelines).forEach(async ([jobId, descriptor]) => {
            if (descriptor.options.ttl && moment().isBefore(moment(descriptor.startTime).add(descriptor.options.ttl, 'seconds'))) {
                await apiServer.stop({ jobId, reason: 'pipeline expired' });
            }
        });
    }
}

module.exports = new Cleaner();
