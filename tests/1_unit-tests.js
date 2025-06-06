const chai = require('chai');
const assert = chai.assert;


const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {
  test('validate puzzle string of 81 characters', () => {
    assert.isTrue(solver.validate(puzzlesAndSolutions[0][0]).isValid, "It should be valid");
  });

  test('validate puzzle string of invalid characters', () => {
    const result = solver.validate(puzzlesAndSolutions[5][0]);
    assert.isFalse(result.isValid, "It should be invalid");
    assert.equal(result.error, "Invalid characters in puzzle", "Error in the error return");
  });

  test('validate puzzle string of not 81 characters', () => {
    const result = solver.validate(puzzlesAndSolutions[6][0]);
    assert.isFalse(result.isValid, "It should be invalid");
    assert.equal(result.error, "Expected puzzle to be 81 characters long", "Error in the error return");
  });

  test('test a valid row placement', () => {
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 3, 4, "4").valid, "Mid test should be valid");
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 1, "3").valid, "Beg test should be valid");
    assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 9, 9, "5").valid, "End test should be valid");
  });

  test('test an invalid row placement', () => {
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").valid, "Mid test should be invalid");
    assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").conflict, "row", "Mid test should be 'row'");
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 1, "5").valid, "Beg test should be invalid");
    assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 1, 1, "5").conflict, "row", "Beg test should be 'row'");
    assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").valid, "End test should be invalid");
    assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").conflict, "row", "End test should be 'row'");
  });

  test('test a valid column placement', () => {
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 3, 4, "4").valid, "Mid test should be valid");
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 1, 1, "7").valid, "Beg test should be valid");
    assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 9, 9, "2").valid, "End test should be valid");
  });

  test('test an invalid column placement', () => {
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").valid, "Mid test should be invalid");
    assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").conflict, "column", "Mid test should be 'column'");
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 1, 1, "8").valid, "Beg test should be invalid");
    assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0], 1, 1, "8").conflict, "column", "Beg test should be 'column'");
    assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").valid, "End test should be invalid");
    assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").conflict, "column", "End test should be 'column'");
  });

  test('test a valid region placement', () => {
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 4, 5, "7").valid, "Mid test should be valid");
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 1, 1, "7").valid, "Beg test should be valid");
    assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 9, 9, "4").valid, "End test should be valid");
  });

  test('test an invalid region placement', () => {
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").valid, "Mid test should be invalid");
    assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 5, 4, "6").conflict, "region", "Mid test should be 'region'");
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 1, 1, "2").valid, "Beg test should be invalid");
    assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 1, 1, "2").conflict, "region", "Beg test should be 'region'");
    assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").valid, "End test should be invalid");
    assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 9, 9, "9").conflict, "region", "End test should be 'region'");
  });

  test('test a valid puzzle', () => {
    const result = solver.solve(puzzlesAndSolutions[0][0]).success;
    assert.isString(result, "Test should return a String");
    assert.strictEqual(result.length, 81, "The result must be 81 characters");
  });

  test('test an invalid puzzle', () => {
    assert.equal(solver.solve(puzzlesAndSolutions[5][0]).error, "Invalid characters in puzzle", "Error in the invalid error return");
    assert.equal(solver.solve(puzzlesAndSolutions[6][0]).error, "Expected puzzle to be 81 characters long", "Error in the length error return");
  });

  test('test a puzzle solve', () => {
    assert.deepEqual(solver.solve(puzzlesAndSolutions[0][0]).success, puzzlesAndSolutions[0][1], "Sample [0] does not match");
    assert.deepEqual(solver.solve(puzzlesAndSolutions[1][0]).success, puzzlesAndSolutions[1][1], "Sample [1] does not match");
    assert.deepEqual(solver.solve(puzzlesAndSolutions[2][0]).success, puzzlesAndSolutions[2][1], "Sample [2] does not match");
  });
});
