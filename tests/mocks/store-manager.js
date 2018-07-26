const executions = require('./executions.json');
const moment = require('moment');

class StateManager {
    async init(options) {
    }

    getPipelines() {
        executions[2].startTime = Date.now();
        executions[3].startTime = Date.now();
        executions[4].startTime = moment().subtract(60, 'seconds').toDate().getTime()
        executions[5].startTime = moment().subtract(60, 'seconds').toDate().getTime()
        return executions;
    }
}

module.exports = new StateManager();
