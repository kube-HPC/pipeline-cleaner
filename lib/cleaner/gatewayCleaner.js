const moment = require('moment');
const Logger = require('@hkube/logger');
const { nodeKind } = require('@hkube/consts');
const storeManager = require('../store/store-manager');
const log = Logger.GetLogFromContainer();

class GatewayCleaner {
    async clean() {
        const jobs = await storeManager.getPipelines();
        const jobIds = jobs.map(job => job.jobId);
        let algorithms = await storeManager.getAlgorithms();
        const createdBefore = Date.now() - 10000;
        algorithms = algorithms
            .filter(algo => algo.kind === nodeKind.Gateway)
            .filter(algo => algo.created < createdBefore).filter(gateway => !jobIds.includes(gateway.jobId));
        log.info(`removing ${algorithms.length} gateways`);
        await Promise.all(algorithms.map(algo => storeManager.deleteAlgByName({ name: algo.name })));
    }

    _formatDate(date) {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
}

module.exports = new GatewayCleaner();
