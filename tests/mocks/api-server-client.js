class ApiServerClient {
    constructor() {
    }

    async init(config) {
    }

    async stop(trigger) {
        return (trigger) => { true }
    }
}


module.exports = new ApiServerClient();
