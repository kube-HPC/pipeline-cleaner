const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const nock = require('nock');
const bootstrap = require('../bootstrap');
const cleaner = require('../lib/cleaner/cleaner');
const storeManager = require('../lib/store/store-manager');
const apiServer = require('../lib/api-server-client');
const executions = require('./mocks/executions');

describe('dummy test', () => {
    before(async () => {
        nock('http://localhost:3000').persist().post('/internal/v1/exec/stop').reply(200);
        await bootstrap.init();
        await storeManager._db.jobs.createMany(executions.map((e, i) => ({ jobId: `job-${i}`, pipeline: e })));
    });
    it('should clean only expired pipelines', async () => {
        const spyStop = sinon.spy(apiServer, "stop");
        await cleaner.clean();
        expect(spyStop.callCount).to.be.greaterThan(1);
    });
});