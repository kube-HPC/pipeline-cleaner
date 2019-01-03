const storeManager = require('../store/store-manager');
const apiServer = require('../api-server-client');
const Logger = require('@hkube/logger');
const log = Logger.GetLogFromContainer();

class Cleaner {
    init(config) {
        this._config = config;
    }

    async clean() {
        const promises = [];
        const pipelines = await storeManager.getPipelines();
        pipelines.forEach((p) => {
            const expirationTime = new Date(p.startTime);
            expirationTime.setSeconds(expirationTime.getSeconds() + p.options.ttl);
            if (expirationTime < Date.now()) {
                promises.push(apiServer.stop({ jobId: p.jobId, reason: 'pipeline expired' }));
            }
        });

        const res = await Promise.all(promises);
        log.info(`stop ${res.length} pipelines`);
    }
}

module.exports = new Cleaner();
