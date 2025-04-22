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
    const array0 = puzzleString.split('');
    const rowArr = array0.slice((row-1)*9, row*9);
      if (rowArr.includes(value)) return {valid: false , conflict: "row"};
      else return {valid: true};
  }

  checkColPlacement(puzzleString, row, column, value) {
    const array0 = puzzleString.split('');
    const colArr = array0.filter((_, i) => (i%9)+(column-1) === 0);
    if (colArr.includes(value)) return {valid: false , conflict: "column"};
    else return {valid: true};
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const array0 = puzzleString.split('');
    const y = Math.floor(row/3);
    const x = Math.floor(column/3);
    array0 = array0.slice((27*y+3*x), (27*y+3*x+21));
    const regArr = array0.filter((_, i) => i%9 < 3);
    if (regArr.includes(value)) return {valid: false , conflict: "region"};
    else return {valid: true};
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

