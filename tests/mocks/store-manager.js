const executions = require('./executions.json');
const moment = require('moment');

class StateManager {
    async init(options) {
    }

    getPipelines() {
        executions[0].activeTime = moment().subtract(30, 'seconds').toDate().getTime()
        executions[0].options.activeTtl = 20;
        executions[1].activeTime = moment().subtract(30, 'seconds').toDate().getTime()
        executions[1].options.activeTtl = 60;
        executions[2].startTime = Date.now();
        executions[3].startTime = Date.now();
        executions[4].startTime = moment().subtract(60, 'seconds').toDate().getTime()
        executions[5].startTime = moment().subtract(60, 'seconds').toDate().getTime()
        return executions;
    }
}

module.exports = new StateManager();
