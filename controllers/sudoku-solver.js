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
    const colArr = array0.filter((_, i) => (i%9) === (column -1));
    if (colArr.includes(value)) return {valid: false , conflict: "column"};
    else return {valid: true};
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const y = Math.floor((row-1)/3);
    const x = Math.floor((column-1)/3);
    const array0 = puzzleString.split('');
    const regArr = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const index = (y * 3 + i) * 9 + (x * 3 + j);
        regArr.push(array0[index]);
    }}
    if (regArr.includes(value)) return {valid: false , conflict: "region"};
    else return {valid: true};
  }

  solve(puzzleString) {
    //Puzzle Validation
    const validation = this.validate(puzzleString);
    if (!validation.isValid) return validation.error;
    const solution = puzzleString.split('');

    let loopFlag = true;
    const regex = /^[1-9]$/;

    while (loopFlag) {
      loopFlag = false;

      //iterate in table
      for (let index = 0; index < solution.length; index++) {
        const el = solution[index];
        if (regex.test(el)) continue;
        const pool = [];

        //Case of blank
        if (el === ".") {
          for (let i = 1; i < 10; i++) {
            if (!this.checkRowPlacement(puzzleString, Math.floor(index/9+1), undefined, String(i)).valid) continue;
            else if (!this.checkColPlacement(puzzleString, undefined, (index%9+1), String(i)).valid) continue;
            else if (!this.checkRegionPlacement(puzzleString, Math.floor(index/9+1), (index%9+1), String(i)).valid) continue;
            else pool.push(i);
          }
          if (pool.length > 1) solution[index] = pool.join("");
          else {
            solution[index] = pool.join("");
            console.log(`We found the answer to row: ${Math.floor(index/9+1)} column: ${(index%9+1)}, it is ${solution[index]}`);
            loopFlag = true;
          }
        }

        //Case of remaining possibilities
        else {
          for (let i of el) {
            if (!this.checkRowPlacement(puzzleString, Math.floor(index/9+1), undefined, String(i)).valid) continue;
            else if (!this.checkColPlacement(puzzleString, undefined, (index%9+1), String(i)).valid) continue;
            else if (!this.checkRegionPlacement(puzzleString, Math.floor(index/9+1), (index%9+1), String(i)).valid) continue;
            else pool.push(i);
          }
          if (pool.length > 1) solution[index] = pool.join("");
          else {
            solution[index] = pool.join("");
            console.log(`We found the answer to row: ${Math.floor(index/9)+1} column: ${(index%9)+1}, it is ${solution[index]}`);
            loopFlag = true;
          }
        }
      }
    }

    // verif and return
    const solutionString = solution.join("");
    console.log("Final Solution: " + solution);
    return solutionString;
  }
}

module.exports = SudokuSolver;

