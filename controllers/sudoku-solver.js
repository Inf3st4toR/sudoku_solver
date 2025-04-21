class SudokuSolver {

  validate(puzzleString) {
    const array0 = puzzleString.split('');
    const regex = /^[1-9\.]$/;
    if (array0.length != 81) return { isValid: false, error: 'Expected puzzle to be 81 characters long' };
    for (const el of array0) {
      if (!regex.test(el)) return { isValid: false, error: 'Invalid characters in puzzle' };
    }
    return {isValid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

