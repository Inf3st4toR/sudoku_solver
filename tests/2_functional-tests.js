const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Placeholder test - Functional tests not yet implemented', (done) => {
        assert.ok(true, 'Functional tests will be added later');
        done();
      });
});

