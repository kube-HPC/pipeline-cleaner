const moment = require('moment');
const Logger = require('@hkube/logger');
const storeManager = require('../store/store-manager');
const apiServer = require('../api-server-client');
const component = require('../consts/componentNames').CLEANER;
const log = Logger.GetLogFromContainer();

class Cleaner {
    async clean() {
        const promises = [];
        const pipelines = await storeManager.getPipelines();
        pipelines.forEach((p) => {
            const expirationTime = p.startTime + (p.ttl * 1000);
            if (expirationTime < Date.now()) {
                log.info(`pipeline ${p.jobId} started at ${this._formatDate(p.startTime)} and expired at ${this._formatDate(expirationTime)}, sending stop to api-server.`, { component });
                promises.push(apiServer.stop({ jobId: p.jobId, reason: 'pipeline expired' }));
            }
        });

        const res = await Promise.all(promises);
        log.info(`stop ${res.length} pipelines`, { component });
        await storeManager.close();
    }

    _formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
}

module.exports = new Cleaner();
