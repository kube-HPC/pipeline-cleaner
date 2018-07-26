const Etcd = require('@hkube/etcd');

class StateManager {
    async init(options) {
        this._etcd = new Etcd();
        this._etcd.init({ etcd: options.etcd, serviceName: options.serviceName });
    }

    getPipelines() {
        return this._etcd.execution.list();
    }
}

module.exports = new StateManager();
