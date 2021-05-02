const Logger = require('@hkube/logger');
const { nodeKind } = require('@hkube/consts');
const storeManager = require('../store/store-manager');
const log = Logger.GetLogFromContainer();

class GatewayCleaner {
    async clean() {
        const jobs = await storeManager.getPipelines();
        const jobIds = jobs.map(job => job.jobId);
        let algorithms = await storeManager.getAlgorithms({ kind: nodeKind.Gateway });
        const createdBefore = Date.now() - 10000;
        algorithms = algorithms
            .filter(gateway => gateway.created < createdBefore && !jobIds.includes(gateway.jobId));
        log.info(`removing ${algorithms.length} gateways`);
        await Promise.all(algorithms.map(algo => storeManager.deleteAlgByName({ name: algo.name })));
    }
}

module.exports = new GatewayCleaner();
