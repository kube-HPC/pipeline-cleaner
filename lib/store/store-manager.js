const dbConnect = require('@hkube/db');
const Logger = require('@hkube/logger');
const log = Logger.GetLogFromContainer();
const component = require('../consts/componentNames').CLEANER;
class StateManager {
    async init(options) {
        const { provider, ...config } = options.db;
        this._db = dbConnect(config, provider);
        await this._db.init();
        log.info(`initialized mongo with options: ${JSON.stringify(this._db.config)}`, { component });
    }

    async getPipelines() {
        return this._db.jobs.search({
            hasResult: false,
            fields: {
                jobId: true,
                startTime: 'pipeline.startTime',
                ttl: 'pipeline.options.ttl',
                nodes: 'pipeline.nodes',
            },
        });
    }

    async deleteAlgByName({ name }) {
        return this._db.algorithms.delete({ name });
    }

    async getAlgorithms(query) {
        return this._db.algorithms.search({
            ...query,
            fields: {
                jobId: true,
                name: true,
                created: true
            }
        });
    }

    close(force) {
        return this._db.close(force);
    }
}

module.exports = new StateManager();
