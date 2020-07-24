const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {mockReq, mockRes} = require('sinon-express-mock');

const {main} = require('../scripts/index.js');

const expect = chai.expect;
chai.should();
chai.use(sinonChai);


describe('Main', () => {
    let req;
    let res;
    let resBody;

    beforeEach('init', () => {
        req = mockReq({
            headers: {
                'origin': 'http://example.com',
            },
        });
        res = mockRes({
            setHeader: sinon.stub(),
            getHeader: sinon.stub(),
        });
        resBody = 'Hello, World!';
    });

    describe('main', () => {
        it('should respond "Hello, World!"', async () => {
            main(req, res);

            expect(res.send).has.been.calledOnce;
            expect(res.send).to.have.been.calledWith(resBody);
        });
    });
});
