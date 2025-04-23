const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');

suite('Functional Tests', () => {
  test('Solve a valid puzzle: POST /api/solve', (done) => {
    chai.request(server)
    .post('/api/solve')
    .send({ puzzle: puzzlesAndSolutions[4][0] })
    .end((err, res) => {
      assert.equal(res.status, 200, 'res.status is wrong');
      assert.deepEqual(res.body.solution, puzzlesAndSolutions[4][1], 'Solution is incorrect');
      done();
    });
  });
});

/*
Solve a puzzle with valid puzzle string: POST request to /api/solve
Solve a puzzle with missing puzzle string: POST request to /api/solve
Solve a puzzle with invalid characters: POST request to /api/solve
Solve a puzzle with incorrect length: POST request to /api/solve
Solve a puzzle that cannot be solved: POST request to /api/solve
*/