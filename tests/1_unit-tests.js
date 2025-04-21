const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

const { testPuzzles } = require('../controllers/puzzles-strings.js');

suite('Unit Tests', () => {
  test('validate puzzle string of 81 characters', () => {
    assert.isTrue(solver.validate(testPuzzles[0][0]), "Validation gone wrong.");
  });

  test('validate puzzle string of invalid characters ', () => {
    assert.deepEqual(solver.validate(testPuzzles[5][0]), { error: 'Invalid characters in puzzle' }, "Validation gone wrong.");
  });

  test('validate puzzle string of not 81 characters ', () => {
    assert.deepEqual(solver.validate(testPuzzles[6][0]), { error: 'Invalid characters in puzzle' }, "Validation gone wrong.");
  });
});

/*
COMMENTS
*/