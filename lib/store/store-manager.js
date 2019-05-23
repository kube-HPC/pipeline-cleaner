const Etcd = require('@hkube/etcd');

class StateManager {
    async init(options) {
        this._etcd = new Etcd({ ...options.etcd, serviceName: options.serviceName });
    }

    getPipelines() {
        return this._etcd.executions.running.list({ limit: 1000 });
    }
}

module.exports = new StateManager();
