const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
console.log(puzzlesAndSolutions);

suite('Unit Tests', () => {
  test('validate puzzle string of 81 characters', () => {
    assert.isTrue(solver.validate(puzzlesAndSolutions[0][0]).isValid, "It should be valid");
  });

  test('validate puzzle string of invalid characters ', () => {
    assert.isFalse(solver.validate(puzzlesAndSolutions[5][0]).isValid, "It should be invalid");
    assert.equal(solver.validate(puzzlesAndSolutions[5][0]).error, "Invalid characters in puzzle", "Error in the error return");
  });

  test('validate puzzle string of not 81 characters ', () => {
    assert.isFalse(solver.validate(puzzlesAndSolutions[6][0]).isValid, "It should be invalid");
    assert.equal(solver.validate(puzzlesAndSolutions[6][0]).error, "Expected puzzle to be 81 characters long", "Error in the error return");
  });

  test('test a valid row placement ', () => {
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 2, 3).valid, "It should be valid");
  });

  test('test an invalid row placement ', () => {
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 2, 8).valid, "It should be invalid");
    assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 2, 8).conflict, "row", "It should be 'row'");
  });

});

/*
COMMENTS

*/