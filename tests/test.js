const chai = require('chai');
const { expect } = chai;
const mockery = require('mockery');
const sinon = require('sinon');
const apiServer = require('./mocks/api-server-client');

describe('dummy test', () => {
    before(async () => {
        mockery.enable({
            useCleanCache: false,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        mockery.registerSubstitute('../api-server-client', `${process.cwd()}/tests/mocks/api-server-client.js`);
        mockery.registerSubstitute('../store/store-manager', `${process.cwd()}/tests/mocks/store-manager.js`);
        mockery.registerSubstitute('./lib/api-server-client', `${process.cwd()}/tests/mocks/api-server-client.js`);
        mockery.registerSubstitute('./lib/store/store-manager', `${process.cwd()}/tests/mocks/store-manager.js`);
        const bootstrap = require('../bootstrap');
        await bootstrap.init();
    });

    it('should clean only expired pipelines', async () => {
        const cleaner = require('../lib/cleaner/cleaner');
        const spyStop = sinon.spy(apiServer, "stop");
        await cleaner.clean();
        expect(spyStop.callCount).to.equal(3);
        expect(spyStop.args[0][0].jobId).to.equal('1');
        expect(spyStop.args[0][0].reason).to.equal('pipeline active TTL expired');
        expect(spyStop.args[1][0].jobId).to.equal('5');
        expect(spyStop.args[1][0].reason).to.equal('pipeline expired');
        expect(spyStop.args[2][0].jobId).to.equal('6');
        expect(spyStop.args[2][0].reason).to.equal('pipeline expired');
    });
});