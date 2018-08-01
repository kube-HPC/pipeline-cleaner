const storeManager = require('../store/store-manager');
const apiServer = require('../api-server-client');

class Cleaner {
    init(config) {
        this._config = config;
    }

    async clean() {
        const pipelines = await storeManager.getPipelines();
        Object.values(pipelines).forEach(async (descriptor) => {
            const expirationTime = new Date(descriptor.startTime);
            expirationTime.setSeconds(expirationTime.getSeconds() + descriptor.options.ttl);
            if (expirationTime < Date.now()) {
                await apiServer.stop({ jobId: descriptor.jobId, reason: `pipeline expired - expirationTime:${expirationTime.getTime()}` });
            }
        });
    }
}

module.exports = new Cleaner();
