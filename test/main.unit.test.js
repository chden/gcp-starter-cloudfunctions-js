const chai = require('chai');
const sinon = require('sinon');
var sinonChai = require('sinon-chai');

const { main } = require('../scripts/index.js');

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('Main', () => {
    describe('main', () => {
        const req = {};
        const res = {
            send: sinon.stub()
        };
        const resBody = 'Hello, World!';

        it('should respond "Hello, World!"', async () => {
            main(req, res);

            expect(res.send).has.been.calledOnce;
            expect(res.send).to.have.been.calledWith(resBody);
        });
    });
});