const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Main', () => {
    let url;

    before('Initialize service url', function () {
        url = process.env.BASE_URL;
        if (!url) {
            throw new Error('No BASE_URL provided!');
        }
    });

    describe('main', () => {
        const req = {};
        const resBody = 'Hello, World!';

        it('should respond "Hello, World!"', async () => {
            await chai.request(url)
                .post('/gcp-starter-cloud-function')
                .send(req)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.text).to.equal(resBody);
                });
        });
    });
});