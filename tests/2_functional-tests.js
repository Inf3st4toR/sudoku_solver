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

  test('Solve a invalid puzzle: missing string', (done) => {
    chai.request(server)
    .post('/api/solve')
    .end((err, res) => {
      assert.equal(res.status, 200, 'res.status is wrong');
      assert.deepEqual(res.body, { error: 'Required field missing' }, 'Returned object is wrong');
      done();
    });
  });

  test('Solve a invalid puzzle: invalid characters', (done) => {
    chai.request(server)
    .post('/api/solve')
    .send({ puzzle: puzzlesAndSolutions[5][0] })
    .end((err, res) => {
      assert.equal(res.status, 200, 'res.status is wrong');
      assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' }, 'Returned object is wrong');
      done();
    });
  });

  test('Solve a invalid puzzle: invalid length', (done) => {
    chai.request(server)
    .post('/api/solve')
    .send({ puzzle: puzzlesAndSolutions[6][0] })
    .end((err, res) => {
      assert.equal(res.status, 200, 'res.status is wrong');
      assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' }, 'Returned object is wrong');
      done();
    });
  })

  test('Solve a invalid puzzle: unsolvable', (done) => {
    chai.request(server)
    .post('/api/solve')
    .send({ puzzle: puzzlesAndSolutions[7][0] })
    .end((err, res) => {
      assert.equal(res.status, 200, 'res.status is wrong');
      assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' }, 'Returned object is wrong');
      done();
    });
  })
});

/*

*/