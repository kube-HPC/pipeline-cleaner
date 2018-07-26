const config = {};

config.serviceName = 'pipeline-cleaner';

config.etcd = {
    protocol: 'http',
    host: process.env.ETCD_CLIENT_SERVICE_HOST || 'localhost',
    port: process.env.ETCD_CLIENT_SERVICE_PORT || 4001
};

config.apiServer = {
    protocol: 'http',
    host: process.env.API_SERVER_SERVICE_HOST || 'localhost',
    port: process.env.API_SERVER_SERVICE_PORT || 3000,
    stopPath: 'internal/v1/exec/stop'
};


module.exports = config;
