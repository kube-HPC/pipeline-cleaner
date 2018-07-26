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
        expect(spyStop.callCount).to.equal(2);
    });
});