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

  simpleCheck(puzzleString, solution, progress) {
    let flag = true;
    while (flag) {
      flag = false;
      for (const [index, val] of Object.entries(progress)) {
        let guess = "";
        for (let i of val) {
          if (!this.checkRowPlacement(puzzleString, Math.floor(index/9+1), undefined, String(i)).valid) continue;
          else if (!this.checkColPlacement(puzzleString, undefined, (index%9+1), String(i)).valid) continue;
          else if (!this.checkRegionPlacement(puzzleString, Math.floor(index/9+1), (index%9+1), String(i)).valid) continue;
          else guess += String(i);
        }
        if (guess.length === 1) {
          delete progress[index];
          solution[index] = guess;
          puzzleString = solution.join("");
          flag = true;
          console.log(`We found the answer to row: ${Math.floor(index/9+1)} column: ${(index%9+1)}, it is ${solution[index]}`);
        }
      }
    }
    const returnString = puzzleString;
    return returnString;
  }

  solve(puzzleString) {
    //Puzzle Validation
    const validation = this.validate(puzzleString);
    if (!validation.isValid) return validation.error;

    //Initialization
    const solution = puzzleString.split('');
    const progress = {};
    let flag = true;

    //Initial grid mapping
    for (let index = 0; index < solution.length; index++) {
      const el = solution[index];
      if (el === ".") {
        let guess = "";
        for (let i = 1; i < 10; i++) {
          if (!this.checkRowPlacement(puzzleString, Math.floor(index/9+1), undefined, String(i)).valid) continue;
          else if (!this.checkColPlacement(puzzleString, undefined, (index%9+1), String(i)).valid) continue;
          else if (!this.checkRegionPlacement(puzzleString, Math.floor(index/9+1), (index%9+1), String(i)).valid) continue;
          else guess += String(i);
        }
        if (guess.length > 1) progress[index] = guess;
        else {
          solution[index] = guess;
          puzzleString = solution.join("");
          console.log(`We found the answer to row: ${Math.floor(index/9+1)} column: ${(index%9+1)}, it is ${solution[index]}`);
        } 
      }
    }
    console.log(solution.join(""));

    //Simple resolution loop OR recursion
    puzzleString = this.simpleCheck(puzzleString, solution, progress);

    //Final return
    console.log(JSON.stringify(progress));
    console.log("Final:" + puzzleString);
    return puzzleString;
  }
}

module.exports = SudokuSolver;

