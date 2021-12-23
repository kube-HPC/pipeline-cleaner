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
            const expirationTime = p.options.ttl ? moment(p.startTime).add(p.options.ttl, 'seconds') : null;
            const activeExpirationTime = p.activeTime && p.options.activeTtl ? moment(p.activeTime).add(p.options.activeTtl, 'seconds') : null;
            const now = Date.now();
            let shouldStop = false;
            let stopMessage = 'pipeline expired';
            let stopLog;
            if (expirationTime && expirationTime < now) {
                shouldStop = true;
                stopLog = `pipeline ${p.jobId} started at ${this._formatDate(p.startTime)} and expired at ${this._formatDate(expirationTime)}, sending stop to api-server.`;
            }
            else if (activeExpirationTime && activeExpirationTime < now) {
                shouldStop = true;
                stopMessage = 'pipeline active TTL expired';
                stopLog = `pipeline ${p.jobId} active at ${this._formatDate(p.activeTime)} and expired at ${this._formatDate(activeExpirationTime)}, sending stop to api-server.`;
            }
            if (shouldStop) {
                log.info(stopLog, { component });
                promises.push(apiServer.stop({ jobId: p.jobId, reason: stopMessage }));
            }
        });

        const res = await Promise.all(promises);
        log.info(`stop ${res.length} pipelines`, { component });
    }

    _formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
}

module.exports = new Cleaner();
