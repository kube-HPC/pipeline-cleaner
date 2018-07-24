const config = {};

config.serviceName = 'pipeline-cleaner';

config.kubernetes = {
    isLocal: !!process.env.KUBERNETES_SERVICE_HOST,
    namespace: process.env.NAMESPACE || 'default'
};

config.etcd = {
    etcd: {
        protocol: 'http',
        host: process.env.ETCD_CLIENT_SERVICE_HOST || 'localhost',
        port: process.env.ETCD_CLIENT_SERVICE_PORT || 4001
    },
    serviceName: config.serviceName
};

config.apiServer = {
    protocol: 'http',
    host: process.env.API_SERVER_SERVICE_HOST || 'localhost',
    port: process.env.API_SERVER_SERVICE_PORT || 3000,
    stopPath: 'internal/v1/exec/stop'
};


module.exports = config;
